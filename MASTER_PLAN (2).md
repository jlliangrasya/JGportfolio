# Jillian Grace D. Burila — Portfolio Master Plan
> Sci-fi HUD · Persona-Adaptive · Four Completely Different UX Worlds

---

## BUILD PROGRESS

| # | Persona | UX Model | File | Status |
|---|---------|----------|------|--------|
| 1 | Recruiter | RPG Character Sheet | `recruiter-rpg-v2.html` | ✅ COMPLETE |
| 2 | Collaborator | Live Terminal CLI | `collaborator-terminal.html` | ✅ COMPLETE |
| 3 | Curious | Cinematic Chapter Mode | `curious-chapters.html` | ✅ COMPLETE |
| 4 | Client | Clean Editorial Scroll | `client-editorial.html` | ✅ COMPLETE |

---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| Name | Jillian Grace D. Burila |
| Email | jillianburila@gmail.com |
| GitHub | github.com/jlliangrasya |
| Phone | 09385056299 |
| Location | Hinunangan, Southern Leyte, Philippines |
| School | Southern Leyte State University (SLSU) |
| Degree | BS Computer Engineering — Magna Cum Laude, Jun 2025 |
| Domain | `jillianburila.dev` (recommended) |
| Stack | Next.js 14 + Tailwind CSS + Framer Motion |
| Deploy | Vercel |

**Headline:** "From Southern Leyte — I build things that last."
**Entry rotator:** `Engineer` → `Builder` → `Champion` → `Teacher` → `Leader`

---

## 2. SHARED DESIGN TOKENS

### Colors
```css
/* Base */
--bg:          #06090f;   /* shared dark background */
--bg-panel:    rgba(255,255,255,0.03);
--bg-panel2:   rgba(255,255,255,0.06);
--white:       #e2e8f0;
--sub:         #94a3b8;
--muted:       #64748b;
--dim:         #475569;
--border:      rgba(255,255,255,0.07);
--border2:     rgba(255,255,255,0.12);

/* Persona accents */
--gold:        #f59e0b;   /* Recruiter */
--gold-dim:    rgba(245,158,11,0.13);
--gold-border: rgba(245,158,11,0.28);
--cyan:        #22d3ee;   /* Collaborator + shared HUD */
--cyan-dim:    rgba(34,211,238,0.10);
--purple:      #a78bfa;   /* Epic rarity */
--purple-dim:  rgba(167,139,250,0.10);
--green:       #4ade80;   /* Success / terminal output */
--green-dim:   rgba(74,222,128,0.08);
--red:         #f87171;   /* Error / danger */
```

### Typography
```
Display (headings): Rajdhani — weights 400, 500, 600, 700
Monospace (body):   JetBrains Mono — weights 300, 400, 500, 700
Google Fonts URL: ?family=JetBrains+Mono:wght@300;400;500;700&family=Rajdhani:wght@400;500;600;700
```

### Background Effects (shared)
- CSS grid: `linear-gradient` 1px lines, 40–48px spacing, accent color at ~2% opacity
- Radial vignette: `radial-gradient(ellipse, transparent 35%, rgba(0,0,0,0.65) 100%)`
- Scrollbar: 3px width, cyan-tinted thumb

### HUD Corner Bracket Pattern
```css
.card::before { top:-1px; left:-1px; width:11px; height:11px;
  border-top: 1px solid var(--gold); border-left: 1px solid var(--gold); opacity:.4 }
.card::after  { bottom:-1px; right:-1px;
  border-bottom / border-right; opacity:.4 }
/* hover: opacity → 0.8, active-card: opacity → 1 */
```

---

## 3. ENTRY SCREEN (Shared — all personas)

- Full-screen dark overlay, centered
- Eyebrow: `// INCOMING CONNECTION — IDENTIFY YOURSELF`
- Name: `Jillian Grace` (Grace in accent color)
- Role row: `ENGINEER · BUILDER · CHAMPION · TEACHER · LEADER`
- 2×2 grid of persona buttons
- Each button: role label (10px, letterspace) + tagline (Rajdhani 14px)
- Hover: HUD brackets appear + bg-hover tint + border-color upgrade
- On select: entry `opacity:0 + scale(1.04)` → experience fades in
- `[ SWITCH PERSONA ]` — fixed bottom-right, always visible after entry

### Persona Buttons
| Position | Role Label | Tagline |
|----------|-----------|---------|
| Top-left | RECRUITER / HIRING | Show me the engineer |
| Top-right | POTENTIAL CLIENT | I need something built |
| Bottom-left | COLLABORATOR | Let's work together |
| Bottom-right | JUST CURIOUS | Who is this person? |

---

## 4. PERSONA 1 — RECRUITER: RPG CHARACTER SHEET ✅

**File:** `recruiter-rpg-v2.html`
**Model:** Page-flip — 6 screens, zero scrolling
**Accent:** Gold `#f59e0b`
**Background grid tint:** `rgba(245,158,11,0.016)`

### Navigation System
- Fixed top bar: brand left / ref ID center / status right (`AVAILABLE FOR HIRE` + pulse dot)
- Fixed bottom bar: `◀ PREV` button / dot indicators / screen label / `NEXT ▶` button
- Dot indicators: inactive = 6px circle, active = 18px wide pill (gold)
- Click dots → jump to any screen
- Keyboard: `ArrowLeft` prev, `ArrowRight` / `Space` / `Enter` next, `Escape` closes panels
- Screen transition: `translateX(±60px)` + opacity 0↔1, 400ms ease
- `exit-l` / `exit-r` classes removed after 400ms

### Hint Bar
Between top bar and screen content. Context-sensitive per screen:
```
S0: LOADING CANDIDATE FILE...
S1: CLICK STATS TO INSPECT · CLICK SKILLS TO JUMP · CLICK LEVEL FOR XP
S2: CLICK ANY NODE TO SEE PROJECT CONTEXT
S3: CLICK QUEST CARDS TO EXPAND · FILTER BY TECH STACK
S4: CLICK ACHIEVEMENTS TO UNLOCK DETAILS
S5: SELECT ROLE TYPE · CLICK CONTACTS TO COPY
```

---

### Screen 0 — Boot Sequence

**Trigger:** auto-runs on load. Click or keypress advances to S1.

