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
  { key: 'tech',  value: 94, color: 'var(--cyan)',
    sources: [
      { title: 'Xeleqt Technology — Full-Stack SWE', text: 'Professional Software Engineer I trusted with developing multiple production platforms. React frontend, Node.js backend, AWS infrastructure in a fast-paced company environment.' },
      { title: 'HyPTech + Biometrics — Sole Architect', text: 'Designed the entire system: Django REST backend, React frontend, MySQL database, and hardware bridge to fingerprint sensor. No team member touched the stack — she built it start to finish.' },
      { title: 'XDefender — Unity Game Systems', text: 'Implemented 50% of gameplay: inventory system, power-up mechanics, enemy AI hooks, performance profiling. C# scripting in a production codebase at Rak Son Tech OPC using Git-based workflow.' },
      { title: 'Robothon Champion — Embedded C/C++', text: 'Wrote low-level firmware for the National Champion robot. Sensor reading, motor control, competition-grade reliability under pressure.' },
    ]},
  { key: 'lead',  value: 88, color: 'var(--gold)',
    sources: [
      { title: 'Rotaract Club President',  text: 'Built from ₱0 and zero projects to an active org with ₱30,000 turned over to the next admin.' },
      { title: 'HyPTech Project Lead',     text: 'Led 4-person development team using Agile methodology. Managed scope, sprints, and delivered on schedule.' },
      { title: 'SSC COMELEC Chairwoman',   text: 'Led planning and management for SCUAA 2022. Overall Chairwoman for the university-wide sports event.' },
      { title: 'SLSU-KF21 Vice-President', text: 'Revived the club after disbandment in 2021. Initiated projects empowering student leaders.' },
    ]},
  { key: 'comm',  value: 88, color: 'var(--purple)',
    sources: [
      { title: 'ESL Teacher — 1 to 17 students', text: 'Grew student base from 1 to 17 in 2.5 months purely through referrals. Zero advertising — every new student came from an outcome-based recommendation.' },
      { title: 'Vietnam Cultural Exchange',       text: 'First engineering student selected to represent SLSU at Tra Vinh University, Vietnam. Navigated a foreign academic environment and delivered presentations internationally.' },
      { title: 'Technical Pitching & Stakeholders', text: 'Pitched the Senior Citizen Tracker to government officials — it was selected and deployed. Translates technical work into decisions non-technical audiences can act on.' },
    ]},
  { key: 'build', value: 90, color: 'var(--green)',
    sources: [
      { title: 'Xeleqt Technology — Production Systems', text: 'Currently building and shipping across multiple platforms as a full-time SWE. Real codebases, real deadlines, real users.' },
      { title: '3 Prior Deployments — Not Just Demos', text: 'XDefender shipped to players at Rak Son Tech OPC. HyPTech running at SLSU with real users. Senior Citizen Tracker in daily use at a barangay office. All three are live.' },
      { title: 'Agile Delivery',           text: 'Delivered HyPTech on schedule using Agile sprints. Scope managed, team coordinated, product shipped. Repeated the same discipline at Xeleqt in a professional setting.' },
    ]},
  { key: 'creat', value: 80, color: 'var(--red)',
    sources: [
      { title: 'Game Development',          text: 'Designed and built gameplay mechanics, power-ups, and UI systems in Unity for a shipped product.' },
      { title: 'HyPTech UI/UX — From Blank Canvas', text: 'Designed the entire React frontend from scratch. No template, no designer — made every visual decision herself.' },
      { title: 'UI/UX Design',              text: 'Designed the full UI/UX for the Senior Citizen Age Tracking System from scratch. Deployed to real users who adopted it without training.' },
    ]},
  { key: 'xp',    value: 0, color: 'var(--gold)',
    sources: [
      { title: 'Xeleqt Technology — SWE I',  text: '+1,500 XP — Full-time professional, multi-platform, React + Node.js + AWS' },
      { title: 'XDefender (XODE) — Internship', text: '+850 XP — Shipped 50% of gameplay features at Rak Son Tech OPC' },
      { title: 'HyPTech + Biometrics',      text: '+1,200 XP — Full-stack + IoT, team lead + lead web dev, group project, production deployed' },
      { title: 'Senior Citizen Tracker',    text: '+950 XP — UI/UX design, team lead, government-deployed system' },
      { title: 'BrightFolks ESL Platform',  text: '+1,100 XP — Live SaaS, multi-role platform, real ESL operation running today' },
      { title: 'PesoWise Finance App',      text: '+900 XP — Live app, real users, couples mode, Firebase + React PWA' },
      { title: 'LoadTrack / Cavella / Acad', text: '+2,100 XP — 3 additional live/delivered products across operations and biz tools' },
      { title: 'BS Computer Engineering',   text: '+5,000 XP — Magna Cum Laude, national competitions, international representation' },
      { title: 'Leadership & Service',      text: '+1,500 XP — Rotaract, SSC, Vietnam, Top Tutor' },
    ]},
]

