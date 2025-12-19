"use client";

import { useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function ARCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;

        gsap.to(".ar-layer", {
            rotationY: x,
            rotationX: -y,
            stagger: 0.05,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(".ar-layer", { rotationY: 0, rotationX: 0, duration: 0.5 });
    };

    return (
        <BentoCard
            colSpan={1}
            rowSpan={2}
            title="Spatial Computing"
            subtitle="Unity & WebXR"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex h-full w-full items-center justify-center perspective-1000"
            >
                <div className="ar-layer absolute h-32 w-32 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm" style={{ transformStyle: "preserve-3d", transform: "translateZ(0px)" }} />
                <div className="ar-layer absolute h-24 w-24 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm" style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }} />
                <div className="ar-layer absolute flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-tr from-orange-500 to-red-500 shadow-xl" style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}>
                    <span className="font-bold text-white">3D</span>
                </div>
            </div>
        </BentoCard>
    );
}