**Boot lines (9 total, staggered delays):**
```
delay:    0ms  > INITIALIZING CANDIDATE SCANNER v2025...
delay:  400ms  > LOADING FILE: JILLIAN GRACE D. BURILA         [white]
delay:  750ms  > LOCATION: HINUNANGAN, SOUTHERN LEYTE, PH      [white]
delay: 1050ms  > ACADEMIC RANK: MAGNA CUM LAUDE ★              [gold]
delay: 1300ms  > COMPETITION STATUS: ROBOTHON CHAMPION 2024    [gold]
delay: 1550ms  > INTERNATIONAL: VIETNAM CULTURAL EXCHANGE ✓    [white]
delay: 1800ms  > SYSTEMS DEPLOYED: 3 CONFIRMED ✓              [green]
delay: 2050ms  > THREAT LEVEL TO MEDIOCRITY: CRITICAL          [gold]
delay: 2300ms  > CANDIDATE STATUS: AVAILABLE FOR HIRE ✓        [green]
```
- Progress bar fills proportionally with each line
- `booted = true` + "PRESS ANY KEY" blink prompt appears at 2800ms

---

### Screen 1 — Character Overview (3-column grid)

**Left panel — Identity:**
- `JG` avatar (80×80px, gold border, HUD corners)
  - **Click** → tooltip pops showing: location, school, Robothon, Vietnam, class unlocked date
- `[ CLICK TO INSPECT ]` hint below avatar
- Name: `Jillian Grace` (Rajdhani 18px 700)
- Class: `FULL-STACK ENGINEER ↗` — **click** → jumps to Skill Tree (S2)
- Subclass: `Game Dev · IoT Specialist`
- Location + email (mono 10px, muted)
- Level badge: LVL 22 — **click** → stat panel opens with full XP breakdown

**Center panel — Core Attributes:**
Section label: `// CORE ATTRIBUTES — CLICK ANY STAT TO INSPECT`

Each stat row is **fully clickable**. Click → slide-in panel from right.
Selected row gets: `background: gold-dim`, `border-color: gold-border`, name color gold.

| Stat | Value | Bar color | Sources |
|------|-------|-----------|---------|
| TECH | 92 | cyan→#38bdf8 | HyPTech (React+Django+IoT), XDefender (Unity+C#), Robothon firmware, Age Tracker |
| LEAD | 88 | gold→#fbbf24 | Rotaract president, HyPTech Agile lead, SSC Chairwoman, SLSU VP |
| COMM | 95 | purple→#c4b5fd | ESL 1→17 students, Top Tutor, Vietnam ambassador, public speaking |
| BUILD | 85 | green→#86efac | 3 deployed systems, Grace Cup operations, Agile delivery on-time |
| CREAT | 80 | red→#fca5a5 | Game mechanics, original lesson materials, UI/UX from scratch |
| XP | — | — | Full XP breakdown per quest (shown on level badge click) |

Bars animate from 0% on screen enter, staggered 110ms each. CSS transition 1.2s cubic-bezier(.22,1,.36,1).

**Equipped skill pills** (below bars):
- `React` `Python` `Django` `Unity` `C/C++` `IoT` `PHP`
- **Click any pill** → jumps to S2 + auto-selects that node
- Style: cyan-dim bg, cyan border, rounded 2px

**Right panel — Field Record:**
| Label | Value |
|-------|-------|
| Graduation rank | MAGNA |
| Systems deployed | 3 |
| Robothon title | CHAMP |
| Natl competitions | 2× |
| Teams led | 4+ |
| Countries | 2 |

Hover effect on each row: `background: panel2`

Active buffs (colored text):
- `+ Top Tutor Recognition` (green)
- `+ Scintillate Award` (gold)
- `+ Vietnam Exchange` (purple)

**Stat slide panel (right edge of screen):**
- Width: 260px, slides from `translateX(260px)` → 0
- Dark bg `rgba(6,9,15,.97)`, gold left border
- Shows: stat name (colored), score, 3–4 source cards
- Each source card: `border-left: 2px solid gold`, title (white), description (sub)
- `✕ CLOSE` button top-right
- Also closes on `Escape` key

---

### Screen 2 — Skill Tree (4 branches × 5 nodes)

4-column grid. Each branch: gold top-left bracket, branch label, 5 skill nodes.

**Node states:**
- `mastered` — gold dot, gold-dim bg on hover
- `unlocked` — cyan dot, panel2 bg on hover
- `locked` — gray dot, opacity 0.28, not clickable
- `selected` — gold-dim bg, gold border, gold text

**Click any node (mastered/unlocked):**
- All others deselected
- Detail card appears at bottom of screen
- Detail card: `border: 1px solid gold-border`, name (gold, Rajdhani 16px), context text (sub, 11.5px)
- `✕` closes detail

**Branches:**

FRONTEND: React (mastered), HTML/CSS (mastered), JavaScript (mastered), Tailwind (unlocked), Bootstrap (unlocked)
BACKEND: Python (mastered), Django (mastered), PHP (unlocked), Java (unlocked), C/C++ (mastered)
SYSTEMS: Unity Engine (mastered), IoT Dev (mastered), Embedded Sys (mastered), AutoCAD 3D (unlocked), Photoshop (unlocked)
LEADERSHIP: Agile/Scrum (mastered), Team Lead (mastered), Public Speaking (mastered), Project Mgmt (mastered), Business Ops (unlocked)

**Node context (on click):**
- React: "HyPTech frontend architecture. Component-based UI with state management."
- Django: "Full backend for HyPTech — authentication, REST APIs, biometric data handling."
- C/C++: "Embedded systems, IoT firmware. Used in Robothon championship build."
- Unity Engine: "Built 50% of XDefender — gameplay systems, power-ups, inventory, QA at Rak Son Tech OPC."
- IoT Dev: "Hardware bridge for HyPTech biometric system. Sensor communication, data pipelines."
- Embedded Sys: "Low-level firmware for the Robothon 2024 National Champion robot."
- Agile/Scrum: "Led HyPTech team through Agile sprints — scope management, daily standups."
- Team Lead: "Led 4 separate teams across 3 projects and 2 organizations. Always delivered."
- Project Mgmt: "Managed ₱30,000 club budget. Delivered barangay deployment. SCUAA 2022."

Mastery legend bottom-right: mastered (gold dot) / unlocked (cyan dot) / locked (gray dot)

---

### Screen 3 — Quest Log (4 quests)