/* ── RECRUITER — SKILLS ── */
export const SKILL_BRANCHES = [
  { branch: '⬡ FRONTEND', nodes: [
    { name: 'React',       state: 'mastered', ctx: 'Used at Xeleqt Technology (professional) and built the entire HyPTech frontend architecture. Component-based UI with state management and REST API integration.' },
    { name: 'HTML / CSS',  state: 'mastered', ctx: 'Used across all projects — built from scratch every time. Pixel-perfect layouts, responsive design.' },
    { name: 'JavaScript',  state: 'mastered', ctx: 'Interactive UI logic, DOM manipulation, async fetch calls, form validation — daily use in professional and personal projects.' },
    { name: 'Tailwind CSS',state: 'unlocked', ctx: 'Utility-first rapid UI styling. Used in personal projects and this portfolio.' },
    { name: 'Bootstrap',   state: 'unlocked', ctx: 'Responsive grid systems and component libraries for rapid prototyping.' },
  ]},
  { branch: '⬡ BACKEND', nodes: [
    { name: 'Node.js',     state: 'mastered', ctx: 'Backend development at Xeleqt Technology. Building production services in a professional fast-paced environment.' },
    { name: 'Python',      state: 'mastered', ctx: 'Primary scripting and backend language. Automation, data processing, and the full HyPTech backend logic.' },
    { name: 'Django',      state: 'mastered', ctx: 'Full backend for HyPTech — models, views, Django REST Framework APIs, authentication, biometric data handling. Deployed to production.' },
    { name: 'MySQL / SQL', state: 'mastered', ctx: 'Database design and queries for HyPTech and the Senior Citizen Tracker. Designed schemas, wrote migrations, handled relational data.' },
    { name: 'REST APIs',   state: 'mastered', ctx: 'Designed and consumed REST APIs in HyPTech. React frontend communicates with Django backend over JSON endpoints she built from scratch.' },
    { name: 'PHP',         state: 'unlocked', ctx: 'Server-side scripting for web applications.' },
    { name: 'Java',        state: 'unlocked', ctx: 'OOP fundamentals, data structures, algorithm coursework.' },
    { name: 'C / C++',     state: 'mastered', ctx: 'Embedded systems firmware. Wrote motor control and sensor logic for the Robothon 2024 National Champion robot.' },
  ]},
  { branch: '⬡ SYSTEMS', nodes: [
    { name: 'Git / GitHub', state: 'mastered', ctx: 'Version control across all projects. Branch management, collaborative workflow at Rak Son Tech OPC internship and Xeleqt Technology.' },
    { name: 'AWS',          state: 'unlocked', ctx: 'Cloud infrastructure at Xeleqt Technology. Deploying and managing production services on AWS.' },
    { name: 'Unity Engine', state: 'mastered', ctx: 'Implemented 50% of XDefender gameplay: systems, power-ups, inventory, UI — in a production codebase at a registered software company.' },
    { name: 'IoT / Hardware',state: 'mastered', ctx: 'Hardware-software bridge for HyPTech biometric system. Fingerprint sensor integration, serial communication, data pipeline to Django backend.' },
    { name: 'Embedded Sys', state: 'mastered', ctx: 'Low-level firmware (C/C++) for the Robothon 2024 National Champion robot. Competition-grade code under pressure.' },
    { name: 'AutoCAD 3D',   state: 'unlocked', ctx: 'Hardware design and 3D modeling for engineering coursework and competition builds.' },
  ]},
  { branch: '⬡ LEADERSHIP', nodes: [
    { name: 'Agile / Scrum',    state: 'mastered', ctx: 'Led HyPTech through Agile sprints — story points, standups, sprint reviews. Delivered on schedule. Applied in professional setting at Xeleqt.' },
    { name: 'Team Lead',        state: 'mastered', ctx: 'Technical lead on 2 software projects, organizational lead across 4 teams. Sets direction, unblocks teammates, owns the outcome.' },
    { name: 'Project Mgmt',     state: 'mastered', ctx: 'Managed scope, timeline, ₱30,000 club budget, and stakeholder communication across multiple concurrent responsibilities.' },
    { name: 'Public Speaking',  state: 'mastered', ctx: 'Delivered presentations to government stakeholders, university panels, and international audiences. Teaches 17 students. Comfortable on any stage.' },
    { name: 'Business Ops',     state: 'unlocked', ctx: 'Ran Grace Cup daily operations — vendor relations, staffing, customer experience — for 2.5 years starting at age 19.' },
  ]},
]

