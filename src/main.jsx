import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// One-time cleanup of old font toggle artifacts
try {
  const cls = ['font-theme--inter','font-theme--manrope','font-theme--dm','font-theme--system'];
  document?.body?.classList?.remove?.(...cls);
  window?.localStorage?.removeItem?.('fontTheme');
} catch {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
