import { useEffect, useState } from "react"
import "./index.scss"
import {
  GeneratedUrlList,
  type GeneratedUrlItem,
} from "@/component/generatedUrlList"
import { encodeBase64 } from "@/utils/url"

const STORAGE_KEY = "onion-jung-wedding:generated-urls"

function createInvitationUrl(title: string, messages: string) {
  const params = new URLSearchParams()
  params.set("t_", encodeBase64(title))
  params.set("m_", encodeBase64(messages))

  return `${window.location.origin}/?${params.toString()}`
}

function createId() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function getSavedItems() {
  try {
    const savedItems = window.localStorage.getItem(STORAGE_KEY)
    if (!savedItems) return []

    const parsedItems = JSON.parse(savedItems)
    if (!Array.isArray(parsedItems)) return []

    return parsedItems.filter(
      (item): item is GeneratedUrlItem =>
        typeof item?.id === "string" &&
        typeof item?.title === "string" &&
        typeof item?.messages === "string" &&
        typeof item?.url === "string" &&
        typeof item?.updatedAt === "string",
    )
  } catch {
    return []
  }
}

export function GenerateUrlPage() {
  const [title, setTitle] = useState("")
  const [messages, setMessages] = useState("")
  const [generatedUrl, setGeneratedUrl] = useState("")
  const [savedUrls, setSavedUrls] = useState<GeneratedUrlItem[]>(getSavedItems)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const isDisabled = !title.trim() || !messages.trim()

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedUrls))
  }, [savedUrls])

  const handleGenerate = () => {
    if (isDisabled) {
      return
    }

    const nextUrl = createInvitationUrl(title.trim(), messages)
    const nextItem: GeneratedUrlItem = {
      id: selectedId ?? createId(),
      title: title.trim(),
      messages,
      url: nextUrl,
      updatedAt: new Date().toISOString(),
    }

    setSavedUrls((currentItems) => [
      nextItem,
      ...currentItems.filter((item) => item.id !== nextItem.id),
    ])
    setSelectedId(nextItem.id)
    setGeneratedUrl(nextUrl)
  }

  const handleCopy = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
  }

  const handleSelectSavedUrl = (item: GeneratedUrlItem) => {
    setSelectedId(item.id)
    setTitle(item.title)
    setMessages(item.messages)
    setGeneratedUrl(item.url)
  }

  const handleCreateNew = () => {
    setSelectedId(null)
    setTitle("")
    setMessages("")
    setGeneratedUrl("")
  }

  const handleDelete = (id: string) => {
    setSavedUrls((currentItems) => currentItems.filter((item) => item.id !== id))

    if (selectedId === id) {
      handleCreateNew()
    }
  }

  return (
    <main className="generate-url-page">
      <section className="generate-url-card">
        <h1>초대장 URL 생성</h1>
        <p>제목과 전하고 싶은 메시지를 입력한 뒤 URL을 생성하세요.</p>

        <form className="generate-url-form" onSubmit={(e) => e.preventDefault()}>
          <label className="field">
            <span>제목</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: ㅁㅁ아, 우리에 특별한 결혼식에 초대할게"
            />
          </label>

          <label className="field">
            <span>메시지</span>
            <textarea
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              rows={6}
              placeholder="전하고 싶은 메시지를 입력해 주세요"
            />
          </label>

          <button
            type="button"
            className="generate-url-button"
            onClick={handleGenerate}
            disabled={isDisabled}
          >
            {selectedId ? "URL 수정하기" : "URL 생성하기"}
          </button>
          {selectedId && (
            <button
              type="button"
              className="reset-url-button"
              onClick={handleCreateNew}
            >
              새 URL 작성
            </button>
          )}
        </form>

        {generatedUrl && (
          <div className="generated-url-area">
            <label htmlFor="generated-url">생성된 URL</label>
            <div className="generated-url-row">
              <textarea
                id="generated-url"
                value={generatedUrl}
                readOnly
                rows={3}
              />
              <button
                type="button"
                className="copy-url-button"
                onClick={handleCopy}
                aria-label="URL 복사"
              >
                <span aria-hidden="true">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.5 5.5v8.75a1.75 1.75 0 0 1-1.75 1.75H5.5a1.75 1.75 0 0 1-1.75-1.75V5.5A1.75 1.75 0 0 1 5.5 3.75H6V3a1.75 1.75 0 0 1 1.75-1.75h5.75A1.75 1.75 0 0 1 15.5 3v1.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.5 4.5h-6A1.75 1.75 0 0 0 3.75 6.25v6A1.75 1.75 0 0 0 5.5 14h6a1.75 1.75 0 0 0 1.75-1.75v-6A1.75 1.75 0 0 0 11.5 4.5Z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                복사
              </button>
            </div>
          </div>
        )}

      </section>

      <GeneratedUrlList
        items={savedUrls}
        selectedId={selectedId}
        onSelect={handleSelectSavedUrl}
        onDelete={handleDelete}
      />
    </main>
  )
}
