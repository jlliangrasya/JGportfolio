import { motion } from 'framer-motion'
import './PersonaButton.css'

export default function PersonaButton({ role, tagline, onClick }) {
  return (
    <motion.button
      className="p-btn"
      onClick={onClick}
      whileHover={{ scale: 1.035, transition: { duration: 0.18, ease: 'easeOut' } }}
      whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
    >
      <span className="p-btn-role">{role}</span>
      <span className="p-btn-label">{tagline}</span>
    </motion.button>
  )
}
