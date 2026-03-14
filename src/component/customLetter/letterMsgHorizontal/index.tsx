import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import "./index.scss"

gsap.registerPlugin(ScrollTrigger, SplitText)

type LetterMsgHorizontalProps = {
  message: string
}

export function LetterMsgHorizontal({
  message,
}: LetterMsgHorizontalProps) {
  const wrapperRef = useRef<HTMLElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const text = textRef.current

    if (!wrapper || !text) {
      return
    }

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, { type: "chars, words" })
      const textWidth = text.scrollWidth
      const windowWidth = wrapper.clientWidth
      const startOffset = -(windowWidth * 0.3)
      const extraMargin = windowWidth * 0.1
      const endOffset = textWidth + extraMargin

      const scrollTween = gsap.fromTo(
        text,
        { x: startOffset },
        {
          x: -(textWidth + extraMargin),
          ease: "none",
          scrollTrigger: {
            id: "horizontal-title",
            trigger: wrapper,
            start: "top top",
            pin: true,
            pinSpacing: true,
            end: () => `+=${endOffset}`,
            scrub: true,
          },
        }
      )

      split.chars.forEach((char) => {
        gsap.from(char, {
          yPercent: "random(-200, 200)",
          rotation: "random(-20, 20)",
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: char,
            containerAnimation: scrollTween,
            start: "left 80%",
            end: "left 20%",
            scrub: 1,
          },
        })
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="Horizontal" ref={wrapperRef}>
      <div className="container">
        <h3 className="Horizontal__text heading-xl" ref={textRef}>
          {message}
        </h3>
      </div>
    </section>
  )
}
