import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import HeroSection from './sections/HeroSection'
import SolutionSection from './sections/SolutionSection'
import TechnicalSection from './sections/TechnicalSection'
import FeasibilitySection from './sections/FeasibilitySection'
import ImpactSection from './sections/ImpactSection'
import ReferencesSection from './sections/ReferencesSection'
import './App.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SECTIONS = [
  { id: 'sec-hero', label: '01 · Title', maxSteps: 1, stepNames: ['Introduction'] },
  { id: 'sec-solution', label: '02 · Solution', maxSteps: 2, stepNames: ['Overview', 'Detailed Pillars'] },
  { id: 'sec-technical', label: '03 · Technical', maxSteps: 3, stepNames: ['Architecture Overview', 'RAG Execution Flow', 'Camera Scan Concept'] },
  { id: 'sec-feasibility', label: '04 · Feasibility', maxSteps: 2, stepNames: ['Overview', 'Feasibility Matrix'] },
  { id: 'sec-impact', label: '05 · Impact', maxSteps: 2, stepNames: ['Target Audience', 'Key Benefits'] },
  { id: 'sec-references', label: '06 · References', maxSteps: 2, stepNames: ['Verified Sources', 'Closing & Thank You'] },
]

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [sectionSubSteps, setSectionSubSteps] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  })
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
      idleRef.current = setTimeout(() => setControlsVisible(false), 4000)
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
    const t = setTimeout(() => setNavReady(true), 1200)
    return () => clearTimeout(t)
  }, [])

  /* ── Active section tracking via IntersectionObserver ── */
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isNavigatingRef.current) {
            setActiveSection(i)
          }
        },
        { threshold: 0.55 }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  /* ── Smooth Scroll Helper ── */
  const scrollToTarget = useCallback((targetIndex, onDone) => {
    const target = sectionRefs.current[targetIndex]
    if (!target) {
      if (onDone) onDone()
      return
    }

    gsap.to(window, {
      scrollTo: { y: target, autoKill: false, offsetY: 0 },
      duration: 0.8,
      ease: 'power3.inOut',
      onComplete: () => {
        if (onDone) onDone()
      },
    })
  }, [])

  /* ── Two-Stage NEXT handler ── */
  const handleNext = useCallback(() => {
    if (isNavigatingRef.current) return

    const currentConfig = SECTIONS[activeSection]
    const currentSubStep = sectionSubSteps[activeSection] || 0

    // Stage 1: If current section has more sub-steps to reveal, advance sub-step in place!
    if (currentSubStep < currentConfig.maxSteps - 1) {
      isNavigatingRef.current = true
      setSectionSubSteps((prev) => ({
        ...prev,
        [activeSection]: currentSubStep + 1,
      }))

      // Re-center current section to guarantee viewport alignment
      scrollToTarget(activeSection, () => {
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 200)
      })
      return
    }

    // Stage 2: Current section is fully revealed. Advance to the next section!
    if (activeSection < SECTIONS.length - 1) {
      const nextIndex = activeSection + 1
      isNavigatingRef.current = true

      // Initialize next section at subStep 0 (intro)
      setSectionSubSteps((prev) => ({
        ...prev,
        [nextIndex]: 0,
      }))

      scrollToTarget(nextIndex, () => {
        setActiveSection(nextIndex)
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 200)
      })
    }
  }, [activeSection, sectionSubSteps, scrollToTarget])

  /* ── Controlled PREVIOUS handler ── */
  const handlePrev = useCallback(() => {
    if (isNavigatingRef.current) return

    const currentSubStep = sectionSubSteps[activeSection] || 0

    // If current section has previous sub-steps, step back in place
    if (currentSubStep > 0) {
      isNavigatingRef.current = true
      setSectionSubSteps((prev) => ({
        ...prev,
        [activeSection]: currentSubStep - 1,
      }))

      scrollToTarget(activeSection, () => {
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 200)
      })
      return
    }

    // Otherwise, move to previous section (set to its final revealed sub-step)
    if (activeSection > 0) {
      const prevIndex = activeSection - 1
      const prevConfig = SECTIONS[prevIndex]
      isNavigatingRef.current = true

      setSectionSubSteps((prev) => ({
        ...prev,
        [prevIndex]: prevConfig.maxSteps - 1,
      }))

      scrollToTarget(prevIndex, () => {
        setActiveSection(prevIndex)
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 200)
      })
    }
  }, [activeSection, sectionSubSteps, scrollToTarget])

  /* ── Direct Pip Jump ── */
  const jumpToSection = useCallback(
    (index) => {
      if (isNavigatingRef.current) return
      const clamped = Math.max(0, Math.min(index, SECTIONS.length - 1))
      isNavigatingRef.current = true

      // Set target section to fully revealed state so no content is missed
      setSectionSubSteps((prev) => ({
        ...prev,
        [clamped]: SECTIONS[clamped].maxSteps > 1 ? 1 : 0,
      }))

      scrollToTarget(clamped, () => {
        setActiveSection(clamped)
        setTimeout(() => {
          isNavigatingRef.current = false
        }, 200)
      })
    },
    [scrollToTarget]
  )

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
          jumpToSection(0)
          break
        case 'End':
          e.preventDefault()
          jumpToSection(SECTIONS.length - 1)
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
  }, [handleNext, handlePrev, jumpToSection, isFullscreen, exitFullscreen])

  const assignRef = (el, i) => {
    sectionRefs.current[i] = el
  }

  const currentConfig = SECTIONS[activeSection] || SECTIONS[0]
  const currentSubStep = sectionSubSteps[activeSection] || 0
  const isAtFirst = activeSection === 0 && currentSubStep === 0
  const isAtLast =
    activeSection === SECTIONS.length - 1 &&
    currentSubStep === currentConfig.maxSteps - 1

  const currentStepLabel =
    currentConfig.stepNames[currentSubStep] || `Stage ${currentSubStep + 1}`

  return (
    <div className="app">
      {/* ── Progress Track across entire presentation ── */}
      <div className="progress-track" aria-hidden="true">
        <div
          className="progress-fill"
          style={{
            transform: `scaleX(${
              ((activeSection + (currentSubStep + 1) / currentConfig.maxSteps) /
                SECTIONS.length)
            })`,
          }}
        />
      </div>

      {/* ── Side Navigation Rail (Dots) ── */}
      {navReady && (
        <nav className="nav-rail" aria-label="Section navigation">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className={`nav-pip${activeSection === i ? ' active' : ''}`}
              onClick={() => jumpToSection(i)}
              aria-label={`Jump to ${s.label}`}
            >
              <span className="pip-label">{s.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ── Enter Fullscreen Trigger ── */}
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

      {/* ── Fixed Presentation Controls Bar (Active in Both Regular & Fullscreen) ── */}
      <div className={`presentation-bar ${isFullscreen ? 'in-fullscreen' : ''} ${controlsVisible ? '' : 'faded'}`}>
        <div className="pres-bar-inner">
          {/* Previous Button */}
          <button
            className="pres-nav-btn prev-btn"
            disabled={isAtFirst}
            onClick={handlePrev}
            aria-label="Previous step"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 12 4 7 9 2" />
            </svg>
            <span>Previous</span>
          </button>

          {/* Stepper Status Indicator */}
          <div className="pres-stepper-indicator">
            <div className="pres-section-pill">
              <span className="pres-sec-index">{currentConfig.label}</span>
            </div>
            <div className="pres-substep-dots">
              {Array.from({ length: currentConfig.maxSteps }).map((_, idx) => (
                <span
                  key={idx}
                  className={`substep-dot ${idx === currentSubStep ? 'active' : ''} ${
                    idx < currentSubStep ? 'completed' : ''
                  }`}
                />
              ))}
            </div>
            <span className="pres-step-name">{currentStepLabel}</span>
          </div>

          {/* Next Button */}
          <button
            className="pres-nav-btn next-btn"
            disabled={isAtLast}
            onClick={handleNext}
            aria-label="Next step"
          >
            <span>
              {currentSubStep < currentConfig.maxSteps - 1
                ? 'Reveal Content'
                : activeSection < SECTIONS.length - 1
                ? 'Next Section'
                : 'Complete'}
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="5 2 10 7 5 12" />
            </svg>
          </button>

          {/* Fullscreen Exit Button */}
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

      {/* ── Viewport-Fitted Presentation Sections ── */}
      <div ref={(el) => assignRef(el, 0)} id="sec-hero">
        <HeroSection subStep={sectionSubSteps[0] || 0} />
      </div>
      <div ref={(el) => assignRef(el, 1)} id="sec-solution">
        <SolutionSection subStep={sectionSubSteps[1] || 0} />
      </div>
      <div ref={(el) => assignRef(el, 2)} id="sec-technical">
        <TechnicalSection subStep={sectionSubSteps[2] || 0} />
      </div>
      <div ref={(el) => assignRef(el, 3)} id="sec-feasibility">
        <FeasibilitySection subStep={sectionSubSteps[3] || 0} />
      </div>
      <div ref={(el) => assignRef(el, 4)} id="sec-impact">
        <ImpactSection subStep={sectionSubSteps[4] || 0} />
      </div>
      <div ref={(el) => assignRef(el, 5)} id="sec-references">
        <ReferencesSection
          subStep={sectionSubSteps[5] || 0}
          onReturnToTop={() => jumpToSection(0)}
        />
      </div>
    </div>
  )
}

export default App
