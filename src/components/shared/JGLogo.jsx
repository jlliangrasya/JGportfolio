import logoImg from '../../assets/JG logo.png'

export default function JGLogo({ onSwitch }) {
  return (
    <>
      <style>{JG_CSS}</style>
      <button className="jg-logo-btn" onClick={onSwitch} aria-label="Back to persona select">
        <div className="jg-halo-wrap">

          {/* ── SVG ring system ── */}
          <svg className="jg-rings-svg" viewBox="0 0 96 96" fill="none">
            <defs>
              {/* Emerald arc gradient */}
              <linearGradient id="arc1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#10b981" stopOpacity="0"/>
                <stop offset="35%"  stopColor="#10b981" stopOpacity="0.9"/>
                <stop offset="65%"  stopColor="#34d399" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
              </linearGradient>
              {/* Teal arc gradient */}
              <linearGradient id="arc2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%"   stopColor="#2dd4bf" stopOpacity="0"/>
                <stop offset="40%"  stopColor="#2dd4bf" stopOpacity="0.85"/>
                <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0"/>
              </linearGradient>
              {/* Amber arc */}
              <linearGradient id="arc3" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#f59e0b" stopOpacity="0"/>
                <stop offset="50%"  stopColor="#f59e0b" stopOpacity="0.75"/>
                <stop offset="100%" stopColor="#fde68a" stopOpacity="0"/>
              </linearGradient>
              {/* Glow filter */}
              <filter id="jg-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="1.8" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="jg-glow-sm" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="1.2"/>
              </filter>
            </defs>

            {/* ── Outer ring — dashed background track ── */}
            <circle cx="48" cy="48" r="44"
              stroke="rgba(16,185,129,0.1)" strokeWidth="0.8"
              strokeDasharray="4 5"/>

            {/* ── Ring 1 — emerald spinning arc ── */}
            <g className="jg-r1">
              <circle cx="48" cy="48" r="44"
                stroke="url(#arc1)" strokeWidth="1.4"
                strokeDasharray="90 186" strokeLinecap="round"
                filter="url(#jg-glow)"/>
            </g>

            {/* ── Ring 2 — teal counter-spin arc ── */}
            <g className="jg-r2">
              <circle cx="48" cy="48" r="36"
                stroke="url(#arc2)" strokeWidth="1"
                strokeDasharray="60 166" strokeLinecap="round"
                filter="url(#jg-glow)"/>
              {/* dashed track */}
              <circle cx="48" cy="48" r="36"
                stroke="rgba(45,212,191,0.08)" strokeWidth="0.6"
                strokeDasharray="2 6"/>
            </g>

            {/* ── Ring 3 — amber inner arc ── */}
            <g className="jg-r3">
              <circle cx="48" cy="48" r="27"
                stroke="url(#arc3)" strokeWidth="0.9"
                strokeDasharray="40 130" strokeLinecap="round"
                filter="url(#jg-glow)"/>
            </g>

            {/* ── Orbit dot 1 — teal on outer ring ── */}
            <g className="jg-dot1">
              {/* soft glow behind dot */}
              <circle cx="48" cy="4" r="4" fill="#2dd4bf" opacity="0.2" filter="url(#jg-glow-sm)"/>
              <circle cx="48" cy="4" r="2.4" fill="#2dd4bf"/>
              <circle cx="48" cy="4" r="1.2" fill="white" opacity="0.7"/>
            </g>

            {/* ── Orbit dot 2 — amber on mid ring ── */}
            <g className="jg-dot2">
              <circle cx="48" cy="12" r="3.5" fill="#f59e0b" opacity="0.2" filter="url(#jg-glow-sm)"/>
              <circle cx="48" cy="12" r="2"   fill="#f59e0b"/>
              <circle cx="48" cy="12" r="1"   fill="white" opacity="0.7"/>
            </g>

            {/* ── Orbit dot 3 — emerald on inner ring ── */}
            <g className="jg-dot3">
              <circle cx="48" cy="21" r="3"   fill="#10b981" opacity="0.2" filter="url(#jg-glow-sm)"/>
              <circle cx="48" cy="21" r="1.6" fill="#10b981"/>
              <circle cx="48" cy="21" r="0.8" fill="white" opacity="0.6"/>
            </g>

            {/* ── Starbursts — tiny cross flares at dot positions ── */}
            <g className="jg-dot1" opacity="0.6">
              <line x1="48" y1="1.5" x2="48" y2="6.5" stroke="#2dd4bf" strokeWidth="0.7" strokeLinecap="round"/>
              <line x1="45.5" y1="4" x2="50.5" y2="4" stroke="#2dd4bf" strokeWidth="0.7" strokeLinecap="round"/>
            </g>
          </svg>

          {/* ── Inner glow disc behind image ── */}
          <div className="jg-inner-glow"/>

          {/* ── Logo image ── */}
          <img src={logoImg} alt="JG" className="jg-logo-img"/>

          {/* ── Particle sparks — CSS-only ── */}
          <div className="jg-spark jg-spark-1"/>
          <div className="jg-spark jg-spark-2"/>
          <div className="jg-spark jg-spark-3"/>
          <div className="jg-spark jg-spark-4"/>
        </div>

        <span className="jg-tooltip">← PERSONAS</span>
      </button>
    </>
  )
}

