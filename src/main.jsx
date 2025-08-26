import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Apply default theme early to avoid flash; default to dark
try {
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === null) {
    document.documentElement.classList.add('dark');
    if (stored === null) localStorage.setItem('theme', 'dark');
  }
} catch {}

// Set --vh custom property to account for mobile dynamic viewport
function setViewportUnit() {
  try {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  } catch {}
}
setViewportUnit();
window.addEventListener('resize', setViewportUnit, { passive: true });
window.addEventListener('orientationchange', setViewportUnit);
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    document.body.classList.remove('vec-paused');
    setViewportUnit();
  } else {
    document.body.classList.add('vec-paused');
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
