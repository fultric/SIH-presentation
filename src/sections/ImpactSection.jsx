import './ImpactSection.css'

const AUDIENCE = [
  {
    icon: '🏭',
    title: 'Industries & Manufacturers',
    desc: 'Instant access to BIS standards, mandatory testing procedures, and certification guidelines for compliance.',
  },
  {
    icon: '🛒',
    title: 'Consumers & Citizens',
    desc: 'Quick verification of genuine ISI marks, product quality standards, and consumer safety requirements.',
  },
  {
    icon: '🏛️',
    title: 'Government & Regulators',
    desc: 'Rapid retrieval of regulatory clauses for public procurement, market surveillance, and standards auditing.',
  },
  {
    icon: '🚀',
    title: 'Startups & MSMEs',
    desc: 'Affordable, AI-guided compliance navigation without the prohibitive costs of specialized legal consultants.',
  },
]

const BENEFITS = [
  { icon: '🌐', title: 'Democratized Access', desc: 'Plain-language querying eliminates jargon barriers for non-technical users.' },
  { icon: '⚡', title: 'Accelerated Search', desc: 'Reduces manual standards discovery from hours of catalog flipping to seconds.' },
  { icon: '🔒', title: 'Privacy & Offline', desc: '100% on-premise Ollama inference prevents sensitive industry query leaks.' },
  { icon: '🎯', title: 'Zero Hallucination', desc: 'Strict RAG grounding ensures answers are tied directly to cited BIS clauses.' },
  { icon: '💰', title: 'Zero Cloud Cost', desc: 'Open-source local stack removes recurring third-party API subscription costs.' },
  { icon: '📈', title: 'Scalable Corpus', desc: 'Modular document architecture smoothly accommodates new BIS amendments.' },
]

export default function ImpactSection() {
  return (
    <section className="imp-section">
      <div className="imp-container">
        <div className="imp-header">
          <div className="imp-badge-group">
            <span className="imp-eyebrow">Impact &amp; Benefits</span>
          </div>
          <h2 className="imp-heading">
            Measurable Ecosystem Value &amp; Strategic Advantages
          </h2>
        </div>

        {/* Unified 2-Column Layout: Target Audience + Key Benefits */}
        <div className="imp-split-grid">
          {/* Left Column: Target Audience */}
          <div className="imp-col imp-audience-col">
            <div className="imp-col-header">
              <span className="imp-col-tag">👥 Target Audience Impact</span>
              <span className="imp-col-sub">Who Benefits</span>
            </div>
            <div className="imp-cards-stack">
              {AUDIENCE.map((a) => (
                <div className="imp-aud-card" key={a.title}>
                  <span className="imp-icon">{a.icon}</span>
                  <div className="imp-card-content">
                    <h3 className="imp-card-title">{a.title}</h3>
                    <p className="imp-card-desc">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Key Benefits */}
          <div className="imp-col imp-benefits-col">
            <div className="imp-col-header">
              <span className="imp-col-tag">✨ Quantifiable Advantages</span>
              <span className="imp-col-sub">Key Benefits</span>
            </div>
            <div className="imp-benefits-grid">
              {BENEFITS.map((b) => (
                <div className="imp-ben-card" key={b.title}>
                  <div className="ibc-top">
                    <span className="imp-icon">{b.icon}</span>
                    <h3 className="imp-ben-title">{b.title}</h3>
                  </div>
                  <p className="imp-ben-desc">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
