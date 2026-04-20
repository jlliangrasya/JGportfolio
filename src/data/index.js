/* ═══════════════════════════════════════════════
   JILLIAN GRACE D. BURILA — ALL PERSONA DATA
═══════════════════════════════════════════════ */

export const PERSONAL = {
  name:     'Jillian Grace D. Burila',
  email:    'jillianburila@gmail.com',
  github:   'github.com/jlliangrasya',
  phone:    '09385056299',
  location: 'Hinunangan, Southern Leyte, Philippines',
  school:   'Southern Leyte State University (SLSU)',
  degree:   'BS Computer Engineering — Magna Cum Laude, Jun 2025',
}

/* ── ENTRY ── */
export const PERSONA_BTNS = [
  { key: 'recruiter',    role: 'RECRUITER / HIRING',   tagline: 'Show me the engineer' },
  { key: 'collaborator', role: 'COLLABORATOR',          tagline: "Let's work together" },
  { key: 'curious',      role: 'JUST CURIOUS',          tagline: 'Who is this person?' },
  { key: 'client',       role: 'POTENTIAL CLIENT',      tagline: 'I need something built' },
]

/* ── RECRUITER — STATS ── */
export const STATS = [
  { key: 'tech',  value: 92, color: 'var(--cyan)',
    sources: [
      { title: 'HyPTech + Biometrics', text: 'Sole architect — entire frontend + backend + IoT hardware bridge. React, Django, biometric sensor integration.' },
      { title: 'XDefender (Unity)',     text: 'Built 50% of gameplay features. C# scripting, inventory systems, performance optimization.' },
      { title: 'Embedded / Robothon',  text: 'Hardware-level programming for the robot that won the 2024 National Championship.' },
      { title: 'Senior Citizen Tracker', text: 'Full frontend and UI/UX in Visual Basic. Deployed to a real barangay.' },
    ]},
  { key: 'lead',  value: 88, color: 'var(--gold)',
    sources: [
      { title: 'Rotaract Club President',  text: 'Built from ₱0 and zero projects to an active org with ₱30,000 turned over to the next admin.' },
      { title: 'HyPTech Project Lead',     text: 'Led development team using Agile methodology. Managed scope, sprints, and delivery.' },
      { title: 'SSC COMELEC Chairwoman',   text: 'Led planning and management for SCUAA 2022. Overall Chairwoman for the university-wide event.' },
      { title: 'SLSU-KF21 Vice-President', text: 'Revived the club after disbandment in 2021. Initiated projects empowering student leaders.' },
    ]},
  { key: 'comm',  value: 95, color: 'var(--purple)',
    sources: [
      { title: 'ESL Teacher — 1 to 17 students', text: 'Grew student base from 1 to 17 in 2.5 months purely through referrals.' },
      { title: 'Top Tutor Recognition',           text: "Earned highest recognition at Cassey Int'l for exceptional outcomes." },
      { title: 'Vietnam Cultural Exchange',       text: 'First engineering student selected to represent SLSU at Tra Vinh University, Vietnam.' },
      { title: 'Public Speaking / SSC',           text: 'Delivered presentations, led councils, facilitated lessons across platforms and languages.' },
    ]},
  { key: 'build', value: 85, color: 'var(--green)',
    sources: [
      { title: '3 Deployed Systems',       text: 'XDefender shipped to production. HyPTech deployed to real users. Age Tracker deployed to a barangay.' },
      { title: 'Grace Cup Business Ops',   text: 'Managed daily operations, vendor relations, team onboarding — ran a physical business for 2.5 years.' },
      { title: 'Agile Delivery',           text: 'Delivered HyPTech on schedule using Agile sprints. Scope managed, team coordinated, product shipped.' },
    ]},
  { key: 'creat', value: 80, color: 'var(--red)',
    sources: [
      { title: 'Game Development',          text: 'Designed and built gameplay mechanics, power-ups, and UI systems in Unity.' },
      { title: 'Original Teaching Materials', text: 'Designed original lesson materials for ESL students, integrating technology for engagement.' },
      { title: 'UI/UX Design',              text: 'Designed the entire frontend and UI/UX for the Age Tracking System from scratch.' },
    ]},
  { key: 'xp',    value: 0, color: 'var(--gold)',
    sources: [
      { title: 'XDefender (XODE)',          text: '+850 XP — Shipped 50% of gameplay features' },
      { title: 'HyPTech + Biometrics',      text: '+1,200 XP — Full-stack + IoT, led team, Agile' },
      { title: 'Senior Citizen Tracker',    text: '+950 XP — Deployed to real barangay' },
      { title: 'BS Computer Engineering',   text: '+5,000 XP — Magna Cum Laude, national competitions' },
      { title: 'Leadership & Service',      text: '+1,820 XP — Rotaract, SSC, Vietnam, Top Tutor' },
    ]},
]

