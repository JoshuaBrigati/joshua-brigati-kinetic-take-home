import { useEffect, useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import CollectionCard from "../cards/collection-card"
import { collections } from "@/data/collections"
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react"

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      slides: {
        perView: 3,
        spacing: 12,
      },
      breakpoints: {
        "(max-width: 768px)": {
          slides: {
            perView: 2,
            spacing: 10,
          },
        },
        "(max-width: 500px)": {
          slides: {
            perView: 1,
            spacing: 8,
          },
        },
      },
      initial: 0,
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 6000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="relative px-12">
      <div ref={sliderRef} className="keen-slider">
        {collections.map((collection) => (
          <div key={collection.collection} className="keen-slider__slide">
            <CollectionCard collection={collection} />
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
          <>
            <ArrowLeftCircle
              data-testid="arrow-left"
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              className="h-6 w-6 absolute top-1/2 left-4 transform -translate-y-1/2 opacity-50 transition-opacity hover:opacity-100 hover:cursor-pointer"
            />
            <ArrowRightCircle
              data-testid="arrow-right"
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              className="h-6 w-6 absolute top-1/2 right-4 transform -translate-y-1/2 opacity-50 transition-opacity hover:opacity-100 hover:cursor-pointer"
            />
          </>
        )}
    </div>
  )
}