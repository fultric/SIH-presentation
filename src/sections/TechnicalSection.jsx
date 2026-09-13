import { useState, useEffect, useRef } from 'react'
import './TechnicalSection.css'

const RAG_STEPS = [
  {
    num: '01',
    icon: '👤',
    title: 'User Query & Input Processing',
    summary: 'User asks a question or scans a product label',
    detail: 'The system understands and processes the natural-language query or captured product information, preparing it for semantic lookup.',
  },
  {
    num: '02',
    icon: '🔍',
    title: 'Trusted BIS Knowledge Retrieval',
    summary: 'Searches official BIS and Indian Standards corpus',
    detail: 'The system performs semantic search across trusted Indian Standards documents, retrieving exact clauses, specifications, and requirements.',
  },
  {
    num: '03',
    icon: '🧠',
    title: 'Grounded Generation & Source Citations',
    summary: 'Ollama generates an answer with verifiable references',
    detail: 'The retrieved information is passed to a locally-running Ollama model, generating an answer grounded strictly in source standards with citations.',
  },
]

export default function TechnicalSection({ subStep = 0 }) {
  const [camState, setCamState] = useState('idle')
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Camera permissions & cleanup
  const tryCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamState('unsupported')
      return
    }
    setCamState('requesting')
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = s
      if (videoRef.current) {
        videoRef.current.srcObject = s
        videoRef.current.play().catch(() => {})
      }
      setCamState('active')
      setTimeout(() => {
        s.getTracks().forEach((t) => t.stop())
        setCamState('analyzed')
      }, 3500)
    } catch {
      setCamState('denied')
      setTimeout(() => setCamState('fallback'), 1200)
    }
  }

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  // subStep:
  // 0: Initial RAG overview (all 3 steps visible, step 1 active)
  // 1: Complete RAG flow active (all steps illuminated, answer + sources revealed on phone)
  // 2: Camera product scanning concept view

  const showCameraView = subStep >= 2
  const isCompleteFlow = subStep >= 1

  return (
    <section className="tech-section">
      <div className="tech-container">
        {!showCameraView ? (
          /* ──── VIEW A: 3-Step RAG Architecture (Viewport-fitted) ──── */
          <div className="tech-rag-view">
            {/* Left Column: Intro + 3 Workflow Steps */}
            <div className="tech-rag-left">
              <div className="tech-badge-group">
                <span className="tech-badge-proposed">Proposed RAG Architecture</span>
                <span className="tech-substep-pill">
                  {subStep === 0 ? 'Stage 1 · Overview' : 'Stage 2 · Execution Flow'}
                </span>
              </div>

              <h2 className="tech-title">How the system works</h2>
              <p className="tech-desc">
                An intelligent retrieval-augmented generation workflow that connects user questions directly to verified Indian Standards.
              </p>

              {/* 3 Workflow Steps — Visible together on one screen */}
              <div className="rag-steps-list">
                {RAG_STEPS.map((step, idx) => {
                  const isActive = isCompleteFlow || idx === 0
                  const isHighlighted = isCompleteFlow && idx === 2
                  return (
                    <div
                      key={step.num}
                      className={`rag-step-card ${isActive ? 'active' : ''} ${
                        isHighlighted ? 'highlighted' : ''
                      }`}
                    >
                      <div className="rag-step-num-col">
                        <span className="rag-step-num">{step.num}</span>
                        {idx < 2 && <div className={`rag-step-line ${isActive ? 'active' : ''}`} />}
                      </div>
                      <div className="rag-step-content">
                        <div className="rag-step-header">
                          <span className="rag-step-icon">{step.icon}</span>
                          <h3 className="rag-step-name">{step.title}</h3>
                        </div>
                        <p className="rag-step-summary">{step.summary}</p>
                        <p className="rag-step-detail">{step.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Tech Stack Footer Pills */}
              <div className="tech-tags-row">
                <span className="tech-tag">Ollama Local LLM</span>
                <span className="tech-tag">RAG Architecture</span>
                <span className="tech-tag">BIS Document Corpus</span>
                <span className="tech-tag">Semantic Search</span>
              </div>
            </div>

            {/* Right Column: Smartphone Mockup showing synchronized live flow */}
            <div className="tech-rag-right">
              <div className="phone-mockup">
                <div className="phone-notch">
                  <div className="phone-speaker" />
                  <div className="phone-camera-lens" />
                </div>

                <div className="phone-screen-inner">
                  {/* Status Bar */}
                  <div className="phone-status-bar">
                    <span>9:41</span>
                    <span className="phone-status-icons">●●● 5G 100%</span>
                  </div>

                  {/* Header */}
                  <div className="phone-app-header">
                    <span className="phone-app-title">BIS Intelligent Assistant</span>
                    <span className="phone-app-status">● Ready</span>
                  </div>

                  {/* Chat Content */}
                  <div className="phone-chat-scroll">
                    {/* Message 1: User Query */}
                    <div className="phone-bubble phone-bubble-user">
                      Which BIS standard applies to packaged drinking water?
                    </div>

                    {/* Retrieval State Indicator */}
                    <div className="phone-retrieval-status">
                      <div className="retrieval-pulse" />
                      <span>
                        {isCompleteFlow
                          ? '✓ 2 Relevant BIS standards retrieved'
                          : 'Searching trusted BIS knowledge base…'}
                      </span>
                    </div>

                    {/* Message 2: Grounded AI Response */}
                    <div className={`phone-bubble phone-bubble-ai ${isCompleteFlow ? 'visible' : ''}`}>
                      <p>
                        Packaged drinking water in India is governed by <strong>IS 14543:2016</strong>, which specifies rigorous physical, chemical, and microbiological parameters.
                      </p>

                      {/* Document Citation Cards */}
                      <div className="phone-citations-group">
                        <div className="phone-citation-card">
                          <span className="cite-badge">Primary Standard</span>
                          <span className="cite-code">IS 14543:2016</span>
                          <span className="cite-desc">Packaged Drinking Water (Other than Natural Mineral Water)</span>
                        </div>
                        <div className="phone-citation-card">
                          <span className="cite-badge">Cross-Reference</span>
                          <span className="cite-code">IS 10500:2012</span>
                          <span className="cite-desc">Drinking Water — Specification</span>
                        </div>
                      </div>

                      <span className="phone-ai-footnote">
                        * Grounded in official BIS specifications. Verify against official portal.
                      </span>
                    </div>
                  </div>

                  {/* Simulated Input Bar */}
                  <div className="phone-input-bar">
                    <span>Ask about Indian Standards…</span>
                    <div className="phone-send-btn">↑</div>
                  </div>

                  <div className="phone-home-indicator" />
                </div>
              </div>

              <div className="tech-sim-caption">
                <span>⚡ Simulated Demonstration — Not connected to live AI backend</span>
              </div>
            </div>
          </div>
        ) : (
          /* ──── VIEW B: Camera Product Scanning Concept (Viewport-fitted) ──── */
          <div className="tech-camera-view">
            {/* Left Column: 7 Workflow Steps + Interactive Trigger */}
            <div className="tech-camera-left">
              <div className="tech-badge-group">
                <span className="tech-badge-proposed">Proposed image-based product identification workflow</span>
                <span className="tech-substep-pill">Stage 3 · Multimodal Scan</span>
              </div>

              <h2 className="tech-title">Product Image Scanning Concept</h2>
              <p className="tech-desc">
                Proposed mobile workflow enabling consumers and industry inspectors to scan physical products, labels, or ISI marks for automated standards verification.
              </p>

              <ol className="cam-workflow-steps">
                <li><span className="cw-step-num">1</span>User opens camera in the assistant</li>
                <li><span className="cw-step-num">2</span>User grants camera permission</li>
                <li><span className="cw-step-num">3</span>User captures product label or certification mark</li>
                <li><span className="cw-step-num">4</span>System analyzes visible text and product markings</li>
                <li><span className="cw-step-num">5</span>Assistant searches the relevant BIS knowledge base</li>
                <li><span className="cw-step-num">6</span>Presents possible matching standards and services</li>
                <li><span className="cw-step-num">7</span>User is prompted to verify against official BIS data</li>
              </ol>

              {/* Interactive Camera Trigger */}
              <div className="cam-interactive-box">
                {camState === 'idle' && (
                  <button className="cam-action-btn" onClick={tryCamera}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    <span>Try Camera Scan</span>
                  </button>
                )}

                {camState === 'requesting' && (
                  <div className="cam-status-msg requesting">
                    <span className="cam-spin" />
                    <span>Requesting browser camera permission…</span>
                  </div>
                )}

                {camState === 'active' && (
                  <div className="cam-status-msg active">
                    <span className="cam-pulse-dot" />
                    <span>Camera stream active — analyzing product mark…</span>
                  </div>
                )}

                {camState === 'analyzed' && (
                  <div className="cam-result-card success">
                    <div className="cam-result-header">
                      <span className="cam-check">✓</span>
                      <strong>Label Analysis Simulated</strong>
                    </div>
                    <p>Detected Product Type: Packaged Drinking Water</p>
                    <p className="cam-citation">Applicable Standard: <strong>IS 14543:2016</strong></p>
                    <small>Demonstration concept — verify against official BIS records.</small>
                  </div>
                )}

                {camState === 'denied' && (
                  <div className="cam-status-msg warning">
                    <span>Camera permission declined — showing simulated fallback.</span>
                  </div>
                )}

                {camState === 'fallback' && (
                  <div className="cam-result-card fallback">
                    <div className="cam-result-header">
                      <span>ℹ️</span>
                      <strong>Simulated Scan Fallback</strong>
                    </div>
                    <p>Demonstrates how the assistant maps captured product labels to BIS standards catalogs.</p>
                  </div>
                )}

                {camState === 'unsupported' && (
                  <div className="cam-status-msg error">
                    <span>Camera API requires HTTPS or localhost environment.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Phone Mockup with Camera Viewfinder */}
            <div className="tech-camera-right">
              <div className="phone-mockup phone-mockup-cam">
                <div className="phone-notch">
                  <div className="phone-speaker" />
                  <div className="phone-camera-lens" />
                </div>

                <div className="phone-screen-inner phone-screen-cam">
                  <div className="phone-status-bar">
                    <span>9:41</span>
                    <span className="phone-status-icons">●●● 5G 100%</span>
                  </div>

                  <div className="cam-viewfinder-ui">
                    {camState === 'active' ? (
                      <video ref={videoRef} className="cam-live-video" autoPlay playsInline muted />
                    ) : (
                      <div className="cam-static-target">
                        <div className="cam-bracket-tl" />
                        <div className="cam-bracket-tr" />
                        <div className="cam-bracket-bl" />
                        <div className="cam-bracket-br" />
                        <div className="cam-scan-line" />
                        <div className="cam-target-label">
                          <span>ALIGN PRODUCT LABEL OR ISI MARK</span>
                        </div>
                      </div>
                    )}

                    <div className="cam-overlay-controls">
                      <div className="cam-shutter-outer">
                        <div className="cam-shutter-inner" />
                      </div>
                      <span className="cam-hint-text">
                        {camState === 'active' ? 'Hold steady…' : 'Tap "Try Camera Scan" to test'}
                      </span>
                    </div>
                  </div>

                  <div className="phone-home-indicator" />
                </div>
              </div>

              <div className="tech-sim-caption">
                <span>⚡ Proposed workflow demonstration — no live OCR or backend binding</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
