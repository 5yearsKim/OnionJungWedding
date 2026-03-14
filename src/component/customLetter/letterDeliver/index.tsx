import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import heartImage from "../../../icons/heart.png"
import loveLetterImage from "../../../icons/love_letter.png"
import "./index.scss"

gsap.registerPlugin(ScrollTrigger)

const firstImageUrl = heartImage
const secondImageUrl = loveLetterImage

export function LetterDeliver() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const firstImageRef = useRef<HTMLImageElement | null>(null)
  const secondImageRef = useRef<HTMLImageElement | null>(null)
  const spacerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const firstImage = firstImageRef.current
    const secondImage = secondImageRef.current
    const spacer = spacerRef.current

    if (!section || !scene || !firstImage || !secondImage || !spacer) {
      return
    }

    const getSecondImageFinalTop = () => {
      const sceneHeight = scene.clientHeight
      // const imageHeight = 0
      const imageHeight = secondImage.offsetHeight
      return Math.max(sceneHeight - imageHeight, 0)
    }

    // const firstImageStartTopValue = () => window.innerHeight * 0.1
    const firstImageStartTopValue = () => 0
    const getFirstImageStartTop = () => firstImageStartTopValue()
    const getFirstImageEndTop = () => scene.clientHeight * 0.35
    const getGapByImageHeight = () => firstImage.offsetHeight * 0.9
    const getSecondImageStartTop = () => getFirstImageEndTop() + getGapByImageHeight()
    const getScrollDistance = () => Math.max(scene.clientHeight * 3, window.innerHeight)
    const updateSpacer = () => {
      spacer.style.height = `${getScrollDistance()}px`
    }

    updateSpacer()
    window.addEventListener("resize", updateSpacer)

    const ctx = gsap.context(() => {
      gsap.set(firstImage, { y: getFirstImageStartTop })
      gsap.set(secondImage, { y: getSecondImageStartTop, rotate: -6 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(
        firstImage,
        { y: getFirstImageEndTop, duration: 0.5, rotate: 0, scale: 0.8, ease: "none" },
        0
      )

      timeline.to(
        secondImage,
        { y: getSecondImageFinalTop, rotate: 0, duration: 0.5, ease: "none" },
        0.5
      )

    }, sceneRef)

    return () => {
      window.removeEventListener("resize", updateSpacer)
      ctx.revert()
    }
  }, [])

  return (
    <section className="letter-deliver" ref={sectionRef}>
      <div className="letter-deliver__scene" ref={sceneRef}>
        <img
          ref={firstImageRef}
          className="letter-deliver__photo letter-deliver__photo--first"
          src={firstImageUrl}
          alt=""
          aria-hidden="true"
        />
        <img
          ref={secondImageRef}
          className="letter-deliver__photo letter-deliver__photo--second"
          src={secondImageUrl}
          alt=""
          aria-hidden="true"
        />
      </div>
      <div className="letter-deliver__spacer" ref={spacerRef} aria-hidden="true" />
    </section>
  )
}
