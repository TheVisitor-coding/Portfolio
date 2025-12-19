"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

const TECH_STACK = ["React", "Next.js", "TypeScript", "Tailwind", "GSAP", "Three.js", "Node.js", "Docker"];

export default function StackCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".tech-badge").forEach((badge, i) => {
                gsap.to(badge, {
                    y: "random(-10, 10)",
                    x: "random(-10, 10)",
                    rotation: "random(-5, 5)",
                    duration: "random(2, 4)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.2
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={1}
            rowSpan={1}
            title="Tech Stack"
            subtitle="Modern tools for modern problems"
        >
            <div ref={containerRef} className="flex h-full flex-wrap content-center gap-2 p-4">
                {TECH_STACK.map((tech) => (
                    <span
                        key={tech}
                        className="tech-badge cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </BentoCard>
    );
}
