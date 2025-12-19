"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function AutomationCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".connector-line",
                { scaleX: 0, opacity: 0 },
                {
                    scaleX: 1,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.5,
                    transformOrigin: "left center",
                    ease: "power2.out",
                    repeat: -1,
                    repeatDelay: 2
                }
            );

            gsap.fromTo(".node-dot",
                { scale: 0 },
                {
                    scale: 1,
                    duration: 0.5,
                    stagger: 0.5,
                    ease: "back.out(1.7)",
                    repeat: -1,
                    repeatDelay: 2
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={1}
            rowSpan={1}  // Use the parent's grid placement, BentoCard accepts internal override or just purely stylistic
            title="Workflow Automation"
            subtitle="n8n / CI/CD Pipelines"
            className="h-full" // Ensure it fills the new slot
        >
            <div ref={containerRef} className="relative flex h-full w-full items-center justify-center gap-4 py-8">
                <div className="flex items-center gap-2">
                    <div className="node-dot h-10 w-10 rounded-lg bg-orange-500/20 shadow-sm border border-orange-500/50 flex items-center justify-center text-xs text-orange-200">Src</div>
                    <div className="connector-line h-1 w-12 bg-orange-500/50" />
                    <div className="node-dot h-10 w-10 rounded-lg bg-blue-500/20 shadow-sm border border-blue-500/50 flex items-center justify-center text-xs text-blue-200">Proc</div>
                    <div className="connector-line h-1 w-12 bg-blue-500/50" />
                    <div className="node-dot h-10 w-10 rounded-lg bg-green-500/20 shadow-sm border border-green-500/50 flex items-center justify-center text-xs text-green-200">Dest</div>
                </div>
            </div>
        </BentoCard>
    );
}
