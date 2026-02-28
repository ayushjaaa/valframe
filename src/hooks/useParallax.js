import { useEffect, useRef } from 'react'

// ── Shared scroll dispatcher ────────────────────────────────────────────────
// All useParallax instances share ONE scroll listener and ONE rAF per frame.
// Individual instances register a callback; the dispatcher fires them all
// inside a single requestAnimationFrame — eliminates N competing rAF loops.

const listeners = new Set()
let rafId     = null
let scheduled = false

function dispatch() {
  scheduled = false
  rafId     = null
  listeners.forEach(fn => fn())
}

function onScroll() {
  if (scheduled) return
  scheduled = true
  rafId = requestAnimationFrame(dispatch)
}

function addListener(fn) {
  if (listeners.size === 0) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
  }
  listeners.add(fn)
}

function removeListener(fn) {
  listeners.delete(fn)
  if (listeners.size === 0) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (rafId !== null) {
      cancelAnimationFrame(rafId)
      rafId     = null
      scheduled = false
    }
  }
}

// ── Hook ────────────────────────────────────────────────────────────────────
/**
 * useParallax
 *
 * Scroll-driven parallax using a shared single scroll + rAF dispatcher.
 * All card instances share one listener — zero competing rAF loops.
 *
 * @param {number} speed  0 = none · 0.2 = subtle · 0.5 = strong
 * @returns {React.RefObject} attach to the element to parallax
 */
function useParallax(speed = 0.3) {
  const ref     = useRef(null)
  const cardRef = useRef(null)   // stable reference to the card article

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // img → .works-card__media-wrap → .works-card (article)
    cardRef.current = el.parentElement?.parentElement ?? el.parentElement ?? el
    const card = cardRef.current

    function update() {
      const rect  = card.getBoundingClientRect()
      const viewH = window.innerHeight

      // Skip cards fully outside the viewport — no layout work needed
      if (rect.bottom < 0 || rect.top > viewH) return

      const progress = (viewH - rect.top) / (viewH + rect.height)
      const clamped  = Math.max(0, Math.min(1, progress))
      const offset   = (clamped - 0.5) * speed * rect.height

      el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`
    }

    // Deferred first draw — waits for paint so rects are accurate
    requestAnimationFrame(update)

    addListener(update)
    return () => removeListener(update)
  }, [speed])

  return ref
}

export default useParallax
