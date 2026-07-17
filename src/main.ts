import './style.css'
import { StrictMode, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const rootElement = document.getElementById('app')

if (!rootElement) {
  throw new Error('Root element #app was not found')
}

createRoot(rootElement).render(
  createElement(StrictMode, null, createElement(App))
)