**Filter tags row:**
`ALL` `Unity` `Full-Stack` `Team Lead` `IoT`
- Active: gold-dim bg, gold border, gold text
- Inactive: panel bg, border, muted text
- Filtering: hides quests that don't match `.hidden { display:none }`
- Active stack tag inside quest → highlights in cyan

**Quest card structure:**
- Header (always visible, click to toggle): icon / name+org / status badge + XP + chevron
- Chevron rotates 90° when expanded
- Body: `max-height: 0 → 300px`, 350ms ease transition
- Inner: description with `<span>` gold highlights + stack tags

**Quests:**

| Quest | Icon | Org | Status | XP | Stack tags |
|-------|------|-----|--------|----|------------|
| XDefender (XODE) | ⚔ | Rak Son Tech OPC · Jan–Apr 2025 | COMPLETED (green) | +850 | Unity, C#, Game Design, QA, Performance |
| HyPTech + Biometric | 🛡 | SLSU · Jun–Nov 2024 | COMPLETED (green) | +1,200 | Full-Stack, React, Django, IoT, Agile, Team Lead |
| Senior Citizen Tracker | 📜 | SLSU · Feb 2024–Mar 2025 | DEPLOYED (cyan) | +950 | Visual Basic, UI/UX, Team Lead, Government Deployment |
| BS CompE · SLSU | 🎓 | SLSU · 2021–2025 | COMPLETED (green) | +5,000 | Full-Stack, Embedded, IoT, Leadership, Agile |

Key description highlights:
- XDefender: "50% of all gameplay features", full inventory system
- HyPTech: "entire frontend + backend", biometric hardware, Agile
- Age Tracker: "full UI/UX from scratch", "deployed to a real barangay", government use
- BS CompE: "Magna Cum Laude", Vietnam exchange

---

### Screen 4 — Achievements (3×2 grid)

**Click any achievement → full-screen overlay:**
- Background: `rgba(6,9,15,.92)`, backdrop-filter blur
- Popup: centered, rarity-colored border + ::before/::after corners
- Icon: scales in from 0 with `iconPop` keyframe (0→scale(1)+rotate(0))
- Dismiss: click overlay background / click `[DISMISS]` / press Escape or Space

| Achievement | Rarity | Color | Description |
|-------------|--------|-------|-------------|
| Robothon Champion | LEGENDARY | Gold | National champion 2024, national qualifier 2025 |
| Magna Cum Laude | EPIC | Purple | BS CompE, SLSU, June 2025 |
| Vietnam Ambassador | RARE | Cyan | First engineering student from SLSU selected for cultural exchange at Tra Vinh University |
| Real-World Deployed | RARE | Cyan | Age Tracker selected for and deployed to a local barangay — actual government use |
| Top Tutor | UNCOMMON | Green | Cassey Int'l Tutorial Services recognition |
| Scintillate Award | UNCOMMON | Green | SSC COE COMELEC Core Officer recognition |

Overlay label per rarity: `LEGENDARY ACHIEVEMENT UNLOCKED` etc.
Total XP banner: `TOTAL XP: 9,820 · RANK: EXCEPTIONAL CANDIDATE`

---

### Screen 5 — Recruit / Hire

**Role selector (4 options, mutually exclusive):**
| Role | Message |
|------|---------|
| FULL-TIME | Magna Cum Laude. Deployed real systems. Won national competitions. Ready to join your team and ship from day one. |
| FREELANCE | I've run a business, managed clients, and delivered production software. I treat freelance like a real commitment — not a side hustle. |
| INTERNSHIP | Top of her class. Multi-project experience. Real deployments. I'm not your average intern applicant. |
| COLLABORATION | Full-stack + game dev + embedded + leadership. Hard to find that combo. Let's build something worth building. |

Message fades: opacity 0 → 1 with 200ms delay between swap.

**Action buttons:**
- `SEND INVITATION` (gold bg, dark text) → `mailto:jillianburila@gmail.com`
- `INSPECT REPO` (gold outline) → `https://github.com/jlliangrasya`

**Contact rows (click to copy):**
- `@` jillianburila@gmail.com → copies email
- `⌥` github.com/jlliangrasya → copies URL
- `#` 09385056299 → copies phone
- On copy: right label changes to `COPIED!` in green, reverts after 1800ms
- Uses `navigator.clipboard.writeText()`

---

### Recruiter React Component Map
```
components/personas/recruiter/
├── RecruiterExperience.jsx   # manages cur screen, keyboard, navigation
├── BootScreen.jsx            # 9 lines, progress bar, booted flag
├── CharacterOverview.jsx     # 3-col grid, stat panel slide, avatar tip
│   ├── StatBar.jsx           # clickable bar + selected state
│   └── StatPanel.jsx         # slide-in right panel
├── SkillTree.jsx             # 4 branches, node select, detail card
├── QuestLog.jsx              # filter tags, accordion cards
├── Achievements.jsx          # grid + unlock overlay
├── RecruitScreen.jsx         # role selector, copy contacts
└── ScreenNav.jsx             # bottom bar: dots, labels, prev/next
```

### Recruiter Data Shape
```
interface StatSource { title: string; text: string }
interface Stat { key: string; value: number; color: string; sources: StatSource[] }
interface SkillNode { name: string; state: 'mastered'|'unlocked'|'locked'; ctx: string }
interface SkillBranch { branch: string; nodes: SkillNode[] }
interface Quest { ico: string; name: string; org: string; status: string; statusClass: string; xp: string; desc: string; stack: string[] }
interface Achievement { ico: string; name: string; rarity: string; rarityClass: string; desc: string }
```

---

## 5. PERSONA 2 — COLLABORATOR: LIVE TERMINAL CLI ✅

**File:** `collaborator-terminal.html`
**Model:** Full terminal — no sections, no nav, no scrolling. Type or click to explore.
**Accent:** Cyan `#22d3ee` + Green `#4ade80`
**Font:** 100% JetBrains Mono — no Rajdhani anywhere
**Terminal bg:** `#0d1117` (darker than site bg)
**Window bg:** `#0a0d14`

### Terminal Layout
```
position: fixed; inset: 1.2rem; border-radius: 8px; border: 1px solid cyan-border;
display: flex; flex-direction: column; overflow: hidden;
```

