export const ProjectsVectors = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="vec-svg vec-thin vec-glow absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none" fill="none">
        <defs>
          <linearGradient id="projGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2"/>
          </linearGradient>
        </defs>
        <g className="vec-anim anim-pan">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} className={i % 2 ? 'vec-dense' : ''} x1={i * 80} y1="0" x2={i * 80 + 400} y2="800" stroke="url(#projGrad)" strokeWidth="1" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} className={i % 2 ? 'vec-dense' : ''} x1="0" y1={i * 80} x2="1200" y2={i * 80} stroke="url(#projGrad)" strokeWidth="0.8" />
          ))}
        </g>
      </svg>
    </div>
  );
};
