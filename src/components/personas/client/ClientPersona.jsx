import { useEffect, useRef, useState } from 'react'
import JGLogo from '../../shared/JGLogo.jsx'
import LiquidGlass from '../../shared/LiquidGlass.jsx'
import profileImg from '../../../assets/jillian enhanced.jpg'

/* ── ACCENT PALETTE ───────────────────────────────────────────────────
   emerald #10b981 / #6ee7b7   — primary, headings, CTAs
   teal    #2dd4bf / #99f6e4   — secondary, IoT/hardware tags
   amber   #f59e0b / #fde68a   — highlight, metrics, stat numbers
   rose    #f43f5e / #fda4af   — badges, live/deployed status
   slate   backgrounds + muted text
────────────────────────────────────────────────────────────────────── */

const ACCENT = {
  emerald: '#10b981', emeraldLt: '#6ee7b7',
  teal:    '#2dd4bf', tealLt:    '#99f6e4',
  amber:   '#f59e0b', amberLt:   '#fde68a',
  rose:    '#f43f5e', roseLt:    '#fda4af',
}

const PROJECTS = [
  {
    cat: 'SAAS · LIVE PLATFORM', badge: 'LIVE', accentKey: 'emerald',
    title: 'BrightFolks — ESL Management Platform',
    body: 'Google Sheets wasn\'t cutting it. As an ESL teacher managing a team and a growing student base, she built the solution herself. Multi-role SaaS with tailored dashboards for students, teachers, and admins — covering class booking, session monitoring, and automated daily reminders. It runs a real ESL operation today.',
    stack: ['React TypeScript','MySQL','PWA','SaaS'],
    stat: 'Live', statLbl: 'RUNS A REAL ESL OPERATION TODAY',
    icon: '🏫',
  },
  {
    cat: 'FINTECH · LIVE APP', badge: 'LIVE', accentKey: 'teal',
    title: 'PesoWise — Personal Finance App',
    body: 'No existing app handled how Filipinos manage money — so she designed and built one. Tracks budgets, loans, savings, emergency funds, and multiple bank balances in one place. Includes couples mode for shared expense tracking. Started as a tool for herself. Now used by real active users.',
    stack: ['React','Firebase','PWA'],
    stat: 'Real', statLbl: 'USERS BEYOND HERSELF',
    icon: '💰',
  },
  {
    cat: 'CLIENT PROJECT · INTERNAL TOOL', badge: 'DELIVERED', accentKey: 'amber',
    title: 'Cavella Philippines — Business Monitoring Platform',
    body: 'Internal business dashboard built for a real client. Centralizes product inventory, sales performance, and client management into a single monitoring system — giving the business a live view of its operations without juggling spreadsheets.',
    stack: ['React','Dashboard','Business Ops'],
    stat: '1', statLbl: 'UNIFIED VIEW ACROSS ALL OPERATIONS',
    icon: '📊',
  },
  {
    cat: 'OPERATIONS TOOL · LIVE', badge: 'LIVE', accentKey: 'emerald',
    title: 'LoadTrack — Sales & Collections Tracker',
    body: 'A lightweight operations tool for Smart and Globe load dealers. Tracks load inventory, client accounts, and daily sales — with support for collector-based field workflows where agents collect payments in the field. Solves a real, unglamorous problem that spreadsheets handle poorly.',
    stack: ['React','Operations'],
    stat: 'Live', statLbl: 'ACTIVELY USED BY REAL DEALERS',
    icon: '📲',
  },
  {
    cat: 'FULL-STACK + IoT', badge: 'DEPLOYED', accentKey: 'teal',
    title: 'HyPTech — Biometric Management System',
    body: 'A university needed a complete management system with biometric hardware integration. As team lead and lead web developer, I architected the frontend and backend — React UI to Django APIs to physical sensor comms — driving the group through Agile delivery to a fully deployed system.',
    stack: ['React','Django','Python','IoT Hardware','Agile'],
    stat: 'Lead', statLbl: 'TEAM LEAD · LEAD WEB DEVELOPER',
    icon: '⬡',
  },
  {
    cat: 'GOVERNMENT DEPLOYMENT', badge: 'LIVE · GOV\'T', accentKey: 'rose',
    title: 'Senior Citizen Age Tracking System',
    body: 'Local government needed a system to track and manage senior citizen records. Led a 3-member team, designed the entire UI/UX from scratch, and built the application. Deployed to a real barangay — actual government use, actual users.',
    stack: ['Visual Basic','UI/UX Design','Team Lead'],
    stat: "Gov't", statLbl: 'DEPLOYED TO REAL BARANGAY USE',
    icon: '◈',
  },
  {
    cat: 'GAME DEVELOPMENT', badge: 'PRODUCTION', accentKey: 'amber',
    title: 'XDefender — Unity Game · Rak Son Tech OPC',
    body: 'A game studio needed gameplay systems for a production title on a real commercial timeline. Delivered 50% of all gameplay features — mechanics, power-ups, inventory system — plus optimised performance and stability through systematic testing.',
    stack: ['Unity','C#','Game Systems','QA'],
    stat: '50%', statLbl: 'OF ALL GAMEPLAY FEATURES BUILT',
    icon: '◬',
  },
]

const SVC_ACCENT = ['emerald', 'teal', 'amber']

