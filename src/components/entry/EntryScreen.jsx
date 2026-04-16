import { useState, useEffect } from 'react'
import { PERSONA_BTNS } from '../../data/index.js'
import PersonaButton from './PersonaButton.jsx'
import './EntryScreen.css'

export default function EntryScreen({ onSelect }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`entry-wrap ${loaded ? 'loaded' : ''}`}>
      <div className="bg-grid" />

      <div className="entry-content">
        <p className="entry-eyebrow">// INCOMING CONNECTION — IDENTIFY YOURSELF</p>

        <h1 className="entry-name">
          Jillian <span className="entry-accent">Grace</span>
        </h1>

        <p className="entry-roles">
          ENGINEER &nbsp;·&nbsp; BUILDER &nbsp;·&nbsp; CHAMPION &nbsp;·&nbsp; TEACHER &nbsp;·&nbsp; LEADER
        </p>

        <p className="entry-prompt">&gt;_ WHO ARE YOU?</p>

        <div className="persona-grid">
          {PERSONA_BTNS.map((btn) => (
            <PersonaButton
              key={btn.key}
              role={btn.role}
              tagline={btn.tagline}
              onClick={() => onSelect(btn.key)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
