"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from "@/components/ui/Icons";
import MagneticButton from "@/components/ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
    { name: "Next.js", icon: Icons.nextjs, color: "hover:bg-black hover:text-white" },
    { name: "React", icon: Icons.react, color: "hover:bg-[#61DAFB]/20 hover:text-[#61DAFB]" },
    { name: "TypeScript", icon: Icons.typescript, color: "hover:bg-[#3178C6]/20 hover:text-[#3178C6]" },
    { name: "Figma", icon: Icons.figma, color: "hover:bg-[#F24E1E]/20 hover:text-[#F24E1E]" },
    { name: "Tailwind", icon: Icons.tailwind, color: "hover:bg-[#38B2AC]/20 hover:text-[#38B2AC]" },
    { name: "GSAP", icon: Icons.gsap, color: "hover:bg-[#88CE02]/20 hover:text-[#88CE02]" },
    { name: "Three.js", icon: Icons.threejs, color: "hover:bg-white hover:text-black" },
    { name: "Unity", icon: Icons.unity, color: "hover:bg-neutral-800 hover:text-white" },
];

export default function Tools() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".tool-card");

            // Initial set: Scattered all over the screen (relative to container)
            // We want them to feel like they are floating in chaos
            cards.forEach((card, i) => {
                gsap.set(card, {
                    x: gsap.utils.random(-800, 800),
                    y: gsap.utils.random(-800, 800),
                    rotation: gsap.utils.random(-45, 45),
                    scale: gsap.utils.random(0.8, 1.2),
                    opacity: 0,
                });
            });

            // The Animation: Snap into a neat grid/stack
            // We use scrub to control the "Assembly"
            gsap.to(cards, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1.5,
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-[100vh] flex flex-col items-center justify-center py-24 overflow-hidden">
            {/* Scrolling text background maybe? kept clean for now */}

            <div className="absolute top-10 text-center z-10 w-full">
                <h2 className="text-4xl font-bold uppercase tracking-widest text-white/50 mix-blend-overlay">The Tools</h2>
            </div>

            <div ref={containerRef} className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl">
                {TOOLS.map((tool) => (
                    <div key={tool.name} className="tool-card relative">
                        <MagneticButton>
                            <div
                                className={`flex flex-col items-center justify-center gap-4 rounded-3xl border border-white/10 bg-neutral-900/80 p-12 backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:z-50 hover:border-white/30 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.2)] ${tool.color}`}
                            >
                                <div className="h-16 w-16 transition-transform hover:rotate-12">
                                    <tool.icon className="h-full w-full" />
                                </div>
                                <span className="text-lg font-bold tracking-widest">{tool.name}</span>
                            </div>
                        </MagneticButton>
                    </div>
                ))}
            </div>
        </section>
    );
}
