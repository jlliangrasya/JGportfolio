import { useEffect, useRef } from 'react'
import JGLogo from '../../shared/JGLogo.jsx'
import { STARS, CONSTELLATION_LINES, BASE_SYSTEM_PROMPT, FULL_STORY_CONTEXT, GENERAL_SUGGESTIONS, PERSONAL, PHOTOS } from '../../../data/index.js'
import jillAvatar from '../../../assets/jill avatar.png'

/* ─── NOTE ─────────────────────────────────────────────────────────
   Constellation experience with Anthropic API live chat.
   Mirrors curious-constellation-v2.html prototype.
──────────────────────────────────────────────────────────────────── */

export default function CuriousPersona({ onSwitch }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.innerHTML = buildHTML(jillAvatar)

    /* — CANVAS — */
    const canvas = root.querySelector('#bg-canvas')
    const ctx = canvas.getContext('2d')
    const drawBg = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      for (let i = 0; i < 300; i++) {
        ctx.beginPath()
        ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*1.1+.15, 0, Math.PI*2)
        ctx.fillStyle = `rgba(255,255,255,${Math.random()*.65+.08})`
        ctx.fill()
      }
    }
    drawBg()
    window.addEventListener('resize', drawBg)

    /* — STARS — */
    const sc = root.querySelector('#stars-c')
    Object.entries(STARS).forEach(([id, s], idx) => {
      const el = document.createElement('div')
      el.className = 'cstar'
      el.id = 'cstar-' + id
      const twDur = (3.5 + (idx * 1.3) % 3.5).toFixed(1)
      const twDelay = ((idx * 0.7) % 4).toFixed(1)
      el.style.cssText = `left:${s.pos.x}%;top:${s.pos.y}%;width:${s.size}px;height:${s.size}px;color:${s.color};--tw-dur:${twDur}s;--tw-delay:${twDelay}s`
      el.innerHTML = `
        <div class="cstar-glow" style="background:${s.color}"></div>
        <div class="cstar-core" style="background:${s.color}"></div>
        <div class="cstar-ring"></div>
        <div class="cstar-ring"></div>
        <div class="cstar-lbl" style="color:${s.color}">${s.label}</div>
        <div class="cstar-yr">${s.year}</div>`
      el.addEventListener('click', () => clickStar(id))
      sc.appendChild(el)
    })

    /* — CONSTELLATION LINES — */
    const svg = root.querySelector('#const-svg')
    CONSTELLATION_LINES.forEach(([a, b], i) => {
      const sa = STARS[a], sb = STARS[b]
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', sa.pos.x + '%'); line.setAttribute('y1', sa.pos.y + '%')
      line.setAttribute('x2', sb.pos.x + '%'); line.setAttribute('y2', sb.pos.y + '%')
      line.setAttribute('class', 'cline'); line.id = `cl-${a}-${b}`
      svg.appendChild(line)
      setTimeout(() => line.classList.add('drawn'), 500 + i * 110)
    })

    /* — STATE — */
    let active = null, chatOpen = false, chatHist = [], busy = false

    /* — TOOLTIP — hide after first interaction — */
    const tooltip = root.querySelector('#chat-tooltip')
    let tooltipHidden = false
    const hideTooltip = () => {
      if (tooltipHidden) return
      tooltipHidden = true
      if (tooltip) { tooltip.style.opacity = '0'; tooltip.style.pointerEvents = 'none' }
    }
    // auto-hide tooltip after 6s
    setTimeout(hideTooltip, 6000)

    /* — STAR CLICK — */
    function clickStar(id) {
      if (busy) return
      hideTooltip()
      const s = STARS[id]
      active = id

      Object.keys(STARS).forEach(k => {
        const el = root.querySelector('#cstar-' + k)
        el.classList.remove('dimmed', 'zoomed')
        if (k === id) el.classList.add('zoomed')
        else el.classList.add('dimmed')
      })

      CONSTELLATION_LINES.forEach(([a, b]) => {
        root.querySelector(`#cl-${a}-${b}`)?.classList.toggle('lit', a === id || b === id)
      })

      const modal = root.querySelector('#cmodal')
      modal.style.setProperty('--star-color', s.color)
      root.querySelector('#m-num').textContent = s.num
      root.querySelector('#m-place').style.color = s.color
      root.querySelector('#m-place').textContent = s.place
      root.querySelector('#m-title').innerHTML = s.title
      root.querySelector('#m-body').innerHTML = s.body
      root.querySelector('#m-tags').innerHTML = s.tags.map(t => `<span class="cm-tag">${t}</span>`).join('')

      const starPhotos = PHOTOS.filter(p => p.star === id)
      const photoEl = root.querySelector('#m-photos')
      if (photoEl) {
        photoEl.innerHTML = starPhotos.map(p => `
          <div class="cm-photo-wrap">
            <img class="cm-photo" src="${p.src}" alt="${p.alt}" loading="lazy" />
            ${p.caption ? `<div class="cm-photo-cap">${p.caption}</div>` : ''}
          </div>`).join('')
        photoEl.style.display = starPhotos.length ? 'block' : 'none'
      }

      root.querySelector('#cov').classList.add('show')
      setTimeout(() => modal.classList.add('open'), 80)
      root.querySelector('#bubble-btn').classList.add('active')
      root.querySelector('#intro').classList.add('gone')

      // Add a focus message to the chat (don't reset — preserves ongoing conversation)
      setTimeout(() => {
        addMsg('host', 'YOU', `Now exploring Jillian's <strong style="color:${s.color}">${s.label}</strong> hat. Ask about it — or anything else.`)
        setSugs(s.sugs.slice(0, 3))
      }, 200)
    }

    function closeModal() {
      root.querySelector('#cmodal').classList.remove('open')
      root.querySelector('#cov').classList.remove('show')
      Object.keys(STARS).forEach(k => {
        root.querySelector('#cstar-' + k).classList.remove('dimmed', 'zoomed')
      })
      CONSTELLATION_LINES.forEach(([a, b]) => {
        root.querySelector(`#cl-${a}-${b}`)?.classList.remove('lit')
      })
      // Clear star focus so subsequent answers aren't biased toward the closed star
      active = null
    }

    /* — CHAT — */
    function toggleChat() {
      hideTooltip()
      chatOpen = !chatOpen
      root.querySelector('#chat-panel').classList.toggle('open', chatOpen)
      root.querySelector('#bubble-btn').classList.toggle('chat-open', chatOpen)
      if (chatOpen && !active) {
        const msgs = root.querySelector('#chat-msgs')
        if (!msgs.children.length) {
          addMsg('jill', 'JILLIAN', "Hey — ask me anything. About a project, a moment, or just who I am. Or click any star to dive into that moment.")
          setSugs(GENERAL_SUGGESTIONS.sort(() => Math.random() - .5).slice(0, 3))
        }
      }
      if (chatOpen) setTimeout(() => root.querySelector('#chat-inp')?.focus(), 200)
    }

    window._curiousCloseModal  = closeModal
    window._curiousToggleChat  = toggleChat
    window._curiousOpenChat    = () => { if (!chatOpen) toggleChat() }

    function addMsg(type, from, html) {
      const msgs = root.querySelector('#chat-msgs')
      msgs.querySelector('.cno-star')?.remove()
      const d = document.createElement('div')
      d.className = `cmsg ${type}`
      const avatarHTML = type === 'jill'
        ? `<img class="cmsg-av jill-av" src="${jillAvatar}" alt="Jillian" />`
        : `<div class="cmsg-av you-av">YOU</div>`
      d.innerHTML = `${avatarHTML}<div class="cmsg-content"><div class="cmsg-from">${from}</div><div class="cmsg-bub">${html}</div></div>`
      msgs.appendChild(d)
      msgs.scrollTop = msgs.scrollHeight
    }

    function addTyping() {
      const msgs = root.querySelector('#chat-msgs')
      const d = document.createElement('div')
      d.className = 'cmsg jill typing'; d.id = 'ctyping'
      d.innerHTML = `<img class="cmsg-av jill-av" src="${jillAvatar}" alt="Jillian" /><div class="cmsg-content"><div class="cmsg-from">JILLIAN</div><div class="cmsg-bub"><div class="ctdot"></div><div class="ctdot"></div><div class="ctdot"></div></div></div>`
      msgs.appendChild(d); msgs.scrollTop = msgs.scrollHeight
    }

    function setSugs(list) {
      const c = root.querySelector('#chat-sugs')
      if (!c) return
      c.innerHTML = list.map((s, i) => `<span class="csug" style="animation-delay:${i * 60}ms" onclick="window._curiousUseSug('${s.replace(/'/g, "\\'")}')">${s}</span>`).join('')
    }

    window._curiousUseSug = (t) => {
      const inp = root.querySelector('#chat-inp')
      if (inp) { inp.value = t; sendMsg() }
    }

    async function sendMsg() {
      const inp = root.querySelector('#chat-inp')
      const text = inp?.value.trim()
      if (!text || busy) return
      inp.value = ''; busy = true
      const sbtn = root.querySelector('#chat-sbtn')
      if (sbtn) { sbtn.disabled = true; sbtn.classList.add('sending') }
      root.querySelector('#chat-sugs').innerHTML = ''

      if (!chatOpen) toggleChat()

      addMsg('host', 'YOU', text)
      chatHist.push({ role: 'user', content: text })
      addTyping()

      // Build system prompt: always include full story; if a star is clicked, focus on it
      const s = active ? STARS[active] : null
      const focus = s
        ? `\n\nThe visitor just opened your "${s.label}" moment — lean into that if their question is about it, but answer anything they ask.`
        : ''
      const sys = `${BASE_SYSTEM_PROMPT}\n\n=== YOUR FULL STORY (reference this to answer any question) ===\n${FULL_STORY_CONTEXT}${focus}`

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ system: sys, messages: chatHist, maxTokens: 280 })
        })
        const data = await res.json()
        const reply = data.reply || 'Something went wrong — try again!'
        root.querySelector('#ctyping')?.remove()
        addMsg('jill', 'JILLIAN', reply)
        chatHist.push({ role: 'assistant', content: reply })

        // Suggestions: prefer the active star's follow-ups, fall back to general ones
        const pool = (s ? [...s.sugs, ...GENERAL_SUGGESTIONS] : GENERAL_SUGGESTIONS)
          .filter(q => !chatHist.some(m => m.content === q))
        setSugs(pool.sort(() => Math.random() - .5).slice(0, 3))
      } catch {
        root.querySelector('#ctyping')?.remove()
        addMsg('jill', 'JILLIAN', 'Something went wrong — please try again.')
      }
      busy = false
      if (sbtn) { sbtn.disabled = false; sbtn.classList.remove('sending') }
      if (chatOpen) inp?.focus()
    }

    window._curiousSendMsg = sendMsg

    /* — KEYBOARD — */
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (root.querySelector('#cmodal').classList.contains('open')) closeModal()
        else if (chatOpen) toggleChat()
      }
    }
    document.addEventListener('keydown', onKey)

    const inp = root.querySelector('#chat-inp')
    if (inp) {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg() }
      })
    }

    setTimeout(() => root.querySelector('#intro')?.classList.add('loaded'), 150)

    // Animate bubble button in with a bounce after short delay
    setTimeout(() => root.querySelector('#bubble-btn')?.classList.add('entered'), 800)

    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', drawBg)
      delete window._curiousCloseModal
      delete window._curiousToggleChat
      delete window._curiousOpenChat
      delete window._curiousUseSug
      delete window._curiousSendMsg
    }
  }, [])

  return (
    <>
      <style>{CURIOUS_CSS}</style>
      <div ref={rootRef} className="curious-root" />
      <JGLogo onSwitch={onSwitch} />
    </>
  )
}

