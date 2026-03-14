import "./index.scss"

import { LetterDeliver } from "@/component/customLetter/letterDeliver"
import { LetterMsg } from "@/component/customLetter/letterMsg"
import { LetterMsgHorizontal } from "@/component/customLetter/letterMsgHorizontal"
import { decodeBase64 } from "@/utils/url"

function parseMessages(raw: string | null): string[] {
  if (raw == null || raw.length === 0) {
    return []
  }

  return raw.split(/\r?\n/)
}

export function CustomLetter() {
  const searchParams = new URLSearchParams(window.location.search)
  const title = decodeBase64(searchParams.get("t_") ?? "")
  const messageText = decodeBase64(searchParams.get("m_") ?? "")

  if (!title?.trim() || !messageText?.trim()) {
    return <></>
  }

  return (
    <div className="custom-letter">
      <LetterMsgHorizontal message={title} />

      <LetterMsg messages={parseMessages(messageText)} />

      <LetterDeliver />
    </div>
  )
}