export default function ClientPersona({ onSwitch }) {
  const rootRef      = useRef(null)
  const carouselRef  = useRef(null)
  const starsCanvasRef = useRef(null)
  const [dark, setDark]           = useState(true)
  const [carouselIdx, setCarouselIdx] = useState(0)
  const dragRef = useRef({ start: 0, dragging: false })

  /* ── EFFECTS ── */
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const nav = root.querySelector('#cl-nav')
    const onScroll = () => nav?.classList.toggle('scrolled', window.scrollY > 40)
    window.addEventListener('scroll', onScroll)

    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
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
    return () => { window.removeEventListener('scroll', onScroll); obs.disconnect(); delete window._clientCopy }
  }, [dark])

  /* ── SHOOTING STARS ── */
  useEffect(() => {
    if (!dark) return
    const canvas = starsCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Shooting star colours — palette-matched
    const COLORS = ['#ffffff', '#6ee7b7', '#2dd4bf', '#99f6e4', '#fde68a', '#ffffff']

    class ShootingStar {
      constructor() { this.reset(true) }
      reset(initial = false) {
        // Spawn anywhere across the top ~60% of screen, or offscreen top
        this.x     = Math.random() * canvas.width * 1.4 - canvas.width * 0.2
        this.y     = initial
          ? Math.random() * canvas.height * 0.5   // spread on load
          : -20
        this.len   = 80 + Math.random() * 180      // tail length
        this.speed = 5  + Math.random() * 9        // px per frame
        this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.35  // ~45° ± variance
        this.vx    = Math.cos(this.angle) * this.speed
        this.vy    = Math.sin(this.angle) * this.speed
        this.alpha = 0.4 + Math.random() * 0.6
        this.width = 0.8 + Math.random() * 1.4
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)]
        this.alive = true
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        // fade out near end of life
        if (this.y > canvas.height * 0.85 || this.x > canvas.width + 50) {
          this.alive = false
        }
      }
      draw() {
        const tailX = this.x - Math.cos(this.angle) * this.len
        const tailY = this.y - Math.sin(this.angle) * this.len
        const grad  = ctx.createLinearGradient(tailX, tailY, this.x, this.y)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(0.7, `${this.color}40`)
        grad.addColorStop(1, `${this.color}${Math.round(this.alpha * 255).toString(16).padStart(2,'0')}`)
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(this.x, this.y)
        ctx.strokeStyle = grad
        ctx.lineWidth   = this.width
        ctx.lineCap     = 'round'
        ctx.stroke()
        // Bright head dot
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.width * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    const stars = []
    // Seed with a few already mid-flight
    for (let i = 0; i < 4; i++) stars.push(new ShootingStar())

    let lastSpawn = 0
    let raf

    const tick = (ts) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spawn a new star every 1.2–3.5 seconds randomly
      if (ts - lastSpawn > 1200 + Math.random() * 2300) {
        stars.push(new ShootingStar())
        lastSpawn = ts
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        stars[i].update()
        stars[i].draw()
        if (!stars[i].alive) stars.splice(i, 1)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [dark])

  /* ── CAROUSEL DRAG/SWIPE ── */
  const onPointerDown = e => {
    dragRef.current = { start: e.clientX, dragging: true }
    carouselRef.current?.setPointerCapture(e.pointerId)
  }
  const onPointerMove = e => {
    if (!dragRef.current.dragging) return
    const dx = e.clientX - dragRef.current.start
    if (carouselRef.current) carouselRef.current.style.transform = `translateX(${dx * 0.15}px)`
  }
  const onPointerUp = e => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    if (carouselRef.current) carouselRef.current.style.transform = ''
    const dx = e.clientX - dragRef.current.start
    if (Math.abs(dx) > 50) {
      dx < 0
        ? setCarouselIdx(i => (i + 1) % PROJECTS.length)
        : setCarouselIdx(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
    }
  }

  const p = PROJECTS[carouselIdx]
  const pa = ACCENT[p.accentKey]
  const paLt = ACCENT[p.accentKey + 'Lt']

  return (
    <>
      <style>{CLIENT_CSS(dark)}</style>
      <div ref={rootRef} className={`cl-root ${dark ? 'cl-dark' : 'cl-light'}`}>

        {/* ── SVG BACKGROUND — Galaxy / deep space ── */}
        <svg className="cl-bg-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            {/* ── BASE: near-black with a very subtle deep-teal shift ── */}
            <linearGradient id="bgG" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%"   stopColor={dark ? '#04080d' : '#f0fdf9'} />
              <stop offset="40%"  stopColor={dark ? '#060c10' : '#e6fffa'} />
              <stop offset="100%" stopColor={dark ? '#030709' : '#ccfbf1'} />
            </linearGradient>

            {/* Grid — very subtle, near-invisible teal tint */}
            <pattern id="gridP" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none"
                stroke={dark ? 'rgba(45,212,191,0.055)' : 'rgba(5,150,105,0.055)'}
                strokeWidth="0.6"/>
            </pattern>

            {/* Star-field dots — tiny, scattered */}
            <pattern id="starP" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="12"  cy="18"  r="0.7" fill={dark?'rgba(255,255,255,0.55)':'rgba(0,0,0,0.12)'}/>
              <circle cx="58"  cy="7"   r="0.5" fill={dark?'rgba(255,255,255,0.4)' :'rgba(0,0,0,0.08)'}/>
              <circle cx="94"  cy="44"  r="0.9" fill={dark?'rgba(255,255,255,0.65)':'rgba(0,0,0,0.14)'}/>
              <circle cx="32"  cy="72"  r="0.6" fill={dark?'rgba(255,255,255,0.45)':'rgba(0,0,0,0.1)'}/>
              <circle cx="108" cy="91"  r="0.5" fill={dark?'rgba(255,255,255,0.35)':'rgba(0,0,0,0.07)'}/>
              <circle cx="76"  cy="112" r="0.7" fill={dark?'rgba(255,255,255,0.5)' :'rgba(0,0,0,0.1)'}/>
              <circle cx="6"   cy="102" r="0.4" fill={dark?'rgba(255,255,255,0.3)' :'rgba(0,0,0,0.06)'}/>
              <circle cx="48"  cy="51"  r="0.6" fill={dark?'rgba(255,255,255,0.4)' :'rgba(0,0,0,0.08)'}/>
              <circle cx="115" cy="28"  r="0.8" fill={dark?'rgba(255,255,255,0.6)' :'rgba(0,0,0,0.12)'}/>
            </pattern>

            {/* ── NEBULA GLOWS ── */}
            {/* Emerald nebula — top-right */}
            <radialGradient id="nebEm" cx="80%" cy="8%" r="42%">
              <stop offset="0%"   stopColor="#059669" stopOpacity={dark?'0.18':'0.1'}/>
              <stop offset="45%"  stopColor="#10b981" stopOpacity={dark?'0.07':'0.04'}/>
              <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
            </radialGradient>

            {/* Teal nebula — bottom left */}
            <radialGradient id="nebTeal" cx="8%" cy="88%" r="38%">
              <stop offset="0%"   stopColor="#0d9488" stopOpacity={dark?'0.2':'0.1'}/>
              <stop offset="50%"  stopColor="#2dd4bf" stopOpacity={dark?'0.08':'0.04'}/>
              <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0"/>
            </radialGradient>

            {/* Deep slate-blue nebula — top left, for depth/contrast */}
            <radialGradient id="nebSlate" cx="5%" cy="12%" r="35%">
              <stop offset="0%"   stopColor="#0f4060" stopOpacity={dark?'0.22':'0.08'}/>
              <stop offset="60%"  stopColor="#0c2a40" stopOpacity={dark?'0.1':'0.03'}/>
              <stop offset="100%" stopColor="#0c2a40" stopOpacity="0"/>
            </radialGradient>

            {/* Warm amber core — centre, very faint */}
            <radialGradient id="nebAmber" cx="55%" cy="50%" r="30%">
              <stop offset="0%"   stopColor="#d97706" stopOpacity={dark?'0.05':'0.025'}/>
              <stop offset="100%" stopColor="#d97706" stopOpacity="0"/>
            </radialGradient>

            {/* Dark teal deepening — bottom right */}
            <radialGradient id="nebDark" cx="92%" cy="92%" r="30%">
              <stop offset="0%"   stopColor="#134e4a" stopOpacity={dark?'0.25':'0.1'}/>
              <stop offset="100%" stopColor="#134e4a" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ── LAYERS (back to front) ── */}
          {/* 1. Base colour */}
          <rect width="1440" height="900" fill="url(#bgG)"/>

          {/* 2. Nebula glows */}
          <rect width="1440" height="900" fill="url(#nebSlate)"/>
          <rect width="1440" height="900" fill="url(#nebTeal)"/>
          <rect width="1440" height="900" fill="url(#nebEm)"/>
          <rect width="1440" height="900" fill="url(#nebAmber)"/>
          <rect width="1440" height="900" fill="url(#nebDark)"/>

          {/* 3. Tech grid */}
          <rect width="1440" height="900" fill="url(#gridP)"/>

          {/* 4. Star field */}
          {dark && <rect width="1440" height="900" fill="url(#starP)"/>}

          {/* ── Circuit traces ── */}
          <g opacity={dark?'0.55':'0.3'}>
            {/* Top-left — emerald */}
            <path d="M0 160 H80 V240 H160 V300 H220"
              stroke="rgba(16,185,129,.3)" strokeWidth="1" fill="none"/>
            <circle cx="80"  cy="160" r="3"   fill="#10b981" opacity=".6"/>
            <circle cx="160" cy="240" r="2.2" fill="#34d399" opacity=".5"/>
            <circle cx="220" cy="300" r="2.2" fill="#10b981" opacity=".4"/>

            {/* Top-right — teal */}
            <path d="M1440 240 H1360 V160 H1280 V100"
              stroke="rgba(45,212,191,.25)" strokeWidth="1" fill="none"/>
            <circle cx="1360" cy="240" r="3"   fill="#2dd4bf" opacity=".6"/>
            <circle cx="1280" cy="160" r="2.2" fill="#2dd4bf" opacity=".45"/>

            {/* Mid-left — slate-blue for contrast */}
            <path d="M0 440 H55 V510 H115 V560"
              stroke="rgba(56,189,248,.18)" strokeWidth="1" fill="none"/>
            <circle cx="55"  cy="440" r="2.2" fill="#38bdf8" opacity=".5"/>
            <circle cx="115" cy="510" r="1.8" fill="#38bdf8" opacity=".35"/>

            {/* Bottom-left — amber */}
            <path d="M0 720 H70 V780 H150 V840 H280"
              stroke="rgba(245,158,11,.22)" strokeWidth="1" fill="none"/>
            <circle cx="70"  cy="720" r="2.5" fill="#f59e0b" opacity=".55"/>
            <circle cx="150" cy="780" r="2"   fill="#f59e0b" opacity=".4"/>

            {/* Bottom-right — rose */}
            <path d="M1440 680 H1370 V620 H1300 V560"
              stroke="rgba(244,63,94,.2)" strokeWidth="1" fill="none"/>
            <circle cx="1370" cy="680" r="2.5" fill="#f43f5e" opacity=".5"/>
            <circle cx="1300" cy="620" r="2"   fill="#f43f5e" opacity=".38"/>

            {/* Top-centre — teal */}
            <path d="M580 0 V70 H520 V130 H460"
              stroke="rgba(45,212,191,.18)" strokeWidth="1" fill="none"/>
            <circle cx="580" cy="70" r="2" fill="#2dd4bf" opacity=".45"/>

            {/* Mid-right — emerald */}
            <path d="M1440 440 H1390 V500 H1320"
              stroke="rgba(16,185,129,.2)" strokeWidth="1" fill="none"/>
            <circle cx="1390" cy="440" r="2" fill="#10b981" opacity=".45"/>

            {/* Corner accent nodes */}
            <circle cx="4"    cy="4"   r="2" fill="#10b981" opacity=".4"/>
            <circle cx="1436" cy="4"   r="2" fill="#2dd4bf" opacity=".4"/>
            <circle cx="4"    cy="896" r="2" fill="#f59e0b" opacity=".4"/>
            <circle cx="1436" cy="896" r="2" fill="#f43f5e" opacity=".4"/>
          </g>

          {/* Vignette — darkens edges, pulls focus centre */}
          {dark && (
            <radialGradient id="vig" cx="50%" cy="50%" r="70%">
              <stop offset="0%"   stopColor="transparent"/>
              <stop offset="100%" stopColor="rgba(2,4,6,0.55)"/>
            </radialGradient>
          )}
          {dark && <rect width="1440" height="900" fill="url(#vig)"/>}
        </svg>

        {/* ── SHOOTING STARS CANVAS ── */}
        {dark && (
          <canvas
            ref={starsCanvasRef}
            style={{
              position:'fixed', inset:0,
              width:'100%', height:'100%',
              pointerEvents:'none', zIndex:0,
            }}
          />
        )}

        {/* ── NAV ── */}
        <nav id="cl-nav">
          <div className="cl-wrap cl-nav-inner">
            <div className="cl-brand">
              <span className="cl-brand-jg">JG</span>
              <span className="cl-brand-sep">/</span>
              <span className="cl-brand-name">Jillian Grace</span>
            </div>
            <ul className="cl-nav-links">
              {['Services','Work','About','Process'].map(l => (
                <li key={l}><a href={`#cl-${l.toLowerCase()}`}>{l}</a></li>
              ))}
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

        {/* ── HERO ── */}
        <section id="cl-hero">
          <div className="cl-wrap">
            <div className="cl-hero-grid">
              <div className="cl-hero-left reveal">
                <div className="cl-avail-badge">
                  <span className="cl-bdot"></span>
                  WE CAN BUILD PROJECTS TOGETHER
                  <span className="cl-avail-line"></span>
                </div>
                <h1 className="cl-h1">
                  Build with someone<br/>
                  who understands<br/>
                  <span className="cl-h1-accent">both sides</span>
                  <span className="cl-h1-cursor">_</span>
                </h1>
                <p className="cl-hero-p">
                  Software Engineer I by day. Former business manager by foundation. I build production software at Xeleqt Technology — and I bring that same professional discipline to every client project.
                  I don't just write code — I understand what it needs to <strong>do for your business.</strong>
                </p>
                <div className="cl-cta-row">
                  <a className="cl-btn-p" href="#cl-work">
                    <span>See My Work</span>
                    <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </a>
                  <a className="cl-btn-s" href="#cl-contact">Start a Project</a>
                </div>
                <LiquidGlass className="cl-metrics" tint="#10b981" intensity="subtle" rounded="10px" style={{ display:'flex' }}>
                  {[
                    { val:'3',    lbl:'SYSTEMS DEPLOYED',  color: ACCENT.emerald },
                    { val:'1→17', lbl:'CLIENTS GROWN',     color: ACCENT.amber },
                    { val:'2.5',  lbl:'YRS REAL BUSINESS', color: ACCENT.teal },
                  ].map(m => (
                    <div className="cl-metric" key={m.val}>
                      <span className="cl-mval" style={{ color: m.color }}>{m.val}</span>
                      <span className="cl-mlbl">{m.lbl}</span>
                    </div>
                  ))}
                </LiquidGlass>
              </div>

              <div className="cl-hero-right reveal">
                <div className="cl-profile-frame">
                  <div className="cl-ring cl-ring-1"></div>
                  <div className="cl-ring cl-ring-2"></div>
                  <div className="cl-ring cl-ring-3"></div>
                  {/* corner accent nodes */}
                  <div className="cl-node cl-node-t"></div>
                  <div className="cl-node cl-node-r"></div>
                  <div className="cl-node cl-node-b"></div>
                  <div className="cl-node cl-node-l"></div>
                  <img src={profileImg} alt="Jillian Grace" className="cl-profile-img"/>
                  <div className="cl-profile-badge">
                    <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="#10b981" strokeWidth="1"/><path d="M5 8l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    SOFTWARE ENGINEER I
                  </div>
                </div>

                {/* floating code card */}
                <LiquidGlass className="cl-code-card" tint="#2dd4bf" intensity="medium" rounded="10px" style={{ width:'100%' }}>
                  <div className="cl-code-bar">
                    <span className="cl-cd r"></span><span className="cl-cd y"></span><span className="cl-cd g"></span>
                    <span className="cl-code-title">jillian.config.js</span>
                  </div>
                  <pre className="cl-code-body" dangerouslySetInnerHTML={{ __html: `{
  role:   "Software Engineer I",
  at:     "Xeleqt Technology",
  bonus:  "ran real business",
  status: <span class="cl-cv">● open to freelance</span>
}` }}/>
                </LiquidGlass>
              </div>
            </div>
          </div>
        </section>

        {/* ── TECH MARQUEE ── */}
        <div id="cl-techbar">
          <div className="cl-tech-track">
            {[...TECH_STACK, ...TECH_STACK].map((t, i) => (
              <div className="cl-tech-chip" key={i} title={t.name}>
                <span className="cl-tech-icon" dangerouslySetInnerHTML={{ __html: t.svg }}/>
                <span className="cl-tech-name">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── SERVICES ── */}
        <section id="cl-services">
          <div className="cl-wrap">
            <div className="cl-section-head reveal">
              <div>
                <span className="cl-lbl">— SERVICES</span>
                <h2 className="cl-h2">What I can <em>build</em> for you</h2>
              </div>
              <p className="cl-p cl-p-max">Not a list of technologies. A list of problems I solve — and deliver.</p>
            </div>
            <div className="cl-svc-grid reveal">
              {[
                {
                  num:'01', title:'Web Applications', accentKey:'emerald',
                  icon:<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6 8h12M6 11h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/></svg>,
                  body:'Full-stack web apps built to last. Clean architecture, intuitive UI, backend systems that scale.',
                  tags:['React','Django','Python','Full-Stack'],
                },
                {
                  num:'02', title:'Business Systems', accentKey:'teal',
                  icon:<svg viewBox="0 0 24 24" fill="none"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="6.5" cy="6.5" r="1" fill="currentColor"/></svg>,
                  body:'Custom management tools, tracking systems, and operational software tailored to how your business actually runs.',
                  tags:['Databases','Dashboards','Automation'],
                },
                {
                  num:'03', title:'Hardware & IoT', accentKey:'amber',
                  icon:<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="7" width="14" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/><path d="M9 7V5M15 7V5M9 17v2M15 17v2M5 11H3M21 11h-2M5 14H3M21 14h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>,
                  body:'Software-hardware integration for embedded systems, IoT devices, and smart applications — bridging the digital and physical.',
                  tags:['IoT','Embedded','C/C++','Unity'],
                },
              ].map(s => (
                <LiquidGlass
                  key={s.num}
                  className={`cl-svc-card cl-svc-${s.accentKey}`}
                  tint={ACCENT[s.accentKey]}
                  intensity="medium"
                  rounded="0"
                >
                  <div className="cl-svc-accent-bar"></div>
                  <div className="cl-svc-icon">{s.icon}</div>
                  <div className="cl-sc-num">{s.num}</div>
                  <div className="cl-sc-title">{s.title}</div>
                  <p className="cl-sc-body">{s.body}</p>
                  <div className="cl-sc-tags">
                    {s.tags.map(t => <span key={t} className="cl-sc-tag">{t}</span>)}
                  </div>
                </LiquidGlass>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORK CAROUSEL ── */}
        <section id="cl-work">
          <div className="cl-wrap">
            <div className="cl-section-head reveal">
              <div>
                <span className="cl-lbl">— WORK</span>
                <h2 className="cl-h2">Real projects. <em>Real impact.</em></h2>
              </div>
              <p className="cl-p cl-p-max">Not mockups. Not school assignments. Deployed software used by real people.</p>
            </div>

            <div className="cl-carousel reveal">
              {/* swipe hint */}
              <div className="cl-swipe-hint">
                <svg viewBox="0 0 24 24" fill="none"><path d="M8 7l4-4 4 4M16 17l-4 4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                SWIPE OR DRAG
              </div>

              <div
                className="cl-case-wrap"
                ref={carouselRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                style={{ touchAction:'pan-y', userSelect:'none', cursor:'grab' }}
              >
                <LiquidGlass
                  className="cl-case"
                  tint={pa}
                  intensity="medium"
                  rounded="10px"
                  style={{
                    '--case-accent': pa,
                    '--case-accent-lt': paLt,
                  }}
                >
                  <div className="cl-case-left">
                    <div className="cl-case-top">
                      <span className="cl-cat" style={{ color: pa, background: `${pa}14`, borderColor: `${pa}28` }}>{p.cat}</span>
                      <span className="cl-cbadge" style={{ color: pa, background: `${pa}12`, borderColor: `${pa}30` }}>{p.badge}</span>
                    </div>
                    <div className="cl-case-icon" style={{ color: pa }}>{p.icon}</div>
                    <h3 className="cl-case-title">{p.title}</h3>
                    <p className="cl-case-body">{p.body}</p>
                    <div className="cl-stack">
                      {p.stack.map(t => <span key={t} className="cl-stag">{t}</span>)}
                    </div>
                  </div>
                  <div className="cl-case-right">
                    <div className="cl-stat-circle" style={{ '--ac': pa, '--aclt': paLt }}>
                      <svg viewBox="0 0 120 120" className="cl-stat-svg">
                        <circle cx="60" cy="60" r="52" fill="none" stroke={`${pa}18`} strokeWidth="2"/>
                        <circle cx="60" cy="60" r="52" fill="none" stroke={`${pa}60`} strokeWidth="2"
                          strokeDasharray="326.7" strokeDashoffset="80" strokeLinecap="round"
                          transform="rotate(-90 60 60)"/>
                      </svg>
                      <div className="cl-stat-inner">
                        <span className="cl-sval" style={{ color: pa }}>{p.stat}</span>
                        <span className="cl-slbl">{p.statLbl}</span>
                      </div>
                    </div>
                    <div className="cl-carr-nav">
                      <button className="cl-carr-btn" onClick={e=>{e.stopPropagation();setCarouselIdx(i=>(i-1+PROJECTS.length)%PROJECTS.length)}} aria-label="Prev">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                      <div className="cl-carr-dots">
                        {PROJECTS.map((proj,i) => (
                          <button key={i}
                            className={`cl-carr-dot ${i===carouselIdx?'active':''}`}
                            onClick={e=>{e.stopPropagation();setCarouselIdx(i)}}
                            style={i===carouselIdx ? { background: ACCENT[proj.accentKey], boxShadow:`0 0 8px ${ACCENT[proj.accentKey]}80` } : {}}
                          />
                        ))}
                      </div>
                      <button className="cl-carr-btn" onClick={e=>{e.stopPropagation();setCarouselIdx(i=>(i+1)%PROJECTS.length)}} aria-label="Next">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      </button>
                    </div>
                    <div className="cl-carr-counter">
                      <span style={{ color: pa }}>0{carouselIdx+1}</span>
                      <span className="cl-carr-sep">/</span>
                      <span>0{PROJECTS.length}</span>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="cl-about">
          <div className="cl-wrap">
            <div className="cl-about-grid">
              <div className="reveal">
                <span className="cl-lbl">— BACKGROUND</span>
                <h2 className="cl-h2">I've been on <em>both sides</em> of a product.</h2>
                <p className="cl-p">Before I was an engineer, I was a <strong>business manager</strong>. At 19, I ran Grace Cup in Hinunangan, Southern Leyte — managing staff, vendors, customers, and operations every day for two and a half years. I know what happens when software fails a business. I've been that business.</p>
                <blockquote className="cl-quote">
                  <span className="cl-quote-mark">"</span>
                  I don't ask what tech stack to use. I ask what problem you're actually trying to solve.
                </blockquote>
                <p className="cl-p">I grew a client base from <strong>1 to 17 students in 2.5 months</strong> — purely through referrals and results. That taught me: people hire people they trust.</p>
                <p className="cl-p">The engineering part? <strong>Magna Cum Laude</strong>, BS Computer Engineering, SLSU 2025. National robotics champion. Three deployed systems — and now a full-time Software Engineer I at Xeleqt Technology, shipping in production.</p>
                <a className="cl-btn-p" href="#cl-contact" style={{ marginTop:'2rem',display:'inline-flex' }}>
                  <span>Work with me</span>
                  <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </a>
              </div>
              <div className="reveal">
                <span className="cl-lbl">— CREDENTIALS</span>
                <div className="cl-cred-grid">
                  {[
                    { v:'Magna',    l:'GRADUATED CUM LAUDE · SLSU',     color: ACCENT.emerald },
                    { v:'Champion', l:'ROBOTHON 2024 · NATIONAL',        color: ACCENT.amber   },
                    { v:'Vietnam',  l:'FIRST ENG. STUDENT EXCHANGE',     color: ACCENT.teal    },
                    { v:'2× Natl',  l:'NATIONAL QUALIFIER ROBOTICS',     color: ACCENT.rose    },
                    { v:'4+',       l:'TEAMS LED ACROSS 3 YEARS',        color: ACCENT.emerald },
                    { v:'3',        l:'SYSTEMS DEPLOYED LIVE',           color: ACCENT.teal    },
                  ].map(({ v, l, color }) => (
                    <LiquidGlass
                      key={v}
                      className="cl-cred"
                      tint={color}
                      intensity="subtle"
                      rounded="0"
                      style={{ '--cred-color': color }}
                    >
                      <span className="cl-cval" style={{ color }}>{v}</span>
                      <span className="cl-clbl">{l}</span>
                    </LiquidGlass>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section id="cl-process">
          <div className="cl-wrap">
            <span className="cl-lbl reveal">— HOW WE WORK</span>
            <h2 className="cl-proc-h2 reveal">Simple. Clear. <em>Delivered.</em></h2>
            <p className="cl-proc-sub reveal">Four steps. No disappearing mid-project. No surprise scope changes.</p>
            <div className="cl-steps reveal">
              <div className="cl-steps-line">
                <div className="cl-steps-progress"></div>
              </div>
              {[
                { n:'01', t:'Discovery Call', b:'We talk through your idea, timeline, and budget. I ask questions about your business, not just the features.', color: ACCENT.emerald },
                { n:'02', t:'Clear Proposal', b:'You get a written scope, timeline, and price. Everything is explicit before I write a single line of code.', color: ACCENT.teal },
                { n:'03', t:'Build Visibly', b:'Weekly progress updates. You see the work before it\'s finished. Feedback loops built into the process.', color: ACCENT.amber },
                { n:'04', t:'Deliver & Stay', b:'Tested, deployed, documented. I don\'t vanish after handoff. I\'m available when you need me.', color: ACCENT.rose },
              ].map((s, i) => (
                <LiquidGlass
                  key={s.n}
                  className="cl-step"
                  tint={s.color}
                  intensity="subtle"
                  rounded="8px"
                >
                  <div className="cl-step-dot" style={{ background: s.color, boxShadow:`0 0 12px ${s.color}60` }}></div>
                  <span className="cl-step-n" style={{ color: `${s.color}30` }}>{s.n}</span>
                  <div className="cl-step-t" style={{ color: s.color }}>{s.t}</div>
                  <p className="cl-step-b">{s.b}</p>
                </LiquidGlass>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="cl-contact">
          <div className="cl-wrap">
            <div className="cl-contact-split">
              <div className="cl-contact-left reveal">
                <span className="cl-lbl">— CONTACT</span>
                <h2 className="cl-contact-h2">Let's talk about<br/>your <em>project.</em></h2>
                <p className="cl-p">No commitment needed. Tell me what you're building and I'll tell you if I can help — and be honest if I can't.</p>
                <div className="cl-contact-status">
                  <span className="cl-bdot" style={{ background: ACCENT.teal }}></span>
                  <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:'.7rem', letterSpacing:'.14em', color: ACCENT.teal }}>CURRENTLY AVAILABLE</span>
                </div>
              </div>
              <div className="cl-contact-right reveal">
                {[
                  { type:'EMAIL',  val:'jillianburila@gmail.com', action:'SEND →',    href:'mailto:jillianburila@gmail.com', color: ACCENT.emerald,
                    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5"/></svg> },
                  { type:'COPY',   val:'jillianburila@gmail.com', action:'COPY ADDRESS', copy:true, color: ACCENT.teal,
                    icon:<svg viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/></svg> },
                  { type:'GITHUB', val:'github.com/jlliangrasya',  action:'VIEW →',   href:'https://github.com/jlliangrasya', color: ACCENT.amber,
                    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                  { type:'PHONE',  val:'09385056299',              action:'COPY',      copy:'09385056299', color: ACCENT.rose,
                    icon:<svg viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.8 2 2 0 015.07 6h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.91 13.8a16 16 0 006.29 6.29l1.06-.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
                ].map(row => (
                  <LiquidGlass
                    key={row.type}
                    as={row.href ? 'a' : 'div'}
                    className="cl-cr"
                    tint={row.color}
                    intensity="subtle"
                    rounded="0"
                    style={{ '--row-color': row.color, cursor: row.href ? 'pointer' : 'pointer', textDecoration:'none' }}
                    {...(row.href
                      ? { href: row.href, target: row.type==='GITHUB'?'_blank':undefined, rel:'noreferrer' }
                      : { onClick: e => window._clientCopy(row.copy || row.val, e.currentTarget) }
                    )}
                  >
                    <div className="cl-cr-l">
                      <span className="cl-cricon" style={{ color: row.color, background:`${row.color}12`, borderColor:`${row.color}25` }}>{row.icon}</span>
                      <div><span className="cl-crtype">{row.type}</span><span className="cl-crval">{row.val}</span></div>
                    </div>
                    <span className={row.copy ? 'cl-craction cr-action' : 'cl-craction'} style={{ color: row.color }}>{row.action}</span>
                  </LiquidGlass>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="cl-footer">
          <div className="cl-wrap cl-foot-inner">
            <span className="cl-brand">
              <span className="cl-brand-jg">JG</span>
              <span className="cl-brand-sep">/</span>
              <span className="cl-brand-name">Jillian Grace D. Burila</span>
            </span>
            <span className="cl-foot-sub">SWE I @ XELEQT · MAGNA CUM LAUDE · SLSU 2025</span>
          </div>
        </footer>

      </div>
      <JGLogo onSwitch={onSwitch}/>
    </>
  )
}

/* ── TECH STACK ──────────────────────────────────────────────────────── */
const TECH_STACK = [
  { name:'React',      svg:`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.2" fill="#61dafb"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.1" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.1" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61dafb" strokeWidth="1.1" fill="none" transform="rotate(120 12 12)"/></svg>` },
  { name:'Python',     svg:`<svg viewBox="0 0 24 24" fill="none"><path d="M12 2C9.2 2 7.5 3.2 7.5 5v2.5H12v1H5.5C3.5 8.5 2 10 2 12.5S3.5 16.5 5.5 16.5H7v2.5C7 21 8.8 22 11.5 22h1C15.2 22 17 21 17 19v-2.5h-4.5v-1h6.5c2 0 3-1.5 3-4S22 8.5 20 8.5H18.5V6c0-2.5-2-4-5-4H12z" stroke="#3776ab" strokeWidth="1.1" fill="none"/><circle cx="9.5" cy="5.5" r=".9" fill="#3776ab"/><circle cx="14.5" cy="18.5" r=".9" fill="#ffd43b"/></svg>` },
  { name:'Django',     svg:`<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#44b78b" strokeWidth="1.2" fill="rgba(68,183,139,0.08)"/><text x="5.5" y="16" fontFamily="serif" fontWeight="bold" fontSize="11" fill="#44b78b">Dj</text></svg>` },
  { name:'JavaScript', svg:`<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="2" fill="rgba(247,223,30,0.1)" stroke="#f7df1e" strokeWidth="1.1"/><text x="5" y="17" fontFamily="monospace" fontWeight="bold" fontSize="9" fill="#f7df1e">JS</text></svg>` },
  { name:'C / C++',    svg:`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9.5" stroke="#659ad2" strokeWidth="1.1" fill="rgba(101,154,210,0.07)"/><text x="5.5" y="16" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#659ad2">C++</text></svg>` },
  { name:'Unity',      svg:`<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L22 7.5v9L12 22 2 16.5v-9L12 2z" stroke="#aaa" strokeWidth="1.1" fill="rgba(170,170,170,0.07)"/><circle cx="12" cy="12" r="3" stroke="#aaa" strokeWidth="1.1" fill="none"/></svg>` },
  { name:'IoT',        svg:`<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" stroke="#2dd4bf" strokeWidth="1.5"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" stroke="#2dd4bf" strokeWidth="1.1" strokeLinecap="round" opacity=".5"/><path d="M16.24 7.76a6 6 0 010 8.49M7.76 7.76a6 6 0 000 8.49" stroke="#2dd4bf" strokeWidth="1.1" strokeLinecap="round" opacity=".75"/></svg>` },
  { name:'PHP',        svg:`<svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="5.5" stroke="#8892bf" strokeWidth="1.1" fill="rgba(136,146,191,0.08)"/><text x="7" y="15.5" fontFamily="monospace" fontWeight="bold" fontSize="7.5" fill="#8892bf">PHP</text></svg>` },
  { name:'Java',       svg:`<svg viewBox="0 0 24 24" fill="none"><path d="M8.5 16s-1 .5-3 .5c2 .5 6.5.25 6.5-3C12 10 6 9.5 6 6.5c0-2.5 3.5-3.5 7-3.5-1.5.5-5 1.5-5 4 0 2.5 6 3 6 6.5 0 2.5-2.5 3-5.5 2.5z" stroke="#e76f00" strokeWidth="1.1" fill="none"/><path d="M14.5 19.5s1.5-.5 1.5-1.5-1.5-1.5-5-2c2.5.5 5 1 5 2.5 0 1-1.5 1-1.5 1z" stroke="#e76f00" strokeWidth="1" fill="none"/></svg>` },
  { name:'HTML/CSS',   svg:`<svg viewBox="0 0 24 24" fill="none"><path d="M3 2l1.5 17L12 21l7.5-2L21 2H3z" stroke="#e34f26" strokeWidth="1.1" fill="rgba(227,79,38,0.07)"/><path d="M12 6H6.5L7 11h5v2.5H7.5L8 17l4 1 4-1 .5-5H12V11h4.5L17 6h-5z" stroke="#e34f26" strokeWidth="0.8" fill="none" opacity=".65"/></svg>` },
  { name:'AutoCAD',    svg:`<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="#e00" strokeWidth="1.1" fill="rgba(220,0,0,0.06)"/><path d="M7 17L12 7l5 10M9 14h6" stroke="#e00" strokeWidth="1.2" strokeLinecap="round"/></svg>` },
]

/* ── CSS ─────────────────────────────────────────────────────────────── */
const CLIENT_CSS = (dark) => `
/* ── ROOT ── */
.cl-root{
  background:${dark?'#04080d':'#f0fdf9'};
  color:${dark?'#e2e8f0':'#0d2318'};
  font-family:'DM Sans',system-ui,sans-serif;
  overflow-x:hidden; min-height:100vh;
  transition:background .35s,color .35s;
}
.cl-bg-svg{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0}
.cl-wrap{max-width:1100px;margin:0 auto;padding:0 2.5rem;position:relative;z-index:1}
@media(max-width:640px){.cl-wrap{padding:0 1.25rem}}
.reveal{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1)}
.reveal.visible{opacity:1;transform:none}

/* ── TYPE ── */
.cl-lbl{
  font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.28em;
  color:${dark?'#059669':'#065f46'};margin-bottom:1rem;display:block;
  text-transform:uppercase;
}
.cl-h1{
  font-family:'Fraunces',Georgia,serif;
  font-size:clamp(2.8rem,5.5vw,4.8rem);font-weight:700;line-height:1.03;
  letter-spacing:-.03em;color:${dark?'#ecfdf5':'#0d2318'};margin-bottom:1.6rem;
}
.cl-h1-accent{
  background:linear-gradient(135deg,#6ee7b7,#2dd4bf);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  font-style:italic;font-weight:300;
}
.cl-h1-cursor{
  display:inline-block;color:#10b981;
  animation:blink .9s step-end infinite;
  font-weight:200;margin-left:2px;
}
@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
.cl-h2{
  font-family:'Fraunces',Georgia,serif;font-size:clamp(1.9rem,3.5vw,2.9rem);
  font-weight:600;letter-spacing:-.02em;line-height:1.1;
  color:${dark?'#ecfdf5':'#0d2318'};
}
.cl-h2 em{
  font-style:italic;font-weight:300;
  background:linear-gradient(135deg,#34d399,#2dd4bf);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.cl-p{font-family:'DM Sans',sans-serif;font-size:.96rem;color:${dark?'#94a3b8':'#374151'};line-height:1.9;font-weight:300}
.cl-p strong{color:${dark?'#ecfdf5':'#0d2318'};font-weight:600}
.cl-p-max{max-width:460px}

/* ── NAV ── */
#cl-nav{
  position:fixed;top:0;left:0;right:0;z-index:100;
  background:transparent;transition:background .3s,border-color .3s,box-shadow .3s;
}
#cl-nav.scrolled{
  background:${dark?'rgba(7,15,13,0.95)':'rgba(240,253,249,0.95)'};
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid ${dark?'rgba(16,185,129,.12)':'rgba(5,150,105,.09)'};
  box-shadow:0 2px 30px ${dark?'rgba(0,0,0,.45)':'rgba(5,150,105,.05)'};
}
.cl-nav-inner{display:flex;align-items:center;justify-content:space-between;padding:.9rem 0}
.cl-brand{display:flex;align-items:center;gap:.4rem}
.cl-brand-jg{
  font-family:'Rajdhani',sans-serif;font-size:1.35rem;font-weight:700;
  background:linear-gradient(135deg,#6ee7b7 0%,#2dd4bf 50%,#34d399 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:.08em;
}
.cl-brand-sep{color:${dark?'rgba(255,255,255,.12)':'rgba(0,0,0,.18)'};font-weight:200;font-size:1.1rem;margin:0 .1rem}
.cl-brand-name{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:400;color:${dark?'#64748b':'#6b7280'}}
.cl-nav-links{display:flex;gap:2rem;list-style:none}
.cl-nav-links a{
  font-family:'DM Sans',sans-serif;font-size:.84rem;font-weight:500;
  color:${dark?'#64748b':'#6b7280'};text-decoration:none;transition:color .2s;position:relative;
}
.cl-nav-links a::after{
  content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;
  background:linear-gradient(90deg,#10b981,#2dd4bf);transition:width .3s;
}
.cl-nav-links a:hover{color:${dark?'#ecfdf5':'#0d2318'}}
.cl-nav-links a:hover::after{width:100%}
@media(max-width:640px){.cl-nav-links{display:none}}
.cl-nav-right{display:flex;align-items:center;gap:.75rem}
.cl-theme-btn{
  width:34px;height:34px;border-radius:50%;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)'};
  border:1px solid ${dark?'rgba(255,255,255,.09)':'rgba(0,0,0,.09)'};
  color:${dark?'#94a3b8':'#6b7280'};cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .2s;
}
.cl-theme-btn svg{width:15px;height:15px}
.cl-theme-btn:hover{background:rgba(16,185,129,.12);color:#34d399;border-color:rgba(16,185,129,.28)}
.cl-nav-cta{
  font-family:'DM Sans',sans-serif;font-size:.82rem;font-weight:600;letter-spacing:.04em;
  padding:.48rem 1.25rem;border-radius:4px;text-decoration:none;transition:all .2s;
  background:linear-gradient(135deg,#059669,#047857);color:#fff;
  box-shadow:0 0 18px rgba(5,150,105,.3);border:none;
}
.cl-nav-cta:hover{transform:translateY(-1px);box-shadow:0 0 26px rgba(16,185,129,.5)}

/* ── HERO ── */
#cl-hero{min-height:100vh;display:flex;align-items:center;padding:9rem 0 6rem;position:relative}
.cl-hero-grid{display:grid;grid-template-columns:1fr 400px;gap:5rem;align-items:center}
@media(max-width:900px){.cl-hero-grid{grid-template-columns:1fr;gap:4rem}}
.cl-avail-badge{
  display:inline-flex;align-items:center;gap:.6rem;
  font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.18em;
  color:${dark?'#6ee7b7':'#065f46'};
  padding:.4rem 1.1rem .4rem .7rem;border-radius:20px;
  background:${dark?'rgba(16,185,129,.08)':'rgba(5,150,105,.06)'};
  border:1px solid ${dark?'rgba(16,185,129,.2)':'rgba(5,150,105,.16)'};
  margin-bottom:2rem;position:relative;overflow:hidden;
}
.cl-avail-line{
  position:absolute;bottom:0;left:0;width:100%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(16,185,129,.5),transparent);
  animation:shimmer 2.5s ease-in-out infinite;
}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.cl-bdot{
  width:6px;height:6px;border-radius:50%;background:#10b981;
  animation:clpulse 2s ease-in-out infinite;flex-shrink:0;
}
@keyframes clpulse{0%,100%{opacity:1}50%{opacity:.2}}
.cl-hero-p{
  font-size:1.05rem;color:${dark?'#64748b':'#374151'};line-height:1.88;
  max-width:560px;margin-bottom:2.5rem;font-weight:300;
}
.cl-hero-p strong{color:${dark?'#ecfdf5':'#0d2318'};font-weight:600}
.cl-cta-row{display:flex;gap:.8rem;flex-wrap:wrap;margin-bottom:3.5rem}
.cl-btn-p{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:600;letter-spacing:.03em;
  padding:.82rem 1.8rem;background:linear-gradient(135deg,#059669,#0d9488);
  color:#fff;border-radius:6px;text-decoration:none;
  transition:all .28s cubic-bezier(.16,1,.3,1);border:none;
  display:inline-flex;align-items:center;gap:.55rem;
  box-shadow:0 0 22px rgba(5,150,105,.35);
}
.cl-btn-p svg{width:16px;height:16px;transition:transform .25s}
.cl-btn-p:hover{transform:translateY(-2px);box-shadow:0 0 36px rgba(16,185,129,.55)}
.cl-btn-p:hover svg{transform:translateX(3px)}
.cl-btn-s{
  font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;letter-spacing:.03em;
  padding:.82rem 1.8rem;background:transparent;border-radius:6px;text-decoration:none;
  transition:all .2s;border:1px solid ${dark?'rgba(255,255,255,.09)':'rgba(0,0,0,.11)'};
  color:${dark?'#94a3b8':'#6b7280'};display:inline-block;
}
.cl-btn-s:hover{border-color:rgba(16,185,129,.35);color:${dark?'#6ee7b7':'#065f46'};transform:translateY(-2px)}
.cl-metrics{
  display:flex;gap:0;padding:.2rem 0 0;
}
.cl-metric{padding:1.2rem 2.2rem 1rem 0;border-right:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};margin-right:2.2rem}
.cl-metric:last-child{border-right:none}
.cl-mval{font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;line-height:1;display:block}
.cl-mlbl{font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.18em;color:${dark?'#334155':'#9ca3af'};margin-top:.3rem;display:block}

/* ── PROFILE FRAME ── */
.cl-hero-right{display:flex;flex-direction:column;align-items:center;gap:1.2rem}
.cl-profile-frame{
  position:relative;width:320px;height:320px;
  display:flex;align-items:center;justify-content:center;
}
@media(max-width:640px){.cl-profile-frame{width:230px;height:230px}}
.cl-ring{position:absolute;border-radius:50%;animation:spin linear infinite}
.cl-ring-1{
  inset:0;border:1px solid transparent;
  border-top-color:rgba(16,185,129,.38);border-right-color:rgba(45,212,191,.25);
  animation-duration:12s;
}
.cl-ring-2{
  inset:14%;border:1px dashed ${dark?'rgba(245,158,11,.2)':'rgba(180,83,9,.15)'};
  animation-duration:20s;animation-direction:reverse;
}
.cl-ring-3{
  inset:28%;border:1px solid transparent;
  border-bottom-color:rgba(244,63,94,.3);border-left-color:rgba(16,185,129,.2);
  animation-duration:30s;
}
@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.cl-node{
  position:absolute;width:8px;height:8px;border-radius:50%;
  transform:translate(-50%,-50%);z-index:3;
}
.cl-node-t{top:0;left:50%;background:#10b981;box-shadow:0 0 8px #10b98180}
.cl-node-r{top:50%;right:-4px;left:auto;transform:translate(0,-50%);background:#2dd4bf;box-shadow:0 0 8px #2dd4bf80}
.cl-node-b{bottom:0;top:auto;left:50%;transform:translate(-50%,50%);background:#f59e0b;box-shadow:0 0 8px #f59e0b80}
.cl-node-l{top:50%;left:-4px;transform:translate(0,-50%);background:#f43f5e;box-shadow:0 0 8px #f43f5e80}
.cl-profile-img{
  width:68%;height:68%;object-fit:cover;border-radius:50%;
  position:relative;z-index:2;
  border:2px solid ${dark?'rgba(16,185,129,.35)':'rgba(5,150,105,.22)'};
  box-shadow:0 0 40px rgba(16,185,129,.18),0 0 0 6px ${dark?'rgba(16,185,129,.05)':'rgba(16,185,129,.04)'};
}
.cl-profile-badge{
  position:absolute;bottom:8%;right:-4%;z-index:4;
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.1em;
  color:${dark?'#6ee7b7':'#065f46'};
  background:${dark?'rgba(7,15,13,0.92)':'rgba(240,253,249,0.95)'};
  border:1px solid ${dark?'rgba(16,185,129,.28)':'rgba(5,150,105,.22)'};
  border-radius:20px;padding:.3rem .85rem;
  display:flex;align-items:center;gap:.45rem;backdrop-filter:blur(12px);
}
.cl-profile-badge svg{width:14px;height:14px}

/* ── CODE CARD ── */
.cl-code-card{
  overflow:hidden;font-family:'JetBrains Mono',monospace;
}
.cl-code-bar{
  display:flex;align-items:center;gap:.5rem;padding:.5rem .85rem;
  background:${dark?'rgba(255,255,255,.04)':'rgba(0,0,0,.04)'};
  border-bottom:1px solid ${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)'};
}
.cl-cd{width:10px;height:10px;border-radius:50%;flex-shrink:0}
.cl-cd.r{background:#ff5f57}.cl-cd.y{background:#febc2e}.cl-cd.g{background:#28c840}
.cl-code-title{font-size:.62rem;letter-spacing:.08em;color:${dark?'#475569':'#9ca3af'};margin-left:.2rem}
.cl-code-body{
  padding:.75rem 1rem;font-size:.72rem;line-height:1.8;
  color:${dark?'#94a3b8':'#6b7280'};margin:0;white-space:pre;overflow:hidden;
}
.cl-cv{color:#4ade80}

/* ── TECH MARQUEE ── */
#cl-techbar{
  padding:2.8rem 0;overflow:hidden;
  position:relative;z-index:1;
}
.cl-tech-track{
  display:flex;gap:1.4rem;width:max-content;
  animation:marquee 55s linear infinite;
}
#cl-techbar:hover .cl-tech-track{animation-play-state:paused}
@keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.cl-tech-chip{
  display:flex;align-items:center;gap:.7rem;flex-shrink:0;
  padding:.65rem 1.3rem;border-radius:10px;
  background:${dark?'rgba(255,255,255,.08)':'rgba(255,255,255,.82)'};
  border:1px solid ${dark?'rgba(16,185,129,.22)':'rgba(5,150,105,.18)'};
  box-shadow:${dark?'0 2px 12px rgba(0,0,0,.35), 0 0 0 1px rgba(16,185,129,.06)':'0 2px 10px rgba(5,150,105,.08)'};
  transition:all .25s;cursor:default;
}
.cl-tech-chip:hover{
  background:${dark?'rgba(16,185,129,.14)':'rgba(110,231,183,.2)'};
  border-color:${dark?'rgba(16,185,129,.4)':'rgba(5,150,105,.3)'};
  transform:translateY(-3px);
  box-shadow:0 6px 20px ${dark?'rgba(16,185,129,.22)':'rgba(5,150,105,.14)'};
}
.cl-tech-icon{width:26px;height:26px;display:flex;align-items:center;justify-content:center}
.cl-tech-icon svg{width:100%;height:100%}
.cl-tech-name{font-family:'JetBrains Mono',monospace;font-size:.72rem;letter-spacing:.06em;color:${dark?'#a1a1aa':'#374151'};white-space:nowrap;font-weight:500}

/* ── SERVICES ── */
#cl-services{padding:8rem 0}
.cl-section-head{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:end;margin-bottom:4.5rem}
@media(max-width:640px){.cl-section-head{grid-template-columns:1fr}}
.cl-svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)'};}
@media(max-width:700px){.cl-svc-grid{grid-template-columns:1fr}}
.cl-svc-card{
  padding:2.4rem 2rem;transition:transform .28s cubic-bezier(.16,1,.3,1);
  position:relative;overflow:hidden;
}
.cl-svc-card:hover{transform:translateY(-4px)}
.cl-svc-accent-bar{
  position:absolute;top:0;left:0;width:3px;height:100%;
  transition:width .35s ease;
}
.cl-svc-emerald .cl-svc-accent-bar{background:linear-gradient(180deg,#10b981,#059669)}
.cl-svc-teal    .cl-svc-accent-bar{background:linear-gradient(180deg,#2dd4bf,#0d9488)}
.cl-svc-amber   .cl-svc-accent-bar{background:linear-gradient(180deg,#f59e0b,#d97706)}
.cl-svc-card:hover .cl-svc-accent-bar{width:4px}
.cl-svc-emerald:hover{box-shadow:0 0 40px rgba(16,185,129,.1),-4px 0 0 #10b981}
.cl-svc-teal:hover   {box-shadow:0 0 40px rgba(45,212,191,.1),-4px 0 0 #2dd4bf}
.cl-svc-amber:hover  {box-shadow:0 0 40px rgba(245,158,11,.1),-4px 0 0 #f59e0b}
.cl-svc-icon{width:34px;height:34px;margin-bottom:1rem}
.cl-svc-icon svg{width:100%;height:100%}
.cl-svc-emerald .cl-svc-icon{color:#10b981}
.cl-svc-teal    .cl-svc-icon{color:#2dd4bf}
.cl-svc-amber   .cl-svc-icon{color:#f59e0b}
.cl-sc-num{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.2em;color:${dark?'#1a3d2e':'#9ca3af'};margin-bottom:.85rem}
.cl-sc-title{font-family:'Fraunces',Georgia,serif;font-size:1.3rem;font-weight:600;color:${dark?'#ecfdf5':'#0d2318'};letter-spacing:-.02em;margin-bottom:.65rem}
.cl-sc-body{font-family:'DM Sans',sans-serif;font-size:.87rem;color:${dark?'#475569':'#6b7280'};line-height:1.78;font-weight:300}
.cl-sc-tags{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1.2rem}
.cl-svc-emerald .cl-sc-tag{color:#6ee7b7;background:rgba(16,185,129,.1);border:1px solid rgba(16,185,129,.2)}
.cl-svc-teal    .cl-sc-tag{color:#2dd4bf;background:rgba(45,212,191,.08);border:1px solid rgba(45,212,191,.18)}
.cl-svc-amber   .cl-sc-tag{color:#f59e0b;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.18)}
.cl-sc-tag{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:.22rem .65rem;border-radius:3px}

/* ── CAROUSEL ── */
#cl-work{
  padding:8rem 0;
  background:${dark?'rgba(16,185,129,.025)':'rgba(240,253,249,.65)'};
  border-top:1px solid ${dark?'rgba(16,185,129,.07)':'rgba(5,150,105,.06)'};
  border-bottom:1px solid ${dark?'rgba(16,185,129,.07)':'rgba(5,150,105,.06)'};
}
.cl-swipe-hint{
  display:inline-flex;align-items:center;gap:.45rem;margin-bottom:1.2rem;
  font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.18em;
  color:${dark?'#1a3d2e':'#9ca3af'};
}
.cl-swipe-hint svg{width:14px;height:14px}
.cl-case-wrap{transition:transform .15s ease}
.cl-case{
  padding:2.6rem;
  display:grid;grid-template-columns:1fr 220px;gap:2.5rem;align-items:start;
  min-height:300px;transition:box-shadow .3s;
}
@media(max-width:700px){.cl-case{grid-template-columns:1fr}}
.cl-case-top{display:flex;align-items:center;gap:.75rem;margin-bottom:1.2rem;flex-wrap:wrap}
.cl-cat{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.14em;padding:.22rem .75rem;border-radius:3px}
.cl-cbadge{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.1em;padding:.22rem .75rem;border-radius:3px}
.cl-case-icon{font-size:2rem;margin-bottom:.75rem;display:block;line-height:1;opacity:.7}
.cl-case-title{font-family:'Fraunces',Georgia,serif;font-size:1.45rem;font-weight:600;letter-spacing:-.02em;color:${dark?'#ecfdf5':'#0d2318'};margin-bottom:.7rem}
.cl-case-body{font-family:'DM Sans',sans-serif;font-size:.9rem;color:${dark?'#64748b':'#374151'};line-height:1.78;font-weight:300;max-width:520px}
.cl-stack{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:1rem}
.cl-stag{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.08em;padding:.2rem .6rem;background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.04)'};color:${dark?'#475569':'#9ca3af'};border:1px solid ${dark?'rgba(255,255,255,.07)':'rgba(0,0,0,.07)'};border-radius:3px}
.cl-case-right{display:flex;flex-direction:column;align-items:center;gap:1.2rem}
.cl-stat-circle{position:relative;width:120px;height:120px;flex-shrink:0}
.cl-stat-svg{position:absolute;inset:0;width:100%;height:100%}
.cl-stat-inner{
  position:absolute;inset:0;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:12px;
}
.cl-sval{font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;line-height:1;display:block}
.cl-slbl{font-family:'JetBrains Mono',monospace;font-size:.5rem;letter-spacing:.1em;color:${dark?'#334155':'#9ca3af'};display:block;margin-top:.3rem;line-height:1.4}
.cl-carr-nav{display:flex;align-items:center;gap:.75rem}
.cl-carr-btn{
  width:36px;height:36px;border-radius:50%;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:all .2s;
  background:${dark?'rgba(255,255,255,.05)':'rgba(255,255,255,.7)'};
  border:1px solid ${dark?'rgba(16,185,129,.15)':'rgba(5,150,105,.12)'};
  color:${dark?'#64748b':'#6b7280'};
}
.cl-carr-btn svg{width:16px;height:16px}
.cl-carr-btn:hover{background:rgba(16,185,129,.14);color:#6ee7b7;border-color:rgba(16,185,129,.3)}
.cl-carr-dots{display:flex;gap:.45rem;align-items:center}
.cl-carr-dot{width:6px;height:6px;border-radius:50%;background:${dark?'rgba(255,255,255,.14)':'rgba(0,0,0,.14)'};border:none;cursor:pointer;padding:0;transition:all .25s}
.cl-carr-dot.active{transform:scale(1.5)}
.cl-carr-counter{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;color:${dark?'#334155':'#9ca3af'}}
.cl-carr-sep{margin:0 .3rem;opacity:.4}

/* ── ABOUT ── */
#cl-about{padding:8rem 0}
.cl-about-grid{display:grid;grid-template-columns:1fr 1fr;gap:7rem;align-items:start}
@media(max-width:768px){.cl-about-grid{grid-template-columns:1fr;gap:3.5rem}}
.cl-quote{
  position:relative;padding:1.2rem 1.5rem;margin:1.8rem 0;border-radius:6px;
  background:${dark?'rgba(16,185,129,.07)':'rgba(16,185,129,.05)'};
  border:1px solid ${dark?'rgba(16,185,129,.18)':'rgba(5,150,105,.14)'};
  font-family:'Fraunces',Georgia,serif;font-size:1.05rem;font-style:italic;
  color:${dark?'#6ee7b7':'#065f46'};line-height:1.68;font-weight:300;
}
.cl-quote-mark{font-size:3rem;line-height:.6;vertical-align:-.5rem;margin-right:.25rem;opacity:.4}
.cl-cred-grid{
  display:grid;grid-template-columns:1fr 1fr;gap:1px;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.07)'};
}
.cl-cred{
  padding:1.3rem;transition:all .2s;position:relative;overflow:hidden;
}
.cl-cred::before{
  content:'';position:absolute;top:0;right:0;width:2px;height:0;
  background:var(--cred-color);transition:height .3s ease;
}
.cl-cred:hover::before{height:100%}
.cl-cred:hover{background:${dark?'rgba(255,255,255,.04)':'rgba(255,255,255,.98)'}}
.cl-cval{font-family:'Rajdhani',sans-serif;font-size:1.4rem;font-weight:700;display:block;margin-bottom:.2rem}
.cl-clbl{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.13em;color:${dark?'#1a3d2e':'#9ca3af'}}

/* ── PROCESS ── */
#cl-process{
  padding:8rem 0;
  background:${dark?'rgba(16,185,129,.025)':'rgba(240,253,249,.65)'};
  border-top:1px solid ${dark?'rgba(16,185,129,.07)':'rgba(5,150,105,.06)'};
  border-bottom:1px solid ${dark?'rgba(16,185,129,.07)':'rgba(5,150,105,.06)'};
}
.cl-proc-h2{font-family:'Fraunces',Georgia,serif;font-size:clamp(2rem,4vw,3rem);font-weight:600;letter-spacing:-.02em;color:${dark?'#ecfdf5':'#0d2318'};margin-bottom:.5rem}
.cl-proc-h2 em{
  font-style:italic;font-weight:300;
  background:linear-gradient(135deg,#34d399,#2dd4bf);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.cl-proc-sub{font-family:'DM Sans',sans-serif;font-size:.95rem;color:${dark?'#1a3d2e':'#9ca3af'};font-weight:300;margin-bottom:4.5rem;max-width:400px}
.cl-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative}
@media(max-width:700px){.cl-steps{grid-template-columns:1fr 1fr}}
@media(max-width:480px){.cl-steps{grid-template-columns:1fr}}
.cl-steps-line{
  position:absolute;top:22px;left:0;right:0;height:1px;
  background:${dark?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)'};z-index:0;
}
@media(max-width:700px){.cl-steps-line{display:none}}
.cl-steps-progress{height:1px;background:linear-gradient(90deg,#10b981,#2dd4bf,#f59e0b,#f43f5e);width:75%;transition:width .6s ease}
.cl-step{padding:1.8rem 1.8rem 1.8rem 1.6rem;position:relative;z-index:1}
@media(max-width:700px){.cl-step{padding:1.6rem}}
.cl-step-dot{width:12px;height:12px;border-radius:50%;margin-bottom:1.4rem;position:relative}
.cl-step-dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;background:inherit;opacity:.2;animation:clpulse 2.5s ease-in-out infinite}
.cl-step-n{font-family:'Rajdhani',sans-serif;font-size:2.8rem;font-weight:700;letter-spacing:-.04em;line-height:1;margin-bottom:.8rem;display:block}
.cl-step-t{font-family:'Fraunces',Georgia,serif;font-size:1.05rem;font-weight:600;letter-spacing:-.01em;margin-bottom:.55rem}
.cl-step-b{font-family:'DM Sans',sans-serif;font-size:.84rem;color:${dark?'#334155':'#9ca3af'};line-height:1.75;font-weight:300}

/* ── CONTACT ── */
#cl-contact{padding:9rem 0}
.cl-contact-split{display:grid;grid-template-columns:1fr 1.1fr;gap:6rem;align-items:start}
@media(max-width:768px){.cl-contact-split{grid-template-columns:1fr;gap:3rem}}
.cl-contact-h2{font-family:'Fraunces',Georgia,serif;font-size:clamp(2.5rem,5vw,4rem);font-weight:700;letter-spacing:-.03em;line-height:1.06;margin-bottom:1.2rem;color:${dark?'#ecfdf5':'#0d2318'}}
.cl-contact-h2 em{
  font-style:italic;font-weight:300;
  background:linear-gradient(135deg,#6ee7b7,#2dd4bf);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.cl-contact-status{display:flex;align-items:center;gap:.65rem;margin-top:2rem}
.cl-contact-rows{display:flex;flex-direction:column;gap:1px;background:${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'};border-radius:8px;overflow:hidden}
.cl-cr{
  padding:1rem 1.3rem;display:flex;align-items:center;justify-content:space-between;
  transition:all .2s;text-decoration:none;position:relative;overflow:hidden;
}
.cl-cr::before{
  content:'';position:absolute;left:0;top:0;width:0;height:100%;
  background:var(--row-color,#10b981);opacity:.04;transition:width .25s;
}
.cl-cr:hover::before{width:100%}
.cl-cr:hover{background:${dark?'rgba(255,255,255,.04)':'rgba(255,255,255,.98)'}}
.cl-cr-l{display:flex;align-items:center;gap:.85rem;position:relative;z-index:1}
.cl-cricon{
  width:32px;height:32px;border-radius:7px;flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  border:1px solid;transition:all .2s;
}
.cl-cricon svg{width:14px;height:14px}
.cl-crtype{font-family:'JetBrains Mono',monospace;font-size:.55rem;letter-spacing:.18em;color:${dark?'#334155':'#9ca3af'};display:block}
.cl-crval{font-family:'DM Sans',sans-serif;font-size:.88rem;font-weight:500;color:${dark?'#ecfdf5':'#0d2318'};display:block}
.cl-craction{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.14em;transition:all .2s;position:relative;z-index:1;white-space:nowrap}
.cf{color:#4ade80 !important}

/* ── FOOTER ── */
.cl-footer{border-top:1px solid ${dark?'rgba(16,185,129,.07)':'rgba(5,150,105,.06)'};padding:2rem 0}
.cl-foot-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem}
.cl-foot-sub{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.14em;color:${dark?'#0d2a1e':'#9ca3af'}}

/* ── RESPONSIVE ── */
@media(max-width:768px){
  .cl-metrics{flex-direction:column}
  .cl-metric{border-right:none;margin-right:0;padding:.8rem 0;border-bottom:1px solid ${dark?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)'}}
  .cl-metric:last-child{border-bottom:none}
  .cl-cta-row{flex-direction:column;align-items:flex-start}
  .cl-btn-p,.cl-btn-s{width:100%;justify-content:center;text-align:center}
}
@media(max-width:480px){
  #cl-hero{padding:7rem 0 4rem;min-height:auto}
  .cl-h1{font-size:clamp(2.2rem,7vw,2.8rem)}
  .cl-hero-p{font-size:.9rem}
  .cl-contact-h2{font-size:clamp(2rem,6vw,3rem)}
  .cl-about-grid{gap:2.5rem}
  .cl-cred-grid{grid-template-columns:1fr}
  .cl-steps{grid-template-columns:1fr !important}
  .cl-case-title{font-size:1.2rem}
  .cl-sval{font-size:1.8rem}
  .cl-hero-right{display:none}
  .cl-foot-inner{flex-direction:column;text-align:center}
}
`
