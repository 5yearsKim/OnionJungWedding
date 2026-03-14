import { useEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./index.scss"

gsap.registerPlugin(ScrollTrigger)

type LetterMsgProps = {
  messages: string[]
}

const PANEL_COLORS = ["green", "blue", "purple", "orange"]

export function LetterMsg({ messages }: LetterMsgProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const normalizedMessages = useMemo(
    () => messages.filter((message) => message.trim().length > 0),
    [messages]
  )
  const renderedMessages = useMemo(() => ["💍", ...normalizedMessages], [normalizedMessages])

  useEffect(() => {
    if (!containerRef.current || normalizedMessages.length === 0) {
      return
    }

    const getMessageStartOffset = () => {
      if (!containerRef.current) {
        return 0
      }
      return window.scrollY + containerRef.current.getBoundingClientRect().top
    }

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    const ctx = gsap.context(() => {
      const sections = Array.from(
        containerRef.current?.querySelectorAll<HTMLElement>(".letter-msg__panel") ?? []
      )

      if (sections.length === 0) {
        return
      }

      let currentSection: HTMLElement | null = sections[0]
      const hideSection = (target: HTMLElement) => {
        gsap.to(target, { scale: 0.8, autoAlpha: 0 })
      }
      const showSection = (target: HTMLElement) => {
        gsap.to(target, { scale: 1, autoAlpha: 1 })
      }
      const setSection = (newSection: HTMLElement) => {
        if (newSection === currentSection) {
          return
        }

        if (currentSection) {
          hideSection(currentSection)
        }

        showSection(newSection)
        currentSection = newSection
      }

      gsap.defaults({ overwrite: "auto", duration: 0.3 })
      gsap.set(sections, { scale: 0.8, autoAlpha: 0 })
      hideSection(sections[0])

      sections.forEach((section, index) => {
        const getSectionStart = () => getMessageStartOffset() + index * window.innerHeight
        const getSectionEnd = () => getMessageStartOffset() + (index + 1) * window.innerHeight

        ScrollTrigger.create({
          id: `letter-msg-${index}`,
          start: getSectionStart,
          end: getSectionEnd,
          onEnter: () => {
            setSection(section)
          },
          onEnterBack: () => {
            setSection(section)
          },
          onLeave: () => {
            if (currentSection === section) {
              hideSection(section)
              currentSection = null
            }
          },
          onLeaveBack: () => {
            if (currentSection === section) {
              hideSection(section)
              currentSection = null
            }
          },
        })
      })

      window.addEventListener("resize", handleResize)
    }, containerRef)

    return () => {
      ctx.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, [normalizedMessages])

  if (normalizedMessages.length === 0) {
    return null
  }

  return (
    <div ref={containerRef} className="letter-msg">
      {renderedMessages.map((message, index) => (
        <section
          key={`message-${index}`}
          className={`letter-msg__panel ${PANEL_COLORS[index % PANEL_COLORS.length]}`}
        >
          <h2 className="letter-msg__text">
            {message}
          </h2>
        </section>
      ))}
      <div
        // aria-hidden="true"
        className="letter-msg__spacer"
        style={{ height: `${(normalizedMessages.length + 1) * 100}vh` }}
      />
    </div>
  )
}
