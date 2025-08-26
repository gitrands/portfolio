export const ContactVectors = () => {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="vec-svg vec-thin vec-glow absolute left-1/2 -translate-x-1/2 bottom-0 w-[160%] max-w-none md:w-[140%]" viewBox="0 0 1400 240" fill="none">
        <defs>
          <linearGradient id="contactGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45"/>
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.45"/>
          </linearGradient>
        </defs>
        <g className="vec-anim anim-wave">
          {Array.from({ length: 4 }).map((_, i) => (
            <path key={i}
              className={i > 1 ? 'vec-dense' : ''}
              d={`M0 ${60 + i * 30} C 200 ${40 + i * 30}, 400 ${80 + i * 30}, 600 ${60 + i * 30} S 1000 ${60 + i * 30}, 1400 ${60 + i * 30}`}
              stroke="url(#contactGrad)" strokeWidth={i === 0 ? 1.8 : 1.2} fill="none" strokeLinecap="round"
              strokeDasharray={i % 2 === 0 ? '12 10' : '8 12'} />
          ))}
        </g>
      </svg>
    </div>
  );
};
