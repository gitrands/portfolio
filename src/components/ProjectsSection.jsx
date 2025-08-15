import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "X-clone",
    description: "A beautiful Fullstack social media app developed in React and Tailwind.",
    image: "/projects/project1.png",
    tags: ["React", "TailwindCSS", "Node.js"],
    demoUrl: "https://x-clone-orsj.onrender.com",
    githubUrl: "https://github.com/gitrands/X-clone",
  },
  {
    id: 2,
    title: "Fino Organizer",
    description:
      "An Emmersive Management website with stunning features at one place .",
    image: "/projects/thum-org.png",
    tags: ["JavaScript", "Node.js", "Next.js"],
    demoUrl: "https://main.dfuccach7gbg5.amplifyapp.com/projects/5",
    githubUrl: "https://github.com/gitrands/Project-manager",
  },
  {
    id: 3,
    title: "Fino Learn",
    description:
      "A feature rich and innovative place to Learn new Tech",
    image: "/projects/fino-learn.png",
    tags: ["Next.js", "Node.js", "Stripe"],
    demoUrl: "https://finolearn.vercel.app/",
    githubUrl: "https://github.com/gitrands/FinoLearn",
  },
  {
    id: 4,
    title: "Fino Saloon",
    description:
      "An Advanced Online Booking Service working on Spring boot Microservices to Service Millions",
    image: "/projects/hair-saloon.png",
    tags: ["Next.js", "Node.js", "Spring-boot"],
    demoUrl: "#",
    githubUrl: "https://github.com/gitrands/online-hair-dressing",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <div
              key={key}
              className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/gitrands"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
