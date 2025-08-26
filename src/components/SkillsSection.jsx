import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SkillsVectors } from "@/components/vectors/SkillsVectors";

// Central skills model (with Devicon class names)
const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend", icon: "devicon-html5-plain colored" },
  { name: "React", level: 90, category: "frontend", icon: "devicon-react-original colored" },
  { name: "Next.js", level: 80, category: "frontend", icon: "devicon-nextjs-original" },

  // Backend
  { name: "Spring Boot", level: 70, category: "backend", icon: "devicon-spring-plain colored" },
  { name: "Node.js", level: 80, category: "backend", icon: "devicon-nodejs-plain colored" },
  { name: "Express", level: 75, category: "backend", icon: "devicon-express-original" },
  { name: "AWS", level: 75, category: "backend", icon: "devicon-amazonwebservices-plain colored" },

  // Tools
  { name: "Git", level: 90, category: "tools", icon: "devicon-git-plain colored" },
  { name: "Docker", level: 70, category: "tools", icon: "devicon-docker-plain colored" },
];

const categories = ["all", "frontend", "backend", "tools"];

// Category color accents

const getCategoryColor = (category) => {
  switch (category) {
    case "frontend":
      return "#8b5cf6"; // violet
    case "backend":
      return "#06b6d4"; // cyan
    case "tools":
      return "#f59e0b"; // amber
    default:
      return "#6b7280"; // gray fallback
  }
};

const ProgressBar = ({ value, color, showLabel = true }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const duration = 700; // slightly quicker fill
    const animate = (t) => {
      const eased = Math.min(1, (t - start) / duration);
      const val = Math.round(value * (0.5 - Math.cos(Math.PI * eased) / 2));
      setProgress(val);
      if (eased < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return (
    <div className="w-full flex items-center gap-3">
      <div className="flex-1 bg-secondary/50 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-1.5 rounded-full origin-left transition-[width] duration-300 ease-out"
          style={{ width: progress + "%", backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium tabular-nums text-foreground/80 min-w-[2.5rem] text-right">
          {progress}%
        </span>
      )}
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("backend");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30" data-reveal data-reveal-type="fade-up">
      <SkillsVectors />
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" data-reveal data-reveal-type="fade-up">
          My <span className="text-primary">Skills</span>
        </h2>
        <p className="text-center text-foreground/70 max-w-2xl mx-auto mb-12" data-reveal data-reveal-type="fade-up" data-reveal-delay=".08s">
          A snapshot of my core tools and technologies with proficiency levels.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10" data-reveal data-reveal-type="fade-up" data-reveal-delay=".12s">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, i) => {
            const color = getCategoryColor(skill.category);
            return (
              <div
                key={skill.name}
                className="group relative bg-card p-5 rounded-xl shadow-xs card-hover animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s` }}
                data-reveal
                data-reveal-type="fade-up"
                data-reveal-delay={`${0.04 * i}s`}
              >
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className="absolute -left-1/3 top-0 h-full w-1/2 bg-white/5 transform -skew-x-12 transition-transform duration-900 group-hover:translate-x-[200%]" />
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className="size-12 shrink-0 rounded-full grid place-items-center border-2"
                    style={{ borderColor: color, color }}
                  >
                    <i className={cn(skill.icon, "text-2xl animate-float transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2")} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg truncate">{skill.name}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full capitalize" style={{ backgroundColor: color + '22', color }}>
                        {skill.category}
                      </span>
                    </div>
                    <div className="mt-3">
                      <ProgressBar value={skill.level} color={color} showLabel />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
