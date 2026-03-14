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

    // const firstImageStartTopValue = () => window.innerHeight * 0.1
    const firstImageStartTopValue = () => 0
    const getFirstImageStartTop = () => firstImageStartTopValue()
    const getFirstImageEndTop = () => scene.clientHeight * 0.4
    const getGapByImageHeight = () => firstImage.offsetHeight * 0.1
    const getSecondImageStartTop = () => getFirstImageEndTop() + getGapByImageHeight()

    const ctx = gsap.context(() => {
      gsap.set(firstImage, { y: getFirstImageStartTop })
      gsap.set(secondImage, { y: getSecondImageStartTop, rotate: -6 })

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: scene,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(
        firstImage,
        { y: getFirstImageEndTop, duration: 0.5, rotate: 0, ease: "none" },
        0
      )

      timeline.to(
        secondImage,
        { y: getSecondImageFinalTop, rotate: 0, duration: 0.5, ease: "none" },
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
