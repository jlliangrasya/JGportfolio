import { useEffect, useRef } from 'react'
import SwitchButton from '../../shared/SwitchButton.jsx'
import {
  BOOT_LINES, GIT_LOG, STORY_LINES, PERSONAL,
  SKILL_BRANCHES, QUESTS, ACHIEVEMENTS
} from '../../../data/index.js'

/* ─── NOTE ─────────────────────────────────────────────────────────
   Full terminal experience. All command logic in useEffect.
   Mirrors collaborator-terminal.html prototype.
──────────────────────────────────────────────────────────────────── */

export default function CollaboratorPersona({ onSwitch }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.innerHTML = buildHTML()

    const out   = root.querySelector('#term-out')
    let busy    = false
    const HIST  = []
    let   hidx  = -1

    /* — OUTPUT HELPERS — */
    const ln = (text = '', cls = 'sub') => {
      const d = document.createElement('div')
      d.className = 'tln ' + (text === '' ? 'sp' : cls)
      d.textContent = text
      out.appendChild(d)
      out.scrollTop = out.scrollHeight
      return d
    }
    const sp = () => ln()
    const sb = () => { out.scrollTop = out.scrollHeight }
    const wait = (ms) => new Promise(r => setTimeout(r, ms))

    const print = async (lines, fast = false) => {
      busy = true
      for (const l of lines) {
        if (l === null || l === '') { sp(); continue }
        const [text, cls, ms] = Array.isArray(l) ? l : [l, 'sub', fast ? 18 : 32]
        await wait(ms ?? (fast ? 18 : 32))
        ln(text, cls)
      }
      busy = false
      sb()
    }

    const typeWriter = async (lines) => {
      busy = true
      for (const [text, cls] of lines) {
        if (!text) { sp(); await wait(80); continue }
        const d = document.createElement('div')
        d.className = 'tln ' + cls
        out.appendChild(d)
        for (const ch of text) { d.textContent += ch; sb(); await wait(17) }
        await wait(110)
      }
      busy = false
      sb()
    }

    /* — CHIPS — */
    const chips = (list) => {
      const c = root.querySelector('#term-chips')
      if (!c) return
      c.innerHTML = '<span class="tchip-lbl">TRY:</span>'
      list.forEach(cmd => {
        const el = document.createElement('span')
        el.className = 'tchip'
        el.textContent = cmd
        el.onclick = (e) => { e.stopPropagation(); run(cmd) }
        c.appendChild(el)
      })
    }

    /* — COMMANDS — */
    const CMD = {}
    const reg = (keys, fn) => (Array.isArray(keys) ? keys : [keys]).forEach(k => CMD[k.toLowerCase()] = fn)

    reg('whoami', async () => {
      await print([
        ['jillian grace d. burila', 'cyan'], null,
        ['  engineer     →  full-stack · game dev · embedded · iot', 'sub'],
        ['  teacher      →  esl · 1→17 students · top tutor', 'sub'],
        ['  entrepreneur →  ran a real business at 19', 'sub'],
        ['  leader       →  rotaract president · student ambassador', 'sub'],
        ['  champion     →  robothon national champion 2024', 'sub'], null,
        ['  location  :  hinunangan, southern leyte, philippines', 'muted'],
        ['  school    :  slsu · magna cum laude · bs comp eng 2025', 'muted'],
        ['  status    :  available for hire ✓', 'green'],
      ])
      chips(['skills', 'git log', 'projects', 'awards', 'cat story'])
    })

    reg('help', async () => {
      await print([
        ['available commands:', 'cyan'], null,
        ['  whoami                who is jillian?', 'sub'],
        ['  skills                full tech stack tree', 'sub'],
        ['  projects              deployed work + impact', 'sub'],
        ['  git log               career as commit history', 'sub'],
        ['  git log --oneline     condensed timeline', 'sub'],
        ['  cat story             origin story (typewriter)', 'sub'],
        ['  awards                achievements + recognition', 'sub'],
        ['  hire  /  contact      open a comms channel', 'sub'],
        ['  man jillian           full manual page', 'sub'],
        ['  ping jillian          test response time', 'sub'],
        ['  clear                 clear the terminal', 'sub'], null,
        ['  tab → autocomplete  ·  ↑↓ → history  ·  ctrl+l → clear', 'dim'],
      ])
      chips(['whoami', 'skills', 'git log', 'cat story', 'hire'])
    })

    reg('skills', async () => {
      await print([
        ['~/skills', 'cyan'],
        ...SKILL_BRANCHES.flatMap(b => [
          [`├── ${b.branch.replace('⬡ ','').toLowerCase()}/`, 'white'],
          ...b.nodes.map(n => [`│   ├── ${n.name.padEnd(18)} [${n.state.toUpperCase()}]`, n.state === 'mastered' ? 'sub' : 'muted']),
        ]),
      ], true)
      chips(['projects', 'git log', 'hire', 'awards'])
    })

    reg(['git log', 'git log --all'], async () => {
      await print(GIT_LOG.flatMap(c => [
        [`commit ${c.hash}${c.head ? ' (HEAD → main, origin/main)' : ''}`, 'gold'],
        [`Author: Jillian Grace <${PERSONAL.email}>`, 'muted'],
        [`Date:   ${c.date}`, 'muted'],
        [`    ${c.msg}`, c.cls], null,
      ]), true)
      chips(['git log --oneline', 'projects', 'cat story', 'hire'])
    })

    reg('git log --oneline', async () => {
      await print(GIT_LOG.map(c => [`${c.hash}${c.head ? ' (HEAD)' : ''}  ${c.msg}`, c.cls]))
      chips(['git log', 'projects', 'cat story'])
    })

    reg('git status', async () => {
      await print([['On branch main', 'cyan'], ['Your branch is up to date with origin/main.', 'sub'], null, ['nothing to commit. everything ships.', 'green']])
      chips(['git log', 'projects'])
    })

    reg('git blame', async () => {
      await print([
        ['running git blame...', 'muted'], null,
        ['f3a9c2e (Jillian 2025)  frontend architecture      — her', 'sub'],
        ['4c2e91f (Jillian 2024)  biometric integration      — her', 'sub'],
        ['3d8f01b (Jillian 2024)  robot firmware             — her', 'sub'],
        ['8b71d3a (Jillian 2025)  gameplay systems           — her', 'sub'],
        ['9e1a5b3 (Jillian 2023)  lesson plans               — her', 'sub'], null,
        ['no one else to blame. she wrote it all.', 'gold'],
      ])
      chips(['git log', 'projects', 'hire'])
    })

    reg(['git push origin main'], async () => {
      await print([['Writing objects: 100% ━━━━━━━━━━ done.', 'sub'], null, ['branch is live. relax.', 'green']])
    })

    reg('git merge conflicts', async () => { ln('no conflicts. she resolves those before they happen.', 'green'); chips(['git log', 'projects']) })

    reg('projects', async () => {
      await print([
        ['~/projects', 'cyan'], null,
        ['┌─ [01] XDefender (XODE)                    [SHIPPED → PRODUCTION]', 'white'],
        ['│      Unity · C# · Game Design · QA', 'muted'],
        ['│      built 50% of gameplay features at rak son tech opc', 'sub'],
        ['│      inventory system · power-ups · performance optimization', 'sub'], null,
        ['├─ [02] HyPTech + Biometric System           [DEPLOYED]', 'white'],
        ['│      React · Django · IoT · Agile · Team Lead', 'muted'],
        ['│      sole architect — full frontend + backend architecture', 'sub'],
        ['│      biometric hardware bridge · led agile team to delivery', 'sub'], null,
        ['└─ [03] Senior Citizen Age Tracker           [DEPLOYED → BARANGAY]', 'green'],
        ['       Visual Basic · UI/UX · Team Lead', 'muted'],
        ['       designed full ui/ux and frontend from scratch', 'sub'],
        ['       selected for + deployed to actual local government', 'sub'],
      ], true)
      chips(['cat story', 'skills', 'git log', 'hire'])
    })

    reg('cat story', async () => {
      sp()
      await typeWriter(STORY_LINES.map(l => [l.text, l.cls || 'sub']))
      chips(['git log', 'projects', 'awards', 'hire'])
    })

    reg('cat about', async () => {
      await print([
        ['jillian grace d. burila', 'cyan'],
        ['bs computer engineering · magna cum laude · slsu 2025', 'muted'], null,
        ["full-stack engineer with a background that doesn't fit a single box.", 'sub'],
        ['ran a business, taught english, led student organizations,', 'sub'],
        ['won a national robotics championship — all before her first production codebase.', 'sub'], null,
        ["now she builds software that reflects everything she's learned.", 'white'],
      ])
      chips(['cat story', 'skills', 'git log', 'hire'])
    })

    reg('awards', async () => {
      await print([
        ['achievements unlocked:', 'cyan'], null,
        ['  ⚡  [LEGENDARY]  Robothon National Champion 2024', 'gold'],
        ['                   returned as national qualifier in 2025', 'muted'], null,
        ['  ★   [EPIC]       Magna Cum Laude · SLSU 2025', 'sub'],
        ['  ✈   [RARE]       Vietnam Cultural Exchange Ambassador', 'cyan'],
        ['  ⬡   [RARE]       Real-World Government Deployment', 'cyan'],
        ['  ◎   [UNCOMMON]   Top Tutor — Cassey Int\'l Tutorial Services', 'green'],
        ['  ✦   [UNCOMMON]   Scintillate Award — Supreme Student Council', 'green'],
      ])
      chips(['git log', 'projects', 'hire', 'cat story'])
    })

    reg(['hire', 'contact'], async () => {
      await print([
        ['opening comms channel...', 'muted'], null,
        [`  email    →  ${PERSONAL.email}`, 'cyan'],
        [`  github   →  ${PERSONAL.github}`, 'cyan'],
        [`  phone    →  ${PERSONAL.phone}`, 'cyan'],
        [`  location →  ${PERSONAL.location}`, 'muted'], null,
        ['  status   →  available for hire ✓', 'green'],
        ['  open to  →  full-time · freelance · collaboration', 'green'],
      ])
      chips(['projects', 'git log', 'man jillian'])
    })

    reg('man jillian', async () => {
      await print([
        ['JILLIAN(1)             User Commands            JILLIAN(1)', 'white'], null,
        ['NAME', 'cyan'],
        ['       jillian — full-stack engineer, builder, champion', 'sub'], null,
        ['SYNOPSIS', 'cyan'],
        ['       hire [--role=TYPE] [--urgency=HIGH]', 'sub'], null,
        ['EXIT STATUS', 'cyan'],
        ['       0  she joins your team', 'green'],
        ['       1  you waited too long', 'red'], null,
        ['AUTHOR', 'cyan'],
        [`       ${PERSONAL.email}`, 'muted'], null,
        ['JILLIAN(1)                 Jun 2025                JILLIAN(1)', 'white'],
      ], true)
      chips(['hire', 'git log', 'projects'])
    })

    reg('ls', async () => {
      ln('./projects    ./skills    ./story    ./awards    ./contact', 'cyan')
      chips(['ls ./projects', 'ls ./skills', 'cat story', 'awards', 'contact'])
    })
    reg('ls ./projects', () => run('projects'))
    reg('ls ./skills',   () => run('skills'))
    reg('pwd',           () => { ln('/home/jillian/portfolio', 'cyan'); chips(['ls', 'whoami']) })
    reg('ping jillian',  async () => {
      await print([
        ['PING jillian@portfolio 56 bytes', 'muted'],
        ['64 bytes: icmp_seq=1 time=0.09 ms', 'sub'],
        ['64 bytes: icmp_seq=2 time=0.11 ms', 'sub'], null,
        ['3 packets, 0% packet loss.', 'sub'],
        ['response time: instant.', 'green'],
      ])
    })

    /* — EASTER EGGS — */
    reg('sudo hire jillian', async () => {
      await print([
        ['[sudo] password for recruiter:', 'red'], ['Sorry, try again.', 'red'],
        ['[sudo] password for recruiter:', 'red'], ['Sorry, try again.', 'red'],
        ['sudo: 3 incorrect password attempts', 'red'], null,
        ["hint: you don't need sudo. just type: hire", 'gold'],
      ])
      chips(['hire', 'contact'])
    })
    reg(['sudo', 'sudo su'], () => { ln('nice try. not root here.', 'gold'); chips(['hire', 'whoami']) })
    reg('rm -rf bad-code', async () => {
      await print([
        ['removing bad-code/ ...', 'muted'],
        ['deleted: spaghetti.js', 'sub'], ['deleted: untested.py', 'sub'],
        ['deleted: works-on-my-machine.env', 'sub'], null,
        ['4,291 lines of bad code deleted. you\'re welcome.', 'green'],
      ])
    })
    reg(['rm -rf /', 'rm -rf ./'], () => ln('this machine is read-only. nice try.', 'red'))
    reg(['ssh root@jillian', 'ssh root@portfolio'], async () => {
      await print([['Permission denied (publickey).', 'red'], null, ['to connect properly, use: hire', 'gold']])
    })
    reg(['cd ..', 'cd ../'], () => ln("there's nowhere above this.", 'gold'))
    reg(['npm install jillian', 'pip install jillian'], () => ln('warning: jillian is not a package. she is a person.', 'gold'))
    reg(['python --version', 'python3 --version'], () => ln('Python 3.11.4 (Jillian Edition)', 'cyan'))
    reg(['node -v', 'node --version'], () => ln('v20.11.0  (also React · also Django · also Unity)', 'cyan'))
    reg('uname -a', () => ln('JillianOS 2025 #MAGNACUMLAUDE SMP ROBOTHON x86_64 GNU/Linux', 'sub'))
    reg(['clear', 'ctrl+l'], () => { out.innerHTML = ''; chips(['whoami', 'help', 'git log', 'cat story']) })
    reg(['exit', 'quit', 'logout'], async () => {
      await print([['logout', 'muted'], ['Connection closed.', 'muted'], null, ['...', 'dim'], null, ["you can't leave that easily.", 'gold']])
    })

    const ALL_CMDS = ['whoami','help','skills','projects','git log','git log --oneline','git status',
      'git blame','git push origin main','git merge conflicts','cat story','cat about','awards',
      'hire','contact','man jillian','ls','ls ./projects','ls ./skills','pwd','ping jillian',
      'clear','exit','logout','sudo hire jillian','rm -rf bad-code','npm install jillian',
      'python --version','node -v','uname -a','ssh root@jillian','cd ..']

    /* — RUN — */
    const run = async (raw) => {
      const cmd = raw.trim()
      if (!cmd) return
      HIST.unshift(cmd); hidx = -1
      sp(); ln(cmd, 'cmd')
      const inp = root.querySelector('#term-input')
      if (inp) inp.value = ''
      const handler = CMD[cmd.toLowerCase()]
      if (handler) { await handler(cmd) }
      else {
        await print([[`bash: ${cmd.split(' ')[0]}: command not found`, 'red'], ["type 'help' to see available commands.", 'muted']])
        chips(['help', 'whoami', 'skills'])
      }
      sp(); sb()
    }

    /* — INPUT — */
    const inp = root.querySelector('#term-input')
    if (inp) {
      inp.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') { if (!busy) await run(inp.value); return }
        if (e.key === 'Tab') {
          e.preventDefault()
          const v = inp.value.toLowerCase()
          const m = ALL_CMDS.find(c => c.startsWith(v) && c !== v)
          if (m) inp.value = m
          return
        }
        if (e.key === 'ArrowUp') { e.preventDefault(); if (hidx < HIST.length - 1) { hidx++; inp.value = HIST[hidx] } return }
        if (e.key === 'ArrowDown') { e.preventDefault(); if (hidx > 0) { hidx--; inp.value = HIST[hidx] } else { hidx = -1; inp.value = '' } return }
        if (e.key === 'Escape') { inp.value = ''; hidx = -1 }
        if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); run('clear') }
      })
    }

    const focus = () => inp?.focus()
    root.addEventListener('click', focus)

    /* — BOOT — */
    const bootTerm = async () => {
      for (const l of BOOT_LINES) { sp(); ln(l.text, l.cls) }
      chips(['whoami', 'help', 'git log', 'cat story'])
      focus()
    }
    bootTerm()

    return () => { root.removeEventListener('click', focus) }
  }, [])

  return (
    <>
      <style>{TERM_CSS}</style>
      <div ref={rootRef} className="term-root" />
      <SwitchButton onSwitch={onSwitch} />
    </>
  )
}

