import { useEffect, useRef, useState } from 'react'
import SwitchButton from '../../shared/SwitchButton.jsx'
import JGLogo from '../../shared/JGLogo.jsx'
import profileImg from '../../../assets/jillian enhanced.jpg'

export default function ClientPersona({ onSwitch }) {
  const rootRef = useRef(null)
  const [dark, setDark] = useState(true)
  const [carouselIdx, setCarouselIdx] = useState(0)

  const PROJECTS = [
    {
      cat: 'FULL-STACK + IoT', badge: 'DEPLOYED', badgeType: 'dep',
      title: 'HyPTech — Biometric Management System',
      body: 'A university needed a complete management system with biometric hardware integration. Sole architect of the entire frontend and backend — from React UI to Django APIs to physical sensor communication — leading a team through Agile delivery.',
      stack: ['React', 'Django', 'Python', 'IoT Hardware', 'Agile'],
      stat: '100%', statLbl: 'SOLE ARCHITECT FRONT + BACK',
    },
    {
      cat: 'GOVERNMENT DEPLOYMENT', badge: 'LIVE IN BARANGAY', badgeType: 'dep',
      title: 'Senior Citizen Age Tracking System',
      body: 'Local government needed a system to track and manage senior citizen records. Led a 3-member team, designed the entire UI/UX from scratch, and built the application. Deployed to a real barangay — actual government use, actual users.',
      stack: ['Visual Basic', 'UI/UX Design', 'Team Lead'],
      stat: "Gov't", statLbl: 'DEPLOYED TO REAL BARANGAY USE',
    },
    {
      cat: 'GAME DEVELOPMENT', badge: 'PRODUCTION RELEASE', badgeType: 'ship',
      title: 'XDefender — Unity Game at Rak Son Tech OPC',
      body: 'A game studio needed gameplay systems built for a production title on a real commercial timeline. Delivered 50% of all gameplay features — mechanics, power-ups, inventory system — plus optimized performance through systematic testing.',
      stack: ['Unity', 'C#', 'Game Systems', 'QA'],
      stat: '50%', statLbl: 'OF ALL GAMEPLAY FEATURES BUILT',
    },
  ]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nav = root.querySelector('#cl-nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    root.querySelectorAll('.reveal').forEach(el => obs.observe(el))

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
  }, [dark])

  const prev = () => setCarouselIdx(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setCarouselIdx(i => (i + 1) % PROJECTS.length)
  const p = PROJECTS[carouselIdx]

  return (
    <>
      <style>{CLIENT_CSS(dark)}</style>
      <div ref={rootRef} className={`cl-root ${dark ? 'cl-dark' : 'cl-light'}`}>

        {/* SVG BACKGROUND */}
        <svg className="cl-bg-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={dark ? '#0a0f1e' : '#f0f4ff'} />
              <stop offset="100%" stopColor={dark ? '#060912' : '#e8edf8'} />
            </linearGradient>
            <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.08" />
            </linearGradient>
            <pattern id="gridPat" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke={dark ? 'rgba(14,165,233,0.06)' : 'rgba(30,64,175,0.05)'} strokeWidth="0.8"/>
            </pattern>
          </defs>
          <rect width="1440" height="900" fill="url(#bgGrad)" />
          <rect width="1440" height="900" fill="url(#gridPat)" />
          {/* Circuit-trace decorations */}
          <g opacity="0.4">
            <path d="M0 200 H120 V280 H200" stroke={dark ? 'rgba(14,165,233,0.18)' : 'rgba(30,64,175,0.12)'} strokeWidth="1" fill="none"/>
            <circle cx="120" cy="200" r="3" fill={dark ? 'rgba(14,165,233,0.3)' : 'rgba(30,64,175,0.2)'} />
            <circle cx="200" cy="280" r="3" fill={dark ? 'rgba(14,165,233,0.3)' : 'rgba(30,64,175,0.2)'} />
            <path d="M1440 400 H1320 V320 H1240" stroke={dark ? 'rgba(14,165,233,0.18)' : 'rgba(30,64,175,0.12)'} strokeWidth="1" fill="none"/>
            <circle cx="1320" cy="400" r="3" fill={dark ? 'rgba(14,165,233,0.3)' : 'rgba(30,64,175,0.2)'} />
            <path d="M0 650 H80 V720 H160 V780 H300" stroke={dark ? 'rgba(14,165,233,0.12)' : 'rgba(30,64,175,0.08)'} strokeWidth="1" fill="none"/>
            <path d="M1440 650 H1360 V580" stroke={dark ? 'rgba(14,165,233,0.12)' : 'rgba(30,64,175,0.08)'} strokeWidth="1" fill="none"/>
            <path d="M600 0 V80 H520 V140" stroke={dark ? 'rgba(14,165,233,0.1)' : 'rgba(30,64,175,0.07)'} strokeWidth="1" fill="none"/>
          </g>
          {/* Glow orbs */}
          <ellipse cx="80%" cy="15%" rx="300" ry="200" fill={dark ? 'rgba(14,165,233,0.04)' : 'rgba(30,64,175,0.03)'} />
          <ellipse cx="20%" cy="80%" rx="250" ry="180" fill={dark ? 'rgba(99,102,241,0.04)' : 'rgba(99,102,241,0.03)'} />
        </svg>

        {/* NAV */}
        <nav id="cl-nav">
          <div className="cl-wrap cl-nav-inner">
            <div className="cl-brand">
              <span className="cl-brand-jg">JG</span>
              <span className="cl-brand-sep">/</span>
              <span className="cl-brand-name">Jillian Grace</span>
            </div>
            <ul className="cl-nav-links">
              <li><a href="#cl-services">Services</a></li>
              <li><a href="#cl-work">Work</a></li>
              <li><a href="#cl-about">About</a></li>
              <li><a href="#cl-process">Process</a></li>
            </ul>
            <div className="cl-nav-right">
              <button className="cl-theme-btn" onClick={() => setDark(d => !d)} aria-label="Toggle theme">
                {dark
                  ? <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.8"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  : <svg viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                }
              </button>
              <a className="cl-nav-cta" href="#cl-contact">Let's Talk →</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section id="cl-hero">
          <div className="cl-wrap">
            <div className="cl-hero-grid">
              <div className="cl-hero-left reveal">
                <div className="cl-badge">
                  <span className="cl-bdot"></span>
                  AVAILABLE FOR NEW PROJECTS
                </div>
                <h1 className="cl-h1">
                  Build with someone who<br/>
                  understands <em>both sides</em><br/>
                  of a product.
                </h1>
                <p className="cl-hero-p">
                  Full-stack engineer. Former business manager. I've run a real operation, grown a client base from scratch, and deployed software that people actually use. I don't just write code —
                  I understand what it needs to <strong>do for your business.</strong>
                </p>
                <div className="cl-cta-row">
                  <a className="cl-btn-p" href="#cl-work">See My Work</a>
                  <a className="cl-btn-s" href="#cl-contact">Start a Project</a>
                </div>
                <div className="cl-metrics">
                  <div className="cl-metric">
                    <span className="cl-mval">3</span>
                    <span className="cl-mlbl">SYSTEMS DEPLOYED</span>
                  </div>
                  <div className="cl-metric">
                    <span className="cl-mval">1→17</span>
                    <span className="cl-mlbl">CLIENTS GROWN</span>
                  </div>
                  <div className="cl-metric">
                    <span className="cl-mval">2.5</span>
                    <span className="cl-mlbl">YRS REAL BUSINESS</span>
                  </div>
                </div>
              </div>
              <div className="cl-hero-right reveal">
                <div className="cl-profile-frame">
                  <div className="cl-profile-ring cl-ring-1"></div>
                  <div className="cl-profile-ring cl-ring-2"></div>
                  <div className="cl-profile-ring cl-ring-3"></div>
                  <img src={profileImg} alt="Jillian Grace" className="cl-profile-img" />
                  <div className="cl-profile-badge">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#22d3ee" strokeWidth="1"/><path d="M5 8l2 2 4-4" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Magna Cum Laude
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK LOGOS */}
        <section id="cl-techbar">
          <div className="cl-wrap">
            <div className="cl-tech-label">TECHNOLOGIES</div>
            <div className="cl-tech-scroll">
              {TECH_STACK.map(t => (
                <div className="cl-tech-chip" key={t.name} title={t.name}>
                  <span className="cl-tech-icon" dangerouslySetInnerHTML={{ __html: t.svg }} />
                  <span className="cl-tech-name">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="cl-services">
          <div className="cl-wrap">
            <div className="cl-section-head reveal">
              <div>
                <span className="cl-lbl">SERVICES</span>
                <h2 className="cl-h2">What I can build for you</h2>
              </div>
              <p className="cl-p cl-p-max">Not a list of technologies. A list of problems I solve. If your project needs it, I build it — and I deliver it.</p>
            </div>
            <div className="cl-svc-grid reveal">
              {[
                {
                  num:'01', title:'Web Applications',
                  icon: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M7 8h10M7 11h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/></svg>,
                  body:'Full-stack web apps built to last. Clean architecture, intuitive UI, and backend systems that scale.',
                  tags:['React','Django','Python','Full-Stack']
                },
                {
                  num:'02', title:'Business Systems',
                  icon: <svg viewBox="0 0 24 24" fill="none"><path d="M3 3h18v5H3zM3 11h18v5H3zM3 19h18v2H3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity=".6"/><circle cx="7" cy="5.5" r="1" fill="currentColor"/><circle cx="7" cy="13.5" r="1" fill="currentColor"/></svg>,
                  body:'Custom management tools, tracking systems, and operational software tailored to your workflow.',
                  tags:['Databases','Dashboards','Automation']
                },
                {
                  num:'03', title:'Hardware & IoT',
                  icon: <svg viewBox="0 0 24 24" fill="none"><rect x="5" y="7" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M9 7V5M15 7V5M9 17v2M15 17v2M5 11H3M21 11h-2M5 14H3M21 14h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>,
                  body:'Software-hardware integration for embedded systems, IoT devices, and smart applications.',
                  tags:['IoT','Embedded','C/C++','Unity']
                },
              ].map(s => (
                <div className="cl-svc-card" key={s.num}>
                  <div className="cl-svc-icon">{s.icon}</div>
                  <div className="cl-sc-num">{s.num}</div>
                  <div className="cl-sc-title">{s.title}</div>
                  <p className="cl-sc-body">{s.body}</p>
                  <div className="cl-sc-tags">{s.tags.map(t => <span key={t} className="cl-sc-tag">{t}</span>)}</div>
                  <div className="cl-svc-line"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK — CAROUSEL */}
        <section id="cl-work">
          <div className="cl-wrap">
            <div className="cl-section-head reveal">
              <div>
                <span className="cl-lbl">WORK</span>
                <h2 className="cl-h2">Real projects. Real impact.</h2>
              </div>
              <p className="cl-p cl-p-max">Not mockups. Not school assignments. Deployed software used by real people.</p>
            </div>
            <div className="cl-carousel reveal">
              <div className="cl-carousel-track">
                <div className="cl-case">
                  <div className="cl-case-content">
                    <div className="cl-case-top">
                      <span className="cl-cat">{p.cat}</span>
                      <span className={`cl-cbadge cl-${p.badgeType}`}>{p.badge}</span>
                    </div>
                    <h3 className="cl-case-title">{p.title}</h3>
                    <p className="cl-case-body">{p.body}</p>
                    <div className="cl-stack">
                      {p.stack.map(t => <span key={t} className="cl-stag">{t}</span>)}
                    </div>
                  </div>
                  <div className="cl-case-stat-block">
                    <span className="cl-sval">{p.stat}</span>
                    <span className="cl-slbl">{p.statLbl}</span>
                  </div>
                </div>
              </div>
              <div className="cl-carousel-controls">
                <button className="cl-carr-btn" onClick={prev} aria-label="Previous">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                <div className="cl-carr-dots">
                  {PROJECTS.map((_, i) => (
                    <button
                      key={i}
                      className={`cl-carr-dot ${i === carouselIdx ? 'active' : ''}`}
                      onClick={() => setCarouselIdx(i)}
                      aria-label={`Project ${i + 1}`}
                    />
                  ))}
                </div>
                <button className="cl-carr-btn" onClick={next} aria-label="Next">
                  <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className="cl-carr-counter">
                <span className="cl-carr-num">{String(carouselIdx + 1).padStart(2,'0')}</span>
                <span className="cl-carr-sep">/</span>
                <span className="cl-carr-total">{String(PROJECTS.length).padStart(2,'0')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="cl-about">
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
                  {[
                    ['Magna','GRADUATED CUM LAUDE · SLSU'],
                    ['Champion','ROBOTHON 2024 · NATIONAL'],
                    ['Vietnam','FIRST ENG. STUDENT EXCHANGE'],
                    ['2× Natl','NATIONAL QUALIFIER ROBOTICS'],
                    ['4+','TEAMS LED ACROSS 3 YEARS'],
                    ['3','SYSTEMS DEPLOYED LIVE']
                  ].map(([v,l]) => (
                    <div className="cl-cred" key={v}>
                      <span className="cl-cval">{v}</span>
                      <span className="cl-clbl">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="cl-process">
          <div className="cl-wrap">
            <span className="cl-lbl reveal">HOW WE WORK</span>
            <h2 className="cl-proc-h2 reveal">Simple. Clear. Delivered.</h2>
            <p className="cl-proc-sub reveal">Four steps. No disappearing mid-project. No surprise scope changes.</p>
            <div className="cl-steps reveal">
              {[
                { n:'01', t:'Discovery Call', b:'We talk through your idea, your timeline, and your budget. I ask questions about your business, not just the features.' },
                { n:'02', t:'Clear Proposal', b:'You get a written scope, timeline, and price. Everything is explicit before I write a single line of code. No surprises.' },
                { n:'03', t:'Build with Visibility', b:'Weekly progress updates. You see the work before it\'s finished. Feedback loops are built into the process.' },
                { n:'04', t:'Deliver & Stay', b:'Tested, deployed, and documented. I don\'t hand over code and vanish. I\'m available if you need me.' },
              ].map(s => (
                <div className="cl-step" key={s.n}>
                  <div className="cl-step-svg">
                    <svg viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
                      <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="0.8" opacity="0.15"/>
                    </svg>
                  </div>
                  <span className="cl-step-n">{s.n}</span>
                  <div className="cl-step-t">{s.t}</div>
                  <p className="cl-step-b">{s.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="cl-contact">
          <div className="cl-wrap">
            <div className="cl-contact-inner reveal">
              <span className="cl-lbl">CONTACT</span>
              <h2 className="cl-contact-h2">Let's talk about<br/>your <em>project.</em></h2>
              <p className="cl-p" style={{ marginBottom:'2.5rem',maxWidth:'480px' }}>No commitment needed. Tell me what you're building and I'll tell you if I can help — and be honest if I can't.</p>
              <div className="cl-contact-rows">
                <a className="cl-cr" href="mailto:jillianburila@gmail.com">
                  <div className="cl-cr-l">
                    <span className="cl-cricon">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/></svg>
                    </span>
                    <div><span className="cl-crtype">EMAIL</span><span className="cl-crval">jillianburila@gmail.com</span></div>
                  </div>
                  <span className="cl-craction">SEND →</span>
                </a>
                <div className="cl-cr" onClick={e => window._clientCopy('jillianburila@gmail.com', e.currentTarget)} style={{ cursor:'pointer' }}>
                  <div className="cl-cr-l">
                    <span className="cl-cricon">
                      <svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/></svg>
                    </span>
                    <div><span className="cl-crtype">COPY</span><span className="cl-crval">jillianburila@gmail.com</span></div>
                  </div>
                  <span className="cl-craction cr-action">COPY ADDRESS</span>
                </div>
                <a className="cl-cr" href="https://github.com/jlliangrasya" target="_blank" rel="noreferrer">
                  <div className="cl-cr-l">
                    <span className="cl-cricon">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span>
                    <div><span className="cl-crtype">GITHUB</span><span className="cl-crval">github.com/jlliangrasya</span></div>
                  </div>
                  <span className="cl-craction">VIEW →</span>
                </a>
                <div className="cl-cr" onClick={e => window._clientCopy('09385056299', e.currentTarget)} style={{ cursor:'pointer' }}>
                  <div className="cl-cr-l">
                    <span className="cl-cricon">
                      <svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8 19.79 19.79 0 0112 .18 2 2 0 0112 .18a2 2 0 012 2.18 19.79 19.79 0 00-3.07 8.63 19.5 19.5 0 009.89 9.89z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </span>
                    <div><span className="cl-crtype">PHONE</span><span className="cl-crval">09385056299</span></div>
                  </div>
                  <span className="cl-craction cr-action">COPY</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="cl-footer">
          <div className="cl-wrap">
            <div className="cl-foot-inner">
              <span className="cl-brand">
                <span className="cl-brand-jg">JG</span>
                <span className="cl-brand-sep">/</span>
                <span className="cl-brand-name">Jillian Grace D. Burila</span>
              </span>
              <span className="cl-foot-sub">BS COMP ENG · MAGNA CUM LAUDE · SLSU 2025</span>
            </div>
          </div>
        </footer>

      </div>
      <JGLogo onSwitch={onSwitch} />
      <SwitchButton onSwitch={onSwitch} />
    </>
  )
}

/* ─── TECH STACK DATA WITH SVG ICONS ─────────────────────────────── */
const TECH_STACK = [
  {
    name: 'React',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="2.5" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61dafb" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg>`,
  },
  {
    name: 'Python',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.25 2 7.5 3.25 7.5 5v2.5H12v1H5.5C3.5 8.5 2 10 2 12.5S3.5 16.5 5.5 16.5H7v2.5C7 21 8.75 22 11.5 22H12.5C15.25 22 17 21 17 19v-2.5h-4.5v-1h6.5c2 0 3-1.5 3-4S22 8.5 20 8.5H18.5V6c0-2.5-2-4-5-4H12z" stroke="#3776ab" strokeWidth="1.2" fill="none"/><circle cx="9.5" cy="5.5" r="1" fill="#3776ab"/><circle cx="14.5" cy="18.5" r="1" fill="#ffd43b"/></svg>`,
  },
  {
    name: 'Django',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#092e20" strokeWidth="1.5" fill="rgba(9,46,32,0.15)"/><text x="5.5" y="16" fontFamily="serif" fontWeight="bold" fontSize="11" fill="#44b78b">Dj</text></svg>`,
  },
  {
    name: 'JavaScript',
    svg: `<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" fill="rgba(247,223,30,0.15)" stroke="#f7df1e" strokeWidth="1.2"/><text x="5" y="17" fontFamily="monospace" fontWeight="bold" fontSize="9" fill="#f7df1e">JS</text></svg>`,
  },
  {
    name: 'C/C++',
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#659ad2" strokeWidth="1.2" fill="none"/><text x="5.5" y="16" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#659ad2">C++</text></svg>`,
  },
  {
    name: 'Unity',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L22 7.5v9L12 22 2 16.5v-9L12 2z" stroke="#888" strokeWidth="1.2" fill="rgba(136,136,136,0.12)"/><circle cx="12" cy="12" r="3.5" stroke="#888" strokeWidth="1.2" fill="none"/></svg>`,
  },
  {
    name: 'IoT',
    svg: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#22d3ee" strokeWidth="1.5"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 7.76a6 6 0 000 8.49" stroke="#22d3ee" strokeWidth="1.2" strokeLinecap="round" opacity=".75"/></svg>`,
  },
  {
    name: 'PHP',
    svg: `<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="6" stroke="#8892bf" strokeWidth="1.2" fill="rgba(136,146,191,0.1)"/><text x="7" y="15.5" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#8892bf">PHP</text></svg>`,
  },
  {
    name: 'Java',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M8.5 16s-1 .5-3 .5c2 .5 6.5.25 6.5-3C12 10 6 9.5 6 6.5c0-2.5 3.5-3.5 7-3.5-1.5.5-5 1.5-5 4 0 2.5 6 3 6 6.5 0 2.5-2.5 3-5.5 2.5z" stroke="#e76f00" strokeWidth="1.2" fill="none"/><path d="M14.5 19.5s1.5-.5 1.5-1.5-1.5-1.5-5-2c2.5.5 5 1 5 2.5 0 1-1.5 1-1.5 1z" stroke="#e76f00" strokeWidth="1" fill="none"/></svg>`,
  },
  {
    name: 'HTML/CSS',
    svg: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" stroke="#e34f26" strokeWidth="1.2" fill="none"/><path d="M12 6H6.5L7 11h5v2.5H7.5L8 17l4 1 4-1 .5-5H12V11h4.5L17 6h-5z" stroke="#e34f26" strokeWidth="0.8" fill="none" opacity=".7"/></svg>`,
  },
]

/* ─── SCOPED CSS (theme-aware via dark param) ──────────────────────── */
const CLIENT_CSS = (dark) => `
/* ── ROOT & BACKGROUND ── */
.cl-root{
  background:${dark?'#080d1a':'#f0f4ff'};
  color:${dark?'#e2e8f0':'#0f172a'};
  font-family:'DM Sans',system-ui,sans-serif;
  overflow-x:hidden;
  min-height:100vh;
  transition:background .35s,color .35s;
}
.cl-bg-svg{
  position:fixed;top:0;left:0;width:100%;height:100%;
  pointer-events:none;z-index:0;
}
.cl-wrap{max-width:1100px;margin:0 auto;padding:0 2.5rem;position:relative;z-index:1}
@media(max-width:640px){.cl-wrap{padding:0 1.25rem}}
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:none}

/* ── TYPOGRAPHY ── */
.cl-lbl{
  font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.22em;
  color:${dark?'#0ea5e9':'#1d4ed8'};margin-bottom:1rem;display:block;
}
.cl-h1{
  font-family:'Fraunces',Georgia,serif;font-size:clamp(2.6rem,5.5vw,4.6rem);
  font-weight:600;line-height:1.05;letter-spacing:-.025em;
  color:${dark?'#f1f5f9':'#0f172a'};margin-bottom:1.6rem;
}
.cl-h1 em{font-style:italic;color:${dark?'#38bdf8':'#1d4ed8'};font-weight:300}
.cl-h2{
  font-family:'Fraunces',Georgia,serif;font-size:clamp(1.8rem,3.5vw,2.8rem);
  font-weight:600;letter-spacing:-.02em;line-height:1.12;
  color:${dark?'#f1f5f9':'#0f172a'};
}
.cl-h2 em{font-style:italic;font-weight:300;color:${dark?'#38bdf8':'#1d4ed8'}}
.cl-p{font-family:'DM Sans',sans-serif;font-size:.95rem;color:${dark?'#94a3b8':'#475569'};line-height:1.85;font-weight:300}
.cl-p strong{color:${dark?'#e2e8f0':'#0f172a'};font-weight:600}
.cl-p-max{max-width:480px}

/* ── NAV ── */
#cl-nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:${dark?'rgba(8,13,26,0)':'rgba(240,244,255,0)'};
  transition:background .3s,box-shadow .3s,border-color .3s;
}
#cl-nav.scrolled{
  background:${dark?'rgba(8,13,26,0.92)':'rgba(240,244,255,0.92)'};
  backdrop-filter:blur(20px);
  border-bottom:1px solid ${dark?'rgba(14,165,233,0.12)':'rgba(30,64,175,0.1)'};
  box-shadow:0 1px 24px ${dark?'rgba(0,0,0,0.4)':'rgba(30,64,175,0.06)'};
}
.cl-nav-inner{display:flex;align-items:center;justify-content:space-between;padding-top:1rem;padding-bottom:1rem}
.cl-brand{display:flex;align-items:center;gap:.4rem;text-decoration:none}
.cl-brand-jg{
  font-family:'Rajdhani',sans-serif;font-size:1.3rem;font-weight:700;
  background:linear-gradient(135deg,#38bdf8,#818cf8);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:.06em;
}
.cl-brand-sep{color:${dark?'rgba(255,255,255,.15)':'rgba(0,0,0,.2)'};font-weight:200;font-size:1.1rem}
.cl-brand-name{font-family:'DM Sans',sans-serif;font-size:.9rem;font-weight:500;color:${dark?'#94a3b8':'#64748b'}}
.cl-nav-links{display:flex;gap:2rem;list-style:none}
.cl-nav-links a{
  font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:500;
  color:${dark?'#64748b':'#64748b'};text-decoration:none;letter-spacing:.02em;
  transition:color .2s;position:relative;
}
.cl-nav-links a::after{
  content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;
  background:${dark?'#38bdf8':'#1d4ed8'};transition:width .25s;
}
.cl-nav-links a:hover{color:${dark?'#e2e8f0':'#0f172a'}}
.cl-nav-links a:hover::after{width:100%}
@media(max-width:640px){.cl-nav-links{display:none}}
.cl-nav-right{display:flex;align-items:center;gap:.75rem}
.cl-theme-btn{
  width:34px;height:34px;border-radius:50%;
  background:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.05)'};
  border:1px solid ${dark?'rgba(255,255,255,.1)':'rgba(0,0,0,.1)'};
  color:${dark?'#94a3b8':'#64748b'};cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  transition:all .2s;
}
.cl-theme-btn svg{width:15px;height:15px}
.cl-theme-btn:hover{
  background:${dark?'rgba(56,189,248,.12)':'rgba(29,78,216,.08)'};
  color:${dark?'#38bdf8':'#1d4ed8'};
  border-color:${dark?'rgba(56,189,248,.3)':'rgba(29,78,216,.2)'};
}
.cl-nav-cta{
  font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;
  letter-spacing:.04em;padding:.5rem 1.3rem;
  background:${dark?'rgba(56,189,248,.1)':'rgba(29,78,216,.08)'};
  color:${dark?'#38bdf8':'#1d4ed8'};
  border:1px solid ${dark?'rgba(56,189,248,.25)':'rgba(29,78,216,.2)'};
  border-radius:4px;text-decoration:none;transition:all .2s;
}
.cl-nav-cta:hover{
  background:${dark?'rgba(56,189,248,.18)':'rgba(29,78,216,.14)'};
  transform:translateY(-1px);
}

/* ── HERO ── */
#cl-hero{
  min-height:100vh;display:flex;align-items:center;
  padding:9rem 0 6rem;position:relative;
}
.cl-hero-grid{
  display:grid;grid-template-columns:1fr 420px;
  gap:5rem;align-items:center;
}
@media(max-width:900px){.cl-hero-grid{grid-template-columns:1fr;gap:3.5rem}}
.cl-badge{
  display:inline-flex;align-items:center;gap:.55rem;
  font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.16em;
  color:${dark?'#38bdf8':'#1d4ed8'};
  padding:.38rem 1rem;border-radius:20px;
  background:${dark?'rgba(56,189,248,.07)':'rgba(29,78,216,.05)'};
  border:1px solid ${dark?'rgba(56,189,248,.2)':'rgba(29,78,216,.15)'};
  margin-bottom:2rem;
}
.cl-bdot{
  width:6px;height:6px;border-radius:50%;
  background:${dark?'#38bdf8':'#1d4ed8'};
  animation:clpulse 2s ease-in-out infinite;flex-shrink:0;
}
@keyframes clpulse{0%,100%{opacity:1}50%{opacity:.25}}
.cl-hero-p{
  font-family:'DM Sans',sans-serif;font-size:1.05rem;
  color:${dark?'#64748b':'#475569'};line-height:1.85;max-width:560px;
  margin-bottom:2.5rem;font-weight:300;
}
.cl-hero-p strong{color:${dark?'#e2e8f0':'#0f172a'};font-weight:600}
.cl-cta-row{display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:3.5rem}
.cl-btn-p{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;
  letter-spacing:.03em;padding:.82rem 1.9rem;
  background:${dark?'linear-gradient(135deg,#0ea5e9,#6366f1)':'linear-gradient(135deg,#1d4ed8,#4338ca)'};
  color:#fff;border-radius:4px;text-decoration:none;
  transition:all .25s;border:none;display:inline-block;
  box-shadow:${dark?'0 0 20px rgba(14,165,233,0.25)':'0 4px 14px rgba(29,78,216,0.2)'};
}
.cl-btn-p:hover{transform:translateY(-2px);box-shadow:${dark?'0 0 32px rgba(14,165,233,0.4)':'0 6px 20px rgba(29,78,216,0.3)'}}
.cl-btn-s{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;
  letter-spacing:.03em;padding:.82rem 1.9rem;background:transparent;
  color:${dark?'#94a3b8':'#475569'};border-radius:4px;text-decoration:none;
  transition:all .2s;border:1px solid ${dark?'rgba(255,255,255,.1)':'rgba(0,0,0,.12)'};
  display:inline-block;
}
.cl-btn-s:hover{
  border-color:${dark?'rgba(56,189,248,.3)':'rgba(29,78,216,.25)'};
  color:${dark?'#38bdf8':'#1d4ed8'};transform:translateY(-2px);
}
.cl-metrics{
  display:flex;gap:0;
  border-top:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'};
}
.cl-metric{
  padding:1.4rem 2.2rem 1rem 0;
  border-right:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'};
  margin-right:2.2rem;
}
.cl-metric:last-child{border-right:none}
.cl-mval{
  font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;
  color:${dark?'#f1f5f9':'#0f172a'};line-height:1;letter-spacing:-.03em;display:block;
}
.cl-mlbl{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;
  letter-spacing:.16em;color:${dark?'#475569':'#94a3b8'};
  margin-top:.3rem;display:block;
}

/* ── PROFILE ── */
.cl-hero-right{display:flex;justify-content:center;align-items:center}
.cl-profile-frame{
  position:relative;width:340px;height:340px;
  display:flex;align-items:center;justify-content:center;
}
@media(max-width:640px){.cl-profile-frame{width:220px;height:220px}}
.cl-profile-ring{
  position:absolute;border-radius:50%;
  border:1px solid ${dark?'rgba(56,189,248,0.15)':'rgba(29,78,216,0.1)'};
  animation:ringRotate 18s linear infinite;
}
.cl-ring-1{width:100%;height:100%;animation-duration:18s}
.cl-ring-2{width:80%;height:80%;animation-duration:26s;animation-direction:reverse;border-style:dashed}
.cl-ring-3{width:60%;height:60%;animation-duration:40s;
  border-color:${dark?'rgba(99,102,241,0.18)':'rgba(99,102,241,0.12)'}}
@keyframes ringRotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.cl-profile-img{
  width:72%;height:72%;object-fit:cover;border-radius:50%;
  position:relative;z-index:2;
  border:2px solid ${dark?'rgba(56,189,248,0.3)':'rgba(29,78,216,0.2)'};
  filter:${dark?'grayscale(0.1)':'grayscale(0.05)'};
  box-shadow:${dark?'0 0 40px rgba(14,165,233,0.15),0 0 80px rgba(99,102,241,0.1)':'0 8px 40px rgba(29,78,216,0.15)'};
}
.cl-profile-badge{
  position:absolute;bottom:10%;right:0;z-index:3;
  font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.1em;
  color:${dark?'#38bdf8':'#1d4ed8'};
  background:${dark?'rgba(8,13,26,0.9)':'rgba(240,244,255,0.95)'};
  border:1px solid ${dark?'rgba(56,189,248,.22)':'rgba(29,78,216,.18)'};
  border-radius:20px;padding:.3rem .8rem;
  display:flex;align-items:center;gap:.4rem;backdrop-filter:blur(8px);
}
.cl-profile-badge svg{width:14px;height:14px}

/* ── TECH BAR ── */
#cl-techbar{
  padding:2.5rem 0;
  border-top:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)'};
  border-bottom:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)'};
  background:${dark?'rgba(255,255,255,.015)':'rgba(0,0,0,.015)'};
}
.cl-tech-label{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.22em;
  color:${dark?'#334155':'#94a3b8'};margin-bottom:1.2rem;
}
.cl-tech-scroll{
  display:flex;gap:1.2rem;overflow-x:auto;padding-bottom:.5rem;
  scrollbar-width:none;
}
.cl-tech-scroll::-webkit-scrollbar{display:none}
.cl-tech-chip{
  display:flex;align-items:center;gap:.55rem;flex-shrink:0;
  padding:.45rem 1rem;border-radius:6px;
  background:${dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.03)'};
  border:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.07)'};
  transition:all .2s;cursor:default;
}
.cl-tech-chip:hover{
  background:${dark?'rgba(56,189,248,.07)':'rgba(29,78,216,.05)'};
  border-color:${dark?'rgba(56,189,248,.2)':'rgba(29,78,216,.15)'};
  transform:translateY(-2px);
}
.cl-tech-icon{width:22px;height:22px;display:flex;align-items:center;justify-content:center}
.cl-tech-icon svg{width:100%;height:100%}
.cl-tech-name{
  font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.06em;
  color:${dark?'#64748b':'#64748b'};white-space:nowrap;
}

/* ── SERVICES ── */
#cl-services{padding:7rem 0}
.cl-section-head{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:end;margin-bottom:4rem}
@media(max-width:640px){.cl-section-head{grid-template-columns:1fr}}
.cl-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5px;background:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.08)'};}
@media(max-width:640px){.cl-svc-grid{grid-template-columns:1fr}}
.cl-svc-card{
  background:${dark?'rgba(255,255,255,.025)':'rgba(255,255,255,.8)'};
  padding:2.2rem;transition:all .2s;position:relative;overflow:hidden;
}
.cl-svc-card:hover{
  background:${dark?'rgba(14,165,233,.06)':'rgba(29,78,216,.04)'};
}
.cl-svc-card:hover .cl-svc-line{width:100%}
.cl-svc-line{
  position:absolute;bottom:0;left:0;width:0;height:2px;
  background:linear-gradient(90deg,${dark?'#0ea5e9':'#1d4ed8'},${dark?'#6366f1':'#4338ca'});
  transition:width .4s ease;
}
.cl-svc-icon{
  width:36px;height:36px;margin-bottom:1rem;
  color:${dark?'#0ea5e9':'#1d4ed8'};
}
.cl-svc-icon svg{width:100%;height:100%}
.cl-sc-num{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;
  letter-spacing:.18em;color:${dark?'#334155':'#94a3b8'};margin-bottom:1rem;
}
.cl-sc-title{
  font-family:'Fraunces',Georgia,serif;font-size:1.35rem;font-weight:600;
  color:${dark?'#f1f5f9':'#0f172a'};letter-spacing:-.02em;margin-bottom:.7rem;
}
.cl-sc-body{
  font-family:'DM Sans',sans-serif;font-size:.88rem;
  color:${dark?'#475569':'#64748b'};line-height:1.75;font-weight:300;
}
.cl-sc-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.2rem}
.cl-sc-tag{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.1em;
  padding:.22rem .65rem;
  background:${dark?'rgba(14,165,233,.08)':'rgba(29,78,216,.06)'};
  color:${dark?'#38bdf8':'#1d4ed8'};
  border:1px solid ${dark?'rgba(14,165,233,.15)':'rgba(29,78,216,.12)'};
  border-radius:3px;
}

/* ── WORK CAROUSEL ── */
#cl-work{
  padding:7rem 0;
  background:${dark?'rgba(255,255,255,.015)':'rgba(0,0,0,.02)'};
  border-top:1px solid ${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)'};
  border-bottom:1px solid ${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)'};
}
.cl-carousel{position:relative}
.cl-case{
  background:${dark?'rgba(255,255,255,.03)':'rgba(255,255,255,.9)'};
  border:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'};
  border-radius:8px;padding:2.5rem;
  display:grid;grid-template-columns:1fr auto;gap:2rem;align-items:start;
  min-height:280px;
}
@media(max-width:640px){.cl-case{grid-template-columns:1fr}}
.cl-case-top{display:flex;align-items:center;gap:.75rem;margin-bottom:1.2rem;flex-wrap:wrap}
.cl-cat{
  font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.14em;
  color:${dark?'#38bdf8':'#1d4ed8'};
  padding:.2rem .7rem;background:${dark?'rgba(56,189,248,.07)':'rgba(29,78,216,.06)'};
  border:1px solid ${dark?'rgba(56,189,248,.18)':'rgba(29,78,216,.14)'};border-radius:3px;
}
.cl-cbadge{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.1em;
  padding:.2rem .7rem;border-radius:3px;
}
.cl-dep{
  background:rgba(5,150,105,.07);border:1px solid rgba(5,150,105,.2);color:#059669;
}
.cl-ship{
  background:rgba(37,99,235,.07);border:1px solid rgba(37,99,235,.2);color:#2563eb;
}
.cl-case-title{
  font-family:'Fraunces',Georgia,serif;font-size:1.45rem;font-weight:600;
  letter-spacing:-.02em;color:${dark?'#f1f5f9':'#0f172a'};margin-bottom:.65rem;
}
.cl-case-body{
  font-family:'DM Sans',sans-serif;font-size:.9rem;
  color:${dark?'#64748b':'#475569'};line-height:1.75;font-weight:300;max-width:520px;
}
.cl-stack{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1rem}
.cl-stag{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.08em;
  padding:.2rem .6rem;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)'};
  color:${dark?'#475569':'#94a3b8'};
  border:1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.07)'};border-radius:3px;
}
.cl-case-stat-block{text-align:right;flex-shrink:0;padding-top:.5rem}
@media(max-width:640px){.cl-case-stat-block{text-align:left}}
.cl-sval{
  font-family:'Rajdhani',sans-serif;font-size:3.2rem;font-weight:700;line-height:1;
  letter-spacing:-.04em;
  background:linear-gradient(135deg,${dark?'#38bdf8':'#1d4ed8'},${dark?'#a78bfa':'#4338ca'});
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  display:block;
}
.cl-slbl{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.12em;
  color:${dark?'#334155':'#94a3b8'};display:block;margin-top:.25rem;max-width:100px;
}
.cl-carousel-controls{
  display:flex;align-items:center;gap:1rem;margin-top:1.5rem;justify-content:center;
}
.cl-carr-btn{
  width:38px;height:38px;border-radius:50%;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)'};
  border:1px solid ${dark?'rgba(255,255,255,.1)':'rgba(0,0,0,.1)'};
  color:${dark?'#64748b':'#64748b'};cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .2s;
}
.cl-carr-btn svg{width:18px;height:18px}
.cl-carr-btn:hover{
  background:${dark?'rgba(56,189,248,.1)':'rgba(29,78,216,.07)'};
  color:${dark?'#38bdf8':'#1d4ed8'};
  border-color:${dark?'rgba(56,189,248,.25)':'rgba(29,78,216,.2)'};
}
.cl-carr-dots{display:flex;gap:.5rem;align-items:center}
.cl-carr-dot{
  width:6px;height:6px;border-radius:50%;
  background:${dark?'rgba(255,255,255,.15)':'rgba(0,0,0,.15)'};
  border:none;cursor:pointer;transition:all .2s;padding:0;
}
.cl-carr-dot.active{
  background:${dark?'#38bdf8':'#1d4ed8'};
  transform:scale(1.4);
  box-shadow:${dark?'0 0 8px rgba(56,189,248,.5)':'0 0 8px rgba(29,78,216,.3)'};
}
.cl-carr-counter{
  text-align:center;margin-top:.6rem;
  font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.12em;
}
.cl-carr-num{color:${dark?'#38bdf8':'#1d4ed8'}}
.cl-carr-sep{color:${dark?'rgba(255,255,255,.2)':'rgba(0,0,0,.2)'};margin:0 .3rem}
.cl-carr-total{color:${dark?'#334155':'#94a3b8'}}

/* ── ABOUT ── */
#cl-about{padding:7rem 0}
.cl-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start}
@media(max-width:768px){.cl-about-grid{grid-template-columns:1fr;gap:3rem}}
.cl-quote{
  border-left:2px solid ${dark?'#0ea5e9':'#1d4ed8'};
  padding-left:1.25rem;
  font-family:'Fraunces',Georgia,serif;font-size:1.05rem;font-style:italic;
  color:${dark?'#94a3b8':'#475569'};line-height:1.65;margin:1.5rem 0;font-weight:300;
}
.cl-cred-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:1.5px;
  background:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};
  border:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};
}
.cl-cred{
  background:${dark?'rgba(255,255,255,.025)':'rgba(255,255,255,.8)'};
  padding:1.3rem;transition:background .2s;
}
.cl-cred:hover{background:${dark?'rgba(14,165,233,.06)':'rgba(29,78,216,.04)'}}
.cl-cval{
  font-family:'Rajdhani',sans-serif;font-size:1.45rem;font-weight:700;
  color:${dark?'#38bdf8':'#1d4ed8'};letter-spacing:-.01em;display:block;margin-bottom:.25rem;
}
.cl-clbl{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;
  letter-spacing:.12em;color:${dark?'#334155':'#94a3b8'};
}

/* ── PROCESS ── */
#cl-process{
  padding:7rem 0;
  background:${dark?'rgba(255,255,255,.015)':'rgba(0,0,0,.02)'};
  border-top:1px solid ${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)'};
  border-bottom:1px solid ${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.05)'};
}
.cl-proc-h2{
  font-family:'Fraunces',Georgia,serif;font-size:clamp(2rem,4vw,3rem);
  font-weight:600;letter-spacing:-.02em;
  color:${dark?'#f1f5f9':'#0f172a'};margin-bottom:.5rem;
}
.cl-proc-sub{
  font-family:'DM Sans',sans-serif;font-size:.95rem;
  color:${dark?'#334155':'#94a3b8'};font-weight:300;margin-bottom:4rem;max-width:420px;
}
.cl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5px;background:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};}
@media(max-width:768px){.cl-steps{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.cl-steps{grid-template-columns:1fr}}
.cl-step{
  background:${dark?'rgba(255,255,255,.025)':'rgba(255,255,255,.8)'};
  padding:2rem 1.6rem;transition:all .2s;position:relative;overflow:hidden;
}
.cl-step:hover{background:${dark?'rgba(14,165,233,.05)':'rgba(29,78,216,.03)'}}
.cl-step-svg{
  position:absolute;top:-10px;right:-10px;width:70px;height:70px;
  color:${dark?'rgba(14,165,233,.12)':'rgba(29,78,216,.07)'};
  pointer-events:none;
}
.cl-step-n{
  font-family:'Rajdhani',sans-serif;font-size:3rem;font-weight:700;
  letter-spacing:-.04em;
  color:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.06)'};
  line-height:1;margin-bottom:1rem;display:block;
}
.cl-step-t{
  font-family:'Fraunces',Georgia,serif;font-size:1.1rem;font-weight:600;
  color:${dark?'#e2e8f0':'#0f172a'};letter-spacing:-.01em;margin-bottom:.6rem;
}
.cl-step-b{
  font-family:'DM Sans',sans-serif;font-size:.84rem;
  color:${dark?'#334155':'#94a3b8'};line-height:1.75;font-weight:300;
}

/* ── CONTACT ── */
#cl-contact{padding:8rem 0}
.cl-contact-inner{max-width:680px}
.cl-contact-h2{
  font-family:'Fraunces',Georgia,serif;
  font-size:clamp(2.4rem,5vw,4rem);font-weight:600;
  letter-spacing:-.03em;line-height:1.06;margin-bottom:1.2rem;
  color:${dark?'#f1f5f9':'#0f172a'};
}
.cl-contact-h2 em{font-style:italic;font-weight:300;color:${dark?'#38bdf8':'#1d4ed8'}}
.cl-contact-rows{
  display:flex;flex-direction:column;gap:1.5px;
  background:${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'};
  border:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'};
  border-radius:6px;overflow:hidden;max-width:520px;
}
.cl-cr{
  background:${dark?'rgba(255,255,255,.025)':'rgba(255,255,255,.9)'};
  padding:1.1rem 1.4rem;display:flex;align-items:center;
  justify-content:space-between;transition:background .15s;text-decoration:none;
}
.cl-cr:hover{background:${dark?'rgba(14,165,233,.06)':'rgba(29,78,216,.04)'}}
.cl-cr-l{display:flex;align-items:center;gap:.85rem}
.cl-cricon{
  width:32px;height:32px;border-radius:6px;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)'};
  border:1px solid ${dark?'rgba(255,255,255,.08)':'rgba(0,0,0,.07)'};
  display:flex;align-items:center;justify-content:center;flex-shrink:0;
  color:${dark?'#475569':'#94a3b8'};
}
.cl-cricon svg{width:14px;height:14px}
.cl-crtype{
  font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.16em;
  color:${dark?'#334155':'#94a3b8'};display:block;
}
.cl-crval{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;
  color:${dark?'#e2e8f0':'#0f172a'};display:block;
}
.cl-craction{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.12em;
  color:${dark?'#334155':'#94a3b8'};transition:color .2s;flex-shrink:0;
}
.cl-cr:hover .cl-craction{color:${dark?'#38bdf8':'#1d4ed8'}}
.cf{color:#059669 !important}

/* ── FOOTER ── */
.cl-footer{
  border-top:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};
  padding:2rem 0;
}
.cl-foot-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.cl-foot-sub{
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.12em;
  color:${dark?'#1e293b':'#94a3b8'};
}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .cl-metrics{flex-direction:column;gap:0}
  .cl-metric{border-right:none;margin-right:0;padding:.85rem 0;border-bottom:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.08)'}}
  .cl-metric:last-child{border-bottom:none}
  .cl-cta-row{flex-direction:column;align-items:flex-start}
  .cl-btn-p,.cl-btn-s{width:100%;text-align:center}
}
@media(max-width:480px){
  #cl-hero{padding:7rem 0 4rem;min-height:auto}
  .cl-h1{font-size:clamp(2rem,7vw,2.8rem)}
  .cl-hero-p{font-size:.9rem}
  .cl-mval{font-size:1.9rem}
  .cl-contact-h2{font-size:clamp(2rem,6vw,3rem)}
  .cl-about-grid{gap:2rem}
  .cl-cred-grid{grid-template-columns:1fr}
  .cl-steps{grid-template-columns:1fr !important}
  .cl-case-title{font-size:1.2rem}
  .cl-case-body{font-size:.85rem}
  .cl-sval{font-size:2.5rem}
  .cl-nav-cta{padding:.4rem 1rem;font-size:.75rem}
  .cl-foot-inner{flex-direction:column;text-align:center}
  .cl-hero-right{display:none}
}
`
