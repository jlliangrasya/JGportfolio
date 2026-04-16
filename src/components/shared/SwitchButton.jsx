export default function SwitchButton({ onSwitch, label = '[ SWITCH PERSONA ]' }) {
  return (
    <button className="switch-persona-btn" onClick={onSwitch}>
      {label}
    </button>
  )
}
