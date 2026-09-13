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
  { id: 'sec-hero', label: '01 · Title' },
  { id: 'sec-solution', label: '02 · Solution' },
  { id: 'sec-technical', label: '03 · Technical' },
  { id: 'sec-feasibility', label: '04 · Feasibility' },
  { id: 'sec-impact', label: '05 · Impact' },
  { id: 'sec-references', label: '06 · References' },
]

function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
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

  /* ── Scroll progress ── */
  useEffect(() => {
    const onScroll = () => {
      const top = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? Math.min((top / total) * 100, 100) : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* ── Active section tracking ── */
  useEffect(() => {
    const observers = sectionRefs.current.map((ref, i) => {
      if (!ref) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(i) },
        { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' }
      )
      obs.observe(ref)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  /* ── Idle fade for fullscreen controls ── */
  useEffect(() => {
    if (!isFullscreen) { setControlsVisible(true); return }
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
    const t = setTimeout(() => setNavReady(true), 1800)
    return () => clearTimeout(t)
  }, [])

  /* ── Section navigation (GSAP ScrollTo) ── */
  const navigateToSection = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, SECTIONS.length - 1))
    if (isNavigatingRef.current) return
    const target = sectionRefs.current[clamped]
    if (!target) return
    isNavigatingRef.current = true
    gsap.to(window, {
      scrollTo: { y: target, autoKill: false, offsetY: 0 },
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        isNavigatingRef.current = false
        setActiveSection(clamped)
      },
    })
  }, [])

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return
      switch (e.key) {
        case 'ArrowDown': case 'ArrowRight': case 'PageDown':
          e.preventDefault(); navigateToSection(activeSection + 1); break
        case 'ArrowUp': case 'ArrowLeft': case 'PageUp':
          e.preventDefault(); navigateToSection(activeSection - 1); break
        case 'Home':
          e.preventDefault(); navigateToSection(0); break
        case 'End':
          e.preventDefault(); navigateToSection(SECTIONS.length - 1); break
        case 'Escape':
          if (isFullscreen) exitFullscreen(); break
        default: break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeSection, isFullscreen, navigateToSection, exitFullscreen])

  const assignRef = (el, i) => { sectionRefs.current[i] = el }

  return (
    <div className="app">
      {/* ── Progress bar ── */}
      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      </div>

      {/* ── Side nav dots ── */}
      {navReady && (
        <nav className="nav-rail" aria-label="Section navigation">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className={`nav-pip${activeSection === i ? ' active' : ''}`}
              onClick={() => navigateToSection(i)}
              aria-label={`Go to ${s.label}`}
            >
              <span className="pip-label">{s.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ── Fullscreen toggle ── */}
      {navReady && !isFullscreen && (
        <button className="fs-enter" onClick={enterFullscreen} aria-label="Enter full screen presentation mode">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 1 1 1 1 6" /><polyline points="10 1 15 1 15 6" />
            <polyline points="6 15 1 15 1 10" /><polyline points="10 15 15 15 15 10" />
          </svg>
          <span>Present</span>
        </button>
      )}

      {/* ── Fullscreen controls bar ── */}
      {isFullscreen && (
        <div className={`fs-bar${controlsVisible ? '' : ' faded'}`}>
          <div className="fs-bar-inner">
            <button
              className="fs-btn"
              disabled={activeSection === 0}
              onClick={() => navigateToSection(activeSection - 1)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 12 4 7 9 2"/></svg>
              <span>Prev</span>
            </button>

            <div className="fs-indicator">
              <span className="fs-counter">{activeSection + 1}<span className="fs-sep">/</span>{SECTIONS.length}</span>
              <span className="fs-section-name">{SECTIONS[activeSection]?.label}</span>
            </div>

            <button
              className="fs-btn"
              disabled={activeSection === SECTIONS.length - 1}
              onClick={() => navigateToSection(activeSection + 1)}
            >
              <span>Next</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="5 2 10 7 5 12"/></svg>
            </button>

            <div className="fs-divider" />

            <button className="fs-btn fs-exit" onClick={exitFullscreen}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 1 4 4 1 4" /><polyline points="12 1 12 4 15 4" />
                <polyline points="4 15 4 12 1 12" /><polyline points="12 15 12 12 15 12" />
              </svg>
              <span>Exit</span>
            </button>
          </div>
        </div>
      )}

      {/* ── Sections ── */}
      <div ref={el => assignRef(el, 0)} id="sec-hero"><HeroSection /></div>
      <div ref={el => assignRef(el, 1)} id="sec-solution"><SolutionSection /></div>
      <div ref={el => assignRef(el, 2)} id="sec-technical"><TechnicalSection /></div>
      <div ref={el => assignRef(el, 3)} id="sec-feasibility"><FeasibilitySection /></div>
      <div ref={el => assignRef(el, 4)} id="sec-impact"><ImpactSection /></div>
      <div ref={el => assignRef(el, 5)} id="sec-references"><ReferencesSection /></div>
    </div>
  )
}

export default App
