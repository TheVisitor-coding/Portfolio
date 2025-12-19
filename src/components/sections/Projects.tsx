"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "../ui/BentoCard";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        title: "E-Commerce SaaS Core",
        subtitle: "Orchestrating high-load transactions",
        description: "A headless commerce engine built with Next.js and Microservices.",
        tags: ["Next.js", "GraphQL", "AWS"],
        color: "from-blue-500/20 to-cyan-500/20",
        id: "01"
    },
    {
        title: "Immersive AR Viewer",
        subtitle: "Web-based AR for Retail",
        description: "Bringing products to life directly in the browser using WebXR.",
        tags: ["Three.js", "WebXR", "React"],
        color: "from-purple-500/20 to-pink-500/20",
        id: "02"
    },
    {
        title: "Financial Dashboard",
        subtitle: "Real-time Analytics",
        description: "Complex data visualization for fintech high-frequency trading.",
        tags: ["D3.js", "WebSockets", "Redis"],
        color: "from-emerald-500/20 to-teal-500/20",
        id: "03"
    }
];

export default function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);

    return (
        <section ref={sectionRef} className="container mx-auto max-w-7xl px-4 py-32">
            <div className="mb-16">
                <h2 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">Selected Works</h2>
                <p className="mt-4 text-muted-foreground">Where concept meets execution.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PROJECTS.map((project, i) => (
                    <div key={project.title} className="group relative min-h-[400px] overflow-hidden rounded-2xl border border-white/5 bg-neutral-900/20 p-8 transition-all hover:border-white/10 hover:bg-neutral-900/40">
                        {/* Hover Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />

                        {/* Content */}
                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <div>
                                <div className="flex items-start justify-between">
                                    <span className="font-mono text-4xl font-bold text-white/5 group-hover:text-white/20 transition-colors duration-500">{project.id}</span>
                                    {/* Arrow Icon */}
                                    <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white"><path d="M1 11L11 1M11 1H1M11 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </div>

                                <div className="mt-12 space-y-2">
                                    <h3 className="text-2xl font-bold text-white leading-tight">{project.title}</h3>
                                    <p className="text-sm font-medium text-blue-400">{project.subtitle}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <p className="leading-relaxed text-neutral-400 text-sm">{project.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-neutral-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
