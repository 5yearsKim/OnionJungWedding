import { useEffect, useMemo, useState } from "react"
import "./index.scss"

const ITEMS_PER_PAGE = 10

export type GeneratedUrlItem = {
  id: string
  title: string
  messages: string
  url: string
  updatedAt: string
}

type GeneratedUrlListProps = {
  items: GeneratedUrlItem[]
  selectedId: string | null
  onSelect: (item: GeneratedUrlItem) => void
  onDelete: (id: string) => void
}

export function GeneratedUrlList({
  items,
  selectedId,
  onSelect,
  onDelete,
}: GeneratedUrlListProps) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE))
  const visibleItems = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [items, page])

  useEffect(() => {
    setPage((currentPage) => Math.min(currentPage, totalPages))
  }, [totalPages])

  const handleDelete = (item: GeneratedUrlItem) => {
    const confirmed = window.confirm(`"${item.title}" URL을 삭제할까요?`)
    if (!confirmed) return

    onDelete(item.id)
  }

  return (
    <section className="saved-url-card">
      <div className="saved-url-list-area">
        <div className="saved-url-list-header">
          <h2>저장된 초대장 URL</h2>
          <span>{items.length}개</span>
        </div>

        {items.length > 0 ? (
          <>
            <ul className="saved-url-list">
              {visibleItems.map((item) => (
                <li
                  key={item.id}
                  className={item.id === selectedId ? "is-selected" : undefined}
                >
                  <button
                    type="button"
                    className="saved-url-preview"
                    onClick={() => onSelect(item)}
                  >
                    <span className="saved-url-title">{item.title}</span>
                    <span className="saved-url-message">{item.messages}</span>
                  </button>
                  <button
                    type="button"
                    className="delete-url-button"
                    onClick={() => handleDelete(item)}
                    aria-label={`${item.title} 삭제`}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>

            <div className="saved-url-pagination">
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage - 1)}
                disabled={page === 1}
              >
                이전
              </button>
              <span>
                {page} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={page === totalPages}
              >
                다음
              </button>
            </div>
          </>
        ) : (
          <p className="empty-saved-url">아직 저장된 URL이 없습니다.</p>
        )}
      </div>
    </section>
  )
}
