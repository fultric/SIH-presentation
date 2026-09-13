import './ReferencesSection.css'

const REFS = [
  {
    title: 'Bureau of Indian Standards (BIS)',
    source: 'bis.gov.in',
    desc: 'Primary regulatory authority and official repository for Indian Standards documents, product certification schemes, and ISI requirements.',
    icon: '🏛️',
  },
  {
    title: 'Ollama — Local LLM Inference Engine',
    source: 'ollama.com',
    desc: 'High-performance local inference runtime enabling secure, offline execution of open-source models without third-party cloud data transmission.',
    icon: '💻',
  },
  {
    title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP',
    source: 'Lewis et al., 2020',
    desc: 'Foundational research establishing retrieval-augmented generation to ground language model generations in validated document collections.',
    icon: '📄',
  },
  {
    title: 'Indian Standards Portal & Catalogs',
    source: 'BIS Standards Online',
    desc: 'The authoritative document corpus and classification indices utilized for vector embedding and semantic retrieval matching.',
    icon: '📚',
  },
]

export default function ReferencesSection({ subStep = 0, onReturnToTop }) {
  const showClosing = subStep >= 1

  return (
    <section className="ref-section">
      <div className="ref-container">
        {!showClosing ? (
          /* Stage 1: Sources & Academic References */
          <div className="ref-sources-view">
            <div className="ref-header">
              <div className="ref-badge-group">
                <span className="ref-eyebrow">Research &amp; References</span>
                <span className="ref-substep-pill">Stage 1 · Verified Sources</span>
              </div>
              <h2 className="ref-heading">Foundational Literature &amp; Standards Corpus</h2>
            </div>

            <ul className="ref-list">
              {REFS.map((r, i) => (
                <li className="ref-item" key={i}>
                  <div className="ref-item-top">
                    <div className="ref-item-title-row">
                      <span className="ref-item-icon">{r.icon}</span>
                      <h3 className="ref-item-title">{r.title}</h3>
                    </div>
                    <span className="ref-item-source">{r.source}</span>
                  </div>
                  <p className="ref-item-desc">{r.desc}</p>
                </li>
              ))}
            </ul>

            <p className="ref-note">
              * Additional references, benchmark evaluations, and regulatory documentation to be updated during the hackathon development phase.
            </p>
          </div>
        ) : (
          /* Stage 2: Cinematic Thank You Closing */
          <div className="ref-closing-view">
            <div className="ref-closing-badge">
              <span>Smart India Hackathon 2026</span>
            </div>

            <h1 className="ref-thank">Thank You</h1>

            <div className="ref-closing-info">
              <p className="ref-team-name">Team Haxtrea</p>
              <div className="ref-team-members">
                <span>Tuhin Majumdar (25012000072)</span>
                <span className="ref-dot-sep">·</span>
                <span>Aaryava Gupta (25012010002)</span>
              </div>
              <p className="ref-ps">
                Problem Statement SIH26107 — AI-powered Intelligent Assistant for Indian Standards &amp; BIS Services
              </p>
            </div>

            {onReturnToTop && (
              <button className="ref-top-btn" onClick={onReturnToTop}>
                ↑ Return to Beginning
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
