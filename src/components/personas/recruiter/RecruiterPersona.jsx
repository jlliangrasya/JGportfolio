import { useEffect, useRef } from 'react'
import SwitchButton from '../../shared/SwitchButton.jsx'
import { STATS, SKILL_BRANCHES, QUESTS, ACHIEVEMENTS, ROLE_MSGS } from '../../../data/index.js'

/* ─── NOTE TO DEVELOPER ────────────────────────────────────────────
   This component bootstraps the full RPG experience into a container
   div using vanilla JS (matching the recruiter-rpg-v2.html prototype).
   All game logic, animations, and DOM manipulation runs in useEffect.
   The inline <style> tag scopes all CSS to .rpg-root to avoid leaks.
──────────────────────────────────────────────────────────────────── */

export default function RecruiterPersona({ onSwitch }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    /* Inject the full RPG experience — mirrors recruiter-rpg-v2.html */
    root.innerHTML = buildHTML()

    const SCREENS = ['s0','s1','s2','s3','s4','s5']
    const SLABELS = ['INITIALIZING','CHARACTER OVERVIEW','SKILL TREE','QUEST LOG','ACHIEVEMENTS','RECRUIT']
    const HINTS = [
      'LOADING CANDIDATE FILE...',
      'CLICK STATS TO INSPECT · CLICK SKILLS TO JUMP · CLICK LEVEL FOR XP',
      'CLICK ANY NODE TO SEE PROJECT CONTEXT',
      'CLICK QUEST CARDS TO EXPAND · FILTER BY TECH STACK',
      'CLICK ACHIEVEMENTS TO UNLOCK DETAILS',
      'SELECT ROLE TYPE · CLICK CONTACTS TO COPY',
    ]

    let cur = 0, booted = false, selectedSkill = null

    /* — DOTS — */
    function initDots() {
      const c = root.querySelector('#indicators')
      if (!c) return
      c.innerHTML = ''
      SCREENS.forEach((_, i) => {
        const d = document.createElement('div')
        d.className = 'rpg-sdot' + (i === 0 ? ' on' : '')
        d.onclick = () => jumpTo(i)
        c.appendChild(d)
      })
    }

    function updateNav() {
      const prev = root.querySelector('#prevBtn')
      const next = root.querySelector('#nextBtn')
      const lbl  = root.querySelector('#sLabel')
      const hint = root.querySelector('#hintText')
      if (prev) prev.disabled = cur === 0
      if (next) next.disabled = cur === SCREENS.length - 1
      if (lbl)  lbl.textContent = SLABELS[cur]
      if (hint) hint.textContent = HINTS[cur]
      root.querySelectorAll('.rpg-sdot').forEach((d, i) => d.classList.toggle('on', i === cur))
    }

    function navigate(dir) {
      if (!booted && cur === 0) return
      goTo(cur + dir, dir > 0 ? 'l' : 'r')
    }

    function jumpTo(idx) {
      if (!booted && idx > 0) return
      if (idx === cur) return
      goTo(idx, idx > cur ? 'l' : 'r')
    }

    function goTo(idx, exitDir) {
      closeStatPanel()
      const old = root.querySelector('#' + SCREENS[cur])
      if (!old) return
      old.classList.remove('rpg-active')
      old.classList.add(exitDir === 'l' ? 'rpg-exit-l' : 'rpg-exit-r')
      setTimeout(() => old.classList.remove('rpg-exit-l', 'rpg-exit-r'), 400)
      cur = idx
      const nxt = root.querySelector('#' + SCREENS[cur])
      if (!nxt) return
      nxt.style.transform = exitDir === 'l' ? 'translateX(60px)' : 'translateX(-60px)'
      nxt.classList.add('rpg-active')
      setTimeout(() => { nxt.style.transform = '' }, 10)
      updateNav()
      if (cur === 1) animateStats()
    }

    /* — BOOT — */
    const BOOT_LINES = [
      { html: '> INITIALIZING CANDIDATE SCANNER v2025...', delay: 0 },
      { html: '> LOADING FILE: <span style="color:#e2e8f0">JILLIAN GRACE D. BURILA</span>', delay: 400 },
      { html: '> LOCATION: <span style="color:#e2e8f0">HINUNANGAN, SOUTHERN LEYTE, PH</span>', delay: 750 },
      { html: '> ACADEMIC RANK: <span style="color:#f59e0b">MAGNA CUM LAUDE ★</span>', delay: 1050 },
      { html: '> COMPETITION STATUS: <span style="color:#f59e0b">ROBOTHON CHAMPION 2024</span>', delay: 1300 },
      { html: '> INTERNATIONAL: <span style="color:#e2e8f0">VIETNAM CULTURAL EXCHANGE ✓</span>', delay: 1550 },
      { html: '> SYSTEMS DEPLOYED: <span style="color:#4ade80">3 CONFIRMED ✓</span>', delay: 1800 },
      { html: '> THREAT LEVEL TO MEDIOCRITY: <span style="color:#f59e0b">CRITICAL</span>', delay: 2050 },
      { html: '> CANDIDATE STATUS: <span style="color:#4ade80">AVAILABLE FOR HIRE ✓</span>', delay: 2300 },
    ]

    function runBoot() {
      const container = root.querySelector('#bootLines')
      const fill = root.querySelector('#bootFill')
      if (!container || !fill) return
      BOOT_LINES.forEach((item, i) => {
        const d = document.createElement('div')
        d.className = 'rpg-bl'
        d.innerHTML = item.html
        container.appendChild(d)
        setTimeout(() => {
          d.classList.add('show')
          fill.style.width = ((i + 1) / BOOT_LINES.length * 100) + '%'
        }, item.delay)
      })
      setTimeout(() => {
        const p = root.querySelector('#bootPrompt')
        if (p) p.classList.add('show')
        booted = true
      }, 2800)
    }

    /* — STATS — */
    function animateStats() {
      const bars = [
        { id: 'sf-tech', val: 92 }, { id: 'sf-lead', val: 88 },
        { id: 'sf-comm', val: 95 }, { id: 'sf-build', val: 85 },
        { id: 'sf-creat', val: 80 },
      ]
      bars.forEach((b, i) => setTimeout(() => {
        const el = root.querySelector('#' + b.id)
        if (el) el.style.width = b.val + '%'
      }, i * 110))
    }

    function showStatPanel(key) {
      const stat = STATS.find(s => s.key === key)
      if (!stat) return
      const panel = root.querySelector('#statPanel')
      const nm    = root.querySelector('#sp-name')
      const sc    = root.querySelector('#sp-score')
      const src   = root.querySelector('#sp-sources')
      if (!panel || !nm || !sc || !src) return
      nm.textContent = stat.key.toUpperCase()
      nm.style.color = stat.color
      sc.textContent = 'Score: ' + (stat.value || 'See breakdown') + (stat.value ? ' / 100' : '')
      src.innerHTML = stat.sources.map(s => `<div class="rpg-sp-source"><strong>${s.title}</strong><br>${s.text}</div>`).join('')
      panel.classList.add('open')
      root.querySelectorAll('.rpg-stat-row').forEach(r => r.classList.remove('selected'))
      const row = root.querySelector('#sr-' + key)
      if (row) row.classList.add('selected')
    }

    function closeStatPanel() {
      root.querySelector('#statPanel')?.classList.remove('open')
      root.querySelectorAll('.rpg-stat-row').forEach(r => r.classList.remove('selected'))
    }

    /* — SKILL TREE — */
    function buildSkillTree() {
      const container = root.querySelector('#branches')
      if (!container) return
      SKILL_BRANCHES.forEach(branch => {
        const div = document.createElement('div')
        div.className = 'rpg-branch'
        div.innerHTML = `<div class="rpg-branch-lbl">${branch.branch}</div>`
        branch.nodes.forEach(node => {
          const n = document.createElement('div')
          n.className = `rpg-node ${node.state}`
          n.dataset.name = node.name
          if (node.state !== 'locked') {
            n.onclick = () => selectNode(n, node)
          }
          n.innerHTML = `<div class="rpg-nd"></div><div class="rpg-nm">${node.name}</div>`
          div.appendChild(n)
        })
        container.appendChild(div)
      })
    }

    function selectNode(el, node) {
      root.querySelectorAll('.rpg-node').forEach(n => n.classList.remove('selected'))
      el.classList.add('selected')
      const sd = root.querySelector('#skillDetail')
      const nm = root.querySelector('#sd-name')
      const cx = root.querySelector('#sd-ctx')
      if (sd && nm && cx) {
        nm.textContent = node.name
        cx.textContent = node.ctx
        sd.classList.add('show')
      }
    }

    function closeSkillDetail() {
      root.querySelectorAll('.rpg-node').forEach(n => n.classList.remove('selected'))
      root.querySelector('#skillDetail')?.classList.remove('show')
    }

    /* — QUEST LOG — */
    function buildQuestLog() {
      const container = root.querySelector('#questList')
      if (!container) return
      QUESTS.forEach((q, i) => {
        const div = document.createElement('div')
        div.className = 'rpg-quest'
        div.id = 'quest-' + i
        div.innerHTML = `
          <div class="rpg-quest-head" onclick="window._rpgToggleQuest(${i})">
            <div class="rpg-q-ico">${q.ico}</div>
            <div>
              <div class="rpg-q-name">${q.name}</div>
              <div class="rpg-q-org">${q.org}</div>
            </div>
            <div class="rpg-q-right">
              <span class="rpg-q-status ${q.statusClass}">${q.status}</span>
              <span class="rpg-q-xp">${q.xp}</span>
              <span class="rpg-q-chevron">▶</span>
            </div>
          </div>
          <div class="rpg-quest-body">
            <div class="rpg-quest-inner">
              <div class="rpg-q-desc">${q.desc}</div>
              <div class="rpg-q-stack">${q.stack.map(t => `<span class="rpg-stag" onclick="window._rpgFilterQuests('${t}',null)">${t}</span>`).join('')}</div>
            </div>
          </div>`
        container.appendChild(div)
      })
      window._rpgToggleQuest = (i) => {
        const q = root.querySelector('#quest-' + i)
        const was = q.classList.contains('expanded')
        root.querySelectorAll('.rpg-quest').forEach(el => el.classList.remove('expanded'))
        if (!was) q.classList.add('expanded')
      }
      window._rpgFilterQuests = (tag, el) => {
        root.querySelectorAll('.rpg-ftag').forEach(f => f.classList.remove('on'))
        if (el) el.classList.add('on')
        root.querySelectorAll('.rpg-quest').forEach((q, i) => {
          if (tag === 'all') { q.classList.remove('hidden'); return }
          q.classList.toggle('hidden', !QUESTS[i].stack.includes(tag))
        })
      }
    }

    /* — ACHIEVEMENTS — */
    function buildAchievements() {
      const grid = root.querySelector('#achGrid')
      if (!grid) return
      const colors = { legendary: '#f59e0b', epic: '#a78bfa', rare: '#22d3ee', uncommon: '#4ade80' }
      ACHIEVEMENTS.forEach(a => {
        const div = document.createElement('div')
        div.className = `rpg-ach ${a.rarityClass}`
        div.innerHTML = `
          <div class="rpg-ach-top">
            <div class="rpg-ach-ico">${a.ico}</div>
            <span class="rpg-rarity ${a.rarityClass}">${a.rarity}</span>
          </div>
          <div class="rpg-ach-name">${a.name}</div>
          <div class="rpg-ach-desc">${a.desc}</div>
          <div class="rpg-ach-hint">[ CLICK TO INSPECT ]</div>`
        div.onclick = () => showAchOverlay(a, colors[a.rarityClass])
        grid.appendChild(div)
      })
    }

    function showAchOverlay(a, color) {
      const ov = root.querySelector('#achOverlay')
      const pp = root.querySelector('#achPopup')
      if (!ov || !pp) return
      pp.style.setProperty('--ach-color', color)
      root.querySelector('#au-label').textContent = a.rarity + ' ACHIEVEMENT UNLOCKED'
      root.querySelector('#au-label').style.color = color
      root.querySelector('#au-icon').textContent = a.ico
      root.querySelector('#au-icon').style.color = color
      root.querySelector('#au-name').textContent = a.name
      root.querySelector('#au-desc').textContent = a.desc
      const btn = root.querySelector('#au-close')
      btn.style.borderColor = color
      btn.style.color = color
      ov.classList.add('show')
    }

    function closeAchOverlay() {
      root.querySelector('#achOverlay')?.classList.remove('show')
    }

    /* — HIRE SCREEN — */
    function setRole(key, el) {
      root.querySelectorAll('.rpg-role-opt').forEach(r => r.classList.remove('on'))
      el.classList.add('on')
      const msg = root.querySelector('#roleMsg')
      if (msg) {
        msg.style.opacity = '0'
        setTimeout(() => { msg.textContent = ROLE_MSGS[key]; msg.style.opacity = '1' }, 200)
      }
    }

    function copyContact(text, el) {
      navigator.clipboard.writeText(text).then(() => {
        const c = el.querySelector('.rpg-c-copy')
        if (!c) return
        c.textContent = 'COPIED!'
        c.classList.add('flash')
        setTimeout(() => { c.textContent = 'CLICK TO COPY'; c.classList.remove('flash') }, 1800)
      })
    }

    /* Expose needed functions to inline handlers */
    window._rpgNavigate    = navigate
    window._rpgShowStat    = showStatPanel
    window._rpgClosePanel  = closeStatPanel
    window._rpgSelectSkill = selectNode
    window._rpgCloseSDetail= closeSkillDetail
    window._rpgCloseAch    = closeAchOverlay
    window._rpgSetRole     = setRole
    window._rpgCopy        = copyContact

    /* — KEYBOARD — */
    const onKey = (e) => {
      const achOpen = root.querySelector('#achOverlay')?.classList.contains('show')
      if (achOpen) { if (e.key === 'Escape' || e.key === ' ') closeAchOverlay(); return }
      if (!booted && cur === 0) { if (e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') navigate(1); return }
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
      if (e.key === 'Escape') closeStatPanel()
    }
    document.addEventListener('keydown', onKey)

    /* — BOOT — */
    initDots()
    updateNav()
    buildSkillTree()
    buildQuestLog()
    buildAchievements()
    runBoot()

    return () => {
      document.removeEventListener('keydown', onKey)
      delete window._rpgNavigate
      delete window._rpgShowStat
      delete window._rpgClosePanel
      delete window._rpgToggleQuest
      delete window._rpgFilterQuests
      delete window._rpgCloseAch
      delete window._rpgSetRole
      delete window._rpgCopy
    }
  }, [])

  return (
    <>
      <style>{RPG_CSS}</style>
      <div ref={rootRef} className="rpg-root" />
      <SwitchButton onSwitch={onSwitch} />
    </>
  )
}