```
┌─────────────────────────────────────────────────────┐
│  ● ● ●   jillian@portfolio — bash    TAB ↑↓ Ctrl+L  │  #tbar — flex-shrink:0
├─────────────────────────────────────────────────────┤
│                                                     │
│  [output lines scroll here]                         │  #out — flex:1, overflow-y:auto
│                                                     │
├─────────────────────────────────────────────────────┤
│  TRY: [whoami] [help] [git log] [cat story] [...]   │  #chips — flex-shrink:0
├─────────────────────────────────────────────────────┤
│  jillian@portfolio:~$ _                             │  #irow — flex-shrink:0
└─────────────────────────────────────────────────────┘
```

### Title Bar
- macOS-style dots: red `#ff5f57`, yellow `#febc2e`, green `#28c840`
- Green dot → runs `clear` command
- Center: `jillian@portfolio — bash` (muted, 11.5px)
- Right: `TAB complete · ↑↓ history · Ctrl+L clear` (dim, 9.5px, hidden mobile)

### Output Line Classes
| Class | Color | Usage |
|-------|-------|-------|
| `.cmd` | white + cyan `::before` | Echoes typed command with `jillian@portfolio:~$ ` prefix |
| `.cyan` | #22d3ee | Headers, section titles, connection messages |
| `.green` | #4ade80 | Success, available, champion moments |
| `.gold` | #f59e0b | Easter eggs, warnings, special outputs |
| `.red` | #f87171 | Errors, permission denied |
| `.white` | #e2e8f0 | Key highlights, names |
| `.sub` | #94a3b8 | Normal output, descriptions |
| `.muted` | #64748b | Dates, secondary info |
| `.dim` | #475569 | Hints, very secondary |
| `.sp` | — | Spacer line (height: 5px) |

All lines: `font-size: 12.5px`, `line-height: 1.85`, `white-space: pre-wrap`, `word-break: break-word`

### Command Chips
- Above input row, updates contextually after each command
- Style: `rgba(34,211,238,.06)` bg, `rgba(34,211,238,.16)` border, cyan text, 10px font
- Hover: brighter bg/border + `translateY(-1px)`
- Click → runs that command (same as typing + enter)
- Label: `TRY:` in dim, 9.5px

### Input Row
- Prompt: `jillian@portfolio:~$ ` (cyan, non-editable)
- Input: transparent bg, no border, no outline, caret-color cyan
- Click anywhere in terminal → focuses input (`fi()` function)

---

### Boot Sequence
```
connecting to jillian@portfolio...    [muted]
                                      [spacer]
connection established. ✓            [green]
                                      [spacer]
last login: [current date]           [muted]
                                      [spacer]
  jillian's portfolio terminal  v1.0  [cyan]
  ─────────────────────────────────   [dim]
  type 'whoami'  to meet her.         [muted]
  type 'help'    to see all commands. [muted]
  type 'cat story' for origin story.  [muted]
  tab autocompletes · ↑↓ history      [dim]
```
Initial chips: `whoami` `help` `git log` `cat story`

---

### All Commands (Complete List)

#### `whoami`
```
jillian grace d. burila           [cyan]
                                   [sp]
  engineer     →  full-stack · game dev · embedded · iot
  teacher      →  esl · 1→17 students · top tutor
  entrepreneur →  ran a real business at 19
  leader       →  rotaract president · student ambassador
  champion     →  robothon national champion 2024
                                   [sp]
  location  :  hinunangan, southern leyte, philippines  [muted]
  school    :  slsu · magna cum laude · bs comp eng 2025 [muted]
  status    :  available for hire ✓                      [green]
```
Chips after: `skills` `git log` `projects` `awards` `cat story`

#### `help`
Lists all commands with one-line descriptions.
Keyboard hints at bottom: `tab → autocomplete · ↑↓ → history · ctrl+l → clear`
Chips after: `whoami` `skills` `git log` `cat story` `hire`

#### `skills`
Full ASCII tree with `├──` and `└──` box-drawing characters. Four sections: frontend/, backend/, systems/, leadership/. Each skill shows `[MASTERED]` or `[UNLOCKED]`.
Chips after: `projects` `git log` `hire` `awards`

#### `projects`
ASCII box-drawing list with `┌─`, `├─`, `└─` borders. Three projects:
- XDefender — `[SHIPPED → PRODUCTION]`
- HyPTech — `[DEPLOYED]`
- Senior Citizen Tracker — `[DEPLOYED → BARANGAY]` (green)
Each shows tech stack (muted) + 2 description lines (sub).
Chips after: `cat story` `skills` `git log` `hire`

#### `git log`
Full commit-style output for 9 career entries:
```
commit [hash] (HEAD → main, origin/main)  [gold]
Author: Jillian Grace <jillianburila@gmail.com>  [muted]
Date:   [month year]  [muted]
    feat: [description]  [white / green for Robothon]
```
Entries (newest→oldest):
1. Jun 2025 — graduate Magna Cum Laude · SLSU
2. Apr 2025 — ship XDefender at Rak Son Tech OPC
3. Nov 2024 — deploy HyPTech biometric system · led Agile team
4. Oct 2024 — win Robothon National Championship 2024 ⚡ [GREEN]
5. Aug 2024 — represent SLSU at Tra Vinh University, Vietnam
6. May 2024 — Rotaract President · ₱0 → ₱30,000
7. Dec 2023 — Top Tutor · 1 student → 17 in 2.5 months
8. Apr 2020 — Grace Cup operations · first real business at 19
9. 2003 — init: born, hinunangan, southern leyte [muted]
Chips after: `git log --oneline` `projects` `cat story` `hire`

#### `git log --oneline`
Condensed: `[hash]  feat: [description]` — 9 lines matching above.
Robothon line in green.
Chips after: `git log` `projects` `cat story`

#### `git status`
```
On branch main                           [cyan]
Your branch is up to date with origin/main.
                                          [sp]
nothing to commit. everything ships.     [green]
```

#### `git blame`
Lists 7 file-entries, all credited to Jillian. Ends:
`no one else to blame. she wrote it all.` [gold]

#### `git push origin main`
Fake push output. Ends: `branch is live. relax.` [green]

#### `git merge conflicts`
`no conflicts. she resolves those before they happen.` [green]

#### `git checkout career`
```
Switched to branch 'career'              [cyan]
Already up to date with origin.
                                          [sp]
warning: this branch has no dead ends.  [gold]
```

