import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeasibilitySection.css'

gsap.registerPlugin(ScrollTrigger)

const COLUMNS = [
  {
    accent: 'green',
    icon: '⚡',
    title: 'Feasibility Analysis',
    items: [
      'Ollama runs locally — no cloud infrastructure costs',
      'BIS standards documents are publicly available',
      'RAG frameworks and vector databases are mature, open-source technologies',
      'Can be developed and demonstrated within hackathon timeline',
      'Runs on standard hardware — no specialised GPU required for smaller models',
    ],
  },
  {
    accent: 'amber',
    icon: '⚠️',
    title: 'Potential Challenges',
    items: [
      'Document ingestion — converting diverse BIS formats into a searchable corpus',
      'LLM accuracy — ensuring answers are faithful to source documents',
      'Response latency — local inference speed on consumer hardware',
      'Data freshness — keeping the knowledge base updated with revised standards',
      'Coverage — ensuring comprehensive indexing of relevant BIS standards',
    ],
  },
  {
    accent: 'blue',
    icon: '🛡️',
    title: 'Mitigation Strategies',
    items: [
      'RAG inherently reduces hallucination by grounding answers in retrieved documents',
      'Source citations let users verify every AI-generated answer',
      'Ollama supports multiple model sizes — trade accuracy for speed as needed',
      'Modular document pipeline allows incremental updates',
      'Chunking strategies optimised for the structure of standards documents',
    ],
  },
]

export default function FeasibilitySection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feas-eyebrow', {
        opacity: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: '.feas-header', start: 'top 80%' },
      })
      gsap.from('.feas-heading', {
        opacity: 0, y: 30, duration: 1,
        scrollTrigger: { trigger: '.feas-header', start: 'top 78%' },
      })

      gsap.utils.toArray('.feas-col').forEach((col, i) => {
        gsap.from(col, {
          opacity: 0,
          y: 50,
          duration: 0.85,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: col,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="feas" ref={sectionRef}>
      <div className="feas-inner">
        <div className="feas-header">
          <p className="feas-eyebrow">Feasibility &amp; Viability</p>
          <h2 className="feas-heading">Proposed analysis for implementation</h2>
        </div>

        <div className="feas-grid">
          {COLUMNS.map((col) => (
            <div className={`feas-col feas-col--${col.accent}`} key={col.title}>
              <div className="feas-col-head">
                <span className="feas-col-icon">{col.icon}</span>
                <h3 className="feas-col-title">{col.title}</h3>
              </div>
              <ul className="feas-list">
                {col.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