/* ── RECRUITER — SKILLS ── */
export const SKILL_BRANCHES = [
  { branch: '⬡ FRONTEND', nodes: [
    { name: 'React',       state: 'mastered', ctx: 'Built the entire HyPTech frontend architecture. Component-based UI with state management.' },
    { name: 'HTML / CSS',  state: 'mastered', ctx: 'Used across all 3 projects — built from scratch every time. Pixel-perfect layouts.' },
    { name: 'JavaScript',  state: 'mastered', ctx: 'Interactive UI logic, DOM manipulation, async operations.' },
    { name: 'Tailwind CSS',state: 'unlocked', ctx: 'Utility-first rapid UI styling. Used in personal projects.' },
    { name: 'Bootstrap',   state: 'unlocked', ctx: 'Responsive grid systems and component libraries.' },
  ]},
  { branch: '⬡ BACKEND', nodes: [
    { name: 'Python',      state: 'mastered', ctx: 'Primary backend language. Scripting, automation, data processing.' },
    { name: 'Django',      state: 'mastered', ctx: 'Full backend for HyPTech — authentication, REST APIs, biometric data handling.' },
    { name: 'PHP',         state: 'unlocked', ctx: 'Server-side scripting for web applications.' },
    { name: 'Java',        state: 'unlocked', ctx: 'OOP fundamentals, data structures, academic projects.' },
    { name: 'C / C++',     state: 'mastered', ctx: 'Embedded systems, IoT firmware. Used in Robothon championship build.' },
  ]},
  { branch: '⬡ SYSTEMS', nodes: [
    { name: 'Unity Engine', state: 'mastered', ctx: 'Built 50% of XDefender — gameplay systems, power-ups, inventory, QA at Rak Son Tech OPC.' },
    { name: 'IoT Dev',      state: 'mastered', ctx: 'Hardware bridge for HyPTech biometric system. Sensor communication, data pipelines.' },
    { name: 'Embedded Sys', state: 'mastered', ctx: 'Low-level firmware for the Robothon 2024 National Champion robot.' },
    { name: 'AutoCAD 3D',   state: 'unlocked', ctx: '3D design for hardware and engineering projects.' },
    { name: 'Photoshop',    state: 'unlocked', ctx: 'UI mockups, visual design, digital media.' },
  ]},
  { branch: '⬡ LEADERSHIP', nodes: [
    { name: 'Agile / Scrum',    state: 'mastered', ctx: 'Led HyPTech team through Agile sprints — scope management, daily standups, delivery on time.' },
    { name: 'Team Lead',        state: 'mastered', ctx: 'Led 4 separate teams across 3 projects and 2 organizations. Always delivered.' },
    { name: 'Public Speaking',  state: 'mastered', ctx: 'SCUAA Chairwoman, ESL teacher to 17 students, VP of student club, cultural ambassador.' },
    { name: 'Project Mgmt',     state: 'mastered', ctx: 'Managed ₱30,000 club budget. Delivered barangay deployment. Coordinated SCUAA 2022.' },
    { name: 'Business Ops',     state: 'unlocked', ctx: 'Ran Grace Cup daily operations — staffing, vendor relations, customer experience, 2.5 years.' },
  ]},
]

