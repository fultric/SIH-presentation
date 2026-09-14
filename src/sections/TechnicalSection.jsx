import { useState, useEffect } from 'react'
import './TechnicalSection.css'

export default function TechnicalSection({ isActive }) {
  const [scanStage, setScanStage] = useState(0)

  // Automatic progression of the simulated scanning sequence when the section becomes active
  useEffect(() => {
    if (!isActive) {
      setScanStage(0)
      return
    }

    // Sequence: 0: Scanning product -> 1: Matching BIS info -> 2: Relevant BIS found
    const t1 = setTimeout(() => setScanStage(1), 1200)
    const t2 = setTimeout(() => setScanStage(2), 2600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isActive])

  return (
    <section className="tech-section">
      <div className="tech-container">
        {/* Section Header */}
        <div className="tech-header-block">
          <div className="tech-badge-row">
            <span className="tech-badge-proposed">Proposed RAG Architecture</span>
            <span className="tech-badge-sim">⚡ Simulated Demonstration</span>
          </div>
          <h2 className="tech-main-title">How the system works</h2>
          <p className="tech-main-sub">
            From physical product capture to trusted Indian Standards: a unified, grounded retrieval workflow.
          </p>
        </div>

        {/* Main Content Grid: Left = Cinematic Scanning Visual; Right = 3 RAG Workflow Steps */}
        <div className="tech-grid">
          {/* ──── LEFT: Cinematic Scanning Visual (Person + Phone + Electric Kettle) ──── */}
          <div className="tech-scan-scene-card">
            <div className="scan-scene-header">
              <span className="scan-scene-title">Product Identification &amp; Retrieval Concept</span>
              <span className="scan-scene-status">
                {scanStage === 0 && '● Camera Active'}
                {scanStage === 1 && '● Processing Image…'}
                {scanStage === 2 && '✓ Standards Matched'}
              </span>
            </div>

            {/* Visual Canvas containing Person's Hand, Smartphone, and Target Electric Kettle */}
            <div className="scan-canvas">
              {/* Target Product: Electric Kettle with Target Reticle & Scan Beam */}
              <div className="product-target-zone">
                <div className="kettle-illustration-wrap">
                  {/* High-fidelity Vector Kettle */}
                  <svg className="kettle-svg" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Kettle Base */}
                    <ellipse cx="100" cy="215" rx="55" ry="12" fill="#1e2430" stroke="#334155" strokeWidth="2" />
                    <rect x="50" y="210" width="100" height="8" rx="3" fill="#0f172a" />
                    {/* Kettle Body */}
                    <path d="M60 210 L75 80 L125 80 L140 210 Z" fill="url(#kettleBodyGrad)" stroke="#475569" strokeWidth="2" />
                    {/* Spout */}
                    <path d="M75 90 L45 70 L48 85 L72 110 Z" fill="#334155" stroke="#475569" strokeWidth="1.5" />
                    {/* Lid & Knob */}
                    <ellipse cx="100" cy="80" rx="26" ry="7" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                    <ellipse cx="100" cy="72" rx="9" ry="4" fill="#0f172a" />
                    {/* Ergonomic Handle */}
                    <path d="M125 90 C165 100 165 185 135 195 L130 185 C152 175 152 110 125 102 Z" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                    {/* Water Level Gauge */}
                    <rect x="94" y="110" width="12" height="60" rx="3" fill="#090d16" stroke="#2997ff" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="97" y1="125" x2="103" y2="125" stroke="#2997ff" strokeWidth="1" strokeOpacity="0.6" />
                    <line x1="97" y1="140" x2="103" y2="140" stroke="#2997ff" strokeWidth="1" strokeOpacity="0.6" />
                    <line x1="97" y1="155" x2="103" y2="155" stroke="#2997ff" strokeWidth="1" strokeOpacity="0.6" />
                    {/* BIS / ISI Certification Mark Outline on Kettle Body */}
                    <g transform="translate(85, 175)">
                      <rect x="0" y="0" width="30" height="18" rx="2" fill="#0a0f1d" stroke="#2997ff" strokeWidth="1.2" />
                      <text x="15" y="12" fill="#2997ff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">ISI</text>
                    </g>
                    {/* Gradients */}
                    <defs>
                      <linearGradient id="kettleBodyGrad" x1="60" y1="80" x2="140" y2="210" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="45%" stopColor="#334155" />
                        <stop offset="70%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Target Product Label Badge */}
                <div className="product-label-tag">
                  <span className="plt-name">Household Electric Kettle</span>
                  <span className="plt-spec">Safety &amp; Performance Standard</span>
                </div>

                {/* Scanning Laser Beam (Sweeps over the kettle) */}
                <div className="scan-beam-laser" />

                {/* AR Targeting Corner Brackets */}
                <div className="ar-bracket ar-tl" />
                <div className="ar-bracket ar-tr" />
                <div className="ar-bracket ar-bl" />
                <div className="ar-bracket ar-br" />
              </div>

              {/* Foreground Smartphone held by user aimed at kettle */}
              <div className="scan-phone-overlay">
                <div className="mini-phone-device">
                  {/* Phone Notch */}
                  <div className="mini-phone-notch">
                    <div className="mini-phone-cam" />
                  </div>

                  {/* Phone Screen UI */}
                  <div className="mini-phone-screen">
                    <div className="mini-status-bar">
                      <span>9:41</span>
                      <span>5G 100%</span>
                    </div>

                    {/* Camera Viewfinder Header */}
                    <div className="mini-app-bar">
                      <span className="mini-app-title">BIS Lens</span>
                      <span className="mini-live-tag">● AI Search</span>
                    </div>

                    {/* Viewfinder Reticle */}
                    <div className="mini-viewfinder-box">
                      <div className="mvf-frame">
                        <div className="mvf-crosshair" />
                        {/* Live Status Message inside Phone UI */}
                        <div className={`mini-scan-status-pill stage-${scanStage}`}>
                          {scanStage === 0 && (
                            <>
                              <span className="status-spinner" />
                              <span>Scanning product…</span>
                            </>
                          )}
                          {scanStage === 1 && (
                            <>
                              <span className="status-pulse-dot" />
                              <span>Matching BIS information…</span>
                            </>
                          )}
                          {scanStage === 2 && (
                            <>
                              <span className="status-check-icon">✓</span>
                              <span>Relevant BIS information found</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Result Card popping up on phone when stage === 2 */}
                    <div className={`mini-phone-result ${scanStage === 2 ? 'visible' : ''}`}>
                      <div className="mpr-header">
                        <span className="mpr-badge">Applicable Standard</span>
                        <span className="mpr-conf">High Confidence</span>
                      </div>
                      <div className="mpr-code">IS 302-2-15</div>
                      <div className="mpr-title">Safety of Electric Kettles &amp; Appliances</div>
                      <div className="mpr-footer">
                        <span>BIS Certified Category</span>
                        <span>• Clauses Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Person's Holding Hand Silhouette/Grip Indicator */}
                <div className="hand-grip-silhouette" aria-hidden="true" />
              </div>
            </div>

            <div className="scan-scene-footnote">
              Proposed multimodal product recognition concept · Grounded in official BIS specifications
            </div>
          </div>

          {/* ──── RIGHT: 3 Connected RAG Workflow Steps ──── */}
          <div className="tech-rag-flow-card">
            <div className="rag-flow-header">
              <span className="rf-tag">Step-by-Step Retrieval Pipeline</span>
              <span className="rf-subtag">Local Ollama LLM + Trusted BIS Corpus</span>
            </div>

            <div className="rag-steps-container">
              {/* Step 1: User Input */}
              <div className="rag-step-item">
                <div className="rsi-badge-col">
                  <span className="rsi-num">01</span>
                  <div className="rsi-line" />
                </div>
                <div className="rsi-body">
                  <div className="rsi-title-row">
                    <span className="rsi-icon">📸</span>
                    <h3 className="rsi-title">1. User Input</h3>
                  </div>
                  <p className="rsi-summary">The consumer scans a product or asks a natural language question.</p>
                  <p className="rsi-detail">
                    The assistant captures physical label markings, ISI hallmarks, or conversational inquiries and prepares them for semantic query processing.
                  </p>
                </div>
              </div>

              {/* Step 2: BIS Retrieval */}
              <div className="rag-step-item">
                <div className="rsi-badge-col">
                  <span className="rsi-num">02</span>
                  <div className="rsi-line" />
                </div>
                <div className="rsi-body">
                  <div className="rsi-title-row">
                    <span className="rsi-icon">🔍</span>
                    <h3 className="rsi-title">2. BIS Retrieval</h3>
                  </div>
                  <p className="rsi-summary">The system retrieves relevant BIS documents and standards.</p>
                  <p className="rsi-detail">
                    Performs semantic vector search across official Indian Standards catalogs, specifications, and regulatory clauses to fetch source context without internet transmission.
                  </p>
                </div>
              </div>

              {/* Step 3: Grounded Answer */}
              <div className="rag-step-item">
                <div className="rsi-badge-col">
                  <span className="rsi-num">03</span>
                </div>
                <div className="rsi-body">
                  <div className="rsi-title-row">
                    <span className="rsi-icon">🧠</span>
                    <h3 className="rsi-title">3. Grounded Answer</h3>
                  </div>
                  <p className="rsi-summary">The AI generates an answer based on retrieved information and provides references.</p>
                  <p className="rsi-detail">
                    The locally running Ollama LLM synthesizes an accurate response grounded strictly in retrieved passages, citing verifiable standards (e.g., IS 302-2-15) with zero hallucination.
                  </p>
                </div>
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="rag-tech-pills">
              <span className="rt-pill">Local Ollama LLM</span>
              <span className="rt-pill">RAG Architecture</span>
              <span className="rt-pill">Private &amp; Offline-Ready</span>
              <span className="rt-pill">Verifiable Source Citations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