function buildHTML(avatarSrc) {
  return `
<div id="cspace"><canvas id="bg-canvas"></canvas><div class="cvignette"></div></div>
<svg id="const-svg" xmlns="http://www.w3.org/2000/svg"></svg>

<div id="ctopbar">
  <div class="ctb-l">JILLIAN GRACE · HER UNIVERSE</div>
  <div class="ctb-r"><div class="ctb-pulse"></div>7 HATS · 1 PERSON</div>
</div>

<div id="intro">
  <div class="it">Her story is out<br>there somewhere.</div>
  <div class="is">JILLIAN GRACE D. BURILA · 2003 — PRESENT</div>
  <div class="ih"><div class="ih-dot"></div>CLICK ANY STAR TO BEGIN</div>
</div>

<div id="cov" onclick="window._curiousCloseModal()"></div>
<div id="stars-c"></div>

<div id="cmodal">
  <div class="cmodal-inner">
    <button class="cm-close" onclick="window._curiousCloseModal()">✕ CLOSE</button>
    <div id="m-num"></div>
    <div id="m-place"></div>
    <div id="m-title"></div>
    <div id="m-body"></div>
    <div id="m-tags"></div>
    <div id="m-photos"></div>
    <div class="cm-chat-hint" onclick="window._curiousOpenChat()">
      <div class="cm-hint-dot"></div>
      <span>Ask Jillian about this</span>
      <span style="margin-left:auto;opacity:.4">↗</span>
    </div>
  </div>
</div>

<div id="chat-widget">
  <div id="chat-tooltip">
    <div class="ctt-arrow"></div>
    <img class="ctt-av" src="${avatarSrc}" alt="Jillian" />
    <span>Chat with me! ✨</span>
  </div>

  <div id="chat-panel">
    <div class="cp-head">
      <div class="cp-head-left">
        <img class="cp-avatar" src="${avatarSrc}" alt="Jillian" />
        <div class="cp-head-info">
          <div class="cp-name">Chat with Jillian</div>
          <div class="cp-status"><span class="cp-status-dot"></span>Online · Ask me anything</div>
        </div>
      </div>
      <button class="cp-min" onclick="window._curiousToggleChat()" title="Minimize">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M19 13H5v-2h14v2z"/></svg>
      </button>
    </div>
    <div id="chat-msgs"></div>
    <div id="chat-sugs"></div>
    <div class="cp-irow">
      <input id="chat-inp" type="text" placeholder="Message Jillian..." autocomplete="off"/>
      <button id="chat-sbtn" onclick="window._curiousSendMsg()" title="Send">
        <svg class="sbtn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  </div>

  <button id="bubble-btn" onclick="window._curiousToggleChat()">
    <div class="bic-label">Chat with Jillian</div>
    <img class="bic-avatar" src="${avatarSrc}" alt="Chat with Jillian" />
    <div class="notif-ring"></div>
  </button>
</div>`
}