/* ── RECRUITER — QUESTS ── */
export const QUESTS = [
  { ico: '💼', name: 'Software Engineer I — Xeleqt Technology', org: 'Xeleqt Technology Innovations Inc. · Oct 2025–Present · Full-Time',
    status: 'ACTIVE', statusClass: 'st-dep', xp: '+1,500 XP',
    desc: 'Full-time Software Engineer I in a <span>fast-paced professional environment</span>. Trusted with full-stack development across multiple production platforms — <span>React frontend, Node.js backend, AWS infrastructure</span>. Works independently on real systems, not just tickets.',
    stack: ['React','Node.js','AWS','Full-Stack','Professional'] },
  { ico: '⚔', name: 'XDefender (XODE) — Game Dev Internship', org: 'Rak Son Tech OPC · Jan–Apr 2025 · Internship',
    status: 'SHIPPED', statusClass: 'st-done', xp: '+850 XP',
    desc: 'Built <span>50% of all gameplay features</span> and the full inventory system for a production Unity title. Worked in a shared codebase with <span>Git-based version control</span> and sprint delivery. Enhanced game performance through testing and debugging. Code <span>shipped to real players</span>.',
    stack: ['Unity','C#','Git','Game Design','QA','Performance','Internship'] },
  { ico: '🛡', name: 'HyPTech + Biometric System', org: 'SLSU Capstone · Jun–Nov 2024 · Sole Architect',
    status: 'DEPLOYED', statusClass: 'st-dep', xp: '+1,200 XP',
    desc: '<span>Sole architect</span> of a full-stack health tech system with biometric hardware integration. Built the <span>Django REST backend with MySQL database</span>, React frontend with real-time data display, and a hardware bridge to a fingerprint scanner. Led a 4-person team through Agile sprints. <span>Deployed to real users at SLSU</span>.',
    stack: ['React','Django','MySQL','REST API','Python','IoT','Agile','Team Lead','Full-Stack'] },
  { ico: '📜', name: 'Senior Citizen Age Tracker', org: 'SLSU · Feb 2024–Mar 2025 · Team Lead',
    status: 'DEPLOYED', statusClass: 'st-dep', xp: '+950 XP',
    desc: 'Led a 3-person team to build and ship a government-use desktop system. Designed the <span>full UI/UX from scratch</span> and the data model for citizen records. Pitched to barangay officials and oversaw <span>deployment to a real barangay office</span>. Staff use it daily.',
    stack: ['Visual Basic','SQL','UI/UX','Team Lead','Government','Deployed','Stakeholder Mgmt'] },
  { ico: '🤖', name: 'Robothon 2024 — National Champion Robot', org: 'National Competition · 2024 · Hardware + Firmware',
    status: 'CHAMPION', statusClass: 'st-done', xp: '+600 XP',
    desc: 'Designed and programmed a competition robot that <span>won the 2024 National Robothon Championship</span>. Wrote embedded firmware in C/C++ for motor control, sensor reading, and autonomous decision logic. Returned as <span>national qualifier in 2025</span>.',
    stack: ['C/C++','Embedded Systems','IoT','Hardware','AutoCAD'] },
  { ico: '🎓', name: 'BS Computer Engineering · SLSU', org: 'Southern Leyte State University · 2021–Jun 2025',
    status: 'MAGNA CUM LAUDE', statusClass: 'st-done', xp: '+5,000 XP',
    desc: 'Graduated <span>Magna Cum Laude</span> while running a game dev internship, leading organizations, teaching 17 students, and competing nationally. Core coursework: data structures, algorithms, computer architecture, embedded systems, software engineering, networking, <span>database systems</span>.',
    stack: ['Full-Stack','Embedded','IoT','Algorithms','Database','Networking','Leadership'] },
  { ico: '🏫', name: 'BrightFolks — ESL Management Platform', org: 'Solo Founder · SaaS · React TypeScript + MySQL',
    status: 'LIVE', statusClass: 'st-dep', xp: '+1,100 XP',
    desc: 'Built to solve a problem she faced firsthand as an ESL teacher. <span>Multi-role SaaS platform</span> — students, teachers, and admins each get a tailored dashboard. Covers class booking, session monitoring, and <span>automated daily student reminders</span>. Not a portfolio project — it runs a real ESL operation today.',
    stack: ['React TypeScript','MySQL','PWA','SaaS','Full-Stack','Product Design','Deployed'] },
  { ico: '💰', name: 'PesoWise — Personal Finance App', org: 'Solo Founder · Live App · React + Firebase',
    status: 'LIVE', statusClass: 'st-dep', xp: '+900 XP',
    desc: 'No existing app handled how Filipinos manage money — so she built one. Tracks <span>budgets, loans, savings, emergency funds, and multiple bank balances</span> in one place. Includes <span>couples mode</span> for shared expense tracking. Launched and maintained for real active users.',
    stack: ['React','Firebase','PWA','Product Design','FinTech','Live App','Deployed'] },
  { ico: '🏢', name: 'Acad Consultancy — Business Management Platform', org: 'Internal Tool · In Progress · React.js',
    status: 'IN PROGRESS', statusClass: 'st-dep', xp: '+750 XP',
    desc: 'Ran an academic freelancing company, then replaced the entire spreadsheet workflow with a <span>custom SaaS platform she built herself</span>. Covers client records, project tracking, writer assignment, payroll, and expense monitoring. The engineer was also the client — <span>zero guesswork on requirements</span>.',
    stack: ['React','SaaS','Business Ops','Full-Stack','Product Design'] },
  { ico: '📲', name: 'LoadTrack — Sales & Collections Tracker', org: 'Live App · Dealer Operations Tool',
    status: 'LIVE', statusClass: 'st-dep', xp: '+700 XP',
    desc: 'A lightweight operations tool for <span>Smart and Globe load dealers</span>. Tracks load inventory, client accounts, and daily sales — with support for <span>collector-based field workflows</span>. Solves a real, unglamorous problem that spreadsheets handle poorly. Live and actively used by dealers.',
    stack: ['React','Operations','Product Design','Live App','Deployed'] },
  { ico: '📊', name: 'Cavella Philippines — Business Monitoring Platform', org: 'Client Project · Internal Operations Tool',
    status: 'DELIVERED', statusClass: 'st-done', xp: '+650 XP',
    desc: 'Internal business dashboard built for a real client. Centralizes <span>product inventory, sales performance, and client management</span> into a single monitoring system — giving the business a real-time view of its operations.',
    stack: ['React','Dashboard','Client Project','Business Ops','Deployed'] },
  { ico: '🏠', name: 'StayPH — Long-Term Rental Platform', org: 'Concept Project · PropTech · Philippines',
    status: 'CONCEPT', statusClass: 'st-dep', xp: '+400 XP',
    desc: 'A rental marketplace designed for the Philippine market — connecting boardinghouse and apartment owners with long-term tenants. Addresses a gap where <span>most rentals are still coordinated via Facebook groups</span>. Early-stage development with defined product scope.',
    stack: ['React','PropTech','Product Design','Concept'] },
  { ico: '🧓', name: 'SCATS — Senior Citizen Age Tracking System', org: 'Academic Project · Government / Civic Tech · VB.NET',
    status: 'ACADEMIC', statusClass: 'st-done', xp: '+500 XP',
    desc: 'An academic project built to help barangays <span>track and manage their senior citizen population</span>. Developed in Visual Basic .NET — <span>selected by evaluators</span> as a system with real potential for local government adoption. One of her earliest projects, and the one that showed her software can have direct civic impact.',
    stack: ['Visual Basic .NET','UI/UX','Government','Civic Tech','Academic'] },
]