const JG_CSS = `
.jg-logo-btn {
  position: fixed;
  top: 1rem;
  left: 1.1rem;
  z-index: 200;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0;
}

/* ── HALO CONTAINER ── */
.jg-halo-wrap {
  position: relative;
  width: 54px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ── SVG RINGS ── */
.jg-rings-svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
}

/* Ring animations */
.jg-r1 { animation: jg-cw  9s linear infinite; transform-origin: 48px 48px; }
.jg-r2 { animation: jg-ccw 14s linear infinite; transform-origin: 48px 48px; }
.jg-r3 { animation: jg-cw  22s linear infinite; transform-origin: 48px 48px; }

@keyframes jg-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
@keyframes jg-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }

/* Orbit dots ride their rings */
.jg-dot1 { animation: jg-cw   9s linear infinite; transform-origin: 48px 48px; }
.jg-dot2 { animation: jg-ccw 14s linear infinite; transform-origin: 48px 48px; }
.jg-dot3 { animation: jg-cw  22s linear infinite; transform-origin: 48px 48px; }

/* ── INNER GLOW ── */
.jg-inner-glow {
  position: absolute;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(45,212,191,0.08) 50%, transparent 70%);
  animation: jg-pulse 3s ease-in-out infinite;
  pointer-events: none;
  z-index: 1;
}
@keyframes jg-pulse { 0%,100% { opacity: 0.5; transform: scale(1);    }
                       50%     { opacity: 1;   transform: scale(1.18); } }

/* ── LOGO IMAGE ── */
.jg-logo-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 5px rgba(16,185,129,0.45));
  transition: filter 0.3s, transform 0.3s;
}
.jg-logo-btn:hover .jg-logo-img {
  filter: drop-shadow(0 0 12px rgba(16,185,129,0.85)) brightness(1.1);
  transform: scale(1.1);
}

/* ── PARTICLE SPARKS ── */
.jg-spark {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 3;
}
.jg-spark-1 {
  background: #10b981;
  box-shadow: 0 0 6px #10b981;
  animation: jg-spark1 4s ease-in-out infinite;
}
.jg-spark-2 {
  background: #2dd4bf;
  box-shadow: 0 0 6px #2dd4bf;
  animation: jg-spark2 5.5s ease-in-out infinite 0.8s;
}
.jg-spark-3 {
  background: #f59e0b;
  box-shadow: 0 0 5px #f59e0b;
  width: 2px; height: 2px;
  animation: jg-spark3 3.5s ease-in-out infinite 1.4s;
}
.jg-spark-4 {
  background: #34d399;
  box-shadow: 0 0 5px #34d399;
  width: 2px; height: 2px;
  animation: jg-spark4 6s ease-in-out infinite 2.2s;
}

@keyframes jg-spark1 {
  0%   { opacity:0; transform: translate(0px, 0px) scale(0); }
  20%  { opacity:1; transform: translate(-14px,-18px) scale(1); }
  60%  { opacity:0.6; transform: translate(-22px,-28px) scale(0.7); }
  100% { opacity:0; transform: translate(-26px,-36px) scale(0); }
}
@keyframes jg-spark2 {
  0%   { opacity:0; transform: translate(0px, 0px) scale(0); }
  25%  { opacity:1; transform: translate(16px,-14px) scale(1); }
  70%  { opacity:0.5; transform: translate(24px,-24px) scale(0.6); }
  100% { opacity:0; transform: translate(28px,-32px) scale(0); }
}
@keyframes jg-spark3 {
  0%   { opacity:0; transform: translate(0px, 0px) scale(0); }
  30%  { opacity:1; transform: translate(18px,10px) scale(1); }
  100% { opacity:0; transform: translate(24px,20px) scale(0); }
}
@keyframes jg-spark4 {
  0%   { opacity:0; transform: translate(0px, 0px) scale(0); }
  30%  { opacity:1; transform: translate(-12px,16px) scale(1); }
  100% { opacity:0; transform: translate(-18px,26px) scale(0); }
}

/* ── HOVER: speed up rings ── */
.jg-logo-btn:hover .jg-r1,
.jg-logo-btn:hover .jg-dot1 { animation-duration: 4s; }
.jg-logo-btn:hover .jg-r2,
.jg-logo-btn:hover .jg-dot2 { animation-duration: 6s; }
.jg-logo-btn:hover .jg-r3,
.jg-logo-btn:hover .jg-dot3 { animation-duration: 10s; }

/* ── TOOLTIP ── */
.jg-tooltip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  color: rgba(16,185,129,0.85);
  background: rgba(4,8,13,0.9);
  border: 1px solid rgba(16,185,129,0.22);
  border-radius: 3px;
  padding: 3px 9px;
  margin-left: 8px;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.22s, transform 0.22s;
  pointer-events: none;
  white-space: nowrap;
}
.jg-logo-btn:hover .jg-tooltip {
  opacity: 1;
  transform: translateX(0);
}

@media (max-width: 480px) {
  .jg-logo-btn { top: 0.6rem; left: 0.6rem; }
  .jg-halo-wrap { width: 44px; height: 44px; }
  .jg-logo-img { width: 24px; height: 24px; }
}
`
