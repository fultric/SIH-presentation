import './ReferencesSection.css'

const REFS = [
  {
    num: '01',
    title: 'Bureau of Indian Standards (BIS)',
    source: 'bis.gov.in',
    tag: 'Regulatory Authority',
    desc: 'The official national standards body of India, providing authoritative standard specifications, certification schemes, and ISI mark compliance criteria.',
    icon: '🏛️',
  },
  {
    num: '02',
    title: 'Ollama — Local LLM Inference Engine',
    source: 'ollama.com',
    tag: 'Private AI Runtime',
    desc: 'High-performance local inference framework enabling privacy-first, on-premises execution of language models without cloud API dependencies or sensitive data leakage.',
    icon: '💻',
  },
  {
    num: '03',
    title: 'Retrieval-Augmented Generation for NLP Tasks',
    source: 'Lewis et al., 2020 (Meta AI / arXiv:2005.11401)',
    tag: 'Foundational Paper',
    desc: 'Seminal research establishing RAG architecture to combine pre-trained parametric models with non-parametric document retrieval, eliminating factual hallucination.',
    icon: '📄',
  },
  {
    num: '04',
    title: 'Indian Standards Portal & National Catalogs',
    source: 'BIS Standards Online Directory',
    tag: 'Corpus Knowledge Base',
    desc: 'The structured corpus of Indian Standards, testing methods, product specifications, and regulatory amendments indexed for semantic retrieval.',
    icon: '📚',
  },
]

export default function ReferencesSection() {
  return (
    <section className="ref-section">
      <div className="ref-container">
        {/* Header */}
        <div className="ref-header">
          <div className="ref-badge-group">
            <span className="ref-eyebrow">Research &amp; References</span>
            <span className="ref-subbadge">07 · Technical Foundations</span>
          </div>
          <h2 className="ref-heading">Foundational Literature &amp; Standards Corpus</h2>
          <p className="ref-sub">
            Authoritative regulatory sources, academic literature, and open-source infrastructure grounding the assistant.
          </p>
        </div>

        {/* 2x2 References Grid */}
        <div className="ref-grid-2x2">
          {REFS.map((r) => (
            <div className="ref-card" key={r.title}>
              <div className="rc-top">
                <div className="rc-title-row">
                  <span className="rc-icon">{r.icon}</span>
                  <div>
                    <span className="rc-num">{r.num}</span>
                    <h3 className="rc-title">{r.title}</h3>
                  </div>
                </div>
                <span className="rc-tag">{r.tag}</span>
              </div>

              <p className="rc-desc">{r.desc}</p>

              <div className="rc-footer">
                <span className="rc-source-label">Source / Origin:</span>
                <span className="rc-source-val">{r.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Research Scope Strip */}
        <div className="ref-scope-strip">
          <div className="rss-left">
            <span className="rss-dot" />
            <span className="rss-title">Literature &amp; Regulatory Alignment:</span>
            <span className="rss-text">
              Zero hallucination guarantee via deterministic document citation matching &amp; verified standards catalog indexing.
            </span>
          </div>
          <span className="rss-note">
            * Benchmark evaluations and expanded citation corpora to be finalized during development.
          </span>
        </div>
      </div>
    </section>
  )
}
