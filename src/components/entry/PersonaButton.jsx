import './PersonaButton.css'

export default function PersonaButton({ role, tagline, onClick }) {
  return (
    <button className="p-btn" onClick={onClick}>
      <span className="p-btn-role">{role}</span>
      <span className="p-btn-label">{tagline}</span>
    </button>
  )
}