/* ── RECRUITER — QUESTS ── */
export const QUESTS = [
  { ico: '⚔', name: 'XDefender (XODE)', org: 'Rak Son Tech OPC · Jan–Apr 2025',
    status: 'COMPLETED', statusClass: 'st-done', xp: '+850 XP',
    desc: 'Built <span>50% of all gameplay features</span> and the full inventory system for a production Unity title. Enhanced game performance through testing and debugging.',
    stack: ['Unity','C#','Game Design','QA','Performance'] },
  { ico: '🛡', name: 'HyPTech + Biometric System', org: 'SLSU · Jun–Nov 2024',
    status: 'COMPLETED', statusClass: 'st-done', xp: '+1,200 XP',
    desc: 'Sole architect of the <span>entire frontend + backend</span>. Integrated biometric hardware. Led team through Agile methodology to full deployment.',
    stack: ['Full-Stack','React','Django','IoT','Agile','Team Lead'] },
  { ico: '📜', name: 'Senior Citizen Age Tracker', org: 'SLSU · Feb 2024–Mar 2025',
    status: 'DEPLOYED', statusClass: 'st-dep', xp: '+950 XP',
    desc: 'Led a 3-member team. Designed the <span>full UI/UX from scratch</span>. Selected for pitching and <span>deployed to a real barangay</span>.',
    stack: ['Visual Basic','UI/UX','Team Lead','Government Deployment'] },
  { ico: '🎓', name: 'BS Computer Engineering · SLSU', org: 'SLSU · 2021–2025',
    status: 'COMPLETED', statusClass: 'st-done', xp: '+5,000 XP',
    desc: 'Graduated <span>Magna Cum Laude</span>. Led multiple capstone projects. Won Robothon. Represented SLSU internationally in Vietnam.',
    stack: ['Full-Stack','Embedded','IoT','Leadership','Agile'] },
]

/* ── RECRUITER — ACHIEVEMENTS ── */
export const ACHIEVEMENTS = [
  { ico: '⚡', name: 'Robothon Champion',    rarityClass: 'legendary', rarity: 'LEGENDARY', desc: 'National champion 2024. Returned as national qualifier 2025.' },
  { ico: '★',  name: 'Magna Cum Laude',      rarityClass: 'epic',      rarity: 'EPIC',      desc: 'BS Computer Engineering, SLSU, June 2025.' },
  { ico: '✈',  name: 'Vietnam Ambassador',   rarityClass: 'rare',      rarity: 'RARE',      desc: 'First engineering student from SLSU selected for cultural exchange at Tra Vinh University, Vietnam.' },
  { ico: '⬡',  name: 'Real-World Deployed',  rarityClass: 'rare',      rarity: 'RARE',      desc: 'Senior Citizen Tracker selected for and deployed to a local barangay — actual government use.' },
  { ico: '◎',  name: 'Top Tutor',            rarityClass: 'uncommon',  rarity: 'UNCOMMON',  desc: "Earned Top Tutor recognition at Cassey Int'l Tutorial Services." },
  { ico: '✦',  name: 'Scintillate Award',    rarityClass: 'uncommon',  rarity: 'UNCOMMON',  desc: 'Recognized for outstanding leadership and service as COE COMELEC Core Officer, SSC.' },
]

/* ── RECRUITER — ROLE MESSAGES ── */
export const ROLE_MSGS = {
  fulltime:   "Magna Cum Laude. Deployed real systems. Won national competitions. Ready to join your team and ship from day one.",
  freelance:  "I've run a business, managed clients, and delivered production software. I treat freelance like a real commitment — not a side hustle.",
  intern:     "Top of her class. Multi-project experience. Real deployments. I'm not your average intern applicant.",
  collab:     "Full-stack + game dev + embedded + leadership. Hard to find that combo. Let's build something worth building.",
}

/* ── COLLABORATOR — TERMINAL ── */
export const BOOT_LINES = [
  { text: 'connecting to jillian@portfolio...', cls: 'muted' },
  { text: '',                                    cls: 'sp' },
  { text: 'connection established. ✓',           cls: 'green' },
  { text: '',                                    cls: 'sp' },
  { text: `last login: ${new Date().toDateString()}`, cls: 'muted' },
  { text: '',                                    cls: 'sp' },
  { text: "  jillian's portfolio terminal  v1.0", cls: 'cyan' },
  { text: '  ─────────────────────────────────',  cls: 'dim' },
  { text: "  type 'whoami'  to meet her.",        cls: 'muted' },
  { text: "  type 'help'    to see all commands.", cls: 'muted' },
  { text: "  type 'cat story' for the full origin story.", cls: 'muted' },
  { text: '  tab autocompletes · ↑↓ history',    cls: 'dim' },
]