#### `cat story`
**Typewriter effect** — 17ms per character, 110ms pause between lines.
Narrative (22 lines):
```
a girl from hinunangan, southern leyte.          [white]
[sp]
at 19, she was running a business. not a side project — a real one.  [sub]
staff, vendors, customers, every problem landed on her desk.          [sub]
[sp]
then she started teaching. english. online. one student.  [sub]
then two. then seventeen — all through referrals.          [sub]
no ads. just results.                                      [white]
[sp]
somewhere in there, she started building things with code.     [sub]
built a system with biometrics. from scratch. with hardware.   [sub]
built a game that shipped to real users.                       [sub]
built a robot that won a national championship.                [green]
[sp]
graduated magna cum laude.                                     [white]
got on a plane to vietnam — first engineering student from slsu to go.  [sub]
led clubs from nothing to something real.                      [sub]
[sp]
now she builds software.                    [cyan]
not because it's all she can do.            [cyan]
because it's how she does everything else better.  [cyan]
[sp]
— jillianburila@gmail.com                  [muted]
```
Chips after: `git log` `projects` `awards` `hire`

#### `cat about`
Short bio (6 lines). Ends: `now she builds software that reflects everything she's learned.` [white]

#### `awards`
All 7 achievements with rarity labels:
- ⚡ `[LEGENDARY]` Robothon National Champion 2024 [gold]
- ★ `[EPIC]` Magna Cum Laude · SLSU 2025 [sub]
- ✈ `[RARE]` Vietnam Cultural Exchange Ambassador [cyan]
- ⬡ `[RARE]` Real-World Government Deployment [cyan]
- ◎ `[UNCOMMON]` Top Tutor — Cassey Int'l [green]
- ✦ `[UNCOMMON]` Scintillate Award — SSC [green]
- 📜 `[UNCOMMON]` RSPC National Qualifier 2019 [green]
Chips after: `git log` `projects` `hire` `cat story`

#### `hire` / `contact`
```
opening comms channel...              [muted]
[sp]
  email    →  jillianburila@gmail.com   [cyan]
  github   →  github.com/jlliangrasya   [cyan]
  phone    →  09385056299               [cyan]
  location →  hinunangan, s. leyte, ph  [muted]
[sp]
  status   →  available for hire ✓     [green]
  open to  →  full-time · freelance · collaboration  [green]
```
Chips after: `projects` `git log` `man jillian`

#### `man jillian`
Formatted exactly like a Unix man page:
```
JILLIAN(1)          User Commands          JILLIAN(1)
[sp]
NAME
      jillian — full-stack engineer, builder, champion
SYNOPSIS
      hire [--role=TYPE] [--urgency=HIGH]
DESCRIPTION
      Magna Cum Laude Computer Engineering graduate from SLSU.
      Has a documented history of shipping things, leading teams,
      winning competitions, and teaching concepts that stick.
OPTIONS
      --role=fulltime     best for long-term impact
      --role=freelance    scoped, committed, delivered
      --role=collab       open to interesting problems
EXIT STATUS
      0  she joins your team                         [green]
      1  you waited too long                         [red]
SEE ALSO
      projects(5), git-log(1), skills(7)
AUTHOR
      jillianburila@gmail.com
```

#### `ls`
`./projects    ./skills    ./story    ./awards    ./contact` [cyan]
Chips: `ls ./projects` `ls ./skills` `cat story` `awards` `contact`

#### `ls ./projects` → alias for `projects`
#### `ls ./skills` → alias for `skills`

#### `pwd`
`/home/jillian/portfolio` [cyan]

#### `ping jillian`
3 fake icmp lines + stats. Ends: `response time: instant.` [green]

#### `clear` / `Ctrl+L`
Clears `#out` innerHTML. Resets chips to: `whoami` `help` `git log` `cat story`

#### `exit` / `quit` / `logout`
Prints logout lines + `...` dots + `you can't leave that easily.` [gold]

---

### Easter Eggs (complete)

| Typed | Response |
|-------|----------|
| `sudo hire jillian` | 3 fake `[sudo] password:` failures → "hint: you don't need sudo. just type: hire" [gold] |
| `sudo` / `sudo su` / `sudo -s` | "nice try. not root here." [gold] |
| `rm -rf bad-code` | Deletes 5 fake files, "4,291 lines of bad code deleted. you're welcome." [green] |
| `rm -rf /` / `rm -rf ./` / `rm -rf *` | "this machine is read-only. nice try." [red] |
| `ssh root@jillian` / `ssh root@portfolio` | Permission denied → "to connect properly, use: hire" [gold] |
| `cd ..` / `cd ../` | "there's nowhere above this." [gold] |
| `git checkout career` | Switches to 'career' branch, "this branch has no dead ends." [gold] |
| `git merge conflicts` | "no conflicts. she resolves those before they happen." [green] |
| `npm install jillian` / `pip install jillian` / `yarn add jillian` | "warning: jillian is not a package. she is a person." [gold] |
| `python --version` / `python3 --version` | "Python 3.11.4 (Jillian Edition)" [cyan] |
| `node -v` / `node --version` | "v20.11.0 (also React · also Django · also Unity)" [cyan] |
| `uname -a` | "JillianOS 2025 #MAGNACUMLAUDE SMP ROBOTHON x86_64 GNU/Linux" [sub] |
| `cat /etc/passwd` | "nice try. no sensitive data here." [red] |
| `echo [anything]` | Echoes back the text [white] |
| unknown command | "bash: [cmd]: command not found" + "type 'help' to see available commands." [red/muted] |

---

### Keyboard Behaviour
| Key | Action |
|-----|--------|
| `Enter` | Execute command |
| `Tab` | Autocomplete from ALL_COMMANDS array (finds first match starting with input) |
| `↑` | Navigate history backward (`hidx++`) |
| `↓` | Navigate history forward (`hidx--`, empty at 0) |
| `Escape` | Clear input, reset `hidx = -1` |
| `Ctrl+L` | Run `clear` |
| Click terminal | Focus input (`fi()`) |

History: `HIST[]` array, unshift on each run, `hidx = -1` after each command.

### Tab Completion List (ALL array, 35 commands)
`whoami help skills projects git log git log --oneline git status git blame git push origin main git merge conflicts git checkout career cat story cat about awards hire contact man jillian ls ls ./projects ls ./skills pwd ping jillian clear exit logout sudo hire jillian rm -rf bad-code npm install jillian python --version node -v uname -a ssh root@jillian cd .. echo hello`

