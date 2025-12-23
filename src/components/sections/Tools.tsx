"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from "@/components/ui/Icons";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
    { name: "Next.js", icon: Icons.nextjs },
    { name: "React", icon: Icons.react },
    { name: "TypeScript", icon: Icons.typescript },
    { name: "Tailwind", icon: Icons.tailwind },
    { name: "GSAP", icon: Icons.gsap },
    { name: "Node.js", icon: Icons.nodejs },
    { name: "Docker", icon: Icons.docker },
    { name: "Figma", icon: Icons.figma },
    { name: "Unity", icon: Icons.unity },
    { name: "Three.js", icon: Icons.threejs },
];

export default function Tools() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray(".tool-card");

            gsap.from(items, {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom-=100", // Start when top of grid hits bottom of viewport
                    end: "center center",
                    toggleActions: "play none none reverse",
                },
                x: (i) => (Math.random() - 0.5) * window.innerWidth * 1.5, // Scatter widely
                y: (i) => (Math.random() - 0.5) * window.innerHeight * 1.5,
                rotation: () => Math.random() * 360,
                scale: 0.5,
                opacity: 0,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.05,
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="relative w-full py-32 flex flex-col items-center overflow-hidden">

            <div className="mb-16 text-center z-10">
                <h2 className="text-4xl font-bold uppercase tracking-widest text-white/50 mix-blend-overlay">
                    The Arsenal
                </h2>
                <p className="mt-4 text-neutral-500 font-mono text-sm uppercase tracking-wide">
                    Technologies & Frameworks
                </p>
            </div>

            <div ref={containerRef} className="relative w-full max-w-5xl px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {TOOLS.map((tool) => (
                        <div key={tool.name} className="tool-card relative group">
                            <MagneticButton>
                                <div className="aspect-square flex flex-col items-center justify-center gap-4 rounded-xl border border-white/5 bg-neutral-900/50 backdrop-blur-md p-6 transition-colors hover:bg-neutral-800/80 hover:border-white/20">
                                    <div className="relative h-12 w-12 text-neutral-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                                        <tool.icon className="h-full w-full" />
                                    </div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-neutral-500 transition-colors group-hover:text-neutral-300">
                                        {tool.name}
                                    </span>
                                </div>
                            </MagneticButton>
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
}

