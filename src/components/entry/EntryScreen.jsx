import { motion } from 'framer-motion'
import { PERSONA_BTNS } from '../../data/index.js'
import PersonaButton from './PersonaButton.jsx'
import './EntryScreen.css'

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

export default function EntryScreen({ onSelect }) {
  return (
    <div className="entry-wrap loaded">
      <div className="bg-grid" />

      <motion.div
        className="entry-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="entry-eyebrow" variants={itemVariants}>
          // INCOMING CONNECTION — IDENTIFY YOURSELF
        </motion.p>

        <motion.h1 className="entry-name" variants={itemVariants}>
          Jillian <span className="entry-accent">Grace</span>
        </motion.h1>

        <motion.p className="entry-roles" variants={itemVariants}>
          ENGINEER &nbsp;·&nbsp; BUILDER &nbsp;·&nbsp; CHAMPION &nbsp;·&nbsp; TEACHER &nbsp;·&nbsp; LEADER
        </motion.p>

        <motion.p className="entry-prompt" variants={itemVariants}>
          &gt;_ WHO ARE YOU?
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
