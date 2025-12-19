"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        title: "E-Commerce SaaS Core",
        subtitle: "Orchestrating high-load transactions",
        description: "A headless commerce engine built with Next.js and Microservices.",
        tags: ["Next.js", "GraphQL", "AWS"],
        color: "from-blue-600 to-blue-900", // Stronger gradients
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
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="container mx-auto max-w-7xl px-4 py-32">
            <div className="mb-24 flex items-end justify-between border-b border-white/10 pb-8">
                <div>
                    <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">Selected Works</h2>
                    <p className="mt-4 text-muted-foreground">Engineering that speaks.</p>
                </div>
                <span className="hidden text-xl font-mono text-muted-foreground md:block">(03)</span>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project) => (
                    <div key={project.title} className="group relative min-h-[500px] flex flex-col justify-between overflow-hidden rounded-3xl bg-neutral-900/50 border border-white/5 transition-all duration-500 hover:border-white/20">

                        {/* Image Placeholder Area */}
                        <div className="relative h-[60%] w-full overflow-hidden p-2">
                            <div className={`h-full w-full rounded-2xl bg-gradient-to-br ${project.color} opacity-80 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100 relative`}>
                                {/* Abstract Pattern overlay */}
                                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-200" />
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-1 flex-col justify-between p-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="font-mono text-xs text-muted-foreground border border-white/10 px-2 py-1 rounded-full">{project.id}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white leading-tight mb-1">{project.title}</h3>
                                <p className="text-sm font-medium text-neutral-400">{project.subtitle}</p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-[10px] lowercase text-neutral-500">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
