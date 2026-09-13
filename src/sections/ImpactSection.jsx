import './ImpactSection.css'

const AUDIENCE = [
  {
    icon: '🏭',
    title: 'Industries & Manufacturers',
    desc: 'Manufacturing, construction, food processing, and electronics sectors requiring BIS compliance can instantly locate standards, testing protocols, and certification requirements.',
  },
  {
    icon: '🛒',
    title: 'Everyday Consumers',
    desc: 'Citizens can verify product certifications, look up mandatory ISI marks, and understand safety standards before purchasing packaged goods or appliances.',
  },
  {
    icon: '🏛️',
    title: 'Government & Regulators',
    desc: 'Streamlined access to standards clauses for regulatory enforcement, public procurement specifications, and policy auditing.',
  },
  {
    icon: '🚀',
    title: 'Startups & MSMEs',
    desc: 'Small businesses without dedicated legal or compliance teams gain accessible, AI-guided navigation through complex Indian Standards catalogs.',
  },
]

const BENEFITS = [
  { icon: '🌐', title: 'Accessibility', desc: 'Democratizes access to Indian Standards with plain-language conversational querying.' },
  { icon: '⚡', title: 'Efficiency', desc: 'Accelerates manual standards catalog search from hours of document flipping to instant answers.' },
  { icon: '🔒', title: 'Privacy & Offline', desc: 'Runs locally with Ollama — proprietary company queries and confidential designs stay on-premises.' },
  { icon: '🎯', title: 'Reliability', desc: 'RAG eliminates hallucinations by restricting answers strictly to verified BIS passages.' },
  { icon: '💰', title: 'Cost-Effective', desc: '100% open-source foundation removes recurring cloud LLM API costs for developers and institutions.' },
  { icon: '📈', title: 'Scalable Corpus', desc: 'Document ingestion pipeline scales smoothly as newer BIS amendments and notifications release.' },
]

export default function ImpactSection({ subStep = 0 }) {
  const showBenefits = subStep >= 1

  return (
    <section className="imp-section">
      <div className="imp-container">
        <div className="imp-header">
          <div className="imp-badge-group">
            <span className="imp-eyebrow">Impact &amp; Benefits</span>
            <span className="imp-substep-pill">
              {!showBenefits ? 'Stage 1 · Target Audience' : 'Stage 2 · Key Benefits'}
            </span>
          </div>
          <h2 className="imp-heading">
            {!showBenefits
              ? 'Empowering Industries, Consumers & Regulatory Ecosystem'
              : 'Measurable Value & Strategic Advantages'}
          </h2>
        </div>

        {/* Tab-like Segmented Switch for Stage 1 & 2 */}
        <div className="imp-stage-switcher">
          <button className={`imp-tab ${!showBenefits ? 'active' : ''}`}>
            👥 1. Target Audience Impact
          </button>
          <button className={`imp-tab ${showBenefits ? 'active' : ''}`}>
            ✨ 2. Quantifiable Benefits
          </button>
        </div>

        {!showBenefits ? (
          /* Stage 1: Target Audience Grid (4 items, 4-column) */
          <div className="imp-aud-grid">
            {AUDIENCE.map((a) => (
              <div className="imp-aud-item" key={a.title}>
                <span className="imp-card-icon">{a.icon}</span>
                <h3 className="imp-aud-title">{a.title}</h3>
                <p className="imp-aud-desc">{a.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Stage 2: Key Benefits Grid (6 items, 3x2 grid) */
          <div className="imp-ben-grid">
            {BENEFITS.map((b) => (
              <div className="imp-ben-card" key={b.title}>
                <span className="imp-card-icon">{b.icon}</span>
                <h3 className="imp-ben-title">{b.title}</h3>
                <p className="imp-ben-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