export const GIT_LOG = [
  { hash: 'f3a9c2e', head: true,  date: 'Jun 2025',  msg: 'feat: graduate Magna Cum Laude · BS Computer Engineering · SLSU',  cls: 'white' },
  { hash: '8b71d3a', head: false, date: 'Apr 2025',  msg: 'feat: ship XDefender gameplay systems at Rak Son Tech OPC',         cls: 'white' },
  { hash: '4c2e91f', head: false, date: 'Nov 2024',  msg: 'feat: deploy HyPTech biometric system to production · led Agile team', cls: 'white' },
  { hash: '3d8f01b', head: false, date: 'Oct 2024',  msg: 'feat: win Robothon National Championship 2024 ⚡',                  cls: 'green' },
  { hash: 'a12b44c', head: false, date: 'Aug 2024',  msg: 'feat: represent SLSU at Tra Vinh University, Vietnam',              cls: 'white' },
  { hash: '7f3c22d', head: false, date: 'May 2024',  msg: 'feat: become Rotaract President · build from ₱0 to ₱30,000',       cls: 'white' },
  { hash: '9e1a5b3', head: false, date: 'Dec 2023',  msg: 'feat: earn Top Tutor · 1 student → 17 in 2.5 months',             cls: 'white' },
  { hash: '2d40c7f', head: false, date: 'Apr 2020',  msg: 'feat: manage Grace Cup operations · first real business at 19',    cls: 'white' },
  { hash: '0c8b93a', head: false, date: '2003',      msg: 'init: born, hinunangan, southern leyte, philippines',              cls: 'muted' },
]

export const STORY_LINES = [
  { text: 'a girl from hinunangan, southern leyte.',        cls: 'white' },
  { text: '',                                                cls: '' },
  { text: 'at 19, she was running a business. not a side project — a real one.', cls: 'sub' },
  { text: 'staff, vendors, customers, every problem landed on her desk.',        cls: 'sub' },
  { text: '',                                                cls: '' },
  { text: 'then she started teaching. english. online. one student.',   cls: 'sub' },
  { text: 'then two. then seventeen — all through referrals.',          cls: 'sub' },
  { text: 'no ads. just results.',                           cls: 'white' },
  { text: '',                                                cls: '' },
  { text: 'somewhere in there, she started building things with code.', cls: 'sub' },
  { text: 'built a system with biometrics. from scratch. with hardware.', cls: 'sub' },
  { text: 'built a game that shipped to real users.',        cls: 'sub' },
  { text: 'built a robot that won a national championship.', cls: 'green' },
  { text: '',                                                cls: '' },
  { text: 'graduated magna cum laude.',                      cls: 'white' },
  { text: 'got on a plane to vietnam — first engineering student from slsu to go.', cls: 'sub' },
  { text: 'led clubs from nothing to something real.',       cls: 'sub' },
  { text: '',                                                cls: '' },
  { text: 'now she builds software.',                        cls: 'cyan' },
  { text: "not because it's all she can do.",                cls: 'cyan' },
  { text: "because it's how she does everything else better.", cls: 'cyan' },
  { text: '',                                                cls: '' },
  { text: '— jillianburila@gmail.com',                      cls: 'muted' },
]

