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

// Mark app ready on next frame for page fade-in
try {
  requestAnimationFrame(() => document.body.classList.add('app-ready'));
} catch {}

// Apply Fog Teal for light mode and Dark for dark mode, based on system
try {
  const b = document.body;
  const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    try {
      if (mq && mq.matches) {
        b.setAttribute('data-theme', 'dark');
        b.removeAttribute('data-light');
      } else {
        b.setAttribute('data-theme', 'light');
        b.setAttribute('data-light', 'fog');
      }
    } catch {}
  };
  apply();
  if (mq) {
    if (mq.addEventListener) mq.addEventListener('change', apply);
    else if (mq.addListener) mq.addListener(apply); // Safari fallback
  }
} catch {}

// IntersectionObserver for [data-reveal] (init after first paint)
function initReveal() {
  try {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const el = e.target;
              const d = el.getAttribute('data-reveal-delay');
              if (d) el.style.transitionDelay = d;
              el.classList.add('is-visible');
              io.unobserve(el);
            }
          }
        },
        { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
      );
      els.forEach((el) => io.observe(el));
    } else {
      els.forEach((el) => el.classList.add('is-visible'));
    }
  } catch {}
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Defer reveal init until after React paints content
try {
  requestAnimationFrame(() => requestAnimationFrame(initReveal));
} catch {}