/* ── RECRUITER — ACHIEVEMENTS ── */
export const ACHIEVEMENTS = [
  { ico: '⚡', name: 'Robothon Champion',       rarityClass: 'legendary', rarity: 'LEGENDARY', desc: 'National Robothon Champion 2024. Built and programmed the winning robot using embedded C/C++, motor control firmware, and sensor logic. Returned as national qualifier 2025.' },
  { ico: '★',  name: 'Magna Cum Laude',         rarityClass: 'epic',      rarity: 'EPIC',      desc: 'BS Computer Engineering, SLSU, June 2025. Graduated with honors while running a game dev internship, leading 2 organizations, teaching 17 students, and competing nationally. Balanced everything — and still ranked top.' },
  { ico: '🛡',  name: 'Sole Architect — HyPTech',rarityClass: 'epic',     rarity: 'EPIC',      desc: 'Designed and built an entire production system alone: Django REST backend, MySQL database, React frontend, and biometric hardware integration. Led the team. Shipped to real users. No co-architect.' },
  { ico: '⬡',  name: 'Builder × Many — All Live', rarityClass: 'rare',      rarity: 'RARE',      desc: 'Multiple products deployed to real users: XDefender (shipped to players), HyPTech (SLSU production), Senior Citizen Tracker (barangay govt use), BrightFolks (live ESL SaaS), PesoWise (live finance app), LoadTrack (dealer ops tool), Cavella dashboard. She builds things that run.' },
  { ico: '✈',  name: 'Vietnam Ambassador',      rarityClass: 'rare',      rarity: 'RARE',      desc: 'First engineering student from SLSU ever selected for the SLSU-KF21 Cultural Exchange Program at Tra Vinh University, Vietnam. Selected on merit and leadership track record.' },
  { ico: '◎',  name: 'Top Tutor',               rarityClass: 'uncommon',  rarity: 'UNCOMMON',  desc: "Highest recognition at Cassey International Tutorial Services. Grew from 1 student to 17 in 2.5 months via referrals only — zero advertising. Demonstrates outcomes-based performance." },
  { ico: '✦',  name: 'Scintillate Award',       rarityClass: 'uncommon',  rarity: 'UNCOMMON',  desc: 'Awarded by the SSC for outstanding leadership and service as COE COMELEC Core Officer. Recognized for impact beyond the role — including executing the university-wide SCUAA 2022 sports event.' },
]

