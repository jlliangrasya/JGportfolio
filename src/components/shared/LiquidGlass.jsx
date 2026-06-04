/*
  LiquidGlass — reusable container component.

  Props:
    className   — extra classes
    style       — extra inline styles
    as          — rendered element (default 'div')
    tint        — accent color for the rim light, e.g. '#10b981'
    intensity   — 'subtle' | 'medium' | 'strong'  (default 'medium')
    rounded     — border-radius token (default '12px')
    children
*/
export default function LiquidGlass({
  children,
  className = '',
  style = {},
  as: Tag = 'div',
  tint = '#10b981',
  intensity = 'medium',
  rounded = '12px',
  ...rest
}) {
  const blur   = { subtle: '8px',  medium: '16px', strong: '28px' }[intensity]
  const bgAlpha= { subtle: '0.04', medium: '0.07', strong: '0.11' }[intensity]
  const rimAlpha={ subtle: '0.12', medium: '0.2',  strong: '0.32' }[intensity]
  const noiseAlpha={ subtle:'0.018',medium:'0.03', strong:'0.05'  }[intensity]

  // Convert hex tint to rgb for rgba usage
  const h2r = hex => {
    const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255'
  }
  const rgb = h2r(tint)

  const glassStyle = {
    position: 'relative',
    borderRadius: rounded,
    background: `rgba(${rgb}, ${bgAlpha})`,
    backdropFilter: `blur(${blur}) saturate(1.6)`,
    WebkitBackdropFilter: `blur(${blur}) saturate(1.6)`,
    border: `1px solid rgba(${rgb}, ${rimAlpha})`,
    boxShadow: [
      `inset 0 1px 0 rgba(255,255,255,0.08)`,
      `inset 0 -1px 0 rgba(${rgb},0.06)`,
      `0 4px 24px rgba(0,0,0,0.28)`,
      `0 1px 0 rgba(${rgb},0.1)`,
    ].join(', '),
    overflow: 'hidden',
    ...style,
  }

  return (
    <Tag className={`lg-wrap ${className}`} style={glassStyle} {...rest}>
      {/* Noise texture overlay for tactile feel */}
      <span aria-hidden="true" style={{
        position:'absolute', inset:0, borderRadius:'inherit', pointerEvents:'none',
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        opacity: noiseAlpha, mixBlendMode:'overlay', zIndex:0,
      }}/>
      {/* Top rim highlight — catches the "light from above" */}
      <span aria-hidden="true" style={{
        position:'absolute', top:0, left:'10%', right:'10%', height:'1px',
        background:`linear-gradient(90deg, transparent, rgba(255,255,255,0.18), rgba(${rgb},0.25), rgba(255,255,255,0.18), transparent)`,
        pointerEvents:'none', zIndex:1,
      }}/>
      {/* Left rim — secondary light catch */}
      <span aria-hidden="true" style={{
        position:'absolute', top:'5%', bottom:'5%', left:0, width:'1px',
        background:`linear-gradient(180deg, transparent, rgba(255,255,255,0.07), transparent)`,
        pointerEvents:'none', zIndex:1,
      }}/>
      {/* Content sits above the decorative layers */}
      <span style={{ position:'relative', zIndex:2, display:'contents' }}>
        {children}
      </span>
    </Tag>
  )
}
