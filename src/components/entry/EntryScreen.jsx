import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { PERSONA_BTNS } from '../../data/index.js'
import PersonaButton from './PersonaButton.jsx'
import avatar from '../../assets/jill avatar.png'
import './EntryScreen.css'

/* ── animation variants ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}
const btnVariants = {
  hidden:  { opacity: 0, y: 14, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}
const avatarVariants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

/* ── typewriter hook ── */
const EYEBROW_TEXT = '// INCOMING CONNECTION — IDENTIFY YOURSELF'
function useTypewriter(text, speed = 38, startDelay = 200) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setDisplayed(text.slice(0, i))
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])
  return displayed
}

/* ── particles ── */
const FRAGMENTS = [
  '0x4A','0xFF','01101','10010','0xC3','#f3a','var(','null','</>',
  '0b1010','0x2F','git','ssh','ping','ACK','SYN','EOF',
]
function Particles() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    const W = canvas.width  = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: 0.18 + Math.random() * 0.32,
      opacity: 0.04 + Math.random() * 0.13,
      label: FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)],
      size: 9 + Math.random() * 5,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      ctx.font = `${particles[0].size}px monospace`
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#22d3ee'
        ctx.font = `${p.size}px monospace`
        ctx.fillText(p.label, p.x, p.y)
        p.y -= p.speed
        if (p.y < -20) {
          p.y = H + 10
          p.x = Math.random() * W
          p.label = FRAGMENTS[Math.floor(Math.random() * FRAGMENTS.length)]
        }
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return <canvas ref={canvasRef} className="entry-particles" />
}

/* ── component ── */
export default function EntryScreen({ onSelect }) {
  const eyebrow = useTypewriter(EYEBROW_TEXT)

  return (
    <div className="entry-wrap loaded">
      <div className="bg-grid" />
      <Particles />

      <motion.div
        className="entry-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* avatar */}
        <motion.div className="entry-avatar-wrap" variants={avatarVariants}>
          <div className="entry-avatar-ring" />
          <div className="entry-avatar-ring entry-avatar-ring--2" />
          <img src={avatar} alt="Jillian Grace" className="entry-avatar" />
        </motion.div>

        {/* eyebrow — typewriter, no motion fade so it types in immediately */}
        <p className="entry-eyebrow entry-eyebrow--type">
          {eyebrow}
          <span className="entry-cursor" />
        </p>

        <motion.h1 className="entry-name" variants={itemVariants}>
          Jillian <span className="entry-accent">Grace</span>
        </motion.h1>

        <motion.p className="entry-roles" variants={itemVariants}>
          ENGINEER &nbsp;·&nbsp; BUILDER &nbsp;·&nbsp; CHAMPION &nbsp;·&nbsp; TEACHER &nbsp;·&nbsp; LEADER
        </motion.p>

        <motion.p className="entry-prompt" variants={itemVariants}>
          &gt;_ WHO ARE YOU?<span className="entry-cursor entry-cursor--prompt" />
        </motion.p>

        <motion.div className="persona-grid" variants={gridVariants}>
          {PERSONA_BTNS.map((btn) => (
            <motion.div key={btn.key} variants={btnVariants} style={{ display: 'flex' }}>
              <PersonaButton
                role={btn.role}
                tagline={btn.tagline}
                onClick={() => onSelect(btn.key)}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}
