import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SolutionSection.css'

gsap.registerPlugin(ScrollTrigger)

const POINTS = [
  {
    tag: 'What it does',
    heading: 'A smarter way to access Indian Standards',
    body: 'A searchable, intelligent knowledge base that lets industries and consumers query Indian Standards and BIS services using natural language — bridging the gap between complex regulatory documents and user-friendly access.',
  },
  {
    tag: 'How it solves the problem',
    heading: 'From manual search to instant retrieval',
    body: 'Finding relevant BIS standards currently requires manual searching through extensive technical catalogs. Our system uses AI to understand user queries and automatically retrieve the most relevant standards documents and sections.',
  },
  {
    tag: 'Innovation & uniqueness',
    heading: 'Private, grounded, accessible',
    body: 'Runs entirely on local infrastructure using Ollama — zero cloud dependency, strict data privacy. RAG architecture ensures every answer is grounded in actual BIS documents, not hallucinated. Designed for industry professionals and everyday consumers alike.',
  },
]

export default function SolutionSection() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* header entrance */
      gsap.from('.sol-eyebrow', {
        opacity: 0, y: 20, duration: 0.8,
        scrollTrigger: { trigger: '.sol-header', start: 'top 80%' },
      })
      gsap.from('.sol-heading', {
        opacity: 0, y: 30, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.sol-header', start: 'top 75%' },
      })
      gsap.from('.sol-tech-pill', {
        opacity: 0, y: 12, duration: 0.6, stagger: 0.1,
        scrollTrigger: { trigger: '.sol-pills', start: 'top 85%' },
      })

      /* cards stagger in */
      gsap.utils.toArray('.sol-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="sol" ref={sectionRef}>
      <div className="sol-inner">
        <div className="sol-header">
          <p className="sol-eyebrow">Proposed Solution</p>
          <h2 className="sol-heading">
            AI&#8209;powered Intelligent Assistant for Indian&nbsp;Standards
          </h2>
          <div className="sol-pills">
            <span className="sol-tech-pill">Ollama</span>
            <span className="sol-tech-pill">RAG Architecture</span>
            <span className="sol-tech-pill">Local Inference</span>
          </div>
        </div>

        <div className="sol-cards">
          {POINTS.map((p, i) => (
            <article className="sol-card" key={i}>
              <span className="sol-card-tag">{p.tag}</span>
              <h3 className="sol-card-title">{p.heading}</h3>
              <p className="sol-card-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
