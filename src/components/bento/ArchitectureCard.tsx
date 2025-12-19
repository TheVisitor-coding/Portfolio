"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function ArchitectureCard() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const packets = gsap.utils.toArray<SVGElement>(".data-packet");

            packets.forEach((packet, i) => {
                gsap.to(packet, {
                    motionPath: {
                        path: "#flow-path",
                        align: "#flow-path",
                        alignOrigin: [0.5, 0.5],
                    },
                    duration: 4,
                    repeat: -1,
                    ease: "none",
                    delay: i * 1.5,
                });
            });
        }, svgRef);

        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={1}
            rowSpan={2}
            title="System Architecture"
            subtitle="Robust & Scalable Solutions"
        >
            <div className="relative flex h-full w-full items-center justify-center p-4">
                <svg ref={svgRef} viewBox="0 0 200 200" className="h-full w-full stroke-white/20">
                    <path
                        id="flow-path"
                        d="M 20 100 Q 50 20 100 100 T 180 100"
                        fill="none"
                        strokeWidth="2"
                        className="opacity-30"
                    />

                    <circle className="data-packet" r="4" fill="#3b82f6" />
                    <circle className="data-packet" r="4" fill="#8b5cf6" />

                    {/* Nodes */}
                    <rect x="10" y="90" width="20" height="20" rx="4" fill="currentColor" className="text-neutral-700" />
                    <rect x="90" y="90" width="20" height="20" rx="4" fill="currentColor" className="text-neutral-700" />
                    <rect x="170" y="90" width="20" height="20" rx="4" fill="currentColor" className="text-neutral-700" />
                </svg>
            </div>
        </BentoCard>
    );
}
