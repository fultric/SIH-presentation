import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './TechnicalSection.css'

gsap.registerPlugin(ScrollTrigger)

const PIPELINE = [
  { num: '01', title: 'User Query', desc: 'User asks a question about Indian Standards or BIS services.' },
  { num: '02', title: 'Query Processing', desc: 'The system understands and processes the natural-language query.' },
  { num: '03', title: 'Knowledge Base Search', desc: 'Searches the trusted BIS and Indian Standards knowledge base.' },
  { num: '04', title: 'Document Retrieval', desc: 'Relevant documents and passages are retrieved from the corpus.' },
  { num: '05', title: 'Context to Ollama', desc: 'Retrieved information is provided to the locally-running Ollama model.' },
  { num: '06', title: 'Response Generation', desc: 'Ollama generates an answer grounded in the retrieved information.' },
  { num: '07', title: 'Source-backed Answer', desc: 'The answer is displayed with supporting source references.' },
]

export default function TechnicalSection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const [camState, setCamState] = useState('idle')
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray('.pipe-step')
      const dots = gsap.utils.toArray('.pipe-dot')
      const fillEl = document.querySelector('.pipeline-fill')

      /* ═══ Pinned RAG timeline ═══ */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=4500',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      })

      /* Scene 1 — intro + phone fly-in */
      tl.from('.tech-intro-block', { opacity: 0, y: 30, duration: 4 })
        .from('.phone-wrap', { opacity: 0, x: 200, scale: 0.75, rotation: -8, duration: 7, ease: 'power3.out' }, '<1')
        .from('.tech-sim-label', { opacity: 0, y: 10, duration: 3 }, '<3')

      /* Scene 2 — question appears on phone */
      tl.to('.scr-ask', { opacity: 1, duration: 2 })
        .from('.chat-user', { opacity: 0, y: 10, duration: 3 }, '<0.5')

      /* Step 1 */
      tl.to(steps[0], { opacity: 1, x: 0, duration: 3 }, '<')
        .to(dots[0], { background: '#2997ff', borderColor: '#2997ff', duration: 1 }, '<1')
        .to(fillEl, { height: '14.28%', duration: 3, ease: 'none' }, '<')

      /* Scene 3 — phone transitions to search, steps 2-4 */
      tl.to('.scr-ask', { opacity: 0, duration: 1.5 })
        .to('.scr-search', { opacity: 1, duration: 1.5 }, '<0.8')

      for (let i = 1; i <= 3; i++) {
        tl.to(steps[i], { opacity: 1, x: 0, duration: 3 })
          .to(dots[i], { background: '#2997ff', borderColor: '#2997ff', duration: 1 }, '<1')
          .to(fillEl, { height: `${((i + 1) / 7) * 100}%`, duration: 3, ease: 'none' }, '<')
      }

      tl.from('.search-line', { opacity: 0, y: 6, stagger: 1.5, duration: 2 }, '<-4')

      /* Scene 4 — steps 5-6 */
      for (let i = 4; i <= 5; i++) {
        tl.to(steps[i], { opacity: 1, x: 0, duration: 3 })
          .to(dots[i], { background: '#2997ff', borderColor: '#2997ff', duration: 1 }, '<1')
          .to(fillEl, { height: `${((i + 1) / 7) * 100}%`, duration: 3, ease: 'none' }, '<')
      }

      /* Scene 5 — phone shows answer, step 7 */
      tl.to('.scr-search', { opacity: 0, duration: 1.5 })
        .to('.scr-answer', { opacity: 1, duration: 1.5 }, '<0.8')
        .to(steps[6], { opacity: 1, x: 0, duration: 3 }, '<')
        .to(dots[6], { background: '#2997ff', borderColor: '#2997ff', duration: 1 }, '<1')
        .to(fillEl, { height: '100%', duration: 3, ease: 'none' }, '<')
        .from('.answer-src', { opacity: 0, y: 8, stagger: 1.5, duration: 2 })

      /* Scene 6 — hold + subtle phone zoom */
      tl.to('.phone-wrap', { scale: 1.03, y: -8, duration: 8 })
        .to({}, { duration: 6 })

      /* ═══ Camera concept entrance (not pinned) ═══ */
      gsap.from('.tech-cam-info', {
        opacity: 0, y: 40, duration: 0.9,
        scrollTrigger: { trigger: '.tech-cam-section', start: 'top 75%' },
      })
      gsap.from('.tech-cam-phone', {
        opacity: 0, x: 80, scale: 0.92, duration: 1,
        scrollTrigger: { trigger: '.tech-cam-section', start: 'top 70%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* camera */
  const tryCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCamState('unsupported'); return
    }
    setCamState('requesting')
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = s
      if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play().catch(() => {}) }
      setCamState('active')
      setTimeout(() => { s.getTracks().forEach(t => t.stop()); setCamState('analyzed') }, 4000)
    } catch {
      setCamState('denied')
      setTimeout(() => setCamState('fallback'), 1500)
    }
  }

  useEffect(() => () => { streamRef.current?.getTracks().forEach(t => t.stop()) }, [])

  /* ═══ JSX ═══ */
  return (
    <section className="tech" ref={sectionRef}>

      {/* ──── Part 1: Pinned RAG + Phone ──── */}
      <div className="tech-pinned" ref={pinRef}>
        <div className="tech-layout">

          {/* Left */}
          <div className="tech-left">
            <div className="tech-intro-block">
              <span className="tech-badge-proposed">Proposed RAG Architecture</span>
              <h2 className="tech-main-heading">How the system works</h2>
              <p className="tech-main-sub">
                A step-by-step look at the retrieval-augmented generation
                pipeline that powers the BIS Intelligent Assistant.
              </p>
            </div>

            <div className="pipeline">
              <div className="pipeline-track"><div className="pipeline-fill" /></div>
              <div className="pipeline-steps">
                {PIPELINE.map(s => (
                  <div className="pipe-step" key={s.num}>
                    <div className="pipe-dot" />
                    <div className="pipe-body">
                      <span className="pipe-num">{s.num}</span>
                      <h4 className="pipe-title">{s.title}</h4>
                      <p className="pipe-desc">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — phone */}
          <div className="tech-right">
            <div className="phone-wrap">
              <div className="phone-frame">
                <div className="phone-notch"><div className="phone-cam-dot" /></div>
                <div className="phone-screen">
                  <div className="ph-bar"><span>9:41</span><span className="ph-icons">●&thinsp;●&thinsp;●</span></div>

                  {/* Screen: Ask */}
                  <div className="scr scr-ask">
                    <div className="scr-hdr">BIS Assistant</div>
                    <div className="scr-body-ask">
                      <div className="chat-user">Which BIS standard applies to packaged drinking water?</div>
                    </div>
                    <div className="scr-input">Ask about any standard…</div>
                  </div>

                  {/* Screen: Search */}
                  <div className="scr scr-search">
                    <div className="scr-hdr">BIS Assistant</div>
                    <div className="scr-body-search">
                      <div className="search-line"><span className="s-dot" />Searching knowledge base…</div>
                      <div className="search-line"><span className="s-dot" />Retrieving relevant documents…</div>
                      <div className="search-line"><span className="s-dot" />Reviewing source passages…</div>
                      <div className="search-line"><span className="s-dot" />Preparing answer…</div>
                    </div>
                  </div>

                  {/* Screen: Answer */}
                  <div className="scr scr-answer">
                    <div className="scr-hdr">BIS Assistant</div>
                    <div className="scr-body-answer">
                      <div className="chat-ai">
                        Based on applicable BIS standards, packaged drinking water
                        must comply with requirements covering microbiological,
                        chemical, and physical parameters.
                      </div>
                      <div className="answer-srcs">
                        <div className="answer-src">📄 Relevant BIS Document</div>
                        <div className="answer-src">📄 Applicable Standard Reference</div>
                      </div>
                      <p className="answer-note">Verify against official BIS information.</p>
                    </div>
                  </div>
                </div>
                <div className="phone-home" />
              </div>
            </div>
            <p className="tech-sim-label">⚡ Simulated Demonstration — Not connected to live backend</p>
          </div>
        </div>
      </div>

      {/* ──── Part 2: Camera Concept ──── */}
      <div className="tech-cam-section">
        <div className="tech-cam-layout">
          <div className="tech-cam-info">
            <span className="tech-badge-proposed">Proposed image-based product identification workflow</span>
            <h3 className="tech-cam-heading">Product scanning concept</h3>
            <ol className="tech-cam-steps">
              <li>User opens the camera</li>
              <li>Grants camera permission</li>
              <li>Captures a product image or label</li>
              <li>System analyses visible product information</li>
              <li>Searches relevant BIS knowledge base</li>
              <li>Presents possible relevant standards</li>
              <li>User verifies against official BIS information</li>
            </ol>

            {camState === 'idle' && <button className="cam-btn" onClick={tryCamera}>Try Camera Scan</button>}
            {camState === 'requesting' && <p className="cam-msg">Requesting camera access…</p>}
            {camState === 'active' && <p className="cam-msg cam-msg--ok">Camera active — analysing…</p>}
            {camState === 'analyzed' && (
              <div className="cam-result"><p className="cam-msg cam-msg--ok">✓ Analysis complete (simulated)</p>
              <p className="cam-result-txt">Possible relevant standard identified. Verify against official BIS records.</p></div>
            )}
            {camState === 'denied' && <p className="cam-msg cam-msg--warn">Camera access denied — using simulated demo.</p>}
            {camState === 'fallback' && (
              <div className="cam-result"><p className="cam-msg cam-msg--ok">Simulated result displayed.</p>
              <p className="cam-result-txt">In a live deployment, the system would analyse the captured image and search for relevant BIS standards.</p></div>
            )}
            {camState === 'unsupported' && <p className="cam-msg cam-msg--warn">Camera API unavailable. Use localhost or HTTPS.</p>}
          </div>

          <div className="tech-cam-phone">
            <div className="phone-frame phone-frame--sm">
              <div className="phone-notch"><div className="phone-cam-dot" /></div>
              <div className="phone-screen">
                <div className="ph-bar"><span>9:41</span><span className="ph-icons">●&thinsp;●&thinsp;●</span></div>
                <div className="cam-ui">
                  {camState === 'active' ? (
                    <video ref={videoRef} className="cam-feed" autoPlay playsInline muted />
                  ) : (camState === 'analyzed' || camState === 'fallback') ? (
                    <div className="cam-done">
                      <div className="cam-done-icon">✓</div>
                      <p>Product scanned</p>
                      <div className="cam-done-card"><span>Relevant BIS Standard</span><span className="cam-tbc">To be confirmed</span></div>
                    </div>
                  ) : (
                    <div className="cam-vf">
                      <div className="vf-corners"><span /><span /><span /><span /></div>
                      <p className="vf-label">Point at product label</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="phone-home" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
