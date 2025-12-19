"use client";

import { useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function MasterCard() {
    const containerRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();

        const x = (clientX - left - width / 2) / width;
        const y = (clientY - top - height / 2) / height;

        layersRef.current.forEach((layer, i) => {
            if (layer) {
                const depth = (i + 1) * 20;
                gsap.to(layer, {
                    x: x * depth,
                    y: y * depth,
                    rotationX: -y * 10,
                    rotationY: x * 10,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        });
    };

    const handleMouseLeave = () => {
        layersRef.current.forEach((layer) => {
            if (layer) {
                gsap.to(layer, {
                    x: 0,
                    y: 0,
                    rotationX: 0,
                    rotationY: 0,
                    duration: 0.5,
                    ease: "power2.out",
                });
            }
        });
    };

    return (
        <BentoCard
            colSpan={2}
            rowSpan={2}
            title="AR / Spatial Computing"
            subtitle="Exploring the next dimension of interfaces"
            className="group"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex h-full min-h-[300px] w-full items-center justify-center perspective-1000"
            >
                {/* Abstract 3D Layers */}
                <div
                    ref={(el) => { layersRef.current[0] = el }}
                    className="absolute h-32 w-32 rounded-full bg-blue-500/20 blur-2xl filter"
                />
                <div
                    ref={(el) => { layersRef.current[1] = el }}
                    className="absolute h-48 w-48 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                />
                <div
                    ref={(el) => { layersRef.current[2] = el }}
                    className="absolute flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 shadow-2xl"
                >
                    <span className="text-4xl font-bold text-white">AR</span>
                </div>
            </div>
        </BentoCard>
    );
}