### print() function
```javascript
async function print(lines, fast=false) {
  // lines: array of [text, colorClass, delayMs] or null (spacer)
  // fast=true: 18ms delay, fast=false: 35ms delay
  // each line: await wait(ms) then ln(text, cls)
}
```

### Collaborator React Component Map
```
components/personas/collaborator/
├── TerminalExperience.jsx   # layout, click-to-focus
├── TitleBar.jsx             # dots, title, hint
├── OutputArea.jsx           # scrollable #out div
├── CommandChips.jsx         # contextual chips
├── CommandInput.jsx         # prompt + input field
├── commands/
│   ├── index.ts             # CMD registry + run()
│   ├── core.ts              # whoami, help, ls, pwd, clear, exit
│   ├── career.ts            # all git commands
│   ├── content.ts           # skills, projects, awards, cat story/about
│   ├── contact.ts           # hire, contact, man jillian, ping
│   └── easter-eggs.ts       # sudo, rm, ssh, npm, python, node, uname
└── useTerminal.ts           # HIST, hidx, busy, chips state
```

---

## 6. PERSONA 3 — CURIOUS: CONSTELLATION + LIVE INTERVIEW ✅

**File:** `curious-constellation.html`
**Model:** Full-screen interactive star map. Click any star → story panel + AI-powered live chat.
**Accent:** Per-star colors (gold, purple, cyan, blue, green, teal) on dark space bg
**Font:** Rajdhani for story content, JetBrains Mono for all UI/system text
**Powered by:** Anthropic API (`claude-sonnet-4-20250514`) — real AI responses as Jillian

### Concept
Her life is a constellation. Each star = a defining moment. Stars vary in size (bigger = bigger moment — Robothon is the largest). Click any star to zoom in: a bottom panel slides up showing the full story on the left and a live AI chat on the right where you can ask Jillian anything about that moment.

### Layout
```
[fixed top bar: title + "7 STARS · 1 STORY" + switch btn]
[full-screen dark space background — canvas-drawn ambient stars]
[SVG layer — constellation lines with dashed stroke-dasharray animation]
[star nodes — absolutely positioned, glowing, animated pulse rings]
[intro overlay — "Her story is out there somewhere." fades out on star click]
[bottom panel — slides up 62vh on star click]
  [left 42%: story side — chapter num, year/place, title, body, tags]
  [vertical divider]
  [right flex-1: chat side — messages, suggestion chips, input row]
```

### Background Canvas
- 280 randomly placed ambient stars (tiny white dots, varying opacity 0.1–0.8, radius 0.2–1.3px)
- Generated on load and on window resize
- Extra radial vignette overlay (dark edges, transparent center)

### Constellation Lines (SVG)
8 lines connecting related stars, drawn with staggered `opacity` animation (400ms base + 120ms per line):
```
robothon ↔ magna      (academic excellence)
robothon ↔ hytech     (engineering output)
magna    ↔ vietnam    (SLSU achievement cluster)
hytech   ↔ vietnam    (SLSU journey)
grace    ↔ teacher    (people skills)
teacher  ↔ rotaract   (leadership path)
grace    ↔ hytech     (building foundation)
rotaract ↔ hytech     (organization + delivery)
```
Style: `stroke: rgba(255,255,255,0.1)`, `stroke-width: 0.8`, `stroke-dasharray: 4 6`
On star select: connected lines → `stroke-width: 1.2`, `opacity: 0.3`

### 7 Stars (life moments)

| ID | Label | Position | Size | Color |
|----|-------|----------|------|-------|
| `robothon` | Robothon Champion | 48%, 22% | 44px | #f59e0b (gold) |
| `magna` | Magna Cum Laude | 66%, 32% | 34px | #a78bfa (purple) |
| `vietnam` | Vietnam Exchange | 76%, 52% | 24px | #22d3ee (cyan) |
| `hytech` | Engineer & Builder | 50%, 54% | 30px | #38bdf8 (blue) |
| `grace` | Grace Cup Business | 27%, 40% | 26px | #f59e0b (gold) |
| `teacher` | Teacher & Top Tutor | 20%, 60% | 22px | #4ade80 (green) |
| `rotaract` | Rotaract President | 37%, 70% | 20px | #2dd4bf (teal) |

### Star Node Anatomy
```html
<div class="star-node">            <!-- positioned, color set via CSS var -->
  <div class="star-glow">         <!-- blur filter bg glow -->
  <div class="star-core">         <!-- solid circle -->
  <div class="star-label">        <!-- label above, shows on hover -->
  <div class="star-year">         <!-- year below, always visible faintly -->
  <!-- ::before + ::after: two expanding ring animations (star-pulse, 3s, staggered 1.2s) -->
```
- Hover: `scale(1.3)`, `brightness(1.4)`
- On any star click: others get `opacity: 0.15` + `pointer-events: none` (`.dimmed`)
- Selected: full opacity, pointer-events none (prevents re-click)

### Bottom Panel (slides up on star click)
- Height: `0 → 62vh`, transition: `cubic-bezier(.22,1,.36,1) 0.5s`
- Background: `rgba(5,8,15,.97)` + `backdrop-filter: blur(20px)`
- Border-top: `1px solid rgba(255,255,255,.07)`

