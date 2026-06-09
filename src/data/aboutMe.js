/* ═══════════════════════════════════════════════════════════════════
   ABOUT ME — Extended context for the Gemini chatbot + star modals.

   HOW TO USE:
   • Add text freely in each section — the chatbot reads all of it.
   • For PHOTOS: put the image file in /public/about/ and reference it
     here as the `src` field. The star modal will display it.
     The chatbot reads the `caption` field as text context.
   • Every section feeds into the chatbot's system prompt automatically
     via EXTENDED_SYSTEM_CONTEXT (imported in index.js).
═══════════════════════════════════════════════════════════════════ */

/* ── PERSONAL LIFE & PERSONALITY ─────────────────────────────────
   Deep personal details the chatbot should know about Jillian.
   Write freely — this is injected verbatim into the Gemini prompt.
────────────────────────────────────────────────────────────────── */
export const PERSONAL_EXTENDED = `
Personal life and personality:
- [Add something here — e.g. "She is the eldest daughter in her family."]
- [e.g. "She is deeply influenced by her roots in Hinunangan, a small coastal town, and is proud of where she came from."]
- [e.g. "She has a quiet competitive streak — she doesn't announce it, she just wins."]
- [e.g. "She recharges by being alone. Big social events drain her but one-on-one conversations energize her."]
- [e.g. "She is a morning person and does her best thinking before 9am."]
- [Add values, quirks, beliefs, or anything that makes her who she is.]
`

/* ── PROJECT DEEP DIVES ───────────────────────────────────────────
   Detailed narratives for specific projects — the "why" and "how"
   behind the builds, challenges faced, decisions made.
────────────────────────────────────────────────────────────────── */
export const PROJECT_DETAILS = `
Project deep dives:

BrightFolks:
- [e.g. "The idea came from frustration — Google Sheets fell apart once she had 6 teachers and 40 students."]
- [e.g. "The hardest part was designing the multi-role system: students, teachers, and admins all need completely different dashboards."]
- [e.g. "She built it in 3 months while working full time."]
- [Add more: biggest challenge, proudest feature, what she'd do differently]

PesoWise:
- [e.g. "She noticed that Filipino spending habits — multiple banks, paluwagan, utang — aren't supported by Western finance apps."]
- [e.g. "Couples mode was added after she saw how many arguments couples have about money."]
- [Add more about the build, user feedback, what's next]

HyPTech:
- [e.g. "She spent 2 weeks just making the fingerprint sensor talk to the Django backend reliably."]
- [e.g. "The biggest risk was hardware failure during demo day — she built a fallback mode for that."]
- [Add more technical challenges, team dynamics, deployment story]

XDefender (Game Dev Internship):
- [e.g. "She had zero Unity experience before the internship — she shipped 50% of gameplay features within 4 months."]
- [Add more about the learning curve, the team, what she built]

[Add more projects below in the same format]
`

/* ── CAREER & GOALS ──────────────────────────────────────────────
   Where she's headed, what she's learning, what she wants to build.
────────────────────────────────────────────────────────────────── */
export const CAREER_GOALS = `
Career goals and what she's working toward:
- [e.g. "She wants to eventually start her own software company — the entrepreneurial instinct was always there."]
- [e.g. "She's currently learning [X] at Xeleqt and exploring [Y] on the side."]
- [e.g. "Her dream is to build a product used by millions of Filipinos — not just a portfolio piece."]
- [e.g. "She's interested in [specific domain: AI/fintech/health tech/etc.] long-term."]
- [e.g. "In 5 years she sees herself as a technical lead or founder, not just an individual contributor."]
- [Add anything about what she's studying, reading, building toward]
`

/* ── PHOTOS & MEDIA ──────────────────────────────────────────────
   Images to show in the star modal cards.
   - src: path relative to /public (e.g. '/about/vietnam.jpg')
   - caption: shown under the image; also read by the chatbot
   - star: which star card to attach it to (matches STARS keys:
     'leader' | 'hobbies' | 'entrepreneur' | 'student' | 'teacher' | 'builder' | 'xeleqt')
   - alt: accessibility text

   Put your image files in: /public/about/
────────────────────────────────────────────────────────────────── */
export const PHOTOS = [
  // {
  //   star: 'student',
  //   src: '/about/vietnam-exchange.jpg',
  //   alt: 'Jillian at Tra Vinh University, Vietnam',
  //   caption: 'At Tra Vinh University, Vietnam — first engineering student from SLSU selected for the cultural exchange program.',
  // },
  // {
  //   star: 'student',
  //   src: '/about/robothon-trophy.jpg',
  //   alt: 'Robothon National Championship 2024 trophy',
  //   caption: 'Holding the Robothon 2024 National Championship trophy. Months of late nights went into that robot.',
  // },
  // {
  //   star: 'leader',
  //   src: '/about/rotaract.jpg',
  //   alt: 'Rotaract Club photo',
  //   caption: 'The Rotaract Club she built from ₱0 — turned over ₱30,000 to the next administration.',
  // },
  // {
  //   star: 'hobbies',
  //   src: '/about/dancing.jpg',
  //   alt: 'Jillian dancing',
  //   caption: 'Dancing has been part of her life long before engineering was.',
  // },
  // {
  //   star: 'entrepreneur',
  //   src: '/about/grace-cup.jpg',
  //   alt: 'Grace Cup',
  //   caption: 'Grace Cup — her first real business, managed at 19.',
  // },
  // Add more photos by copying and uncommenting a block above.
]

/* ── WHAT THE CHATBOT GETS ───────────────────────────────────────
   This string is automatically appended to BASE_SYSTEM_PROMPT.
   You don't need to edit this — just fill in the sections above.
────────────────────────────────────────────────────────────────── */
export const EXTENDED_SYSTEM_CONTEXT = [
  PERSONAL_EXTENDED,
  PROJECT_DETAILS,
  CAREER_GOALS,
  PHOTOS
    .filter(p => p.caption)
    .map(p => `Photo context (${p.star}): ${p.caption}`)
    .join('\n'),
]
  .filter(s => s.trim())
  .join('\n\n')