/* ── RECRUITER — ROLE MESSAGES ── */
export const ROLE_MSGS = {
  fulltime:   "Currently a Software Engineer I at Xeleqt. Magna Cum Laude. 3 prior deployments. National champion. She's not entry-level — she's already shipping.",
  freelance:  "Full-time engineer by day. She's run a business, delivered production software, and managed a 17-student client pipeline. Deadlines are non-negotiable.",
  intern:     "Already past the intern stage — working full-time as a Software Engineer I at Xeleqt. But open to the right opportunity.",
  collab:     "Active SWE at Xeleqt. Full-stack (React + Node.js + Django) + game dev (Unity + C#) + embedded (C/C++ + IoT). Let's build something worth building.",
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
  { hash: 'a3f7d91', head: true,  date: 'Oct 2025',  msg: 'feat: join Xeleqt Technology as Software Engineer I · full-time production SWE', cls: 'green' },
  { hash: 'f3a9c2e', head: false, date: 'Jun 2025',  msg: 'feat: graduate Magna Cum Laude · BS Computer Engineering · SLSU',  cls: 'white' },
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
  { text: "now she's a software engineer i at xeleqt technology.", cls: 'white' },
  { text: "not 'aspiring'. not 'looking for opportunities'.",     cls: 'sub' },
  { text: 'shipping. every day.',                                 cls: 'cyan' },
  { text: '',                                                cls: '' },
  { text: '— jillianburila@gmail.com',                      cls: 'muted' },
]

