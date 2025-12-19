"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        title: "E-Commerce SaaS Core",
        subtitle: "Orchestrating high-load transactions",
        description: "A headless commerce engine built with Next.js and Microservices.",
        tags: ["Next.js", "GraphQL", "AWS"],
        color: "from-blue-600 to-blue-900",
        id: "01"
    },
    {
        title: "Immersive AR Viewer",
        subtitle: "Web-based AR for Retail",
        description: "Bringing products to life directly in the browser using WebXR.",
        tags: ["Three.js", "WebXR", "React"],
        color: "from-purple-600 to-pink-900",
        id: "02"
    },
    {
        title: "Financial Dashboard",
        subtitle: "Real-time Analytics",
        description: "Complex data visualization for fintech high-frequency trading.",
        tags: ["D3.js", "WebSockets", "Redis"],
        color: "from-emerald-600 to-teal-900",
        id: "03"
    }
];

export default function Projects() {
    return (
        <section id="works" className="container mx-auto max-w-7xl px-4 py-32">
            <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                <div>
                    <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">Selected Works</h2>
                    <p className="mt-4 text-muted-foreground">Engineering that speaks.</p>
                </div>
                <span className="hidden text-xl font-mono text-muted-foreground md:block">(03)</span>
            </div>

            <div className="flex flex-col gap-12">
                {PROJECTS.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const image = imageRef.current;

        if (!card || !image) return;

        // Parallax Effect for Image
        // As the card moves up the viewport, the image moves slightly down (creating depth)
        gsap.fromTo(image,
            { y: "-10%" },
            {
                y: "10%",
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );
    }, []);

    return (
        <div ref={cardRef} className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/50">
            {/* 16/9 Aspect Ratio Container */}
            <div className="relative aspect-video w-full overflow-hidden">
                {/* Parallax Image Placeholder */}
                <div ref={imageRef} className={`absolute inset-0 h-[120%] w-full bg-gradient-to-br ${project.color} opacity-80 transition-opacity duration-500 group-hover:opacity-100`}>
                    {/* Noise Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 brightness-150 mix-blend-overlay" />
                </div>

                {/* Overlay Content (Hidden by default, reveals on hover) - OR always visible for better UX? 
                    Let's make it a bottom strip that expands on hover 
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="mb-2 block font-mono text-xs text-blue-400 border border-blue-400/20 w-fit px-2 py-1 rounded-full">{project.id}</span>
                            <h3 className="text-3xl font-bold text-white sm:text-4xl">{project.title}</h3>
                            <p className="mt-2 text-lg text-neutral-300">{project.subtitle}</p>
                        </div>

                        {/* Arrow Action */}
                        <div className="h-12 w-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tech Stack Strip (Outside image or appearing?) Let's put it on hover inside or just below */}
            <div className="flex flex-wrap gap-2 px-8 py-4 border-t border-white/5 bg-black/40">
                {project.tags.map(tag => (
                    <span key={tag} className="text-xs font-mono uppercase text-neutral-400">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}
