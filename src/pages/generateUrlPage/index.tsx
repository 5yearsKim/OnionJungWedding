import { useState } from "react"
import "./index.scss"
import { encodeBase64 } from "@/utils/url"

export function GenerateUrlPage() {
  const [title, setTitle] = useState("")
  const [messages, setMessages] = useState("")
  const [generatedUrl, setGeneratedUrl] = useState("")
  const isDisabled = !title.trim() || !messages.trim()

  const handleGenerate = () => {
    if (isDisabled) {
      return
    }

    const params = new URLSearchParams()
    params.set("t_", encodeBase64(title))
    params.set("m_", encodeBase64(messages))

    const nextUrl = `${window.location.origin}/?${params.toString()}`
    setGeneratedUrl(nextUrl)
  }

  const handleCopy = async () => {
    if (!generatedUrl) return
    await navigator.clipboard.writeText(generatedUrl)
  }

  return (
    <main className="generate-url-page">
      <section className="generate-url-card">
        <h1>Generate Invitation URL</h1>
        <p>Enter a title and custom messages, then click generate when ready.</p>

        <form className="generate-url-form" onSubmit={(e) => e.preventDefault()}>
          <label className="field">
            <span>Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Thank You for Joining"
            />
          </label>

          <label className="field">
            <span>Messages</span>
            <textarea
              value={messages}
              onChange={(e) => setMessages(e.target.value)}
              rows={6}
              placeholder="Write your message lines here"
            />
          </label>

          <button
            type="button"
            className="generate-url-button"
            onClick={handleGenerate}
            disabled={isDisabled}
          >
            generateUrl
          </button>
        </form>

        {generatedUrl && (
          <div className="generated-url-area">
            <label htmlFor="generated-url">Generated URL</label>
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
                aria-label="Copy URL"
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
                Copy
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
