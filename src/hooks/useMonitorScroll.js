import { useEffect } from 'react'

/**
 * useMonitorScroll
 *
 * Drives the scroll-based monitor animation: progress 0→1 as the user
 * scrolls down. Applies a CSS scale + translateY to the target element
 * and calls onProgress(rawProgress) every frame so callers can redraw.
 *
 * @param {React.RefObject} elementRef  - ref to the element that gets the CSS transform
 * @param {function}        onProgress  - called with rawProgress (0–1) on every scroll update
 * @param {object}          options
 * @param {number}          options.maxScrollFactor  - fraction of innerHeight that counts as 100% scroll (default 0.65)
 * @param {number}          options.scaleStart        - CSS scale at progress=0 (default 0.68)
 * @param {number}          options.scaleEnd          - CSS scale at progress=1 (default 1.0)
 * @param {number}          options.translateYStart   - translateY px at progress=0 (default 32)
 */
function useMonitorScroll(elementRef, onProgress, options = {}) {
  const {
    maxScrollFactor = 0.65,
    scaleStart      = 0.68,
    scaleEnd        = 1.0,
    translateYStart = 32,
  } = options

  useEffect(() => {
    const el = elementRef.current
    if (!el) return

    // On mobile (≤640px) skip scroll animation entirely — lock at face-on (prog=1)
    if (window.innerWidth <= 640) {
      el.style.transform = `scale(1) translateY(0px)`
      if (onProgress) onProgress(1)
      return
    }

    function update() {
      const scrollY   = window.scrollY
      const maxScroll = window.innerHeight * maxScrollFactor
      const rawProg   = Math.min(scrollY / maxScroll, 1)

      // Cubic ease-out
      const eased = 1 - Math.pow(1 - rawProg, 3)

      const scale      = scaleStart + (scaleEnd - scaleStart) * eased
      const translateY = translateYStart * (1 - eased)
      el.style.transform = `scale(${scale}) translateY(${translateY}px)`

      if (onProgress) onProgress(rawProg)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [elementRef, onProgress, maxScrollFactor, scaleStart, scaleEnd, translateYStart])
}

export default useMonitorScroll
