"use client";

import { useRef, useEffect } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function ARCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;

        gsap.to(".outer-cube", {
            rotationY: x * 2,
            rotationX: -y * 2,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.to(".inner-cube", {
            rotationY: -x * 2, // Inverse rotation
            rotationX: y * 2,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        // Auto rotate when not hovering
        gsap.to(".outer-cube", {
            rotationY: "+=360",
            rotationX: 15,
            duration: 10,
            repeat: -1,
            ease: "linear"
        });
        gsap.to(".inner-cube", {
            rotationY: "-=360",
            rotationX: -15,
            duration: 8,
            repeat: -1,
            ease: "linear"
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".outer-cube", {
                rotationY: 360,
                rotationX: 15,
                duration: 20,
                repeat: -1,
                ease: "linear"
            });
            gsap.to(".inner-cube", {
                rotationY: -360,
                rotationX: -15,
                duration: 15,
                repeat: -1,
                ease: "linear"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={1}
            rowSpan={2}
            title="Immersive Reality (Unity)"
            subtitle="XR / AR / VR Experiences"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex h-full w-full items-center justify-center perspective-1000"
            >
                {/* Complex 3D Structure */}
                <div className="relative h-24 w-24" style={{ transformStyle: "preserve-3d" }}>

                    {/* OUTER CUBE */}
                    <div className="outer-cube absolute inset-0 h-full w-full" style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateZ(48px)" }} />
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateZ(-48px) rotateY(180deg)" }} />
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateX(48px) rotateY(90deg)" }} />
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateX(-48px) rotateY(-90deg)" }} />
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateY(48px) rotateX(-90deg)" }} />
                        <div className="absolute h-full w-full border border-white/30 bg-white/5 backdrop-blur-sm" style={{ transform: "translateY(-48px) rotateX(90deg)" }} />
                    </div>

                    {/* INNER CUBE (smaller, rotating opposite) */}
                    <div className="inner-cube absolute inset-0 m-auto h-12 w-12" style={{ transformStyle: "preserve-3d" }}>
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateZ(24px)" }} />
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateZ(-24px) rotateY(180deg)" }} />
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateX(24px) rotateY(90deg)" }} />
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateX(-24px) rotateY(-90deg)" }} />
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateY(24px) rotateX(-90deg)" }} />
                        <div className="absolute h-full w-full border border-cyan-500/50 bg-cyan-500/10" style={{ transform: "translateY(-24px) rotateX(90deg)" }} />

                        {/* Core */}
                        <div className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
                    </div>

                </div>
            </div>
        </BentoCard>
    );
}