**Story side (left 42%):**
- `✕ CLOSE` button (top right of side) → closes panel, resets all stars
- Chapter number (mono, muted)
- Place + year (mono, star's accent color)
- Title (Rajdhani, large, colored `<span>` for accent word)
- Body text (Rajdhani, sub color, strong tags for highlights)
- Tag pills (mono, 9px, transparent bg, dim border)

**Chat side (right, flex-1):**
- Header: `LIVE SESSION` label + `● ONLINE` green badge + "Ask Jillian anything"
- Message list (scrollable, flex-column, `gap: 0.7rem`)
- Suggestion chips row (contextual, updates after each reply)
- Input row: text input + `SEND ↑` gold button

### Message Bubbles
| Type | Class | Style |
|------|-------|-------|
| Host/you | `.msg.host` | White bg tint, rounded `8px 8px 8px 2px`, sub color text |
| Jillian reply | `.msg.jill` | Gold tint bg, rounded `8px 8px 2px 8px`, white text |
| Typing indicator | `.msg.typing` | 3 animated gold dots, `.typing-dot` with staggered animation |

All messages: `animation: msgIn .25s ease` (fade + translateY up)

### AI Chat System (Anthropic API)
**Endpoint:** `POST https://api.anthropic.com/v1/messages`
**Model:** `claude-sonnet-4-20250514`
**Max tokens:** 300 (short, conversational answers)
**Method:** Full conversation history (`chatHistory[]`) sent per message

**System prompt structure:**
1. Identity: who Jillian is
2. Current star context: detailed facts about the clicked moment
3. Full background: all roles, projects, awards
4. Personality guide: first person, warm, proud, conversational, 2-4 sentences, vary sentence starters

**Per-star chat context (injected into system prompt):**
- `robothon`: National Championship details, embedded systems, returned as qualifier
- `magna`: Balanced orgs + competitions + teaching + internship while maintaining honors
- `vietnam`: First engineering student selected, SLSU-KF21, Tra Vinh University
- `hytech`: Sole architect full-stack + IoT + Agile lead, XDefender 50% gameplay, Age Tracker barangay deployment
- `grace`: Grace Cup manager at 19, daily ops, staff, vendors, customers, 2.5 years
- `teacher`: Cassey Int'l Top Tutor, freelance 1→17 students in 2.5 months, original materials
- `rotaract`: Built from ₱0 to ₱30,000 turnover, SLSU-KF21 VP revived from disbandment

**Opening message per star click:**
`"You're looking at Jillian's [STAR LABEL] moment. Ask her anything about it."`

**Follow-up suggestions:** Pool of 4 per star, randomized, 3 shown after each reply

**Chat history:** Resets on each new star click. Persists within same star session.

### Keyboard & Interaction
- `Escape` → close panel
- `Enter` in chat input → send message
- Click anywhere on star → opens that star
- Click background stars container → no action (only `.star-node` is clickable)
- `✕ CLOSE` or Escape → closes panel, undims all stars, resets lines, re-shows intro

### React Component Map
```
components/personas/curious/
├── CuriousExperience.jsx      # layout, state, star click handler
├── SpaceBackground.jsx        # canvas ambient stars
├── ConstellationSVG.jsx       # lines with draw animation
├── StarNode.jsx               # positioned star, rings, label, hover
├── StoryPanel.jsx             # bottom panel wrapper (slide animation)
├── StorySide.jsx              # chapter content left half
├── ChatSide.jsx               # messages + suggestions + input
├── useStarChat.ts             # chatHistory, busy, sendMsg, API call
└── data/stars.ts              # all 7 star objects with pos, story, chatCtx
```

### Data Shape
```
interface Star {
  label: string; year: string;
  pos: { x: number; y: number };  // percentage
  size: number;    // px
  color: string;
  num: string;     place: string;
  title: string;   body: string;
  tags: string[];
  suggestions: string[];
  chatCtx: string; // injected into API system prompt
}
```

---

## 7. PERSONA 4 — CLIENT: EDITORIAL SCROLL ✅

**File:** `client-editorial.html`
**Model:** Traditional smooth scroll — premium light mode, Apple-like restraint
**Accent:** Gold `#b45309` (darker amber for legibility on light bg)
**Theme:** Off-white `#f7f5f0` base, deep navy `#0f172a` text
**Fonts:** Fraunces (serif display) + DM Sans (body) + JetBrains Mono (labels)
**The contrast IS the point** — only light-mode experience, signals professionalism to non-tech clients

### Design System (Client-only)
```css
--bg:       #f7f5f0;   /* warm off-white */
--bg2:      #f0ede6;   /* panel surfaces */
--navy:     #0f172a;   /* primary text */
--navy2:    #1e293b;
--gold:     #b45309;   /* darker amber — readable on light bg */
--gold-bg:  rgba(180,83,9,.07);
--gold-b:   rgba(180,83,9,.2);
--gray:     #475569;   /* body secondary */
--light:    #94a3b8;   /* labels, tags */
--border:   #e2e8f0;
--white:    #ffffff;
```

### Navigation
- Fixed, transparent initially → scrolled: `rgba(247,245,240,.95)` + `backdrop-filter: blur(16px)` + border-bottom
- Triggers at `scrollY > 40`
- Links: Services · Work · Background · Process with gold underline slide-in on hover
- Right CTA: `Let's Talk →` (navy filled button)

### Hero Section
- `min-height: 100vh`, centered left-aligned content
- Two faint concentric circle rings in top-right corner (pure CSS `::before` + `::after`, 1px border)
- Badge: `● AVAILABLE FOR NEW PROJECTS` (mono, gold tint pill)
- H1: **"Build with someone who understands both sides of a product."**
  - *"both sides"* rendered in Fraunces italic gold
- Sub copy: outcome-first, mentions business manager background
- Two CTAs: `See My Work` (navy filled) + `Start a Project` (outline)
- Metrics row (separated by border-top):

| Metric | Value | Label |
|--------|-------|-------|
| Systems deployed | 3 | SYSTEMS DEPLOYED TO PRODUCTION |
| Client growth | 1→17 | CLIENTS GROWN WITH ZERO ADS |
| Business years | 2.5 | YEARS RUNNING A REAL BUSINESS |

### Services Section
- 2-col header: h2 left + description paragraph right
- 3-column card grid with `1.5px gap` on `var(--border)` background (creates thin border between)
- Each card: `background: white`, hover → `var(--bg2)`
- Cards: 01 Web Applications / 02 Business Systems / 03 Hardware & IoT
- Each: number (mono) → title (Fraunces) → body (DM Sans light) → stack tags (mono, bg2)

### Case Studies Section
- `background: var(--bg2)` — subtle section differentiation
- 3 vertical full-width case cards (stacked, `1.5px gap` on border bg)
- Each card: 2-column grid (content left, impact stat right)
- Top row: category badge (gold tint) + status badge (green/blue)

| Project | Category | Status | Impact Stat | Label |
|---------|----------|--------|-------------|-------|
| HyPTech + Biometrics | FULL-STACK + IoT | DEPLOYED | 100% | SOLE ARCHITECT FRONT + BACK |
| Senior Citizen Tracker | GOVERNMENT DEPLOYMENT | LIVE IN BARANGAY | Gov't | DEPLOYED TO REAL BARANGAY USE |
| XDefender | GAME DEVELOPMENT | PRODUCTION RELEASE | 50% | OF ALL GAMEPLAY FEATURES BUILT |

Impact stat: Fraunces 2.8rem bold, right-aligned, navy

### About / Background Section
- 2-column layout: story left, credentials right
- H2: **"I've been on both sides of a product."** — *"both sides"* italic gold
- 3 paragraphs: Grace Cup story → client growth stat → engineering credentials
- Pull quote: `border-left: 2px solid gold`, italic Fraunces: *"I don't ask what tech stack to use. I ask what problem you're actually trying to solve."*
- CTA: `Work with me` button
- Right: 3×2 credential grid (same card treatment), then tech stack paragraph in bg2 box

Credential grid:
| Magna | Champion | Vietnam | 2× Natl | 4+ | 3 |
|-------|----------|---------|---------|----|----|
| Cum Laude | Robothon 2024 | First Eng. Exchange | Natl Qualifier | Teams Led | Systems Live |

### Process Section
- Dark navy background (`--navy`) — the only dark section in this persona
- 4-column step grid on `rgba(255,255,255,.06)` gap background
- Each step: dark navy bg, hover → `#111827`
- Large ghost number (Fraunces 3.5rem, 8% opacity) → title → body paragraph
- Gold `.step-gold` class for key phrases: "business", "No surprises.", "built into the process", "I'm available"

Steps:
1. Discovery Call — business questions, not just features
2. Clear Proposal — written scope, timeline, price before coding
3. Build with Visibility — weekly updates, Agile process
4. Deliver & Stay — tested, deployed, documented, available after

### Contact Section
- H2: **"Let's talk about your project."** — *"project."* italic gold
- Sub: "No commitment needed. Tell me what you're building..."
- 4-row contact list (same 1.5px gap treatment):

| Type | Value | Action |
|------|-------|--------|
| EMAIL | jillianburila@gmail.com | SEND → (mailto link) |
| COPY | jillianburila@gmail.com | COPY ADDRESS (clipboard) |
| GITHUB | github.com/jlliangrasya | VIEW → (opens tab) |
| PHONE | 09385056299 | COPY (clipboard) |

Copy rows: action text changes to `COPIED ✓` (green) for 1800ms

### Footer
- Simple 3-item flex row: brand name left / credentials center / `[ SWITCH PERSONA ]` right

### Scroll Reveal
- `IntersectionObserver`, threshold 0.12, rootMargin `0px 0px -40px 0px`
- All `.reveal` elements: `opacity:0; transform:translateY(22px)` → `.visible`: `opacity:1; transform:none`
- Transition: `opacity .65s ease, transform .65s ease`

### React Components
```
components/personas/client/
├── ClientExperience.jsx     # layout wrapper
├── ClientNav.jsx            # scroll-aware nav
├── HeroSection.jsx          # badge, h1, sub, metrics, CTAs
├── ServicesSection.jsx      # 3 service cards
├── WorkSection.jsx          # 3 case study cards
├── AboutSection.jsx         # story + credential grid
├── ProcessSection.jsx       # 4 dark steps
└── ContactSection.jsx       # 4 contact rows + clipboard
```

---

## 8. NEXT.JS PROJECT STRUCTURE

```
jillian-portfolio/
├── app/
│   ├── layout.jsx
│   ├── page.jsx                        # Entry / persona router
│   └── globals.css                     # CSS vars + base styles
├── components/
│   ├── entry/
│   │   ├── EntryScreen.jsx
│   │   └── PersonaButton.jsx
│   ├── personas/
│   │   ├── recruiter/                  # ✅ See §4
│   │   ├── collaborator/               # ✅ See §5
│   │   ├── curious/                    # ✅ See §6
│   │   └── client/                     # 🔲 See §7
│   └── shared/
│       ├── HudBracket.jsx
│       ├── TypeWriter.jsx
│       └── BackgroundGrid.jsx
├── data/
│   ├── recruiter.ts                    # stats, skills, quests, achievements
│   ├── terminal.ts                     # commands, story lines, git log, chips map
│   ├── chapters.ts                     # 7 chapter objects
│   └── client.ts                       # 🔲
├── public/
│   ├── cv-jillian-burila.pdf
│   └── og-image.png                    # 1200×630
└── tailwind.config.ts
```

---

## 9. BUILD PHASES

- [x] Phase 1 — Foundation (tokens, fonts, entry, boot pattern)
- [x] Phase 2 — Recruiter RPG v1 (screens, navigation)
- [x] Phase 2b — Recruiter RPG v2 (stat panels, skill click, quest accordion, achievement overlay, role selector, clipboard copy)
- [x] Phase 3 — Collaborator Terminal (all commands, easter eggs, typewriter story, chips, history, tab complete)
- [x] Phase 4 — Curious Constellation + Live Interview Chat (Anthropic API)
- [x] Phase 5 — Client Editorial Scroll (light mode, scroll reveal, contact clipboard)
- [ ] Phase 6 — Integration (entry router wires all 4), Framer Motion, mobile pass, SEO, deploy

---

## 10. DESIGN RULES (DO NOT BREAK)

1. Each persona = different **world**: different interaction model, color accent, emotional tone.
2. **No scrolling** for Recruiter or Collaborator.
3. **Gold** = Recruiter. **Cyan/Green** = Collaborator. Never mix persona accents.
4. Boot plays **once** per session. Never loops.
5. Stat bars animate **on screen enter** — not on page load.
6. Achievement rarity: LEGENDARY (gold) → EPIC (purple) → RARE (cyan) → UNCOMMON (green).
7. Terminal easter eggs make developers **smile** — no cringe.
8. `cat story` always uses the **typewriter effect**. Never instant.
9. Client mode is **light**. All others are dark. Contrast is intentional.
10. `[ SWITCH PERSONA ]` is **always accessible** — fixed bottom-right.
11. **No lorem ipsum.** Every word is Jillian's actual story.
12. Chapters are **cinematic** — minimal text, maximum atmosphere.

---

## 11. CONTENT CHECKLIST

- [ ] Professional photo / avatar for character sheet (Screen 1 `JG` placeholder)
- [ ] CV exported as PDF → `public/cv-jillian-burila.pdf`
- [ ] GitHub polished — pin top 3 repos with READMEs
- [ ] Project screenshots for quest cards
- [ ] OG image 1200×630 for social preview
- [ ] Personal manifesto (2–3 sentences, used in Chapter 07)
- [ ] 1–2 blog posts (for future `cat blog` terminal command)

---

*Last updated: Recruiter RPG v2 ✅ · Collaborator Terminal ✅ · Curious Chapters ✅*
