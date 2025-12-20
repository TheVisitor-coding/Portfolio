"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function CreativeInterfacesCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const { width, height, left, top } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 20;
        const y = (e.clientY - top - height / 2) / 20;

        // Parallax effect on UI layers
        gsap.to(".ui-layer-1", { x: x * 0.5, y: y * 0.5, duration: 0.5 });
        gsap.to(".ui-layer-2", { x: x * 1.5, y: y * 1.5, duration: 0.6 });
        gsap.to(".cursor-float", { x: x * 3, y: y * 3, duration: 0.2 }); // Cursor moves faster
    };

    const handleMouseLeave = () => {
        gsap.to([".ui-layer-1", ".ui-layer-2", ".cursor-float"], { x: 0, y: 0, duration: 0.5 });
    };

    return (
        <BentoCard
            colSpan={1}
            rowSpan={1}
            title="Creative Interfaces"
            subtitle="React / Next.js / GSAP"
            className="h-full"
        >
            <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-6"
            >
                {/* 1. Underlying Abstract Wireframe */}
                {/* Nested Radius Logic: Parent is rounded-xl (~12px) or rounded-3xl (24px). 
                    If parent is 24px and padding is 24px (p-6), inner radius should be 0 ideally for perfect nesting, 
                    OR to look good as a floating card inside: 24px - 8px(padding visual) = 16px.
                    Let's aim for rounded-2xl (16px) for the back card to look smooth. */}
                <div className="ui-layer-1 absolute h-4/5 w-4/5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm -rotate-6" />

                {/* 2. Main Design Mockup */}
                <div className="ui-layer-2 absolute h-28 w-48 rounded-xl border border-white/10 bg-neutral-900/90 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden rotate-3 transition-transform hover:scale-105 duration-300">
                    {/* Header */}
                    <div className="h-7 w-full border-b border-white/5 bg-white/5 flex items-center px-3 gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-400/80" />
                        <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                        <div className="h-2 w-2 rounded-full bg-green-400/80" />
                    </div>
                    {/* Body */}
                    <div className="flex-1 p-3 flex gap-2">
                        <div className="w-1/3 h-full rounded-lg bg-white/5 animate-pulse" />
                        <div className="flex-1 flex flex-col gap-2">
                            <div className="h-2 w-3/4 rounded-md bg-white/10" />
                            <div className="h-2 w-1/2 rounded-md bg-white/10" />
                            {/* Button within mockup */}
                            <div className="mt-auto h-6 w-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20" />
                        </div>
                    </div>
                </div>

                {/* 3. Floating Cursor Element */}
                <div className="cursor-float absolute translate-x-12 translate-y-10 z-20 pointer-events-none drop-shadow-xl">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-[-15deg]">
                        <path d="M5 3L17 9L11 11L9 17L5 3Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                    {/* Tooltip on cursor */}
                    <div className="absolute left-4 top-4 bg-pink-500 text-[10px] text-white px-2 py-1 rounded-lg font-bold uppercase tracking-wider shadow-lg whitespace-nowrap">
                        Pixel Perfect
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
