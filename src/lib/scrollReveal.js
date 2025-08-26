// Lightweight IntersectionObserver-based scroll reveal utility
// Adds `is-visible` when elements enter viewport for smooth, luxurious transitions.

const DEFAULT_OPTIONS = {
  root: null,
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.12,
  once: true,
};

function applyInitialStyles(el) {
  // If the element already opted out, skip
  if (el.dataset.reveal === "off") return;

  // Ensure it has the attribute so CSS hooks apply
  if (!el.hasAttribute("data-reveal")) el.setAttribute("data-reveal", "");

  // Transition timing via CSS variables to allow responsive overrides
  const delay = el.dataset.revealDelay || "0s";
  const duration = el.dataset.revealDuration || "900ms";
  const easing = el.dataset.revealEasing || "cubic-bezier(0.22, 1, 0.36, 1)"; // luxe ease-out

  el.style.setProperty("--sr-delay", String(delay));
  el.style.setProperty("--sr-duration", String(duration));
  el.style.setProperty("--sr-ease", String(easing));
}

export function initScrollReveal(userOptions = {}) {
  if (typeof window === "undefined") return () => {};

  const options = { ...DEFAULT_OPTIONS, ...userOptions };

  // Collect targets: explicit markers + common content inside sections
  const explicit = Array.from(document.querySelectorAll("[data-reveal]"));
  const commonSelectors = [
    "section h1",
    "section h2",
    "section h3",
    "section p",
    "section li",
    "section img",
    "section a",
    "section button",
    "section input",
    "section textarea",
    'section [class*="card"]',
    'section [class*="gradient-border"]',
    'section [class*="cosmic-button"]',
  ];
  const common = Array.from(
    document.querySelectorAll(commonSelectors.join(","))
  );

  // De-duplicate while preserving order (explicit first)
  const seen = new Set();
  const targets = [...explicit, ...common].filter((el) => {
    if (!el || seen.has(el)) return false;
    seen.add(el);
    return true;
  });

  if (targets.length === 0) return () => {};

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    targets.forEach((el) => {
      applyInitialStyles(el);
      el.classList.add('is-visible');
    });
    return () => {};
  }

  // Apply base styles before observing
  targets.forEach(applyInitialStyles);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        if (options.once || el.dataset.revealOnce === "true") {
          observer.unobserve(el);
        }
      } else if (!options.once && el.dataset.revealOnce !== "true") {
        el.classList.remove("is-visible");
      }
    });
  }, options);

  targets.forEach((el) => {
    // Avoid flicker for above-the-fold content
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const withinView = rect.top <= vh * 0.9 && rect.bottom >= vh * 0.1;
    if (withinView) {
      el.classList.add("is-visible");
      if (options.once || el.dataset.revealOnce === "true") return; // don't observe if once
    }
    observer.observe(el);
  });

  // Return a cleanup function
  return () => observer.disconnect();
}