const CURIOUS_CSS = `
.curious-root{position:fixed;inset:0;background:#05080f;font-family:'Rajdhani',sans-serif;overflow:hidden}
#cspace{position:absolute;inset:0;z-index:0}#bg-canvas{position:absolute;inset:0;width:100%;height:100%}
.cvignette{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,transparent 20%,rgba(0,0,0,.72) 100%);pointer-events:none}
#const-svg{position:fixed;inset:0;z-index:1;pointer-events:none}
.cline{stroke:rgba(255,255,255,.08);stroke-width:.8;stroke-dasharray:4 6;opacity:0;transition:opacity .5s}
.cline.drawn{opacity:1}.cline.lit{stroke-width:1.4;opacity:.28;transition:all .3s}
.cstar{position:fixed;z-index:3;border-radius:50%;cursor:pointer;transform:translate(-50%,-50%);transition:transform .35s cubic-bezier(.22,1,.36,1),filter .25s,opacity .45s;will-change:transform;animation:startwinkle var(--tw-dur,4s) ease-in-out var(--tw-delay,0s) infinite}
@keyframes startwinkle{0%,100%{opacity:1;filter:brightness(1)}45%{opacity:.65;filter:brightness(.7)}55%{opacity:.9;filter:brightness(1.25)}}
.cstar:hover{filter:brightness(1.5) !important;animation:none}
.cstar.dimmed{opacity:.1;pointer-events:none;filter:none;animation:none}
.cstar.zoomed{transform:translate(-50%,-50%) scale(9);z-index:6;pointer-events:none;animation:none}
.cstar-glow{position:absolute;inset:-30%;border-radius:50%;filter:blur(10px);opacity:.45}
.cstar-core{width:100%;height:100%;border-radius:50%;position:relative;z-index:1}
.cstar-ring{position:absolute;border-radius:50%;border:1.5px solid currentColor;opacity:.2;top:50%;left:50%;transform:translate(-50%,-50%);animation:cring 3s ease-in-out infinite}
.cstar-ring:nth-child(4){animation-delay:1.4s;border-width:1px;opacity:.1}
@keyframes cring{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(2);opacity:0}}
.cstar-lbl{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.12em;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .2s}
.cstar:hover .cstar-lbl{opacity:1}
.cstar-yr{position:absolute;top:calc(100% + 9px);left:50%;transform:translateX(-50%);font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;color:#334155;white-space:nowrap;pointer-events:none}
#ctopbar{position:fixed;top:0;left:0;right:0;z-index:8;display:flex;align-items:center;justify-content:space-between;padding:.9rem 2rem;pointer-events:none}
.ctb-l{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.16em;color:#334155}
.ctb-r{display:flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;color:#334155}
.ctb-pulse{width:4px;height:4px;border-radius:50%;background:#4ade80;animation:ctpulse 2s ease-in-out infinite}
@keyframes ctpulse{0%,100%{opacity:1}50%{opacity:.3}}
#intro{position:fixed;inset:0;z-index:4;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;transition:opacity .7s}
#intro.gone{opacity:0}
.it{font-family:'Rajdhani',sans-serif;font-size:clamp(2rem,5vw,3.4rem);font-weight:700;color:#f1f5f9;text-align:center;line-height:1.1;letter-spacing:.03em;opacity:0;transform:translateY(18px);transition:all .8s .3s}
#intro.loaded .it{opacity:1;transform:none}
.is{font-family:'JetBrains Mono',monospace;font-size:10px;color:#64748b;letter-spacing:.2em;margin-top:1rem;opacity:0;transition:all .8s .65s}
#intro.loaded .is{opacity:1}
.ih{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#334155;letter-spacing:.15em;margin-top:2.2rem;display:flex;align-items:center;gap:7px;opacity:0;transition:all .8s 1.1s}
#intro.loaded .ih{opacity:.6}
.ih-dot{width:5px;height:5px;border-radius:50%;background:#f59e0b;animation:ctpulse 2s ease-in-out infinite}
#cov{position:fixed;inset:0;z-index:5;background:rgba(5,8,15,.88);opacity:0;pointer-events:none;transition:opacity .4s}
#cov.show{opacity:1;pointer-events:all}
#cmodal{position:fixed;z-index:9;top:50%;left:50%;width:min(600px,90vw);max-height:80vh;transform:translate(-50%,-50%) scale(.9) translateY(16px);opacity:0;pointer-events:none;transition:opacity .45s cubic-bezier(.22,1,.36,1),transform .45s cubic-bezier(.22,1,.36,1);overflow-y:auto;background:rgba(6,10,18,.97);border-radius:4px;border:1px solid rgba(255,255,255,.1)}
#cmodal::before{content:'';position:absolute;top:-1px;left:-1px;width:20px;height:20px;border-top:2px solid var(--star-color,#f59e0b);border-left:2px solid var(--star-color,#f59e0b)}
#cmodal::after{content:'';position:absolute;bottom:-1px;right:-1px;width:20px;height:20px;border-bottom:2px solid var(--star-color,#f59e0b);border-right:2px solid var(--star-color,#f59e0b)}
#cmodal.open{opacity:1;pointer-events:all;transform:translate(-50%,-50%) scale(1) translateY(0)}
.cmodal-inner{padding:2rem 2.2rem}
.cm-close{float:right;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;padding:4px 10px;border:1px solid rgba(255,255,255,.1);border-radius:2px;color:#64748b;cursor:pointer;background:transparent;transition:all .2s;margin-top:2px}
.cm-close:hover{color:#e2e8f0}
#m-num{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.22em;color:#64748b;margin-bottom:.5rem}
#m-place{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.14em;margin-bottom:.9rem;opacity:.75}
#m-title{font-family:'Rajdhani',sans-serif;font-size:clamp(1.6rem,3.5vw,2.5rem);font-weight:700;line-height:1.1;letter-spacing:.02em;color:#f1f5f9;margin-bottom:1.1rem}
#m-body{font-family:'Rajdhani',sans-serif;font-size:1.05rem;color:#94a3b8;line-height:1.75;margin-bottom:1.2rem}
#m-body strong{color:#f1f5f9;font-weight:600}
#m-tags{margin-bottom:1rem}
.cm-tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;padding:3px 10px;border-radius:2px;margin:3px 3px 3px 0;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#64748b}
#m-photos{margin:1.2rem 0 0}
.cm-photo-wrap{margin-bottom:1rem}
.cm-photo{width:100%;border-radius:3px;display:block;border:1px solid rgba(255,255,255,.08);object-fit:cover;max-height:260px}
.cm-photo-cap{font-family:'JetBrains Mono',monospace;font-size:9px;color:#475569;letter-spacing:.08em;margin-top:.5rem;line-height:1.55}
.cm-chat-hint{margin-top:1.5rem;padding:1rem 1.2rem;background:rgba(255,255,255,.03);border-radius:3px;border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#64748b;letter-spacing:.08em;cursor:pointer;transition:all .2s}
.cm-chat-hint:hover{background:rgba(255,255,255,.06)}
.cm-hint-dot{width:8px;height:8px;border-radius:50%;background:#4ade80;flex-shrink:0;animation:ctpulse 2s ease-in-out infinite}

/* ── CHAT WIDGET ── */
#chat-widget{position:fixed;bottom:1.5rem;right:1.5rem;z-index:12;display:flex;flex-direction:column;align-items:flex-end;gap:.7rem}

/* ── TOOLTIP ── */
#chat-tooltip{display:flex;align-items:center;gap:8px;background:rgba(6,10,18,.96);border:1px solid rgba(245,158,11,.3);border-radius:20px;padding:7px 14px 7px 8px;font-family:'JetBrains Mono',monospace;font-size:10px;color:#f1f5f9;letter-spacing:.06em;white-space:nowrap;position:relative;opacity:1;pointer-events:none;animation:ctooltip-in .5s 1.2s cubic-bezier(.22,1,.36,1) both,ctooltip-bob 2.8s 1.7s ease-in-out infinite;transition:opacity .4s}
.ctt-arrow{position:absolute;bottom:-6px;right:26px;width:10px;height:6px;overflow:hidden}
.ctt-arrow::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%) rotate(45deg);width:8px;height:8px;background:rgba(6,10,18,.96);border-right:1px solid rgba(245,158,11,.3);border-bottom:1px solid rgba(245,158,11,.3)}
.ctt-av{width:22px;height:22px;border-radius:50%;object-fit:cover;border:1px solid rgba(245,158,11,.4);flex-shrink:0}
@keyframes ctooltip-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes ctooltip-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}

/* ── CHAT PANEL ── */
#chat-panel{width:360px;height:520px;background:rgba(6,10,18,.98);border:1px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;transform:translateY(16px) scale(.95);transform-origin:bottom right;opacity:0;pointer-events:none;transition:transform .38s cubic-bezier(.22,1,.36,1),opacity .3s ease;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(0,0,0,.7),0 0 0 1px rgba(245,158,11,.06)}
#chat-panel.open{transform:none;opacity:1;pointer-events:all}

/* ── CHAT HEADER ── */
.cp-head{display:flex;align-items:center;justify-content:space-between;padding:.75rem 1rem;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;background:rgba(245,158,11,.04)}
.cp-head-left{display:flex;align-items:center;gap:10px}
.cp-avatar{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid rgba(245,158,11,.5);flex-shrink:0}
.cp-head-info{display:flex;flex-direction:column;gap:2px}
.cp-name{font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700;color:#f1f5f9;letter-spacing:.02em;line-height:1}
.cp-status{display:flex;align-items:center;gap:5px;font-family:'JetBrains Mono',monospace;font-size:8.5px;letter-spacing:.08em;color:#64748b}
.cp-status-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;flex-shrink:0;animation:ctpulse 2s ease-in-out infinite}
.cp-min{color:#475569;cursor:pointer;padding:5px;border:1px solid rgba(255,255,255,.08);border-radius:6px;background:transparent;transition:all .2s;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.cp-min:hover{color:#e2e8f0;border-color:rgba(255,255,255,.18);background:rgba(255,255,255,.05)}

/* ── MESSAGES ── */
#chat-msgs{flex:1;overflow-y:auto;padding:.9rem 1rem;display:flex;flex-direction:column;gap:.7rem}
#chat-msgs::-webkit-scrollbar{width:2px}
#chat-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,.08)}
.cmsg{display:flex;align-items:flex-end;gap:8px;max-width:92%;animation:cmsgfade .3s cubic-bezier(.22,1,.36,1) both}
@keyframes cmsgfade{from{opacity:0;transform:translateY(8px) scale(.97)}to{opacity:1;transform:none}}
.cmsg.host{align-self:flex-end;flex-direction:row-reverse}
.cmsg.jill{align-self:flex-start}
.cmsg-av{width:28px;height:28px;border-radius:50%;flex-shrink:0;object-fit:cover}
.jill-av{border:1.5px solid rgba(245,158,11,.4)}
.you-av{background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:7px;letter-spacing:.05em;color:#64748b;width:28px;height:28px;border-radius:50%;flex-shrink:0}
.cmsg-content{display:flex;flex-direction:column;gap:2px;min-width:0}
.cmsg.host .cmsg-content{align-items:flex-end}
.cmsg-from{font-family:'JetBrains Mono',monospace;font-size:8px;letter-spacing:.1em;opacity:.45;padding:0 2px}
.cmsg.host .cmsg-from{color:#94a3b8}.cmsg.jill .cmsg-from{color:#f59e0b}
.cmsg-bub{padding:8px 12px;font-family:'Rajdhani',sans-serif;font-size:.9rem;line-height:1.55;word-break:break-word}
.cmsg.host .cmsg-bub{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;border-radius:14px 14px 4px 14px}
.cmsg.jill .cmsg-bub{background:rgba(245,158,11,.09);border:1px solid rgba(245,158,11,.2);color:#e2e8f0;border-radius:14px 14px 14px 4px}
.cmsg.typing .cmsg-bub{background:rgba(245,158,11,.05);border:1px solid rgba(245,158,11,.12);display:flex;align-items:center;gap:4px;padding:10px 14px}
.ctdot{width:5px;height:5px;border-radius:50%;background:#f59e0b;animation:ctdota 1.2s ease-in-out infinite}
.ctdot:nth-child(2){animation-delay:.2s}.ctdot:nth-child(3){animation-delay:.4s}
@keyframes ctdota{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-5px);opacity:1}}

/* ── SUGGESTIONS ── */
#chat-sugs{padding:.45rem .9rem .35rem;display:flex;flex-wrap:wrap;gap:5px;flex-shrink:0;border-top:1px solid rgba(255,255,255,.04)}
.csug{font-family:'JetBrains Mono',monospace;font-size:9px;padding:4px 10px;border-radius:20px;cursor:pointer;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:#64748b;transition:all .18s;white-space:nowrap;animation:csugfade .3s cubic-bezier(.22,1,.36,1) both}
.csug:hover{border-color:rgba(245,158,11,.35);color:#f59e0b;background:rgba(245,158,11,.06);transform:translateY(-1px)}
@keyframes csugfade{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}

/* ── INPUT ROW ── */
.cp-irow{display:flex;align-items:center;gap:8px;padding:.65rem .9rem .75rem;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;background:rgba(0,0,0,.2)}
#chat-inp{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:22px;padding:8px 14px;outline:none;font-family:'Rajdhani',sans-serif;font-size:.9rem;color:#e2e8f0;caret-color:#f59e0b;transition:border-color .2s,background .2s}
#chat-inp:focus{border-color:rgba(245,158,11,.35);background:rgba(255,255,255,.07)}
#chat-inp::placeholder{color:#475569;font-size:.85rem}
#chat-inp:disabled{opacity:.4}
#chat-sbtn{width:36px;height:36px;background:#f59e0b;color:#05080f;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s cubic-bezier(.22,1,.36,1),background .18s,box-shadow .2s;flex-shrink:0}
#chat-sbtn:hover{background:#fbbf24;transform:scale(1.1);box-shadow:0 0 14px rgba(245,158,11,.4)}
#chat-sbtn:active{transform:scale(.93)}
#chat-sbtn.sending{animation:sbtn-launch .35s ease both}
#chat-sbtn:disabled{opacity:.35;cursor:default;transform:none;box-shadow:none}
.sbtn-icon{width:15px;height:15px;display:block;transform:translateX(1px)}
@keyframes sbtn-launch{0%{transform:scale(1)}40%{transform:scale(1.18) rotate(-10deg)}70%{transform:scale(.9) rotate(5deg)}100%{transform:scale(1) rotate(0deg)}}

/* ── BUBBLE BUTTON ── */
#bubble-btn{width:54px;height:54px;border-radius:50%;cursor:pointer;background:transparent;border:none;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;transition:transform .25s cubic-bezier(.22,1,.36,1);position:relative;flex-shrink:0;opacity:0;transform:translateY(10px) scale(.8)}
#bubble-btn.entered{opacity:1;transform:none;animation:bubble-bounce .6s cubic-bezier(.22,1,.36,1) both}
@keyframes bubble-bounce{0%{transform:translateY(10px) scale(.8);opacity:0}60%{transform:translateY(-4px) scale(1.06)}80%{transform:translateY(2px) scale(.97)}100%{transform:none;opacity:1}}
#bubble-btn:hover{transform:scale(1.1) !important}
.bic-label{position:absolute;top:-26px;left:50%;transform:translateX(-50%);white-space:nowrap;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.08em;color:#f1f5f9;background:rgba(6,10,18,.92);border:1px solid rgba(245,158,11,.35);border-radius:10px;padding:3px 9px;pointer-events:none}
.bic-avatar{width:54px;height:54px;border-radius:50%;object-fit:cover;border:2.5px solid #f59e0b;display:block;transition:border-color .2s,box-shadow .2s;box-shadow:0 4px 18px rgba(0,0,0,.5)}
#bubble-btn:hover .bic-avatar{border-color:#fbbf24;box-shadow:0 6px 24px rgba(245,158,11,.35)}
.notif-ring{position:absolute;inset:-5px;border-radius:50%;border:2px solid #f59e0b;opacity:0;animation:cnotif 2s ease-in-out infinite;pointer-events:none}
#bubble-btn.active .notif-ring{opacity:1}
@keyframes cnotif{0%,100%{transform:scale(1);opacity:.55}50%{transform:scale(1.22);opacity:0}}
.cno-star{font-family:'JetBrains Mono',monospace;font-size:9.5px;color:#64748b;text-align:center;padding:1.5rem 1rem;line-height:1.7;letter-spacing:.06em}

@media(max-width:768px){
  #ctopbar{padding:.6rem 1rem}
  .ctb-l{font-size:8.5px;letter-spacing:.1em}
  .ctb-r{font-size:8px}
  .it{font-size:clamp(1.6rem,5vw,2.4rem)}
  .is{font-size:9px}
  #cmodal{width:94vw;max-height:88vh;top:auto;bottom:2vh;left:50%;transform:translateX(-50%) scale(.94) translateY(16px)}
  #cmodal.open{transform:translateX(-50%) scale(1) translateY(0)}
  .cmodal-inner{padding:1.3rem 1.2rem}
  #m-title{font-size:clamp(1.3rem,3vw,1.8rem)}
  #m-body{font-size:.92rem}
  #chat-widget{bottom:1rem;right:.8rem}
  #chat-panel{width:min(340px,90vw);height:460px;border-radius:14px}
  #bubble-btn,#bubble-btn .bic-avatar{width:48px;height:48px}
  .cstar-lbl{font-size:8px}
  .cstar-yr{font-size:7px}
  #chat-tooltip{font-size:9px}
}
@media(max-width:480px){
  .cmodal-inner{padding:1rem}
  #m-title{font-size:1.2rem}
  #m-body{font-size:.85rem;line-height:1.65}
  .cm-tag{font-size:8px;padding:2px 7px}
  #chat-panel{width:calc(100vw - 1.6rem);height:420px}
  .cmsg-bub{font-size:.85rem;padding:7px 10px}
  .csug{font-size:8px;padding:3px 8px}
  #chat-tooltip{display:none}
}
`
