export const SkillsVectors = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="vec-svg vec-thin vec-glow absolute left-1/2 -translate-x-1/2 top-[-6%] w-[110vw] max-w-none md:top-[-20%] md:w-[80vw] md:max-w-[900px]" viewBox="0 0 800 800" fill="none">
        <defs>
          <radialGradient id="skillsGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.2"/>
          </radialGradient>
        </defs>
        <g className="vec-anim anim-rotate" style={{ transformOrigin: '400px 400px' }}>
          <circle cx="400" cy="400" r="240" stroke="url(#skillsGrad)" strokeWidth="1.2" strokeDasharray="5 12" />
          <circle cx="400" cy="400" r="160" stroke="url(#skillsGrad)" strokeWidth="1.2" strokeDasharray="4 8" />
          <g className="vec-dense">
            <circle cx="400" cy="400" r="320" stroke="url(#skillsGrad)" strokeWidth="1.2" strokeDasharray="6 10" />
            <circle cx="400" cy="400" r="80" stroke="url(#skillsGrad)" strokeWidth="1.2" strokeDasharray="3 6" />
          </g>
        </g>
      </svg>
    </div>
  );
};