function buildHTML() {
  return `
<div class="term-bg-grid"></div>
<div id="term-win">
  <div id="term-bar">
    <div class="term-dots"><div class="td tr"></div><div class="td ty"></div><div class="td tg" onclick="document.getElementById('term-out').innerHTML='';"></div></div>
    <div id="term-title">jillian@portfolio — bash</div>
    <div class="term-hint">TAB complete · ↑↓ history · Ctrl+L clear</div>
  </div>
  <div id="term-out"></div>
  <div id="term-chips"><span class="tchip-lbl">TRY:</span></div>
  <div id="term-irow">
    <span class="term-pr">jillian@portfolio:~$&nbsp;</span>
    <input id="term-input" type="text" autocomplete="off" spellcheck="false" placeholder="type a command..."/>
  </div>
</div>`
}

const TERM_CSS = `
.term-root{position:fixed;inset:0;background:#0a0d14;font-family:'JetBrains Mono',monospace;overflow:hidden}
.term-bg-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(34,211,238,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,.018) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}
#term-win{position:absolute;inset:1.2rem;display:flex;flex-direction:column;background:#0d1117;border:1px solid rgba(34,211,238,.13);border-radius:8px;overflow:hidden}
#term-bar{display:flex;align-items:center;gap:10px;padding:10px 16px;flex-shrink:0;background:rgba(255,255,255,.03);border-bottom:1px solid rgba(255,255,255,.06)}
.term-dots{display:flex;gap:6px}
.td{width:12px;height:12px;border-radius:50%}
.tr{background:#ff5f57}.ty{background:#febc2e}.tg{background:#28c840;cursor:pointer}
#term-title{flex:1;text-align:center;font-size:11.5px;color:#64748b;letter-spacing:.05em}
.term-hint{font-size:9.5px;color:#475569;letter-spacing:.1em}
#term-out{flex:1;overflow-y:auto;padding:1.1rem 1.5rem .5rem}
#term-out::-webkit-scrollbar{width:3px}
#term-out::-webkit-scrollbar-thumb{background:rgba(34,211,238,.18);border-radius:2px}
.tln{font-size:12.5px;line-height:1.85;white-space:pre-wrap;word-break:break-word;min-height:1px}
.tln.sp{height:5px}
.tln.cmd{color:#e2e8f0}.tln.cmd::before{content:'jillian@portfolio:~$ ';color:#22d3ee}
.tln.cyan{color:#22d3ee}.tln.green{color:#4ade80}.tln.gold{color:#f59e0b}
.tln.red{color:#f87171}.tln.white{color:#e2e8f0}.tln.sub{color:#94a3b8}
.tln.muted{color:#64748b}.tln.dim{color:#475569}
#term-chips{display:flex;flex-wrap:wrap;gap:5px;padding:.55rem 1.3rem .4rem;border-top:1px solid rgba(255,255,255,.05);flex-shrink:0;background:rgba(255,255,255,.015);align-items:center}
.tchip-lbl{font-size:9.5px;color:#475569;letter-spacing:.1em;margin-right:3px;flex-shrink:0}
.tchip{font-size:10px;padding:3px 10px;border-radius:2px;cursor:pointer;background:rgba(34,211,238,.06);border:1px solid rgba(34,211,238,.16);color:#22d3ee;transition:all .15s;white-space:nowrap}
.tchip:hover{background:rgba(34,211,238,.14);transform:translateY(-1px)}
#term-irow{display:flex;align-items:center;padding:.75rem 1.5rem 1rem;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;background:rgba(255,255,255,.02)}
.term-pr{font-size:12.5px;color:#22d3ee;white-space:nowrap;margin-right:6px;flex-shrink:0}
#term-input{flex:1;background:transparent;border:none;outline:none;font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#e2e8f0;caret-color:#22d3ee}
#term-input::placeholder{color:#475569}
@media(max-width:520px){
  #term-win{inset:.4rem;border-radius:4px}
  .term-hint{display:none}
  #term-out{padding:.7rem .9rem .4rem}
  .tln{font-size:11.5px;line-height:1.7}
  .tln.cmd::before{content:'~$ '}
  #term-chips{padding:.4rem .8rem .3rem;gap:4px}
  .tchip{font-size:9px;padding:2px 7px}
  #term-irow{padding:.5rem .9rem .7rem}
  .term-pr{font-size:11.5px}
  #term-input{font-size:11.5px}
  #term-bar{padding:8px 10px}
  #term-title{font-size:10px}
}
@media(max-width:360px){
  .tln{font-size:10.5px}
  .term-pr{font-size:10.5px}
  #term-input{font-size:10.5px}
}
`