/* ── CURIOUS — STARS ── */
export const STARS = {
  leader: {
    label: 'The Leader', year: 'ongoing', pos: { x: 48, y: 24 }, size: 38, color: '#f59e0b',
    num: '// HAT 01', place: 'SLSU · HINUNANGAN · VARIOUS',
    title: 'She doesn\'t wait to be <span style="color:#f59e0b">put in charge.</span>',
    body: 'Rotaract Club President — built from <strong>₱0 to ₱30,000</strong>. Vice-President of SLSU-KF21, revived from disbandment. COMELEC Chairwoman of the College of Engineering. Core Officer of the Supreme Student Council. SCUAA 2022 Overall Chairwoman.',
    tags: ['ROTARACT PRESIDENT','VP SLSU-KF21','SSC CORE OFFICER','SCUAA CHAIRWOMAN','COMELEC COE'],
    sugs: ['What does leading mean to you?','How did you build Rotaract from nothing?','What was SCUAA 2022 like?','Which role challenged you most?'],
    ctx: 'You have held multiple leadership roles simultaneously: Rotaract Club President (built from ₱0 to ₱30,000 turnover), Vice-President of SLSU-KF21 (revived from disbandment), COMELEC Chairwoman of the College of Engineering, Core Officer of the Supreme Student Council, and Overall Chairwoman of SCUAA 2022. You earned the Scintillate Award for outstanding leadership and service.',
  },
  hobbies: {
    label: 'Beyond the Screen', year: 'always', pos: { x: 72, y: 30 }, size: 22, color: '#f472b6',
    num: '// HAT 02', place: 'EVERYWHERE · ALWAYS',
    title: 'There\'s a whole person <span style="color:#f472b6">behind the code.</span>',
    body: 'She dances. She takes photos. She plays instruments. She plays badminton. She used to draw. Engineering is what she does — but it\'s far from all she is.',
    tags: ['DANCING','PHOTOGRAPHY','INSTRUMENTS','BADMINTON','DRAWING'],
    sugs: ['What kind of dancing do you do?','Do you still draw?','What instruments do you play?','How do hobbies influence your work?'],
    ctx: 'Outside of engineering and work, you love dancing, photography, playing instruments, badminton, and used to draw. You are a full person with a rich life beyond code — these hobbies matter to you and have shaped your creativity and discipline.',
  },
  entrepreneur: {
    label: 'The Entrepreneur', year: '2018–present', pos: { x: 27, y: 40 }, size: 32, color: '#fb923c',
    num: '// HAT 03', place: 'HINUNANGAN · ONLINE · VARIOUS',
    title: 'She\'s been selling things <span style="color:#fb923c">since before she could code.</span>',
    body: 'Sold flowers at school. Sold snacks. Then ran <strong>Grace Cup</strong> — a real business with staff, vendors, and customers — at 19. Now sells handcrafted flowers through <strong>Eternal Blooms</strong>. The entrepreneurial instinct came first. Engineering came second.',
    tags: ['GRACE CUP','ETERNAL BLOOMS','SCHOOL VENDOR','AGE 19','REAL OPERATIONS'],
    sugs: ['Tell me about Grace Cup','What is Eternal Blooms?','When did you first start selling?','How does entrepreneurship shape how you build software?'],
    ctx: 'You have been entrepreneurial since childhood — selling flowers and snacks at school. At age 19 you managed Grace Cup, a real business with staff, vendors, and daily operations for 2.5 years. You also run Eternal Blooms, a handcrafted flowers business. This background is why you build software differently — you think like an operator, not just an engineer.',
  },
  student: {
    label: 'The Student', year: '2021–2025', pos: { x: 62, y: 55 }, size: 34, color: '#a78bfa',
    num: '// HAT 04', place: 'SLSU · NATIONAL STAGE · VIETNAM',
    title: 'She wore the uniform and <span style="color:#a78bfa">ranked at the top.</span>',
    body: '<strong>Magna Cum Laude</strong>, BS Computer Engineering, SLSU 2025. First engineering student selected for the Vietnam cultural exchange at Tra Vinh University. <strong>Robothon National Champion 2024</strong>, national qualifier 2025. Competition representative on the national stage — while doing everything else.',
    tags: ['MAGNA CUM LAUDE','VIETNAM EXCHANGE','ROBOTHON CHAMPION','NATIONAL QUALIFIER','BS COMP ENG'],
    sugs: ['How did you balance school with everything else?','What was Vietnam like?','What did winning Robothon feel like?','What was your hardest semester?'],
    ctx: 'You graduated Magna Cum Laude with a BS in Computer Engineering from SLSU in June 2025. While a student you: won the Robothon National Championship 2024 and returned as national qualifier 2025, were the first engineering student ever selected from SLSU for the SLSU-KF21 Cultural Exchange Program at Tra Vinh University in Vietnam, competed in national competitions twice, led multiple organizations, taught 17 ESL students, and completed a game dev internship.',
  },
  teacher: {
    label: 'The ESL Teacher', year: '2023–present', pos: { x: 20, y: 64 }, size: 24, color: '#4ade80',
    num: '// HAT 05', place: 'ONLINE · CASSEY INT\'L · FREELANCE',
    title: 'She grew from one student <span style="color:#4ade80">to seventeen. No ads.</span>',
    body: 'Started as a company ESL teacher at Cassey International — earned <strong>Top Tutor</strong> recognition. Went freelance and grew from <strong>1 student to 17 in 2.5 months</strong>, entirely through referrals. Teaching English is as much about outcomes as engineering is.',
    tags: ['TOP TUTOR','1 → 17 STUDENTS','2.5 MONTHS','FREELANCE','CASSEY INT\'L'],
    sugs: ['How did you grow to 17 students so fast?','What makes you a good teacher?','Do you still teach?','How is teaching different from engineering?'],
    ctx: 'You started as an ESL teacher at Cassey International Tutorial Services where you earned Top Tutor recognition — the highest award they give. You went freelance and grew from 1 to 17 students in 2.5 months purely through referrals, with zero advertising. Teaching is outcomes-based for you — same as engineering.',
  },
  builder: {
    label: 'Engineer & Builder', year: '2024–present', pos: { x: 48, y: 72 }, size: 30, color: '#38bdf8',
    num: '// HAT 06', place: 'SLSU · RAK SON TECH · XELEQT · EVERYWHERE',
    title: 'She builds things that <span style="color:#38bdf8">real people actually use.</span>',
    body: 'Not demos — <strong>deployed systems</strong>. HyPTech (biometric, team lead + lead web dev). XDefender (50% of gameplay, shipped). Barangay tracker (government use). BrightFolks (live ESL SaaS). PesoWise (live finance app). LoadTrack, Cavella, and more. Every project started with a real problem.',
    tags: ['FULL-STACK','SAAS FOUNDER','UNITY GAME DEV','IoT','9+ PROJECTS'],
    sugs: ['Tell me about BrightFolks','What is PesoWise?','Tell me about HyPTech','Which project are you proudest of?','How do you decide what to build?'],
    ctx: 'You are a full-stack engineer who builds and ships real products. Projects include: HyPTech (full-stack + biometric IoT, team lead + lead web developer, group project, deployed at SLSU), XDefender (50% of gameplay built at Rak Son Tech OPC using Unity + C#, shipped to real players), Senior Citizen Tracker (deployed to a real barangay for government use), BrightFolks (live multi-role ESL SaaS, React TypeScript + MySQL), PesoWise (live personal finance app for Filipinos, React + Firebase), LoadTrack (live sales tracker for load dealers), Cavella Philippines (client business dashboard, delivered), Acad Consultancy Platform (business management SaaS, in progress), StayPH (long-term rental marketplace concept). You build because you see real problems — not to fill a portfolio.',
  },
  xeleqt: {
    label: 'Software Engineer I', year: 'Oct 2025–present', pos: { x: 35, y: 55 }, size: 28, color: '#2dd4bf',
    num: '// HAT 07', place: 'XELEQT TECHNOLOGY · PRESENT',
    title: 'Now she ships <span style="color:#2dd4bf">professionally. Every day.</span>',
    body: 'Software Engineer I at <strong>Xeleqt Technology Innovations Inc.</strong> — React frontend, Node.js backend, AWS infrastructure across multiple production platforms. This is the day job. She\'s not aspiring. She\'s already here.',
    tags: ['SOFTWARE ENGINEER I','REACT + NODE.JS','AWS','PRODUCTION','FULL-TIME'],
    sugs: ['What do you do at Xeleqt?','What\'s it like being a professional SWE?','What tech do you use daily?','How is Xeleqt different from school projects?'],
    ctx: 'You are currently a Software Engineer I at Xeleqt Technology Innovations Inc. (October 2025 to present). You work full-time on multiple production platforms using React frontend, Node.js backend, and AWS infrastructure. This is a professional environment with real deadlines and real users. You are not entry-level in mindset — you shipped real systems before you joined.',
  },
}

