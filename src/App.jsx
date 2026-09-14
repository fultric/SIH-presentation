import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import HeroSection from './sections/HeroSection'
import SolutionSection from './sections/SolutionSection'
import TechnicalSection from './sections/TechnicalSection'
import TechStackSection from './sections/TechStackSection'
import FeasibilitySection from './sections/FeasibilitySection'
import ImpactSection from './sections/ImpactSection'
import ReferencesSection from './sections/ReferencesSection'
import ThankYouSection from './sections/ThankYouSection'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SECTIONS = [
  { id: 'sec-hero', label: '01 · Title', name: 'Title Page' },
  { id: 'sec-solution', label: '02 · Solution', name: 'Proposed Solution' },
  { id: 'sec-technical', label: '03 · Technical', name: 'Technical Approach' },
  { id: 'sec-techstack', label: '04 · Tech Stack', name: 'Technology Stack' },
  { id: 'sec-feasibility', label: '05 · Feasibility', name: 'Feasibility & Viability' },
  { id: 'sec-impact', label: '06 · Impact', name: 'Impact & Benefits' },
  { id: 'sec-references', label: '07 · References', name: 'Research & References' },
  { id: 'sec-thankyou', label: '08 · Thank You', name: 'Thank You' },
]

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const [navReady, setNavReady] = useState(false)

  const isNavigatingRef = useRef(false)
  const sectionRefs = useRef([])
  const idleRef = useRef(null)

  /* ── Fullscreen API ── */
  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const enterFullscreen = useCallback(() => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        alert('Fullscreen is not supported in this browser or was blocked.')
      })
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen()
    } else {
      alert('Fullscreen API is not supported in this browser.')
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) document.exitFullscreen()
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen()
  }, [])

  /* ── Idle fade for fullscreen controls ── */
  useEffect(() => {
    if (!isFullscreen) {
      setControlsVisible(true)
      return
    }
    const resetIdle = () => {
      setControlsVisible(true)
      clearTimeout(idleRef.current)
      idleRef.current = setTimeout(() => setControlsVisible(false), 3500)
    }
    resetIdle()
    window.addEventListener('mousemove', resetIdle, { passive: true })
    window.addEventListener('keydown', resetIdle)
    return () => {
      window.removeEventListener('mousemove', resetIdle)
      window.removeEventListener('keydown', resetIdle)
      clearTimeout(idleRef.current)
    }
  }, [isFullscreen])

  /* ── Delayed nav appearance ── */
  useEffect(() => {
    const t = setTimeout(() => setNavReady(true), 800)
    return () => clearTimeout(t)
  }, [])

  /* ── Active section tracking via IntersectionObserver for manual scrolling ── */
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isNavigatingRef.current) {
            setActiveSection(i)
          }
        },
        { threshold: 0.5 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  /* ── Cinematic Section-to-Section Transition (iQOO / Apple Product Reveal Style) ── */
  const transitionToSection = useCallback((targetIndex) => {
    if (isNavigatingRef.current) return
    const clampedIndex = Math.max(0, Math.min(targetIndex, SECTIONS.length - 1))
    if (clampedIndex === activeSection && sectionRefs.current[clampedIndex]) {
      gsap.to(window, {
        scrollTo: { y: sectionRefs.current[clampedIndex], autoKill: false },
        duration: 0.5,
        ease: 'power2.out',
      })
      return
    }

    isNavigatingRef.current = true
    const currentEl = sectionRefs.current[activeSection]
    const nextEl = sectionRefs.current[clampedIndex]
    const direction = clampedIndex > activeSection ? 1 : -1

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSection(clampedIndex)
        if (currentEl) {
          gsap.set(currentEl, { opacity: 1, scale: 1, y: 0 })
        }
        isNavigatingRef.current = false
      },
    })

    // 1. Current section glides out with subtle depth scale
    if (currentEl) {
      tl.to(currentEl, {
        opacity: 0.3,
        scale: 0.97,
        y: -15 * direction,
        duration: 0.35,
        ease: 'power2.in',
      })
    }

    // 2. Window scrolls smoothly to next section target
    if (nextEl) {
      tl.to(
        window,
        {
          scrollTo: { y: nextEl, autoKill: false, offsetY: 0 },
          duration: 0.75,
          ease: 'power3.inOut',
        },
        '-=0.2'
      )

      // 3. Next section visual elements animate in smoothly
      tl.fromTo(
        nextEl,
        { opacity: 0.2, scale: 1.02, y: 20 * direction },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.45'
      )
    }
  }, [activeSection])

  /* ── Next Button Handler: Exactly 1 Section per Click ── */
  const handleNext = useCallback(() => {
    if (isNavigatingRef.current) return
    if (activeSection < SECTIONS.length - 1) {
      transitionToSection(activeSection + 1)
    }
  }, [activeSection, transitionToSection])

  /* ── Previous Button Handler: Exactly 1 Section per Click ── */
  const handlePrev = useCallback(() => {
    if (isNavigatingRef.current) return
    if (activeSection > 0) {
      transitionToSection(activeSection - 1)
    }
  }, [activeSection, transitionToSection])

  /* ── Keyboard Controls ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault()
          handleNext()
          break
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          handlePrev()
          break
        case 'Home':
          e.preventDefault()
          transitionToSection(0)
          break
        case 'End':
          e.preventDefault()
          transitionToSection(SECTIONS.length - 1)
          break
        case 'Escape':
          if (isFullscreen) exitFullscreen()
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev, transitionToSection, isFullscreen, exitFullscreen])

  const assignRef = (el, i) => {
    sectionRefs.current[i] = el
  }

  const currentSection = SECTIONS[activeSection] || SECTIONS[0]
  const isAtFirst = activeSection === 0
  const isAtLast = activeSection === SECTIONS.length - 1

  return (
    <div className="app">
      {/* ── Top Presentation Progress Bar ── */}
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-fill"
          style={{
            transform: `scaleX(${(activeSection + 1) / SECTIONS.length})`,
          }}
        />
      </div>

      {/* ── Side Navigation Rail (Pips) ── */}
      {navReady && (
        <nav className="nav-rail" aria-label="Section navigation">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className={`nav-pip${activeSection === i ? ' active' : ''}`}
              onClick={() => transitionToSection(i)}
              aria-label={`Go to ${s.label}`}
            >
              <span className="pip-label">{s.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ── Fullscreen Toggle Button (Bottom-Right) ── */}
      {navReady && !isFullscreen && (
        <button
          className="fs-enter"
          onClick={enterFullscreen}
          aria-label="Enter full screen presentation mode"
        >
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 1 1 1 1 6" />
            <polyline points="10 1 15 1 15 6" />
            <polyline points="6 15 1 15 1 10" />
            <polyline points="10 15 15 15 15 10" />
          </svg>
          <span>Full Screen</span>
        </button>
      )}

      {/* ── Presentation Bottom Control Bar (1 Click = 1 Section Transition) ── */}
      <div className={`presentation-bar ${isFullscreen ? 'in-fullscreen' : ''} ${controlsVisible ? '' : 'faded'}`}>
        <div className="pres-bar-inner">
          {/* Previous Button */}
          <button
            className="pres-nav-btn prev-btn"
            disabled={isAtFirst}
            onClick={handlePrev}
            aria-label="Previous section"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 12 4 7 9 2" />
            </svg>
            <span>Previous</span>
          </button>

          {/* Section Indicator */}
          <div className="pres-stepper-indicator">
            <span className="pres-sec-index">{activeSection + 1} / {SECTIONS.length}</span>
            <div className="pres-indicator-divider" />
            <span className="pres-step-name">{currentSection.name}</span>
          </div>

          {/* Next Button */}
          <button
            className="pres-nav-btn next-btn"
            disabled={isAtLast}
            onClick={handleNext}
            aria-label="Next section"
          >
            <span>{isAtLast ? 'Completed' : 'Next Section'}</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 2 10 7 5 12" />
            </svg>
          </button>

          {/* Fullscreen Exit */}
          {isFullscreen && (
            <>
              <div className="pres-divider" />
              <button className="pres-nav-btn exit-btn" onClick={exitFullscreen} aria-label="Exit full screen">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 1 4 4 1 4" />
                  <polyline points="12 1 12 4 15 4" />
                  <polyline points="4 15 4 12 1 12" />
                  <polyline points="12 15 12 12 15 12" />
                </svg>
                <span>Exit</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Viewport-Fitted Presentation Sections (8 Sections Total) ── */}
      <div ref={(el) => assignRef(el, 0)} id="sec-hero">
        <HeroSection />
      </div>
      <div ref={(el) => assignRef(el, 1)} id="sec-solution">
        <SolutionSection />
      </div>
      <div ref={(el) => assignRef(el, 2)} id="sec-technical">
        <TechnicalSection isActive={activeSection === 2} />
      </div>
      <div ref={(el) => assignRef(el, 3)} id="sec-techstack">
        <TechStackSection isActive={activeSection === 3} />
      </div>
      <div ref={(el) => assignRef(el, 4)} id="sec-feasibility">
        <FeasibilitySection />
      </div>
      <div ref={(el) => assignRef(el, 5)} id="sec-impact">
        <ImpactSection />
      </div>
      <div ref={(el) => assignRef(el, 6)} id="sec-references">
        <ReferencesSection />
      </div>
      <div ref={(el) => assignRef(el, 7)} id="sec-thankyou">
        <ThankYouSection onReturnToTop={() => transitionToSection(0)} />
      </div>
    </div>
  )
}

export default App
