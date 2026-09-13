import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ReferencesSection.css'

gsap.registerPlugin(ScrollTrigger)

const REFS = [
  {
    title: 'Bureau of Indian Standards (BIS)',
    source: 'bis.gov.in',
    desc: 'Primary source for Indian Standards documents and BIS services.',
  },
  {
    title: 'Ollama',
    source: 'ollama.com',
    desc: 'Local LLM inference engine used for the AI assistant.',
  },
  {
    title: 'Retrieval-Augmented Generation (RAG)',
    source: 'Lewis et al., 2020',
    desc: '"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks" — the foundational approach for grounding LLM responses in retrieved documents.',
  },
  {
    title: 'Indian Standards Catalog',
    source: 'BIS Portal',
    desc: 'The document corpus that forms the knowledge base for the assistant.',
  },
]

export default function ReferencesSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ref-eyebrow', {
        opacity: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: '.ref-header', start: 'top 80%' },
      })
      gsap.from('.ref-heading', {
        opacity: 0, y: 30, duration: 1,
        scrollTrigger: { trigger: '.ref-header', start: 'top 78%' },
      })
      gsap.from('.ref-item', {
        opacity: 0, y: 24, stagger: 0.12, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: '.ref-list', start: 'top 82%' },
      })
      gsap.from('.ref-note', {
        opacity: 0, y: 14, duration: 0.6,
        scrollTrigger: { trigger: '.ref-note', start: 'top 90%' },
      })

      /* closing cinematic reveal */
      gsap.from('.ref-thank', {
        opacity: 0, scale: 0.8, y: 30, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.ref-closing', start: 'top 70%' },
      })
      gsap.from('.ref-closing-info', {
        opacity: 0, y: 20, duration: 0.8, delay: 0.3,
        scrollTrigger: { trigger: '.ref-closing', start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1.5, ease: 'power3.inOut' })
  }

  return (
    <section className="ref" ref={sectionRef}>
      <div className="ref-inner">
        {/* References list */}
        <div className="ref-header">
          <p className="ref-eyebrow">Research &amp; References</p>
          <h2 className="ref-heading">Sources and further reading</h2>
        </div>

        <ul className="ref-list">
          {REFS.map((r, i) => (
            <li className="ref-item" key={i}>
              <div className="ref-item-top">
                <h3 className="ref-item-title">{r.title}</h3>
                <span className="ref-item-source">{r.source}</span>
              </div>
              <p className="ref-item-desc">{r.desc}</p>
            </li>
          ))}
        </ul>

        <p className="ref-note">
          * Additional references and detailed research documentation to be updated during the hackathon development phase.
        </p>

        {/* Closing */}
        <div className="ref-closing">
          <h1 className="ref-thank">Thank You</h1>
          <div className="ref-closing-info">
            <p className="ref-team-name">Team Haxtrea</p>
            <p className="ref-ps">SIH26107 — AI-powered Intelligent Assistant</p>
            <p className="ref-event">Smart India Hackathon 2026</p>
            <button className="ref-top-btn" onClick={scrollToTop}>↑ Return to top</button>
          </div>
        </div>
      </div>
    </section>
  )
}
