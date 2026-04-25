import { useLayoutEffect, useRef } from "react"
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

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const text = textRef.current

    if (!wrapper || !text) {
      return
    }

    const ctx = gsap.context(() => {
      const split = SplitText.create(text, { type: "chars, words" })
      const windowWidth = wrapper.clientWidth
      const textWidth = text.scrollWidth
      const startOffset =
        textWidth > windowWidth
          ? windowWidth / 2
          : (windowWidth - textWidth) / 2
      const extraMargin = windowWidth * 0.1
      const endX = -(textWidth + extraMargin)
      const endOffset = startOffset - endX

      const scrollTween = gsap.fromTo(
        text,
        { x: startOffset },
        {
          x: endX,
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
          yPercent: "random(-60, 60)",
          rotation: "random(-12, 12)",
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
      <div className="Horizontal__container">
        <h3 className="Horizontal__text heading-xl" ref={textRef}>
          {message}
        </h3>
      </div>
    </section>
  )
}
