import { useEffect, useRef } from 'react'
import SwitchButton from '../../shared/SwitchButton.jsx'

/* ─── NOTE ─────────────────────────────────────────────────────────
   Light-mode editorial scroll experience.
   Mirrors client-editorial.html prototype.
   Uses IntersectionObserver for scroll reveals.
──────────────────────────────────────────────────────────────────── */

export default function ClientPersona({ onSwitch }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    /* — NAV SCROLL EFFECT — */
    const nav = root.querySelector('#cl-nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    /* — SCROLL REVEAL — */
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    root.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    /* — COPY — */
    window._clientCopy = (text, el) => {
      navigator.clipboard.writeText(text).then(() => {
        const lbl = el.querySelector('.cr-action')
        if (!lbl) return
        const orig = lbl.textContent
        lbl.textContent = 'COPIED ✓'; lbl.classList.add('cf')
        setTimeout(() => { lbl.textContent = orig; lbl.classList.remove('cf') }, 1800)
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
      delete window._clientCopy
    }
  }, [])

  return (
    <>
      <style>{CLIENT_CSS}</style>
      <div ref={rootRef} className="cl-root">

        {/* NAV */}
        <nav id="cl-nav">
          <div className="cl-wrap" style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
            <div className="cl-brand">Jillian Grace</div>
            <ul className="cl-nav-links">
              <li><a href="#cl-services">Services</a></li>
              <li><a href="#cl-work">Work</a></li>
              <li><a href="#cl-about">Background</a></li>
              <li><a href="#cl-process">Process</a></li>
            </ul>
            <a className="cl-nav-cta" href="#cl-contact">Let's Talk →</a>
          </div>
        </nav>

        {/* HERO */}
        <section id="cl-hero">
          <div className="cl-wrap">
            <div className="cl-hero-inner reveal">
              <div className="cl-badge"><span className="cl-bdot"></span>AVAILABLE FOR NEW PROJECTS</div>
              <h1 className="cl-h1">
                Build with someone who<br/>
                understands <em>both sides</em><br/>
                of a product.
              </h1>
              <p className="cl-hero-p">
                Full-stack engineer. Former business manager. I've run a real operation, grown a client base from scratch, and deployed software that people actually use. I don't just write code — I understand what it needs to <strong>do for your business.</strong>
              </p>
              <div className="cl-cta-row">
                <a className="cl-btn-p" href="#cl-work">See My Work</a>
                <a className="cl-btn-s" href="#cl-contact">Start a Project</a>
              </div>
              <div className="cl-metrics">
                <div className="cl-metric">
                  <span className="cl-mval">3</span>
                  <span className="cl-mlbl">SYSTEMS DEPLOYED TO PRODUCTION</span>
                </div>
                <div className="cl-metric">
                  <span className="cl-mval">1→17</span>
                  <span className="cl-mlbl">CLIENTS GROWN WITH ZERO ADS</span>
                </div>
                <div className="cl-metric">
                  <span className="cl-mval">2.5</span>
                  <span className="cl-mlbl">YEARS RUNNING A REAL BUSINESS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="cl-divider"/>

        {/* SERVICES */}
        <section id="cl-services" style={{ padding:'7rem 0' }}>
          <div className="cl-wrap">
            <div className="cl-svc-head reveal">
              <div>
                <span className="cl-lbl">SERVICES</span>
                <h2 className="cl-h2">What I can build for you</h2>
              </div>
              <p className="cl-p">Not a list of technologies. A list of problems I solve. If your project needs it, I build it — and I deliver it.</p>
            </div>
            <div className="cl-svc-grid reveal">
              {[
                { num:'01', title:'Web Applications', body:"Full-stack web apps built to last. Clean architecture, intuitive UI, and backend systems that scale. From customer-facing products to internal tools.", tags:['REACT','DJANGO','PYTHON','FULL-STACK'] },
                { num:'02', title:'Business Systems', body:"Custom management tools, tracking systems, and operational software tailored to your workflow. I've seen how businesses actually run — so I build for reality, not theory.", tags:['DATABASES','DASHBOARDS','AUTOMATION'] },
                { num:'03', title:'Hardware & IoT', body:"Software-hardware integration for embedded systems, IoT devices, and smart applications. I've bridged biometric sensors to web systems and built robot firmware that won championships.", tags:['IoT','EMBEDDED','C/C++','UNITY'] },
              ].map(s => (
                <div className="cl-svc-card" key={s.num}>
                  <div className="cl-sc-num">{s.num}</div>
                  <div className="cl-sc-title">{s.title}</div>
                  <p className="cl-sc-body">{s.body}</p>
                  <div className="cl-sc-tags">{s.tags.map(t => <span key={t} className="cl-sc-tag">{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id="cl-work" style={{ padding:'7rem 0',background:'#f0ede6' }}>
          <div className="cl-wrap">
            <span className="cl-lbl reveal">WORK</span>
            <h2 className="cl-h2 reveal">Real projects. Real impact.</h2>
            <p className="cl-p reveal" style={{ marginBottom:'3.5rem',maxWidth:'480px' }}>Not mockups. Not school assignments. Deployed software used by real people.</p>
            <div className="cl-cases reveal">
              {[
                { cat:'FULL-STACK + IoT', badge:'DEPLOYED', badgeCls:'cl-dep', title:'HyPTech — Biometric Management System', body:<>A university needed a complete management system with biometric hardware integration. I was the <strong>sole architect</strong> of the entire frontend and backend — from React UI to Django APIs to physical sensor communication — leading a team through Agile delivery to a fully deployed system.</>, stack:['REACT','DJANGO','PYTHON','IoT HARDWARE','AGILE'], stat:'100%', statLbl:'SOLE ARCHITECT FRONT + BACK' },
                { cat:'GOVERNMENT DEPLOYMENT', badge:'LIVE IN BARANGAY', badgeCls:'cl-dep', title:'Senior Citizen Age Tracking System', body:<>Local government needed a system to track and manage senior citizen records. I led a 3-member team, designed the <strong>entire UI/UX from scratch</strong>, and built the application. Deployed to a real barangay — <strong>actual government use, actual users.</strong></>, stack:['VISUAL BASIC','UI/UX DESIGN','TEAM LEAD'], stat:"Gov't", statLbl:'DEPLOYED TO REAL BARANGAY USE' },
                { cat:'GAME DEVELOPMENT', badge:'PRODUCTION RELEASE', badgeCls:'cl-ship', title:'XDefender — Unity Game at Rak Son Tech OPC', body:<>A game studio needed gameplay systems built for a production title on a real commercial timeline. I delivered <strong>50% of all gameplay features</strong> — mechanics, power-ups, inventory system — plus optimized performance and stability through systematic testing.</>, stack:['UNITY','C#','GAME SYSTEMS','QA'], stat:'50%', statLbl:'OF ALL GAMEPLAY FEATURES BUILT' },
              ].map((c,i) => (
                <div className="cl-case" key={i}>
                  <div>
                    <div className="cl-case-top">
                      <span className="cl-cat">{c.cat}</span>
                      <span className={`cl-badge ${c.badgeCls}`}>{c.badge}</span>
                    </div>
                    <h3 className="cl-case-title">{c.title}</h3>
                    <p className="cl-case-body">{c.body}</p>
                    <div className="cl-stack">{c.stack.map(t => <span key={t} className="cl-stag">{t}</span>)}</div>
                  </div>
                  <div className="cl-case-stat">
                    <span className="cl-sval">{c.stat}</span>
                    <span className="cl-slbl">{c.statLbl}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="cl-about" style={{ padding:'7rem 0' }}>
          <div className="cl-wrap">
            <div className="cl-about-grid">
              <div className="reveal">
                <span className="cl-lbl">BACKGROUND</span>
                <h2 className="cl-h2">I've been on <em>both sides</em> of a product.</h2>
                <p className="cl-p">Before I was an engineer, I was a <strong>business manager</strong>. At 19, I ran Grace Cup in Hinunangan, Southern Leyte — managing staff, vendors, customers, and operations every day for two and a half years. I know what happens when software fails a business. I've been that business.</p>
                <blockquote className="cl-quote">"I don't ask what tech stack to use. I ask what problem you're actually trying to solve."</blockquote>
                <p className="cl-p">I also grew a client base from <strong>1 to 17 students in 2.5 months</strong> — purely through referrals and results, no advertising. That taught me: people hire people they trust.</p>
                <p className="cl-p">The engineering part? <strong>Magna Cum Laude</strong>, BS Computer Engineering, SLSU 2025. National robotics champion. Three deployed systems.</p>
                <a className="cl-btn-p" href="#cl-contact" style={{ marginTop:'2rem',display:'inline-block' }}>Work with me</a>
              </div>
              <div className="reveal">
                <span className="cl-lbl">CREDENTIALS</span>
                <div className="cl-cred-grid">
                  {[['Magna','GRADUATED CUM LAUDE · SLSU'],['Champion','ROBOTHON 2024 · NATIONAL'],['Vietnam','FIRST ENG. STUDENT EXCHANGE'],['2× Natl','NATIONAL QUALIFIER ROBOTICS'],['4+','TEAMS LED ACROSS 3 YEARS'],['3','SYSTEMS DEPLOYED LIVE']].map(([v,l]) => (
                    <div className="cl-cred" key={v}>
                      <span className="cl-cval">{v}</span>
                      <span className="cl-clbl">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="cl-stack-box">
                  <span className="cl-lbl" style={{ marginBottom:'.7rem' }}>TECH STACK</span>
                  <p className="cl-p" style={{ fontSize:'.88rem',lineHeight:1.9 }}>React · Django · Python · C/C++ · Unity · JavaScript · PHP · Java · HTML/CSS · Tailwind · Bootstrap · IoT · Embedded Systems · AutoCAD 3D</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="cl-process" style={{ padding:'7rem 0',background:'#0f172a',color:'#e2e8f0' }}>
          <div className="cl-wrap">
            <span className="cl-lbl reveal" style={{ color:'rgba(255,255,255,.35)' }}>HOW WE WORK</span>
            <h2 className="cl-proc-h2 reveal">Simple. Clear. Delivered.</h2>
            <p className="reveal" style={{ fontFamily:"'DM Sans',sans-serif",fontSize:'1rem',color:'rgba(255,255,255,.45)',fontWeight:300,marginBottom:'4rem',maxWidth:'420px' }}>Four steps. No disappearing mid-project. No surprise scope changes.</p>
            <div className="cl-steps reveal">
              {[
                { n:'01', t:'Discovery Call', b:<>We talk through your idea, your timeline, and your budget. I ask questions about your <span className="cl-sg">business</span>, not just the features.</> },
                { n:'02', t:'Clear Proposal', b:<>You get a written scope, timeline, and price. Everything is explicit before I write a single line of code. <span className="cl-sg">No surprises.</span></> },
                { n:'03', t:'Build with Visibility', b:<>Weekly progress updates. You see the work before it's finished. Feedback loops are <span className="cl-sg">built into the process.</span></> },
                { n:'04', t:'Deliver & Stay', b:<>Tested, deployed, and documented. I don't hand over code and vanish. <span className="cl-sg">I'm available</span> if you need me.</> },
              ].map(s => (
                <div className="cl-step" key={s.n}>
                  <span className="cl-step-n">{s.n}</span>
                  <div className="cl-step-t">{s.t}</div>
                  <p className="cl-step-b">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="cl-contact" style={{ padding:'8rem 0' }}>
          <div className="cl-wrap">
            <div className="cl-contact-inner reveal">
              <span className="cl-lbl">CONTACT</span>
              <h2 className="cl-contact-h2">Let's talk about<br/>your <em>project.</em></h2>
              <p className="cl-p" style={{ marginBottom:'2.5rem',maxWidth:'480px' }}>No commitment needed. Tell me what you're building and I'll tell you if I can help — and be honest if I can't.</p>
              <div className="cl-contact-rows">
                <a className="cl-cr" href="mailto:jillianburila@gmail.com">
                  <div className="cl-cr-l"><span className="cl-crtype">EMAIL</span><span className="cl-crval">jillianburila@gmail.com</span></div>
                  <span className="cl-craction">SEND →</span>
                </a>
                <div className="cl-cr" onClick={e => window._clientCopy('jillianburila@gmail.com', e.currentTarget)} style={{ cursor:'pointer' }}>
                  <div className="cl-cr-l"><span className="cl-crtype">COPY</span><span className="cl-crval">jillianburila@gmail.com</span></div>
                  <span className="cl-craction">COPY ADDRESS</span>
                </div>
                <a className="cl-cr" href="https://github.com/jlliangrasya" target="_blank" rel="noreferrer">
                  <div className="cl-cr-l"><span className="cl-crtype">GITHUB</span><span className="cl-crval">github.com/jlliangrasya</span></div>
                  <span className="cl-craction">VIEW →</span>
                </a>
                <div className="cl-cr" onClick={e => window._clientCopy('09385056299', e.currentTarget)} style={{ cursor:'pointer' }}>
                  <div className="cl-cr-l"><span className="cl-crtype">PHONE</span><span className="cl-crval">09385056299</span></div>
                  <span className="cl-craction">COPY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cl-footer">
          <div className="cl-wrap">
            <div className="cl-foot-inner">
              <span className="cl-brand">Jillian Grace D. Burila</span>
              <span style={{ fontFamily:"'JetBrains Mono',monospace",fontSize:'.65rem',letterSpacing:'.1em',color:'#94a3b8' }}>BS COMP ENG · MAGNA CUM LAUDE · SLSU 2025</span>
            </div>
          </div>
        </footer>

      </div>
      <SwitchButton onSwitch={onSwitch} />
    </>
  )
}

const CLIENT_CSS = `
.cl-root{background:#f7f5f0;color:#0f172a;font-family:'DM Sans',system-ui,sans-serif;overflow-x:hidden;min-height:100vh}
.cl-wrap{max-width:1080px;margin:0 auto;padding:0 2.5rem}
@media(max-width:640px){.cl-wrap{padding:0 1.25rem}}
.reveal{opacity:0;transform:translateY(22px);transition:opacity .65s ease,transform .65s ease}
.reveal.visible{opacity:1;transform:none}
.cl-lbl{font-family:'JetBrains Mono',monospace;font-size:.7rem;letter-spacing:.22em;color:#b45309;margin-bottom:1rem;display:block}
.cl-divider{border:none;border-top:1px solid #e2e8f0;margin:0}
#cl-nav{position:fixed;top:0;left:0;right:0;z-index:50;background:rgba(247,245,240,0);transition:background .3s,box-shadow .3s}
#cl-nav.scrolled{background:rgba(247,245,240,.95);backdrop-filter:blur(16px);border-bottom:1px solid #e2e8f0}
#cl-nav .cl-wrap{padding-top:1.1rem;padding-bottom:1.1rem}
.cl-brand{font-family:'Fraunces',Georgia,serif;font-size:1.05rem;font-weight:600;color:#0f172a;letter-spacing:-.01em}
.cl-nav-links{display:flex;gap:2.2rem;list-style:none}
.cl-nav-links a{font-family:'DM Sans',sans-serif;font-size:.85rem;font-weight:500;color:#475569;text-decoration:none;letter-spacing:.02em;transition:color .2s;position:relative}
.cl-nav-links a::after{content:'';position:absolute;bottom:-2px;left:0;width:0;height:1px;background:#b45309;transition:width .25s}
.cl-nav-links a:hover{color:#0f172a}.cl-nav-links a:hover::after{width:100%}
.cl-nav-cta{font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.04em;padding:.55rem 1.4rem;background:#0f172a;color:#fff;border-radius:2px;text-decoration:none;transition:all .2s}
.cl-nav-cta:hover{background:#1e293b;transform:translateY(-1px)}
@media(max-width:640px){.cl-nav-links{display:none}}
#cl-hero{min-height:100vh;display:flex;align-items:center;padding:9rem 0 6rem;position:relative;overflow:hidden}
#cl-hero::before{content:'';position:absolute;top:-10%;right:-8%;width:55vw;height:55vw;max-width:680px;border-radius:50%;border:1px solid rgba(180,83,9,.08);pointer-events:none}
#cl-hero::after{content:'';position:absolute;top:5%;right:2%;width:38vw;height:38vw;max-width:480px;border-radius:50%;border:1px solid rgba(180,83,9,.05);pointer-events:none}
.cl-hero-inner{max-width:820px}
.cl-badge{display:inline-flex;align-items:center;gap:.55rem;font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.16em;color:#b45309;padding:.4rem 1rem;border-radius:20px;background:rgba(180,83,9,.07);border:1px solid rgba(180,83,9,.2);margin-bottom:2rem}
.cl-bdot{width:6px;height:6px;border-radius:50%;background:#b45309;animation:clpulse 2s ease-in-out infinite;flex-shrink:0}
@keyframes clpulse{0%,100%{opacity:1}50%{opacity:.25}}
.cl-h1{font-family:'Fraunces',Georgia,serif;font-size:clamp(2.8rem,6vw,5rem);font-weight:600;line-height:1.04;letter-spacing:-.025em;color:#0f172a;margin-bottom:1.6rem}
.cl-h1 em{font-style:italic;color:#b45309;font-weight:300}
.cl-hero-p{font-family:'DM Sans',sans-serif;font-size:1.1rem;color:#475569;line-height:1.8;max-width:560px;margin-bottom:2.5rem;font-weight:300}
.cl-hero-p strong{color:#0f172a;font-weight:600}
.cl-cta-row{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:3.5rem}
.cl-btn-p{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;letter-spacing:.03em;padding:.85rem 2rem;background:#0f172a;color:#fff;border-radius:2px;text-decoration:none;transition:all .2s;border:1.5px solid #0f172a;display:inline-block}
.cl-btn-p:hover{background:transparent;color:#0f172a;transform:translateY(-2px)}
.cl-btn-s{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;letter-spacing:.03em;padding:.85rem 2rem;background:transparent;color:#0f172a;border-radius:2px;text-decoration:none;transition:all .2s;border:1.5px solid #e2e8f0;display:inline-block}
.cl-btn-s:hover{border-color:#0f172a;transform:translateY(-2px)}
.cl-metrics{display:flex;gap:0;border-top:1px solid #e2e8f0}
.cl-metric{padding:1.6rem 2.5rem 1.2rem 0;border-right:1px solid #e2e8f0;margin-right:2.5rem}
.cl-metric:last-child{border-right:none}
.cl-mval{font-family:'Fraunces',Georgia,serif;font-size:2.4rem;font-weight:600;color:#0f172a;line-height:1;letter-spacing:-.03em;display:block}
.cl-mlbl{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.16em;color:#94a3b8;margin-top:.35rem;display:block}
.cl-h2{font-family:'Fraunces',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:600;letter-spacing:-.02em;line-height:1.1}
.cl-h2 em{font-style:italic;font-weight:300;color:#b45309}
.cl-p{font-family:'DM Sans',sans-serif;font-size:.95rem;color:#475569;line-height:1.85;font-weight:300}
.cl-p strong{color:#0f172a;font-weight:600}
.cl-svc-head{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:end;margin-bottom:4rem}
@media(max-width:640px){.cl-svc-head{grid-template-columns:1fr}}
.cl-svc-head .cl-h2{margin-bottom:0}
.cl-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:#e2e8f0;border:1px solid #e2e8f0}
@media(max-width:640px){.cl-svc-grid{grid-template-columns:1fr}}
.cl-svc-card{background:#fff;padding:2.2rem;transition:background .2s}
.cl-svc-card:hover{background:#f0ede6}
.cl-sc-num{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.16em;color:#94a3b8;margin-bottom:1.2rem}
.cl-sc-title{font-family:'Fraunces',Georgia,serif;font-size:1.45rem;font-weight:600;color:#0f172a;letter-spacing:-.02em;margin-bottom:.75rem}
.cl-sc-body{font-family:'DM Sans',sans-serif;font-size:.9rem;color:#475569;line-height:1.75;font-weight:300}
.cl-sc-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.2rem}
.cl-sc-tag{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;padding:.25rem .65rem;background:#f0ede6;color:#94a3b8;border-radius:1px}
.cl-cases{display:flex;flex-direction:column;gap:1.5px;background:#e2e8f0;border:1px solid #e2e8f0}
.cl-case{background:#fff;padding:2.4rem;display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:start;transition:background .2s}
.cl-case:hover{background:#fffdf8}
@media(max-width:640px){.cl-case{grid-template-columns:1fr}}
.cl-case-top{display:flex;align-items:center;gap:.75rem;margin-bottom:1rem}
.cl-cat{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.14em;color:#b45309;padding:.2rem .7rem;background:rgba(180,83,9,.07);border:1px solid rgba(180,83,9,.2);border-radius:1px}
.cl-badge{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;padding:.2rem .7rem;border-radius:1px}
.cl-dep{background:rgba(5,150,105,.07);border:1px solid rgba(5,150,105,.2);color:#047857}
.cl-ship{background:rgba(37,99,235,.07);border:1px solid rgba(37,99,235,.2);color:#1d4ed8}
.cl-case-title{font-family:'Fraunces',Georgia,serif;font-size:1.5rem;font-weight:600;letter-spacing:-.02em;color:#0f172a;margin-bottom:.65rem}
.cl-case-body{font-family:'DM Sans',sans-serif;font-size:.92rem;color:#475569;line-height:1.75;font-weight:300;max-width:520px;margin-bottom:1rem}
.cl-case-body strong{color:#0f172a;font-weight:600}
.cl-stack{display:flex;flex-wrap:wrap;gap:.4rem}
.cl-stag{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.1em;padding:.2rem .65rem;background:#f0ede6;color:#94a3b8;border-radius:1px}
.cl-case-stat{text-align:right;flex-shrink:0}
@media(max-width:640px){.cl-case-stat{text-align:left}}
.cl-sval{font-family:'Fraunces',Georgia,serif;font-size:2.8rem;font-weight:700;line-height:1;letter-spacing:-.04em;color:#0f172a;display:block}
.cl-slbl{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.14em;color:#94a3b8;display:block;margin-top:.25rem;max-width:90px}
.cl-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start}
@media(max-width:768px){.cl-about-grid{grid-template-columns:1fr;gap:3rem}}
.cl-about-grid .cl-h2{margin-bottom:1.4rem}
.cl-quote{border-left:2px solid #b45309;padding-left:1.25rem;font-family:'Fraunces',Georgia,serif;font-size:1.1rem;font-style:italic;color:#1e293b;line-height:1.65;margin:1.5rem 0;font-weight:300}
.cl-cred-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5px;background:#e2e8f0;border:1px solid #e2e8f0;margin-bottom:1.5rem}
.cl-cred{background:#fff;padding:1.4rem;transition:background .2s}
.cl-cred:hover{background:#f0ede6}
.cl-cval{font-family:'Fraunces',Georgia,serif;font-size:1.5rem;font-weight:600;color:#0f172a;letter-spacing:-.02em;display:block;margin-bottom:.2rem}
.cl-clbl{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.14em;color:#94a3b8}
.cl-stack-box{padding:1.4rem;background:#f0ede6;border:1px solid #e2e8f0}
.cl-proc-h2{font-family:'Fraunces',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:600;letter-spacing:-.02em;color:#e2e8f0;margin-bottom:.5rem}
.cl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:rgba(255,255,255,.06)}
@media(max-width:768px){.cl-steps{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.cl-steps{grid-template-columns:1fr}}
.cl-step{background:#0f172a;padding:2rem 1.6rem;transition:background .2s}
.cl-step:hover{background:#111827}
.cl-step-n{font-family:'Fraunces',Georgia,serif;font-size:3.5rem;font-weight:700;letter-spacing:-.04em;color:rgba(255,255,255,.08);line-height:1;margin-bottom:1.2rem;display:block}
.cl-step-t{font-family:'Fraunces',Georgia,serif;font-size:1.15rem;font-weight:600;color:#e2e8f0;letter-spacing:-.01em;margin-bottom:.65rem}
.cl-step-b{font-family:'DM Sans',sans-serif;font-size:.85rem;color:rgba(255,255,255,.45);line-height:1.75;font-weight:300}
.cl-sg{color:#f59e0b;font-weight:600;font-style:normal}
.cl-contact-inner{max-width:680px}
.cl-contact-h2{font-family:'Fraunces',Georgia,serif;font-size:clamp(2.5rem,5vw,4.2rem);font-weight:600;letter-spacing:-.03em;line-height:1.05;margin-bottom:1.2rem}
.cl-contact-h2 em{font-style:italic;font-weight:300;color:#b45309}
.cl-contact-rows{display:flex;flex-direction:column;gap:1.5px;background:#e2e8f0;border:1px solid #e2e8f0;max-width:480px}
.cl-cr{background:#fff;padding:1.2rem 1.5rem;display:flex;align-items:center;justify-content:space-between;transition:background .15s;text-decoration:none}
.cl-cr:hover{background:#f0ede6}
.cl-cr-l{display:flex;align-items:center;gap:.8rem}
.cl-crtype{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.14em;color:#94a3b8;width:52px;flex-shrink:0}
.cl-crval{font-family:'DM Sans',sans-serif;font-size:.92rem;font-weight:500;color:#0f172a}
.cl-craction{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;color:#94a3b8;transition:color .2s}
.cl-cr:hover .cl-craction{color:#b45309}
.cf{color:#047857 !important}
.cl-footer{border-top:1px solid #e2e8f0;padding:2rem 0}
.cl-foot-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
@media(max-width:768px){
  .cl-metrics{flex-direction:column;gap:0}
  .cl-metric{border-right:none;margin-right:0;padding:1rem 0;border-bottom:1px solid #e2e8f0}
  .cl-metric:last-child{border-bottom:none}
  .cl-cta-row{flex-direction:column;align-items:flex-start}
  .cl-btn-p,.cl-btn-s{width:100%;text-align:center}
}
@media(max-width:480px){
  #cl-hero{padding:7rem 0 4rem;min-height:auto}
  .cl-h1{font-size:clamp(2rem,7vw,2.8rem)}
  .cl-hero-p{font-size:.95rem}
  .cl-mval{font-size:2rem}
  .cl-contact-h2{font-size:clamp(2rem,6vw,3rem)}
  .cl-about-grid{gap:2rem}
  .cl-cred-grid{grid-template-columns:1fr}
  .cl-steps{grid-template-columns:1fr !important}
  .cl-case-title{font-size:1.2rem}
  .cl-case-body{font-size:.85rem}
  .cl-sval{font-size:2.2rem}
  .cl-nav-cta{padding:.45rem 1rem;font-size:.75rem}
  .cl-foot-inner{flex-direction:column;text-align:center}
}
`
