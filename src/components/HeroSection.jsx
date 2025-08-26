import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-5xl mx-auto z-10">
        <div className="space-y-6 text-left sm:-ml-1 md:-ml-6 lg:-ml-10 xl:-ml-12">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold leading-[1.05] tracking-tight">
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
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl opacity-0 animate-slide-in-left"
            style={{ animationDelay: '1.6s' }}
          >
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          

          {/* Keep the button in the same centered position */}
          <div className="pt-8 w-full text-center opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