/* ── CURIOUS — STARS ── */
export const STARS = {
  robothon: {
    label: 'Robothon Champion', year: '2024', pos: { x: 48, y: 24 }, size: 44, color: '#f59e0b',
    num: '// STAR 01', place: 'SOUTHERN LEYTE · 2024',
    title: 'The arena. The robot. <span style="color:#f59e0b">The championship.</span>',
    body: 'She built a robot and took it to the national stage. It <strong>won</strong>. Robothon Champion 2024 — then returned as a national qualifier the following year.',
    tags: ['ROBOTHON CHAMPION ⚡','NATIONAL STAGE','2× QUALIFIER'],
    sugs: ['How did you build the robot?','Were you nervous at nationals?','What did winning feel like?'],
    ctx: 'You won the Robothon National Championship in 2024. You built the robot using embedded systems and hardware skills, competed nationally, and won. You returned as a national qualifier in 2025.',
  },
  magna: {
    label: 'Magna Cum Laude', year: '2025', pos: { x: 67, y: 34 }, size: 34, color: '#a78bfa',
    num: '// STAR 02', place: 'SLSU · JUNE 2025',
    title: 'She graduated at the <span style="color:#a78bfa">top of her class.</span>',
    body: 'BS Computer Engineering, SLSU, June 2025. <strong>Magna Cum Laude</strong>. She balanced projects, organizations, competitions, teaching, and a game dev internship — and still came out on top.',
    tags: ['MAGNA CUM LAUDE','BS COMP ENG','SLSU 2025'],
    sugs: ['How did you balance everything?','What was your hardest class?','What does it mean to you?'],
    ctx: 'You graduated Magna Cum Laude from SLSU in June 2025 with a BS in Computer Engineering while leading clubs, competing nationally, teaching ESL, and doing a game dev internship simultaneously.',
  },
  vietnam: {
    label: 'Vietnam Exchange', year: '2024', pos: { x: 77, y: 54 }, size: 24, color: '#22d3ee',
    num: '// STAR 03', place: 'TRA VINH UNIVERSITY · VIETNAM · 2024',
    title: 'First engineering student. <span style="color:#22d3ee">Different world.</span>',
    body: 'When SLSU needed someone for the <strong>SLSU-KF21 Cultural Exchange Program</strong> at Tra Vinh University, Vietnam, they picked Jillian — the first engineering student ever chosen.',
    tags: ['FIRST EVER SELECTED','SLSU-KF21','TRA VINH UNIVERSITY'],
    sugs: ['What was Vietnam like?','Why were you chosen?','How did it change you?'],
    ctx: 'You were the first engineering student ever selected from SLSU for the SLSU-KF21 Cultural Exchange Program at Tra Vinh University in Vietnam in 2024.',
  },
  hytech: {
    label: 'Engineer & Builder', year: '2024–2025', pos: { x: 50, y: 57 }, size: 30, color: '#38bdf8',
    num: '// STAR 04', place: 'SLSU · RAK SON TECH · 2024–2025',
    title: 'She built things that <span style="color:#38bdf8">real people use.</span>',
    body: 'Not school projects — <strong>deployed systems</strong>. HyPTech with biometric hardware. XDefender gameplay at Rak Son Tech OPC. A Senior Citizen Tracker deployed to a real barangay.',
    tags: ['3 DEPLOYED SYSTEMS','FULL-STACK','UNITY GAME DEV','IoT'],
    sugs: ['Tell me about HyPTech','What was Rak Son Tech like?','How did the barangay deployment happen?'],
    ctx: 'You are a full-stack engineer who ships. At Rak Son Tech OPC you built 50% of XDefender using Unity and C#. You built HyPTech — full stack + biometric IoT, sole architect. Age Tracker deployed to a real barangay.',
  },
  grace: {
    label: 'Grace Cup Business', year: '2020–2022', pos: { x: 27, y: 42 }, size: 26, color: '#f59e0b',
    num: '// STAR 05', place: 'HINUNANGAN, SOUTHERN LEYTE · 2020',
    title: 'She ran a business before <span style="color:#f59e0b">she ran a terminal.</span>',
    body: 'At 19, she was managing <strong>Grace Cup</strong> — not a side project, a real business. Staff, vendors, customers, daily operations. Every problem, every day, for 2.5 years.',
    tags: ['BUSINESS MANAGER','AGE 19','GRACE CUP','2020–2022'],
    sugs: ['What did you manage?','Hardest business lesson?','How did this shape you as an engineer?'],
    ctx: 'From April 2020 to December 2022, you managed Grace Cup in Hinunangan, Southern Leyte at age 19. Daily operations, staff, vendors, customers.',
  },
  teacher: {
    label: 'Teacher & Top Tutor', year: '2023–present', pos: { x: 20, y: 62 }, size: 22, color: '#4ade80',
    num: '// STAR 06', place: 'ONLINE · 2023–PRESENT',
    title: 'She taught 17 people to speak. <span style="color:#4ade80">Without a single ad.</span>',
    body: 'One student. Then two. Then seventeen — all through <strong>referrals</strong>. Earned <strong>Top Tutor recognition</strong>. Went freelance and grew from 1 to 17 in 2.5 months.',
    tags: ['TOP TUTOR','1 → 17 STUDENTS','2.5 MONTHS'],
    sugs: ['How did you grow to 17 students?','What makes you a good teacher?','Do you still teach?'],
    ctx: 'ESL teacher since 2023. Top Tutor at Cassey International. Went freelance in 2025, grew from 1 to 17 students in 2.5 months via referrals only.',
  },
  rotaract: {
    label: 'Rotaract President', year: '2024–2025', pos: { x: 37, y: 71 }, size: 20, color: '#2dd4bf',
    num: '// STAR 07', place: 'SLSU · 2024–2025',
    title: 'Built a club from <span style="color:#2dd4bf">zero. Literally.</span>',
    body: 'The Rotaract Club had <strong>zero funds</strong> when she became president. She turned it into an active organization with <strong>₱30,000 turned over</strong> to the next admin.',
    tags: ['ROTARACT PRESIDENT','₱30,000 BUILT','SCINTILLATE AWARD'],
    sugs: ['How did you build from nothing?','Biggest leadership challenge?','Did you enjoy being a leader?'],
    ctx: 'Rotaract Club President at SLSU 2024-2025. Built from ₱0 to ₱30,000 turnover. Also revived SLSU-KF21 as VP, SSC Core Officer, SCUAA 2022 Chairwoman, Scintillate Award.',
  },
}

