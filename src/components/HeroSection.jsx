import { ArrowDown } from "lucide-react";
import NeonGridBackground from "@/components/NeonGridBackground";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-hero overflow-hidden flex flex-col items-center justify-center px-4"
      data-reveal
      data-reveal-type="scale"
    >
      {/* Neon 3D wireframe grid background */}
      <NeonGridBackground />
      <div className="container max-w-5xl mx-auto z-10">
        <div className="space-y-6 text-left sm:-ml-1 md:-ml-6 lg:-ml-10 xl:-ml-12" data-reveal data-reveal-type="fade-up">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1.05] tracking-tight text-white" data-reveal data-reveal-type="fade-up" data-reveal-delay=".05s">
            <span className="typewriter-15 pr-2">
              Hi, I'm Jeeva
            </span>
            <span
              className="opacity-0 animate-slide-in-left text-primary inline-block text-balance text-wrap break-keep text-glow glow-pulse"
              style={{ animationDelay: '1.25s' }}
            >
              {''}
              
            </span>
            <span
              className="ml-2 opacity-0 animate-slide-in-left gradient-text-animate inline-block"
              style={{ animationDelay: '1.4s' }}
            >
              R . A .
            </span>
          </h1>

          <p
            className="text-xl md:text-2xl text-muted-foreground text-zinc-300 max-w-2xl opacity-0 animate-slide-in-left"
            style={{ animationDelay: '1.6s' }}
            data-reveal
            data-reveal-type="fade-up"
            data-reveal-delay=".15s"
          >
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          

          {/* Keep the button in the same centered position */}
          <div className="pt-8 w-full text-center opacity-0 animate-fade-in-delay-4" data-reveal data-reveal-type="fade-up" data-reveal-delay=".25s">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      {/* dark vignette to match screenshot depth */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-zinc-400 mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
