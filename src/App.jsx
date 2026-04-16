import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import EntryScreen from './components/entry/EntryScreen.jsx'
import RecruiterPersona from './components/personas/recruiter/RecruiterPersona.jsx'
import CollaboratorPersona from './components/personas/collaborator/CollaboratorPersona.jsx'
import CuriousPersona from './components/personas/curious/CuriousPersona.jsx'
import ClientPersona from './components/personas/client/ClientPersona.jsx'

const pageVariants = {
  initial:  { opacity: 0, scale: 1.04 },
  animate:  { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:     { opacity: 0, scale: 0.97, transition: { duration: 0.35, ease: 'easeIn' } },
}

const PERSONAS = {
  recruiter:    RecruiterPersona,
  collaborator: CollaboratorPersona,
  curious:      CuriousPersona,
  client:       ClientPersona,
}

export default function App() {
  const [persona, setPersona] = useState(null)

  const handleSelect = useCallback((key) => setPersona(key), [])
  const handleSwitch = useCallback(() => setPersona(null), [])

  const PersonaComponent = persona ? PERSONAS[persona] : null

  return (
    <AnimatePresence mode="wait">
      {!persona ? (
        <motion.div
          key="entry"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'fixed', inset: 0, zIndex: 1 }}
        >
          <EntryScreen onSelect={handleSelect} />
        </motion.div>
      ) : (
        <motion.div
          key={persona}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ position: 'fixed', inset: 0, zIndex: 1 }}
        >
          <PersonaComponent onSwitch={handleSwitch} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
