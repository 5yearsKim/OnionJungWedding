import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./index.scss"

gsap.registerPlugin(ScrollTrigger)

const baseUrl = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`
const firstImageUrl = `${baseUrl}images/heart.png`
const secondImageUrl = `${baseUrl}images/love_letter.png`

export function LetterDeliver() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const firstImageRef = useRef<HTMLImageElement | null>(null)
  const secondImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    const scene = sceneRef.current
    const firstImage = firstImageRef.current
    const secondImage = secondImageRef.current

    if (!section || !scene || !firstImage || !secondImage) {
      return
    }

    const getSecondImageFinalTop = () => {
      const sceneHeight = scene.clientHeight
      const imageHeight = secondImage.offsetHeight
      return Math.max(sceneHeight - imageHeight, 0)
    }

    const firstImageStartRatio = 0.1
    const firstImageEndRatio = 0.4
    const getFirstImageStartTop = () => scene.clientHeight * firstImageStartRatio
    const getFirstImageEndTop = () => scene.clientHeight * firstImageEndRatio
    const getGapByImageHeight = () => firstImage.offsetHeight * 0
    const getSecondImageStartTop = () => getFirstImageEndTop() + getGapByImageHeight()

    const ctx = gsap.context(() => {
      const firstStart = getFirstImageStartTop()
      const firstEnd = getFirstImageEndTop()
      const secondStart = getSecondImageStartTop()

      gsap.set(firstImage, { top: firstStart,  })
      gsap.set(secondImage, { top: secondStart, rotate: -6 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: scene,
        },
      })

      timeline.to(
        firstImage,
        { top: firstEnd, duration: 0.5, rotate: 0, ease: "none" },
        0
      )

      timeline.to(
        secondImage,
        { top: getSecondImageFinalTop, rotate: 0, duration: 0.5, ease: "none" },
        0.5
      )

      return () => {
        timeline.scrollTrigger?.kill()
        timeline.kill()
      }
    }, sceneRef)

    return () => ctx.revert()
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
    </section>
  )
}