/* ── HTML TEMPLATE ── */
function buildHTML() {
  return `
<div class="rpg-bg-grid"></div>
<div class="rpg-vignette"></div>

<div id="rpg-topbar">
  <div class="rpg-tb-brand">CANDIDATE FILE</div>
  <div class="rpg-tb-id">REF: JGB-2025 · CLEARANCE: MAGNA CUM LAUDE</div>
  <div class="rpg-tb-status"><div class="rpg-pdot"></div>AVAILABLE FOR HIRE</div>
</div>

<div id="rpg-hintbar"><span id="hintText">LOADING...</span></div>

<div id="rpg-vp">

  <div class="rpg-screen rpg-active" id="s0">
    <div class="rpg-boot-lines" id="bootLines"></div>
    <div class="rpg-boot-bar"><div class="rpg-boot-fill" id="bootFill"></div></div>
    <div class="rpg-boot-prompt" id="bootPrompt">&gt;_ PRESS ANY KEY TO ACCESS FILE <span class="rpg-blink">█</span></div>
  </div>

  <div class="rpg-screen" id="s1">
    <div class="rpg-s1-layout" style="position:relative;overflow:hidden">
      <div>
        <div class="rpg-card">
          <div class="rpg-avatar" id="avatarBtn" onclick="window._rpgShowStat('xp')">JG</div>
          <div class="rpg-avatar-hint">[ CLICK FOR XP ]</div>
          <div class="rpg-char-name">Jillian Grace</div>
          <div class="rpg-char-class" onclick="document.querySelector('#s2') && window._rpgNavigate(1)" style="cursor:pointer">FULL-STACK ENGINEER ↗</div>
          <div class="rpg-char-sub">Subclass: Game Dev · IoT Specialist</div>
          <div class="rpg-char-info">Hinunangan, S. Leyte<br>jillianburila@gmail.com</div>
          <div class="rpg-lvl" onclick="window._rpgShowStat('xp')">
            <div class="rpg-lvl-n">22</div>
            <div class="rpg-lvl-l">LEVEL<br>ENGINEER</div>
          </div>
        </div>
      </div>
      <div>
        <div class="rpg-card" style="height:100%">
          <div class="rpg-sec-lbl">// CORE ATTRIBUTES — CLICK ANY STAT TO INSPECT</div>
          ${['tech','lead','comm','build','creat'].map((k,i)=>{
            const colors=['#22d3ee','#f59e0b','#a78bfa','#4ade80','#f87171']
            const labels=['TECH','LEAD','COMM','BUILD','CREAT']
            const vals=[92,88,95,85,80]
            return `<div class="rpg-stat-row" id="sr-${k}" onclick="window._rpgShowStat('${k}')">
              <div class="rpg-sn">${labels[i]}</div>
              <div class="rpg-st"><div class="rpg-sf" id="sf-${k}" style="background:${colors[i]}"></div></div>
              <div class="rpg-sv">${vals[i]}</div>
            </div>`
          }).join('')}
          <div style="margin-top:1rem;padding-top:.9rem;border-top:1px solid rgba(255,255,255,.07)">
            <div class="rpg-sec-lbl">// EQUIPPED — CLICK TO SEE IN SKILL TREE</div>
            ${['React','Python','Django','Unity Engine','C / C++','IoT Dev'].map(s=>`<span class="rpg-eq-pill">${s}</span>`).join('')}
          </div>
        </div>
      </div>
      <div>
        <div class="rpg-card" style="height:100%">
          <div class="rpg-sec-lbl">// FIELD RECORD</div>
          ${[['Graduation rank','MAGNA'],['Systems deployed','3'],['Robothon title','CHAMP'],['Natl competitions','2×'],['Teams led','4+'],['Countries','2']].map(([l,v])=>`
          <div class="rpg-qs-row"><span class="rpg-qs-l">${l}</span><span class="rpg-qs-v">${v}</span></div>`).join('')}
          <div style="margin-top:.9rem;padding-top:.8rem;border-top:1px solid rgba(255,255,255,.07)">
            <div class="rpg-sec-lbl">// ACTIVE BUFFS</div>
            <div style="font-size:10.5px;color:#4ade80;line-height:2">+ Top Tutor Recognition</div>
            <div style="font-size:10.5px;color:#f59e0b;line-height:2">+ Scintillate Award</div>
            <div style="font-size:10.5px;color:#a78bfa;line-height:2">+ Vietnam Exchange</div>
          </div>
        </div>
      </div>
      <div id="statPanel">
        <div class="rpg-sp-close" onclick="window._rpgClosePanel()">✕ CLOSE</div>
        <div class="rpg-sp-name" id="sp-name"></div>
        <div class="rpg-sp-score" id="sp-score"></div>
        <div id="sp-sources"></div>
      </div>
    </div>
  </div>

  <div class="rpg-screen" id="s2">
    <div style="max-width:870px;width:100%">
      <div class="rpg-sec-lbl" style="text-align:center;margin-bottom:10px;font-size:10px">// SKILL TREE — CLICK ANY NODE TO INSPECT</div>
      <div id="branches" style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px"></div>
      <div id="skillDetail" style="display:none;margin-top:10px;background:rgba(6,9,15,.96);border:1px solid rgba(245,158,11,.28);border-radius:2px;padding:.9rem 1.3rem;flex-direction:row;align-items:flex-start;justify-content:space-between;gap:1rem">
        <div><div class="rpg-sd-name" id="sd-name"></div><div class="rpg-sd-ctx" id="sd-ctx"></div></div>
        <div onclick="window._rpgCloseSDetail()" style="cursor:pointer;color:var(--muted);font-size:12px;flex-shrink:0">✕</div>
      </div>
    </div>
  </div>

  <div class="rpg-screen" id="s3">
    <div style="max-width:820px;width:100%">
      <div class="rpg-filter-row">
        <span style="font-size:9.5px;color:var(--muted);letter-spacing:.1em;margin-right:4px">FILTER:</span>
        ${['all','Unity','Full-Stack','Team Lead','IoT'].map(t=>`<span class="rpg-ftag${t==='all'?' on':''}" onclick="window._rpgFilterQuests('${t}',this)">${t.toUpperCase()}</span>`).join('')}
      </div>
      <div id="questList"></div>
    </div>
  </div>

  <div class="rpg-screen" id="s4">
    <div style="max-width:870px;width:100%">
      <div class="rpg-sec-lbl" style="text-align:center;margin-bottom:12px;font-size:10px">// ACHIEVEMENTS — CLICK TO UNLOCK DETAILS</div>
      <div id="achGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px"></div>
      <div style="text-align:center;margin-top:12px">
        <span style="display:inline-flex;align-items:center;gap:8px;background:rgba(245,158,11,.13);border:1px solid rgba(245,158,11,.28);border-radius:2px;padding:5px 14px;font-size:11px;color:#f59e0b">
          TOTAL XP: <strong>9,820</strong> · RANK: EXCEPTIONAL CANDIDATE
        </span>
      </div>
    </div>
  </div>

  <div class="rpg-screen" id="s5">
    <div style="max-width:560px;width:100%;text-align:center">
      <div class="rpg-party-box">
        <div style="font-size:10px;letter-spacing:.2em;color:#f59e0b;opacity:.7;margin-bottom:.8rem">// RECRUITMENT TERMINAL</div>
        <div style="font-family:'Rajdhani',sans-serif;font-size:2rem;font-weight:700;color:#e2e8f0;margin-bottom:.4rem">Add <span style="color:#f59e0b">Jillian</span><br>to your party?</div>
        <div class="rpg-role-selector">
          ${Object.keys(ROLE_MSGS).map((k,i)=>`<div class="rpg-role-opt${i===0?' on':''}" onclick="window._rpgSetRole('${k}',this)">${k.toUpperCase()}</div>`).join('')}
        </div>
        <div id="roleMsg" class="rpg-role-msg">${ROLE_MSGS.fulltime}</div>
        <div style="display:flex;gap:8px;justify-content:center;margin-bottom:1.2rem">
          <button class="rpg-hire-p" onclick="window.location.href='mailto:jillianburila@gmail.com'">SEND INVITATION</button>
          <button class="rpg-hire-s" onclick="window.open('https://github.com/jlliangrasya','_blank')">INSPECT REPO</button>
        </div>
        <div class="rpg-contact-lines">
          ${[['@','jillianburila@gmail.com'],['⌥','github.com/jlliangrasya'],['#','09385056299']].map(([ico,val])=>`
          <div class="rpg-c-line" onclick="window._rpgCopy('${val}',this)">
            <div style="display:flex;align-items:center;gap:8px"><div style="color:#f59e0b;opacity:.7;width:16px">${ico}</div><div style="font-size:11px;color:#e2e8f0">${val}</div></div>
            <div class="rpg-c-copy">CLICK TO COPY</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

</div>

<div id="achOverlay" onclick="if(event.target===this)window._rpgCloseAch()">
  <div id="achPopup">
    <div id="au-label" style="font-size:10px;letter-spacing:.2em;margin-bottom:.8rem"></div>
    <div id="au-icon" style="font-family:'Rajdhani',sans-serif;font-size:48px;font-weight:700;margin-bottom:.8rem"></div>
    <div id="au-name" style="font-family:'Rajdhani',sans-serif;font-size:24px;font-weight:700;color:#e2e8f0;margin-bottom:.5rem"></div>
    <div id="au-desc" style="font-size:12.5px;color:#94a3b8;line-height:1.7;margin-bottom:1.5rem;max-width:360px"></div>
    <button id="au-close" onclick="window._rpgCloseAch()" style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;padding:8px 22px;background:transparent;border-radius:2px;cursor:pointer;transition:background .2s">[ DISMISS ]</button>
  </div>
</div>

<div id="rpg-bottomnav">
  <button id="prevBtn" class="rpg-nav-btn" onclick="window._rpgNavigate(-1)" disabled>◀ PREV</button>
  <div style="display:flex;flex-direction:column;align-items:center;gap:5px">
    <div id="indicators" style="display:flex;gap:8px;align-items:center"></div>
    <div id="sLabel" style="font-size:10px;color:var(--muted);letter-spacing:.12em;text-align:center;min-width:130px"></div>
  </div>
  <button id="nextBtn" class="rpg-nav-btn" onclick="window._rpgNavigate(1)">NEXT ▶</button>
</div>`
}

/* ── SCOPED CSS ── */
const RPG_CSS = `
.rpg-root{position:fixed;inset:0;background:#06090f;font-family:'JetBrains Mono',monospace;overflow:hidden}
.rpg-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(245,158,11,.016) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,.016) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}
.rpg-vignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 35%,rgba(0,0,0,.65) 100%);pointer-events:none}
#rpg-topbar{position:absolute;top:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:.7rem 2rem;background:rgba(6,9,15,.92);border-bottom:1px solid rgba(255,255,255,.07);font-size:10px;letter-spacing:.1em}
.rpg-tb-brand{font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:700;color:#f59e0b}
.rpg-tb-id{color:#64748b}
.rpg-tb-status{display:flex;align-items:center;gap:6px;color:#4ade80}
.rpg-pdot{width:6px;height:6px;border-radius:50%;background:#4ade80;animation:rpgpulse 2s infinite}
@keyframes rpgpulse{0%,100%{opacity:1}50%{opacity:.25}}
#rpg-hintbar{position:absolute;top:44px;left:0;right:0;z-index:19;display:flex;align-items:center;justify-content:center;padding:.35rem;background:rgba(245,158,11,.07);border-bottom:1px solid rgba(245,158,11,.28);font-size:10px;color:#f59e0b;opacity:.8;letter-spacing:.1em}
#rpg-vp{position:absolute;top:80px;bottom:52px;left:0;right:0;overflow:hidden}
.rpg-screen{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.2rem 1.5rem;opacity:0;pointer-events:none;transition:opacity .4s,transform .4s;transform:translateX(60px)}
.rpg-screen.rpg-active{opacity:1;pointer-events:all;transform:none}
.rpg-screen.rpg-exit-l{opacity:0;transform:translateX(-60px)}
.rpg-screen.rpg-exit-r{opacity:0;transform:translateX(60px)}
.rpg-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:3px;padding:1.1rem 1.3rem;position:relative}
.rpg-card::before{content:'';position:absolute;top:-1px;left:-1px;width:11px;height:11px;border-top:1px solid #f59e0b;border-left:1px solid #f59e0b;opacity:.4}
.rpg-card::after{content:'';position:absolute;bottom:-1px;right:-1px;width:11px;height:11px;border-bottom:1px solid #f59e0b;border-right:1px solid #f59e0b;opacity:.4}
.rpg-sec-lbl{font-size:9.5px;letter-spacing:.2em;color:#f59e0b;opacity:.7;margin-bottom:8px}
.rpg-boot-lines{text-align:left;max-width:560px;width:100%}
.rpg-bl{font-size:12.5px;color:#64748b;line-height:2;opacity:0;transform:translateY(4px);transition:opacity .3s,transform .3s}
.rpg-bl.show{opacity:1;transform:none}
.rpg-boot-bar{width:100%;height:3px;background:rgba(255,255,255,.07);border-radius:2px;margin:1.2rem 0;overflow:hidden}
.rpg-boot-fill{height:100%;width:0;background:#f59e0b;transition:width .05s linear}
.rpg-boot-prompt{font-size:13px;color:#f59e0b;margin-top:.8rem;opacity:0;transition:opacity .5s;letter-spacing:.1em}
.rpg-boot-prompt.show{opacity:1}
.rpg-blink{animation:rpgblink 1s step-end infinite}
@keyframes rpgblink{0%,100%{opacity:1}50%{opacity:0}}
.rpg-s1-layout{display:grid;grid-template-columns:220px 1fr 220px;gap:12px;max-width:920px;width:100%;position:relative;overflow:hidden}
.rpg-avatar{width:80px;height:80px;border-radius:3px;background:rgba(255,255,255,.06);border:1px solid rgba(245,158,11,.3);display:flex;align-items:center;justify-content:center;font-family:'Rajdhani',sans-serif;font-size:26px;font-weight:700;color:#f59e0b;margin-bottom:10px;cursor:pointer;position:relative}
.rpg-avatar::before{content:'';position:absolute;top:-2px;left:-2px;width:12px;height:12px;border-top:1px solid #f59e0b;border-left:1px solid #f59e0b}
.rpg-avatar::after{content:'';position:absolute;bottom:-2px;right:-2px;width:12px;height:12px;border-bottom:1px solid #f59e0b;border-right:1px solid #f59e0b}
.rpg-avatar-hint{font-size:9px;color:#f59e0b;opacity:.5;letter-spacing:.1em;margin-bottom:8px;text-align:center}
.rpg-char-name{font-family:'Rajdhani',sans-serif;font-size:18px;font-weight:700;color:#e2e8f0;margin-bottom:1px}
.rpg-char-class{font-size:11px;color:#f59e0b;letter-spacing:.1em;margin-bottom:3px}
.rpg-char-sub{font-size:10px;color:#64748b}
.rpg-char-info{font-size:10px;color:#64748b;margin-top:8px;line-height:1.8}
.rpg-lvl{display:inline-flex;align-items:center;gap:5px;background:rgba(245,158,11,.13);border:1px solid rgba(245,158,11,.28);border-radius:2px;padding:4px 10px;margin-top:8px;cursor:pointer}
.rpg-lvl-n{font-family:'Rajdhani',sans-serif;font-size:17px;font-weight:700;color:#f59e0b}
.rpg-lvl-l{font-size:8.5px;color:#f59e0b;opacity:.7;letter-spacing:.1em;line-height:1.3}
.rpg-stat-row{display:flex;align-items:center;gap:10px;margin-bottom:8px;cursor:pointer;padding:4px 6px;border-radius:2px;border:1px solid transparent;transition:all .2s}
.rpg-stat-row:hover{background:rgba(255,255,255,.06);border-color:rgba(245,158,11,.28)}
.rpg-stat-row.selected{background:rgba(245,158,11,.13);border-color:rgba(245,158,11,.28)}
.rpg-sn{font-size:10px;letter-spacing:.1em;color:#64748b;width:40px;flex-shrink:0}
.rpg-st{flex:1;height:7px;background:rgba(255,255,255,.07);border-radius:2px;overflow:hidden}
.rpg-sf{height:100%;width:0;border-radius:2px;transition:width 1.2s cubic-bezier(.22,1,.36,1)}
.rpg-sv{font-size:10px;color:#e2e8f0;width:20px;text-align:right;font-weight:500}
.rpg-eq-pill{font-size:10px;padding:3px 9px;border-radius:2px;cursor:pointer;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.18);color:#22d3ee;display:inline-block;margin:3px;transition:all .2s}
.rpg-qs-row{border-bottom:1px solid rgba(255,255,255,.07);padding:7px 0;display:flex;justify-content:space-between;align-items:center}
.rpg-qs-l{font-size:10.5px;color:#64748b}
.rpg-qs-v{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;color:#f59e0b}
#statPanel{position:absolute;top:0;right:0;bottom:0;width:260px;background:rgba(6,9,15,.97);border-left:1px solid rgba(245,158,11,.28);padding:1.2rem;z-index:10;overflow-y:auto;transform:translateX(260px);transition:transform .3s ease}
#statPanel.open{transform:translateX(0)}
.rpg-sp-close{font-size:9px;color:#64748b;cursor:pointer;float:right;padding:3px 8px;border:1px solid rgba(255,255,255,.1);border-radius:2px}
.rpg-sp-name{font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;margin-bottom:4px;margin-top:8px}
.rpg-sp-score{font-size:11px;color:#64748b;margin-bottom:14px}
.rpg-sp-source{background:rgba(255,255,255,.06);border-left:2px solid #f59e0b;padding:8px 10px;margin-bottom:6px;font-size:11px;color:#94a3b8;line-height:1.6}
.rpg-sp-source strong{color:#e2e8f0}
.rpg-branch{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:3px;padding:.9rem}
.rpg-branch::before{content:'';display:block;margin-bottom:8px}
.rpg-branch-lbl{font-size:9.5px;letter-spacing:.16em;color:#f59e0b;margin-bottom:8px;opacity:.8}
.rpg-node{display:flex;align-items:center;gap:7px;padding:5px 7px;border-radius:2px;margin-bottom:4px;cursor:pointer;border:1px solid transparent;transition:all .2s}
.rpg-node.mastered:hover,.rpg-node.unlocked:hover{border-color:rgba(245,158,11,.28);background:rgba(255,255,255,.06)}
.rpg-node.selected{background:rgba(245,158,11,.13);border-color:rgba(245,158,11,.28)}
.rpg-node.locked{opacity:.28;cursor:default}
.rpg-nd{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.rpg-node.mastered .rpg-nd,.rpg-node.selected .rpg-nd{background:#f59e0b}
.rpg-node.unlocked .rpg-nd{background:#22d3ee}
.rpg-node.locked .rpg-nd{background:#64748b}
.rpg-nm{font-size:11px;color:#e2e8f0}
.rpg-node.selected .rpg-nm{color:#f59e0b}
.rpg-sd-name{font-family:'Rajdhani',sans-serif;font-size:16px;font-weight:600;color:#f59e0b;margin-bottom:3px}
.rpg-sd-ctx{font-size:11.5px;color:#94a3b8;line-height:1.7}
#skillDetail.show{display:flex !important}
.rpg-filter-row{display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;align-items:center}
.rpg-ftag{font-size:10px;padding:3px 9px;border-radius:2px;cursor:pointer;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:#64748b;transition:all .2s}
.rpg-ftag:hover,.rpg-ftag.on{background:rgba(245,158,11,.13);border-color:rgba(245,158,11,.28);color:#f59e0b}
.rpg-quest{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:3px;margin-bottom:8px;overflow:hidden;transition:border-color .2s}
.rpg-quest:hover{border-color:rgba(255,255,255,.12)}
.rpg-quest.expanded{border-color:rgba(245,158,11,.28)}
.rpg-quest.hidden{display:none}
.rpg-quest-head{display:grid;grid-template-columns:38px 1fr auto;gap:10px;align-items:center;padding:.8rem 1rem;cursor:pointer;transition:background .2s}
.rpg-quest-head:hover{background:rgba(255,255,255,.06)}
.rpg-q-ico{width:36px;height:36px;border-radius:2px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center;font-size:14px;color:#f59e0b}
.rpg-q-name{font-family:'Rajdhani',sans-serif;font-size:15px;font-weight:600;color:#e2e8f0}
.rpg-q-org{font-size:10px;color:#64748b;margin-top:1px}
.rpg-q-right{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:4px}
.rpg-q-status{font-size:9px;letter-spacing:.12em;padding:2px 8px;border-radius:2px}
.st-done{background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.2);color:#4ade80}
.st-dep{background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.2);color:#22d3ee}
.rpg-q-xp{font-family:'Rajdhani',sans-serif;font-size:14px;font-weight:600;color:#f59e0b}
.rpg-q-chevron{font-size:10px;color:#64748b;transition:transform .3s;display:inline-block;margin-left:6px}
.rpg-quest.expanded .rpg-q-chevron{transform:rotate(90deg);color:#f59e0b}
.rpg-quest-body{max-height:0;overflow:hidden;transition:max-height .35s ease}
.rpg-quest.expanded .rpg-quest-body{max-height:300px}
.rpg-quest-inner{padding:.8rem 1rem .9rem;border-top:1px solid rgba(255,255,255,.07)}
.rpg-q-desc{font-size:11.5px;color:#94a3b8;line-height:1.75;margin-bottom:10px}
.rpg-q-desc span{color:#f59e0b}
.rpg-q-stack{display:flex;flex-wrap:wrap;gap:5px}
.rpg-stag{font-size:10px;padding:2px 7px;background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.14);border-radius:2px;color:#94a3b8;cursor:pointer;transition:all .2s}
.rpg-stag:hover{border-color:rgba(34,211,238,.3);color:#22d3ee}
.rpg-ach{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:3px;padding:1rem;cursor:pointer;transition:all .25s}
.rpg-ach:hover{transform:translateY(-2px)}
.rpg-ach.legendary:hover{border-color:rgba(245,158,11,.4)}
.rpg-ach.epic:hover{border-color:rgba(167,139,250,.35)}
.rpg-ach.rare:hover{border-color:rgba(34,211,238,.3)}
.rpg-ach.uncommon:hover{border-color:rgba(74,222,128,.25)}
.rpg-ach-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px}
.rpg-ach-ico{font-family:'Rajdhani',sans-serif;font-size:20px;font-weight:700;line-height:1}
.rpg-ach.legendary .rpg-ach-ico{color:#f59e0b}
.rpg-ach.epic .rpg-ach-ico{color:#a78bfa}
.rpg-ach.rare .rpg-ach-ico{color:#22d3ee}
.rpg-ach.uncommon .rpg-ach-ico{color:#4ade80}
.rpg-rarity{font-size:9px;letter-spacing:.12em;padding:2px 8px;border-radius:2px}
.rpg-rarity.legendary{background:rgba(245,158,11,.14);border:1px solid rgba(245,158,11,.32);color:#f59e0b}
.rpg-rarity.epic{background:rgba(167,139,250,.12);border:1px solid rgba(167,139,250,.28);color:#a78bfa}
.rpg-rarity.rare{background:rgba(34,211,238,.1);border:1px solid rgba(34,211,238,.24);color:#22d3ee}
.rpg-rarity.uncommon{background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.18);color:#4ade80}
.rpg-ach-name{font-family:'Rajdhani',sans-serif;font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:2px}
.rpg-ach-desc{font-size:10.5px;color:#64748b;line-height:1.55}
.rpg-ach-hint{font-size:9px;color:#64748b;opacity:.5;margin-top:6px;letter-spacing:.08em}
#achOverlay{position:absolute;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(6,9,15,.92);opacity:0;pointer-events:none;transition:opacity .25s}
#achOverlay.show{opacity:1;pointer-events:all}
#achPopup{text-align:center;padding:2.5rem;max-width:420px;position:relative;border:2px solid var(--ach-color,#f59e0b);border-radius:3px}
.rpg-party-box{background:rgba(255,255,255,.03);border:1px solid rgba(245,158,11,.28);border-radius:3px;padding:2rem;position:relative}
.rpg-party-box::before{content:'';position:absolute;top:-2px;left:-2px;width:18px;height:18px;border-top:2px solid #f59e0b;border-left:2px solid #f59e0b}
.rpg-party-box::after{content:'';position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-bottom:2px solid #f59e0b;border-right:2px solid #f59e0b}
.rpg-role-selector{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin-bottom:1.2rem}
.rpg-role-opt{font-size:10px;letter-spacing:.08em;padding:5px 12px;border-radius:2px;cursor:pointer;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:#64748b;transition:all .2s}
.rpg-role-opt:hover,.rpg-role-opt.on{background:rgba(245,158,11,.13);border-color:rgba(245,158,11,.28);color:#f59e0b}
.rpg-role-msg{font-size:12px;color:#94a3b8;line-height:1.7;min-height:48px;margin-bottom:1.2rem;padding:.7rem;background:rgba(255,255,255,.06);border-radius:2px;border-left:2px solid rgba(245,158,11,.28);transition:opacity .3s}
.rpg-hire-p{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;padding:10px 24px;background:#f59e0b;color:#06090f;border:none;border-radius:2px;cursor:pointer;font-weight:700;transition:all .2s}
.rpg-hire-p:hover{background:#fbbf24;transform:translateY(-1px)}
.rpg-hire-s{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;padding:10px 24px;background:transparent;color:#f59e0b;border:1px solid rgba(245,158,11,.28);border-radius:2px;cursor:pointer;transition:all .2s}
.rpg-hire-s:hover{background:rgba(245,158,11,.13);transform:translateY(-1px)}
.rpg-contact-lines{display:flex;flex-direction:column;gap:6px;padding-top:1rem;border-top:1px solid rgba(255,255,255,.07)}
.rpg-c-line{display:flex;align-items:center;justify-content:space-between;padding:5px 8px;border-radius:2px;cursor:pointer;transition:background .2s;gap:8px}
.rpg-c-line:hover{background:rgba(255,255,255,.06)}
.rpg-c-copy{font-size:9px;color:#64748b;letter-spacing:.1em;transition:color .2s}
.rpg-c-line:hover .rpg-c-copy{color:#f59e0b}
.rpg-c-copy.flash{color:#4ade80 !important}
#rpg-bottomnav{position:absolute;bottom:0;left:0;right:0;z-index:20;display:flex;align-items:center;justify-content:space-between;padding:.7rem 2rem;background:rgba(6,9,15,.92);border-top:1px solid rgba(255,255,255,.07)}
.rpg-nav-btn{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;padding:7px 20px;background:transparent;border:1px solid rgba(245,158,11,.28);border-radius:2px;color:#f59e0b;cursor:pointer;transition:background .2s}
.rpg-nav-btn:hover{background:rgba(245,158,11,.13)}
.rpg-nav-btn:disabled{opacity:.22;cursor:default;border-color:rgba(255,255,255,.07)}
.rpg-sdot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.07);transition:all .3s;cursor:pointer}
.rpg-sdot.on{background:#f59e0b;width:18px;border-radius:3px}
@media(max-width:768px){
  #rpg-topbar{padding:.5rem 1rem;font-size:9px}
  .rpg-tb-id{display:none}
  #rpg-hintbar{font-size:8.5px;padding:.3rem .8rem}
  #rpg-vp{top:70px;bottom:48px}
  .rpg-screen{padding:.8rem .7rem}
  .rpg-s1-layout{grid-template-columns:1fr !important;gap:10px;max-width:100%;overflow-y:auto;max-height:100%;padding-bottom:1rem}
  #statPanel{width:100%;position:fixed;top:auto;bottom:0;left:0;right:0;height:55vh;transform:translateY(100%);border-left:none;border-top:1px solid rgba(245,158,11,.28)}
  #statPanel.open{transform:translateY(0)}
  #branches{grid-template-columns:repeat(2,1fr) !important;gap:8px}
  #achGrid{grid-template-columns:repeat(2,1fr) !important;gap:8px}
  .rpg-quest-head{grid-template-columns:32px 1fr auto;gap:6px;padding:.6rem .7rem}
  .rpg-q-ico{width:32px;height:32px;font-size:12px}
  .rpg-q-name{font-size:13px}
  .rpg-party-box{padding:1.2rem}
  #rpg-bottomnav{padding:.5rem 1rem}
  .rpg-nav-btn{padding:5px 12px;font-size:10px}
  .rpg-role-selector{gap:4px}
  .rpg-role-opt{font-size:9px;padding:4px 8px}
}
@media(max-width:480px){
  #rpg-topbar{padding:.4rem .7rem}
  .rpg-tb-brand{font-size:11px}
  #branches{grid-template-columns:1fr !important}
  #achGrid{grid-template-columns:1fr !important}
  .rpg-avatar{width:60px;height:60px;font-size:20px}
  .rpg-char-name{font-size:15px}
  .rpg-hire-p,.rpg-hire-s{padding:8px 16px;font-size:10px}
}
`
