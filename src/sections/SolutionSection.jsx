import './SolutionSection.css'

const POINTS = [
  {
    tag: 'What it does',
    heading: 'A smarter way to access Indian Standards',
    body: 'A searchable, intelligent knowledge base that lets industries and consumers query Indian Standards and BIS services using natural language — bridging the gap between complex regulatory documents and user-friendly access.',
    icon: '💡',
  },
  {
    tag: 'How it solves the problem',
    heading: 'From manual search to instant retrieval',
    body: 'Finding relevant BIS standards currently requires manual searching through extensive technical catalogs. Our system uses AI to understand user queries and automatically retrieve the most relevant standards documents and sections.',
    icon: '⚡',
  },
  {
    tag: 'Innovation & uniqueness',
    heading: 'Private, grounded, accessible',
    body: 'Runs entirely on local infrastructure using Ollama — zero cloud dependency, strict data privacy. RAG architecture ensures every answer is grounded in actual BIS documents, not hallucinated. Designed for industry professionals and everyday consumers alike.',
    icon: '🛡️',
  },
]

export default function SolutionSection({ subStep = 0 }) {
  const isRevealed = subStep >= 1

  return (
    <section className="sol-section">
      <div className="sol-container">
        <div className="sol-header">
          <div className="sol-badge-group">
            <span className="sol-eyebrow">Proposed Solution</span>
            <span className="sol-substep-pill">
              {subStep === 0 ? 'Stage 1 · Overview' : 'Stage 2 · Detailed Pillars'}
            </span>
          </div>
          <h2 className="sol-heading">
            AI&#8209;powered Intelligent Assistant for Indian&nbsp;Standards
          </h2>
          <div className="sol-pills">
            <span className="sol-tech-pill">Ollama Local LLM</span>
            <span className="sol-tech-pill">RAG Architecture</span>
            <span className="sol-tech-pill">Private &amp; Offline-Ready</span>
          </div>
        </div>

        {/* 3 Solution Cards — Side by Side on Desktop */}
        <div className={`sol-cards-grid ${isRevealed ? 'revealed' : 'initial'}`}>
          {POINTS.map((p, i) => (
            <article className={`sol-card sol-card-${i} ${isRevealed ? 'active' : ''}`} key={i}>
              <div className="sol-card-top">
                <span className="sol-card-icon">{p.icon}</span>
                <span className="sol-card-tag">{p.tag}</span>
              </div>
              <h3 className="sol-card-title">{p.heading}</h3>
              <p className="sol-card-body">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
