import { useState } from 'react'
import './TechStackSection.css'

const TECH_CATEGORIES = [
  {
    id: 'languages',
    badge: 'Core Logic',
    title: 'Primary Languages',
    accent: 'blue',
    icon: '⚡',
    desc: 'Computation, query processing, and robust application logic.',
    techs: [
      {
        name: 'TypeScript',
        role: 'Type-safe Application Architecture',
        detail: 'Enforces strict compile-time types across frontend components, preventing runtime crashes and providing enterprise reliability.',
        tag: 'Typed Runtime',
        snippet: 'interface BISRecord { id: string; isCertified: boolean; }',
      },
      {
        name: 'Python',
        role: 'Data & Natural Language Processing',
        detail: 'Powers document parsing, text vectorization pipelines, and backend logic to interface with the local inference assistant.',
        tag: 'NLP & Compute',
        snippet: 'def search_bis_corpus(query: str) -> List[Standard]:',
      },
      {
        name: 'SQL',
        role: 'Relational Standards Indexing',
        detail: 'Structured querying for BIS catalog metadata, classification schemas, and fast attribute-based filtering of standards.',
        tag: 'Data Querying',
        snippet: 'SELECT * FROM standards WHERE category = "Electrical";',
      },
    ],
  },
  {
    id: 'web',
    badge: 'Presentation Layer',
    title: 'Web and Designing',
    accent: 'purple',
    icon: '🎨',
    desc: 'Modern, responsive, and cinematic consumer interface.',
    techs: [
      {
        name: 'HTML',
        role: 'Semantic Document Structure',
        detail: 'Provides accessible, search-engine friendly, and screen-reader compliant structural scaffolding for regulatory text.',
        tag: 'Semantic DOM',
        snippet: '<article class="bis-standard-card">...</article>',
      },
      {
        name: 'CSS3',
        role: 'Modern Layouts & Design Tokens',
        detail: 'Hardware-accelerated CSS custom properties, backdrop blur filters, and fluid typography tuned for desktop and mobile viewports.',
        tag: 'CSS Tokens',
        snippet: ':root { --accent: #2997ff; --bg: #050505; }',
      },
      {
        name: 'JavaScript',
        role: 'Event-driven Interactivity',
        detail: 'Orchestrates dynamic UI interactions, real-time client state updates, and seamless device API integrations.',
        tag: 'ES6+ Engine',
        snippet: 'async function handleQuery() { await streamAnswer(); }',
      },
      {
        name: 'Tailwind CSS',
        role: 'Utility-First Visual Styling',
        detail: 'Enables rapid, consistent UI component styling with strict design system tokenization and zero CSS bloat.',
        tag: 'Utility CSS',
        snippet: 'className="flex items-center gap-4 rounded-xl"',
      },
    ],
  },
  {
    id: 'data',
    badge: 'Interchange & Protocol',
    title: 'Data Serialization and Documentation',
    accent: 'green',
    icon: '📦',
    desc: 'Strict format specifications, API schemas, and documentation.',
    techs: [
      {
        name: 'JSON',
        role: 'Standardized Payload Serialization',
        detail: 'Lightweight hierarchical format for structuring standards schemas, search responses, and client-server state exchange.',
        tag: 'Data Schema',
        snippet: '{ "code": "IS 302-2-15", "status": "Active" }',
      },
      {
        name: 'Markdown',
        role: 'Technical Documentation & Literature',
        detail: 'Standardized formatting for developer guides, system walkthroughs, hackathon deliverables, and documentation logs.',
        tag: 'Doc Format',
        snippet: '## Architecture Specification\n* RAG Pipeline',
      },
    ],
  },
]

export default function TechStackSection({ isActive }) {
  const [selectedTech, setSelectedTech] = useState(null)

  return (
    <section className="techstack-section">
      <div className="techstack-container">
        {/* Section Header */}
        <div className="techstack-header">
          <div className="techstack-badge-row">
            <span className="techstack-badge">System Architecture</span>
            <span className="techstack-subbadge">04 · Technology Stack</span>
          </div>
          <h2 className="techstack-title">Engineering Stack &amp; Technologies</h2>
          <p className="techstack-sub">
            The foundational programming languages, interface design technologies, and data serialization protocols powering the BIS Intelligent Assistant.
          </p>
        </div>

        {/* 3 Technology Category Columns */}
        <div className={`techstack-grid ${isActive ? 'animate-in' : ''}`}>
          {TECH_CATEGORIES.map((cat, catIdx) => (
            <div
              key={cat.id}
              className={`tech-category-pod pod--${cat.accent}`}
              style={{ animationDelay: `${catIdx * 0.12}s` }}
            >
              {/* Category Header */}
              <div className="pod-header">
                <div className="pod-header-left">
                  <span className="pod-icon">{cat.icon}</span>
                  <div>
                    <span className="pod-badge">{cat.badge}</span>
                    <h3 className="pod-title">{cat.title}</h3>
                  </div>
                </div>
                <span className="pod-count">{cat.techs.length} Techs</span>
              </div>

              <p className="pod-desc">{cat.desc}</p>

              {/* Technologies List inside this Category */}
              <div className="pod-tech-list">
                {cat.techs.map((t) => {
                  const isHovered = selectedTech?.name === t.name
                  return (
                    <div
                      key={t.name}
                      className={`tech-item-card ${isHovered ? 'hovered' : ''}`}
                      onMouseEnter={() => setSelectedTech(t)}
                      onMouseLeave={() => setSelectedTech(null)}
                    >
                      <div className="tic-main-row">
                        <div className="tic-name-group">
                          <span className="tic-dot" />
                          <h4 className="tic-name">{t.name}</h4>
                        </div>
                        <span className="tic-tag">{t.tag}</span>
                      </div>

                      <div className="tic-role">{t.role}</div>
                      <p className="tic-detail">{t.detail}</p>

                      {/* Micro Code / Format Snippet preview */}
                      <div className="tic-snippet-box">
                        <code>{t.snippet}</code>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Telemetry Footer Strip */}
        <div className="techstack-telemetry-bar">
          <div className="telemetry-left">
            <span className="telemetry-status-dot" />
            <span className="telemetry-label">Integrated Engineering Foundation</span>
            <span className="telemetry-sep">•</span>
            <span className="telemetry-sub">Zero Cloud Compute Lock-in • Standardized Open Protocols</span>
          </div>
          <div className="telemetry-right">
            <span className="telemetry-tag">Clean Architecture</span>
            <span className="telemetry-tag">Local Execution</span>
            <span className="telemetry-tag">Standardized Formats</span>
          </div>
        </div>
      </div>
    </section>
  )
}