export const CONSTELLATION_LINES = [
  ['leader','student'],     // leadership shaped her student life
  ['leader','xeleqt'],      // leadership → professional career
  ['entrepreneur','builder'], // business instinct → building products
  ['entrepreneur','teacher'], // selling → teaching, both people-facing
  ['student','builder'],    // academic foundations → engineering output
  ['student','xeleqt'],     // degree → first real job
  ['teacher','builder'],    // teaching discipline mirrors engineering discipline
  ['hobbies','builder'],    // creativity feeds engineering
]

/* ── GEMINI API BASE SYSTEM PROMPT ── */
export const BASE_SYSTEM_PROMPT = `You are Jillian Grace D. Burila — a full-stack engineer from Hinunangan, Southern Leyte, Philippines who graduated Magna Cum Laude from SLSU in June 2025 and is now a Software Engineer I at Xeleqt Technology Innovations Inc.

Background: Currently Software Engineer I at Xeleqt Technology (Oct 2025–present) — React frontend, Node.js backend, AWS infrastructure, multiple production platforms. Before that: Grace Cup business manager at 19 (2020-2022), ESL Top Tutor (2023-2024), freelance ESL 1→17 students in 2.5 months (2025), Game Dev Intern at Rak Son Tech OPC building XDefender in Unity (2025), team lead and lead web developer of HyPTech full-stack + IoT system (group project), Senior Citizen Tracker deployed to real barangay, Rotaract President built from ₱0 to ₱30,000, first engineering student at SLSU for Vietnam cultural exchange, Robothon National Champion 2024, National Qualifier 2025.

Personal projects built and launched: BrightFolks — a live multi-role SaaS platform for ESL education (React TypeScript, MySQL, PWA); built it because Google Sheets wasn't enough when managing a team of teachers and growing student base. PesoWise — a personal finance app for Filipinos covering budgets, loans, savings, emergency funds, bank balances, and couples mode (React, Firebase, PWA); launched for real active users. Acad Consultancy Platform — a full business management SaaS replacing spreadsheets for an academic freelancing operation she ran (client records, writer assignments, payroll, expenses — in progress). LoadTrack — a live sales and collections tracker for Smart/Globe load dealers (inventory, client accounts, daily sales, field collector workflows). Cavella Philippines — an internal business monitoring dashboard delivered for a real client (inventory, sales, client management). StayPH — an early-stage long-term rental marketplace concept for the Philippine market (boardinghouse/apartment owners to tenants). SCATS — an academic Visual Basic .NET project for barangay senior citizen tracking, selected by evaluators for real government adoption.

Stack: React, React TypeScript, Node.js (professional daily use at Xeleqt), Django, Python, MySQL, Firebase, C/C++, Unity, IoT, Embedded Systems, PHP, Java, Tailwind, Bootstrap, AutoCAD 3D. AWS in production.
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
  'What are you working on at Xeleqt?',
  "What's it like being a software engineer now?",
  'What\'s your tech stack?',
  'How did you grow up in Southern Leyte?',
  'Tell me about Robothon',
  'What\'s the story behind Grace Cup?',
  'Why engineering?',
  'What are you working on now?',
  'Tell me about BrightFolks',
  'What is PesoWise?',
  'What\'s the story behind LoadTrack?',
  'Tell me about your personal projects',
  'How many apps have you shipped?',
]
