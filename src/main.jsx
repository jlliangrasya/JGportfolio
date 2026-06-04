import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.jsx'

// Framer Motion sets element.className directly, but SVGElement.className is a
// read-only SVGAnimatedString. Redirect the setter to setAttribute so it works.
;(function patchSVGClassName() {
  if (typeof SVGElement === 'undefined') return
  const desc = Object.getOwnPropertyDescriptor(SVGElement.prototype, 'className')
  if (!desc || desc.set) return
  Object.defineProperty(SVGElement.prototype, 'className', {
    ...desc,
    set(val) {
      this.setAttribute('class', typeof val === 'string' ? val : (val?.baseVal ?? ''))
    },
  })
})()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
