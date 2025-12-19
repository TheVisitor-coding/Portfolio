"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from "@/components/ui/Icons";
import MagneticButton from "@/components/ui/MagneticButton";

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
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Impact animation
            gsap.fromTo(".tool-magnetic",
                { scale: 0, opacity: 0, y: 100 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: {
                        amount: 0.5,
                        grid: [2, 5],
                        from: "center"
                    },
                    ease: "back.out(1.5)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-[50vh] flex flex-col items-center justify-center py-32 overflow-hidden">
            <div className="mb-16 text-center z-10">
                <h2 className="text-5xl font-bold tracking-tighter text-foreground sm:text-7xl">The Arsenal</h2>
                {/* <p className="mt-4 text-xl text-muted-foreground">Precision instruments for digital chaos.</p> */}
            </div>

            <div className="relative flex w-full max-w-5xl flex-wrap items-center justify-center gap-6 px-4">
                {TOOLS.map((tool, i) => (
                    <div key={tool.name} className="tool-magnetic group">
                        <MagneticButton>
                            <div className="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]">
                                <div className="h-8 w-8 text-neutral-400 group-hover:text-white transition-colors">
                                    <tool.icon className="h-full w-full" />
                                </div>
                                <span className="text-[10px] uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors">{tool.name}</span>
                            </div>
                        </MagneticButton>
                    </div>
                ))}
            </div>
        </section>
    );
}
