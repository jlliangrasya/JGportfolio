export default function SwitchButton({ onSwitch, label = '[ SWITCH PERSONA ]', position = 'bottom-right' }) {
  return (
    <button className={`switch-persona-btn switch-${position}`} onClick={onSwitch}>
      {label}
    </button>
  )
}
