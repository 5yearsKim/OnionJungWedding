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

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: scene,
        },
      })

      timeline.fromTo(
        firstImage,
        { top: "10%" },
        { top: "50%", duration: 0.55, ease: "none" },
        0
      )

      timeline.fromTo(
        secondImage,
        { top: "70%", rotate: -4 },
        { top: "70%", rotate: 0, duration: 0.55, ease: "none" },
        0
      )

      timeline.to(
        secondImage,
        { top: "88%", duration: 0.45, ease: "none" },
        0.55
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
