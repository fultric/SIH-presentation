import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroSection.css'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const wrapRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      /* entrance choreography */
      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
        .from('.hero-title', { opacity: 0, scale: 0.6, y: 40, duration: 1.2, ease: 'power4.out' }, '-=0.4')
        .from('.hero-divider', { scaleX: 0, duration: 0.8 }, '-=0.6')
        .from('.hero-ps-id', { opacity: 0, y: 16, duration: 0.6 }, '-=0.4')
        .from('.hero-ps-name', { opacity: 0, y: 16, duration: 0.8 }, '-=0.3')
        .from('.hero-meta-row', { opacity: 0, y: 14, duration: 0.6 }, '-=0.4')
        .from('.hero-member', { opacity: 0, y: 20, duration: 0.6, stagger: 0.15 }, '-=0.3')
        .from('.hero-scroll-cue', { opacity: 0, duration: 0.8 }, '-=0.2')

      /* parallax fade-out on scroll */
      gsap.to('.hero-content', {
        y: -60,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={wrapRef}>
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-eyebrow">Smart India Hackathon 2026</p>

        <h1 className="hero-title">Haxtrea</h1>

        <div className="hero-divider" aria-hidden="true" />

        <div className="hero-ps">
          <span className="hero-ps-id">SIH26107</span>
          <h2 className="hero-ps-name">
            AI&#8209;powered Intelligent Assistant for Indian&nbsp;Standards
            and BIS Services for Industries and&nbsp;Consumers
          </h2>
        </div>

        <div className="hero-meta-row">
          <span className="hero-badge">Software</span>
          <span className="hero-badge hero-badge--muted">Category · To be confirmed</span>
        </div>

        <div className="hero-team">
          <div className="hero-member">
            <span className="hero-name">Tuhin Majumdar</span>
            <span className="hero-roll">25012000072</span>
          </div>
          <div className="hero-member-sep" aria-hidden="true" />
          <div className="hero-member">
            <span className="hero-name">Aaryava Gupta</span>
            <span className="hero-roll">25012010002</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Scroll to explore</span>
        <div className="hero-arrow">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="1" x2="7" y2="13"/><polyline points="1 7 7 13 13 7"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