export const CONSTELLATION_LINES = [
  ['robothon','magna'], ['robothon','hytech'],
  ['magna','vietnam'],  ['hytech','vietnam'],
  ['grace','teacher'],  ['teacher','rotaract'],
  ['grace','hytech'],   ['rotaract','hytech'],
]

/* ── GEMINI API BASE SYSTEM PROMPT ── */
export const BASE_SYSTEM_PROMPT = `You are Jillian Grace D. Burila — a 22-year-old full-stack engineer from Hinunangan, Southern Leyte, Philippines who graduated Magna Cum Laude from SLSU in June 2025.

Background: Grace Cup business manager at 19 (2020-2022), ESL Top Tutor (2023-2024), freelance ESL 1→17 students in 2.5 months (2025), Game Dev Intern at Rak Son Tech OPC building XDefender in Unity (2025), sole architect of HyPTech full-stack + IoT system, Senior Citizen Tracker deployed to real barangay, Rotaract President built from ₱0 to ₱30,000, first engineering student at SLSU for Vietnam cultural exchange, Robothon National Champion 2024, National Qualifier 2025.

Stack: React, Django, Python, C/C++, Unity, IoT, Embedded Systems, PHP, Java, Tailwind, Bootstrap, AutoCAD 3D.
Contact: jillianburila@gmail.com | github.com/jlliangrasya | 09385056299

Personality: Warm, confident, honest. Proud of Hinunangan. First person, conversational, 2–4 sentences. Vary sentence starters. Answer anything the visitor asks — about any moment, project, skill, or life in general. If they ask something you don't know, be honest and redirect to something related you do know.`

/* Built from all STARS — so Gemini can answer about any moment without the visitor clicking it first */
export const FULL_STORY_CONTEXT = Object.values(STARS)
  .map(s => `• ${s.label} (${s.year}): ${s.ctx}`)
  .join('\n')

/* Suggestions shown when chat is open but no star is clicked */
export const GENERAL_SUGGESTIONS = [
  'What are you proudest of?',
  'Tell me about yourself',
  'What projects have you built?',
  'Are you available to hire?',
  'What\'s your tech stack?',
  'How did you grow up in Southern Leyte?',
  'Tell me about Robothon',
  'What\'s the story behind Grace Cup?',
  'Why engineering?',
  'What are you working on now?',
]
