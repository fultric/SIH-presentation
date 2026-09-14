import './ThankYouSection.css'

export default function ThankYouSection({ onReturnToTop }) {
  return (
    <section className="thankyou-section">
      {/* Background Ambient Glow & Floating Particle Layer */}
      <div className="ty-ambient-glow" aria-hidden="true" />
      <div className="ty-particles-container" aria-hidden="true">
        <span className="ty-particle p1" />
        <span className="ty-particle p2" />
        <span className="ty-particle p3" />
        <span className="ty-particle p4" />
        <span className="ty-particle p5" />
      </div>

      <div className="thankyou-container">
        {/* End of Presentation Status Pill */}
        <div className="ty-badge-row">
          <span className="ty-badge-dot" />
          <span className="ty-badge-text">Smart India Hackathon 2026 • SIH26107</span>
          <span className="ty-badge-pill">End of Presentation</span>
        </div>

        {/* Central BIS Holographic Core / Assistant Visual */}
        <div className="ty-core-visual" aria-hidden="true">
          <div className="ty-core-ring ring-outer" />
          <div className="ty-core-ring ring-mid" />
          <div className="ty-core-ring ring-inner" />
          <div className="ty-core-orb">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2997ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
        </div>

        {/* Large Elegant Thank You Headline */}
        <h1 className="ty-heading">Thank You</h1>

        {/* Supporting Prompt */}
        <p className="ty-question-lead">
          Questions, ideas, or collaboration?
        </p>

        {/* Team & Project Signature Card */}
        <div className="ty-signature-card">
          <div className="ty-team-title">Team Haxtrea</div>

          <div className="ty-members-row">
            <div className="ty-member-item">
              <span className="ty-member-name">Tuhin Majumdar</span>
              <span className="ty-member-roll">25012000072</span>
            </div>
            <div className="ty-member-divider" />
            <div className="ty-member-item">
              <span className="ty-member-name">Aaryava Gupta</span>
              <span className="ty-member-roll">25012010002</span>
            </div>
          </div>

          <div className="ty-project-name">
            AI-powered Intelligent Assistant for Indian Standards and BIS Services
          </div>
        </div>

        {/* Action Controls */}
        <div className="ty-actions">
          {onReturnToTop && (
            <button className="ty-restart-btn" onClick={onReturnToTop}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 11 7 3" />
                <polyline points="3 7 7 3 11 7" />
              </svg>
              <span>Return to Beginning</span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
