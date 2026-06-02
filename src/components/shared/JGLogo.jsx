export default function JGLogo({ onSwitch }) {
  return (
    <>
      <style>{JG_CSS}</style>
      <button className="jg-logo-btn" onClick={onSwitch} aria-label="Back to persona select">
        <svg className="jg-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagon background */}
          <polygon
            points="24,2 44,13.5 44,34.5 24,46 4,34.5 4,13.5"
            fill="rgba(0,0,0,0.7)"
            stroke="url(#jg-grad)"
            strokeWidth="1.5"
          />
          {/* J glyph */}
          <path d="M16 13h5v14.5c0 3.5-2 5.5-5.5 5.5S10 31 10 27.5h5c0 1.2.4 1.5 1 1.5s1-.4 1-1.5V13z" fill="url(#jg-grad)" />
          {/* G glyph */}
          <path d="M30 13c4.4 0 8 3.4 8 7.5h-5c0-1.4-1.3-2.5-3-2.5s-3 1.7-3 5 1.3 5 3 5c1.4 0 2.6-.9 2.9-2H30v-4h8v2c0 4.1-3.6 7.5-8 7.5S22 28.6 22 25s3.6-12 8-12z" fill="url(#jg-grad)" />
          <defs>
            <linearGradient id="jg-grad" x1="4" y1="2" x2="44" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
        <span className="jg-tooltip">← PERSONAS</span>
      </button>
    </>
  )
}

const JG_CSS = `
.jg-logo-btn {
  position: fixed;
  top: 1.1rem;
  left: 1.2rem;
  z-index: 200;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0;
}
.jg-svg {
  width: 40px;
  height: 40px;
  filter: drop-shadow(0 0 6px rgba(34,211,238,0.25));
  transition: filter 0.25s, transform 0.25s;
}
.jg-logo-btn:hover .jg-svg {
  filter: drop-shadow(0 0 14px rgba(34,211,238,0.6));
  transform: scale(1.1);
}
.jg-tooltip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  color: rgba(34,211,238,0.7);
  background: rgba(6,9,15,0.85);
  border: 1px solid rgba(34,211,238,0.18);
  border-radius: 2px;
  padding: 3px 8px;
  margin-left: 6px;
  opacity: 0;
  transform: translateX(-4px);
  transition: opacity 0.2s, transform 0.2s;
  pointer-events: none;
  white-space: nowrap;
}
.jg-logo-btn:hover .jg-tooltip {
  opacity: 1;
  transform: translateX(0);
}
@media (max-width: 480px) {
  .jg-logo-btn { top: 0.6rem; left: 0.6rem; }
  .jg-svg { width: 34px; height: 34px; }
}
`
