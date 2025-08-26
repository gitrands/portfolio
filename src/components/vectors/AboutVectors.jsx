export const AboutVectors = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg
        className="vec-svg vec-thin vec-glow absolute left-1/2 -translate-x-1/2 top-[-6%] w-[110vw] max-w-none md:left-auto md:translate-x-0 md:right-[-10%] md:top-[-10%] md:w-[60vw] md:max-w-[820px]"
        viewBox="0 0 800 600" fill="none"
      >
        <defs>
          <linearGradient id="aboutGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.35"/>
          </linearGradient>
        </defs>
        <g className="vec-anim anim-pan">
          <polyline points="0,400 150,320 320,360 520,280 800,340" stroke="url(#aboutGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 10" />
          <g className="vec-dense">
            <polyline points="0,460 160,380 340,420 540,340 800,400" stroke="url(#aboutGrad)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 12" />
            <polyline points="0,520 170,440 360,480 560,400 800,460" stroke="url(#aboutGrad)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 14" />
          </g>
        </g>
      </svg>
    </div>
  );
};
