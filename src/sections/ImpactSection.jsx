import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ImpactSection.css'

gsap.registerPlugin(ScrollTrigger)

const AUDIENCE = [
  { title: 'Industries', desc: 'Manufacturing, construction, food processing, electronics — any sector requiring BIS compliance can quickly find relevant standards.' },
  { title: 'Consumers', desc: 'Everyday users can verify product certifications and understand quality standards applied to products they purchase.' },
  { title: 'Government & Regulatory', desc: 'Streamlined access to standards information for policy enforcement, auditing, and regulatory oversight.' },
  { title: 'Startups & SMEs', desc: 'Small businesses that cannot afford compliance consultants get AI-powered guidance instantly and affordably.' },
]

const BENEFITS = [
  { title: 'Accessibility', desc: 'Democratises access to Indian Standards — no specialised knowledge needed to query the catalog.' },
  { title: 'Efficiency', desc: 'Reduces time spent manually searching through BIS catalogs from hours to seconds.' },
  { title: 'Privacy', desc: 'Runs locally using Ollama — sensitive queries never leave the organisation\'s network.' },
  { title: 'Reliability', desc: 'RAG ensures answers are grounded in actual documents with source citations.' },
  { title: 'Cost-effective', desc: 'Open-source stack eliminates recurring subscription and cloud compute costs.' },
  { title: 'Scalable', desc: 'Knowledge base grows seamlessly as more standards and documents are added.' },
]

export default function ImpactSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.imp-eyebrow', {
        opacity: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: '.imp-header', start: 'top 80%' },
      })
      gsap.from('.imp-heading', {
        opacity: 0, y: 30, duration: 1,
        scrollTrigger: { trigger: '.imp-header', start: 'top 78%' },
      })

      gsap.from('.imp-aud-item', {
        opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.imp-aud-grid', start: 'top 80%' },
      })

      gsap.from('.imp-subtitle-ben', {
        opacity: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: '.imp-subtitle-ben', start: 'top 85%' },
      })

      gsap.from('.imp-ben-card', {
        opacity: 0, y: 30, scale: 0.97, stagger: 0.1, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.imp-ben-grid', start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="imp" ref={sectionRef}>
      <div className="imp-inner">
        <div className="imp-header">
          <p className="imp-eyebrow">Impact &amp; Benefits</p>
          <h2 className="imp-heading">Who benefits and how</h2>
        </div>

        {/* Target audience */}
        <h3 className="imp-subtitle">Target audience</h3>
        <div className="imp-aud-grid">
          {AUDIENCE.map((a) => (
            <div className="imp-aud-item" key={a.title}>
              <h4 className="imp-aud-title">{a.title}</h4>
              <p className="imp-aud-desc">{a.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <h3 className="imp-subtitle imp-subtitle-ben">Key benefits</h3>
        <div className="imp-ben-grid">
          {BENEFITS.map((b) => (
            <div className="imp-ben-card" key={b.title}>
              <h4 className="imp-ben-title">{b.title}</h4>
              <p className="imp-ben-desc">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
