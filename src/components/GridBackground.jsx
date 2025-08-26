import { useMemo } from "react";

export const GridBackground = () => {
  // compute grid color from CSS variables at runtime (fallback provided)
  const gridColor = useMemo(() => "hsl(var(--border))", []);
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Base animated grid using CSS gradients */}
      <div
        className="absolute inset-0 opacity-50 animate-grid-pan"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 40px 40px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {/* Subtle radial vignette to keep center focused */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 40%, transparent 0%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Accent cells that drift slowly */}
      <div className="absolute inset-0">
        {[
          { left: "12%", top: "20%", size: 48, delay: "0s" },
          { left: "78%", top: "28%", size: 36, delay: "0.3s" },
          { left: "22%", top: "70%", size: 40, delay: "0.6s" },
          { left: "62%", top: "68%", size: 52, delay: "0.9s" },
        ].map((c, i) => (
          <div
            key={i}
            className="absolute rounded-md animate-drift-slow"
            style={{
              left: c.left,
              top: c.top,
              width: c.size,
              height: c.size,
              animationDelay: c.delay,
              boxShadow:
                "0 0 0 1px hsl(var(--border)), 0 0 24px rgba(139,92,246,0.18)",
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.10), rgba(16,185,129,0.10))",
            }}
          />
        ))}
      </div>
    </div>
  );
};

