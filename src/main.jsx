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

// Theme management: default dark, allow manual overrides
try {
  const b = document.body;
  const root = document.documentElement;
  const THEME_KEY = 'themePreference';

  const applyTheme = (mode) => {
    const next = mode === 'light' ? 'light' : 'dark';
    try {
      if (next === 'light') {
        b.setAttribute('data-theme', 'light');
        b.removeAttribute('data-light');
        root.setAttribute('data-theme', 'light');
        root.removeAttribute('data-light');
      } else {
        b.setAttribute('data-theme', 'dark');
        b.removeAttribute('data-light');
        root.setAttribute('data-theme', 'dark');
        root.removeAttribute('data-light');
      }
      window.localStorage?.setItem?.(THEME_KEY, next);
      window.dispatchEvent(
        new CustomEvent('themechange', {
          detail: next,
        }),
      );
    } catch {}
  };

  const stored = window.localStorage?.getItem?.(THEME_KEY);
  applyTheme(stored === 'light' ? 'light' : 'dark');

  window.__setTheme = applyTheme;
  window.__toggleTheme = () => {
    const current = b.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  };
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
