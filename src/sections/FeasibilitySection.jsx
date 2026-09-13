import './FeasibilitySection.css'

const COLUMNS = [
  {
    accent: 'green',
    icon: '⚡',
    title: 'Feasibility Analysis',
    items: [
      'Ollama runs locally — no recurring cloud API or infrastructure costs',
      'BIS standards documents and portals are publicly accessible resources',
      'RAG frameworks and vector embeddings are mature open-source technologies',
      'Working prototype can be developed and showcased within hackathon timeline',
      'Runs on standard hardware — no specialized datacenter GPU needed for small models',
    ],
  },
  {
    accent: 'amber',
    icon: '⚠️',
    title: 'Potential Challenges',
    items: [
      'Document ingestion — converting diverse, non-uniform BIS document formats',
      'LLM hallucination risk — ensuring generated answers are 100% faithful to source',
      'Inference latency — response speeds on consumer-grade laptop processors',
      'Corpus currency — keeping the knowledge base refreshed as standards update',
      'Coverage — indexing large volumes of specialized engineering standards',
    ],
  },
  {
    accent: 'blue',
    icon: '🛡️',
    title: 'Mitigation Strategies',
    items: [
      'RAG architecture directly eliminates hallucination by grounding answers in citations',
      'Verifiable source references empower judges and users to validate all outputs',
      'Ollama supports multiple quantized model sizes to balance accuracy with speed',
      'Modular document processing pipeline enables scheduled incremental ingestion',
      'Targeted semantic chunking optimized specifically for regulatory clause structures',
    ],
  },
]

export default function FeasibilitySection({ subStep = 0 }) {
  const isRevealed = subStep >= 1

  return (
    <section className="feas-section">
      <div className="feas-container">
        <div className="feas-header">
          <div className="feas-badge-group">
            <span className="feas-eyebrow">Feasibility &amp; Viability</span>
            <span className="feas-substep-pill">
              {subStep === 0 ? 'Stage 1 · Overview' : 'Stage 2 · Detailed Matrix'}
            </span>
          </div>
          <h2 className="feas-heading">Proposed Analysis &amp; Risk Mitigation</h2>
        </div>

        <div className={`feas-grid ${isRevealed ? 'revealed' : 'initial'}`}>
          {COLUMNS.map((col) => (
            <div className={`feas-col feas-col--${col.accent} ${isRevealed ? 'active' : ''}`} key={col.title}>
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
