import { cn } from "@/lib/utils";
import { Search, ExternalLink, Mail, Phone, Github, Linkedin, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Fix: use scrollY for scroll detection
      const y = window.scrollY || 0;
      setIsScrolled(y > 10);

      // Calculate scroll progress percentage
      const doc = document.documentElement;
      const scrollHeight = doc.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (y / scrollHeight) * 100 : 0;
      setScrollProgress(Math.max(0, Math.min(100, progress)));

      // Keep navbar fixed; no auto-hide
    };

    // Initial set and listener
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when command palette is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isCmdOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = original || "";
    }
    return () => {
      document.body.style.overflow = original;
    };
  }, [isCmdOpen]);

  // Observe sections to highlight active link while scrolling
  useEffect(() => {
    const ids = navItems.map((i) => i.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible section in viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-20% 0px -60% 0px",
      }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Command palette items
  const commands = [
    ...navItems.map((n) => ({
      id: n.href.replace("#", ""),
      label: n.name,
      type: "anchor",
      href: n.href,
    })),
    { id: "resume", label: "View Resume", type: "url", href: "https://drive.google.com/file/d/1qF7v04eyun_eYLjd1RQyebBJsmnRPalE/view?usp=sharing", Icon: FileText },
    { id: "github", label: "Open GitHub", type: "url", href: "https://github.com/gitrands", Icon: Github },
    { id: "linkedin", label: "Open LinkedIn", type: "url", href: "https://www.linkedin.com/in/jeeva-r-809ba01ba", Icon: Linkedin },
    { id: "email", label: "Send Email", type: "url", href: "mailto:jeevara2002@gmail.com", Icon: Mail },
    { id: "phone", label: "Call Phone", type: "url", href: "tel:+917373737003", Icon: Phone },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Keyboard shortcuts: Cmd/Ctrl+K to open, numbers 1-5 jump
  useEffect(() => {
    const isTyping = (el) =>
      el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);

    const onKey = (e) => {
      const target = e.target;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCmdOpen((v) => !v);
        setQuery("");
        setHighlightIndex(0);
        return;
      }
      // Skip shortcuts when typing
      if (isTyping(target)) return;

      // Numeric shortcuts for quick nav
      const i = parseInt(e.key, 10);
      if (!Number.isNaN(i) && i >= 1 && i <= navItems.length) {
        const item = navItems[i - 1];
        const id = item.href.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      // Close palette on Escape
      if (isCmdOpen && e.key === "Escape") {
        e.preventDefault();
        setIsCmdOpen(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCmdOpen]);

  const runCommand = (cmd) => {
    if (!cmd) return;
    if (cmd.type === "anchor") {
      const id = cmd.href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (cmd.type === "url" && cmd.href) {
      window.open(cmd.href, "_blank");
    }
    setIsCmdOpen(false);
  };
  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-xs border-b border-border/50"
          : "py-5"
      )}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute left-0 top-0 h-0.5 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 transition-[width] duration-200"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container flex items-center justify-between">
        <a
          className="text-xl font-bold text-primary flex items-center"
          href="#hero"
        >
          <span className="relative z-10">
            <span className="text-glow text-foreground"> My </span>{" "}
            Portfolio
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={item.href}
                className={cn(
                  "relative px-1 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                )}
              >
                <span className="relative">
                  {item.name}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-1 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 transition-transform duration-300",
                      isActive ? "scale-x-100" : "hover:scale-x-100"
                    )}
                  />
                </span>
              </a>
            );
          })}

          {/* Command palette trigger */}
          <button
            onClick={() => {
              setIsCmdOpen(true);
              setQuery("");
              setHighlightIndex(0);
            }}
            className="ml-2 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-foreground/80 hover:text-primary hover:bg-secondary/80 transition-colors"
            aria-label="Open Command Palette"
          >
            <Search size={16} />
            <span className="text-sm">Search</span>
            <span className="text-xs text-foreground/50 border border-border/60 rounded px-1.5 py-0.5 ml-1">⌘K</span>
          </button>
        </div>

        {/* mobile: show only search */}
        <div className={cn("md:hidden flex items-center gap-1", isCmdOpen && "invisible pointer-events-none")}> 
          <button
            onClick={() => {
              setIsCmdOpen(true);
              setQuery("");
              setHighlightIndex(0);
            }}
            className="h-10 w-10 flex items-center justify-center text-foreground"
            aria-label="Open Search"
          >
            <Search size={22} />
          </button>
        </div>
      </div>

      {/* Command Palette */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8",
          "transition-all duration-200",
          isCmdOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isCmdOpen}
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setIsCmdOpen(false)} />
        <div className="relative w-full max-w-xl bg-card rounded-lg shadow-lg border border-border/60 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/60">
            <Search size={18} className="text-foreground/60" />
            <input
              autoFocus
              type="text"
              placeholder="Search sections and actions..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHighlightIndex(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setHighlightIndex((i) => Math.min(i + 1, Math.max(0, filtered.length - 1)));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setHighlightIndex((i) => Math.max(i - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  runCommand(filtered[highlightIndex]);
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  setIsCmdOpen(false);
                }
              }}
              className="w-full bg-transparent outline-none text-sm py-1 placeholder:text-foreground/50"
            />
          </div>
          <div className="max-h-72 overflow-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-center text-foreground/60 text-sm">No results</div>
            ) : (
              filtered.map((cmd, idx) => {
                const isActive = idx === highlightIndex;
                const Icon = cmd.Icon ?? (cmd.type === "anchor" ? HashIcon : ExternalLink);
                return (
                  <button
                    key={cmd.id}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onClick={() => runCommand(cmd)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-colors",
                      isActive ? "bg-secondary/70" : "hover:bg-secondary/50"
                    )}
                  >
                    <Icon size={16} className="text-primary" />
                    <span>{cmd.label}</span>
                    {cmd.type === "url" && (
                      <ExternalLink size={14} className="ml-auto text-foreground/60" />
                    )}
                  </button>
                );
              })
            )}
          </div>
          <div className="px-4 py-2 text-[11px] text-foreground/50 border-t border-border/60 flex items-center justify-between">
            <span>Navigate with ↑ ↓, Enter to run, Esc to close</span>
            <span>Press 1–{navItems.length} to jump to sections</span>
          </div>
        </div>
      </div>

    </nav>
  );
};

// Simple hash icon fallback to avoid extra imports
const HashIcon = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="4" y1="9" x2="20" y2="9"></line>
    <line x1="4" y1="15" x2="20" y2="15"></line>
    <line x1="10" y1="3" x2="8" y2="21"></line>
    <line x1="16" y1="3" x2="14" y2="21"></line>
  </svg>
);
