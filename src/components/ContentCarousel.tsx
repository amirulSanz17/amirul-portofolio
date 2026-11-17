import { useCallback, useEffect, useRef, useState } from "react"

import type { ReactNode } from "react"

type ContentCarouselProps = {
  children: ReactNode

  className: string

  label: string

  itemCount: number
}

export default function ContentCarousel({
  children,

  className,

  label,

  itemCount,
}: ContentCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null)

  const [canScrollPrevious, setCanScrollPrevious] = useState(false)

  const [canScrollNext, setCanScrollNext] = useState(false)

  const updateScrollButtons = useCallback(() => {
    const viewport = viewportRef.current

    if (!viewport) return

    setCanScrollPrevious(viewport.scrollLeft > 1)

    setCanScrollNext(
      viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1,
    )
  }, [])

  useEffect(() => {
    const viewport = viewportRef.current

    if (!viewport) return

    const track = viewport.firstElementChild

    const observer = new ResizeObserver(updateScrollButtons)

    observer.observe(viewport)

    if (track) observer.observe(track)

    updateScrollButtons()

    return () => observer.disconnect()
  }, [updateScrollButtons])

  const scroll = (direction: -1 | 1) => {
    const viewport = viewportRef.current

    const track = viewport?.firstElementChild

    const firstCard = track?.firstElementChild

    if (
      !viewport ||
      !(track instanceof HTMLElement) ||
      !(firstCard instanceof HTMLElement)
    ) {
      return
    }

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0

    viewport.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

  return (
    <div className="content-carousel">
      {itemCount > 1 && (
        <div className="content-carousel-controls">
          <button
            type="button"
            className="content-carousel-button content-carousel-previous"
            aria-label={`Scroll to previous ${label} card`}
            onClick={() => scroll(-1)}
            disabled={!canScrollPrevious}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m15 18-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="content-carousel-button content-carousel-next"
            aria-label={`Scroll to next ${label} card`}
            onClick={() => scroll(1)}
            disabled={!canScrollNext}
          >
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="m9 18 6-6-6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
      <div
        ref={viewportRef}
        className="content-carousel-viewport"
        role="region"
        aria-label={`${label} carousel`}
        aria-roledescription="carousel"
        tabIndex={0}
        onScroll={updateScrollButtons}
      >
        <div className={`content-carousel-track ${className}`}>{children}</div>
      </div>
    </div>
  )
}
