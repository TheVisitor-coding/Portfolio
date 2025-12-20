"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function SaaSMasterCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sidebar items stagger in
            gsap.from(".sidebar-item", {
                duration: 1,
                opacity: 0,
                x: -10,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.2
            });

            // "Active" status pulse
            gsap.to(".status-pulse", {
                opacity: 0.8,
                scale: 1.2,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Data stream effect in main content
            gsap.to(".data-stream", {
                backgroundPosition: "200% 0",
                duration: 3,
                repeat: -1,
                ease: "linear"
            });

            // Hover effect for "interactive" elements (simulated)
            gsap.utils.toArray<HTMLElement>(".interactive-mock").forEach((el) => {
                gsap.to(el, {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    duration: 1,
                    repeat: -1,
                    yoyo: true,
                    delay: Math.random() * 2 // Random start times
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={2}
            rowSpan={2}
            title="SaaS Engineering"
            subtitle="Complex Web Applications & Microservices"
        >
            <div ref={containerRef} className="relative flex h-full min-h-[300px] w-full flex-col overflow-hidden rounded-lg border border-white/5 bg-black/40 p-4">

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                {/* Simulated App Window Structure */}
                <div className="relative z-10 flex h-full flex-col gap-3 rounded-lg border border-white/10 bg-black/20 p-2 backdrop-blur-sm shadow-2xl">

                    {/* Header */}
                    <div className="flex items-center justify-between rounded-md border border-white/5 bg-white/5 px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500/40" />
                            <div className="h-2 w-2 rounded-full bg-yellow-500/40" />
                            <div className="h-2 w-2 rounded-full bg-green-500/40" />
                            <div className="ml-2 h-2 w-16 rounded-full bg-white/10" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-2 w-4 rounded-full bg-white/10" />
                            <div className="status-pulse h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        </div>
                    </div>

                    <div className="flex flex-1 gap-3 overflow-hidden">
                        {/* Sidebar */}
                        <div className="flex w-12 flex-col gap-2 rounded-md border border-white/5 bg-white/5 p-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="sidebar-item aspect-square w-full rounded-md bg-white/10 hover:bg-white/20 transition-colors" />
                            ))}
                            <div className="mt-auto h-8 w-full rounded-full bg-white/5" />
                        </div>

                        {/* Main Content Area */}
                        <div className="flex flex-1 flex-col gap-3">
                            {/* Dashboard Top Row */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="interactive-mock h-16 rounded-md border border-white/5 bg-white/5 p-2">
                                    <div className="mb-2 h-1.5 w-8 rounded-full bg-white/20" />
                                    <div className="h-4 w-12 rounded bg-gradient-to-r from-blue-500/20 to-transparent" />
                                </div>
                                <div className="interactive-mock h-16 rounded-md border border-white/5 bg-white/5 p-2">
                                    <div className="mb-2 h-1.5 w-8 rounded-full bg-white/20" />
                                    <div className="h-4 w-12 rounded bg-gradient-to-r from-purple-500/20 to-transparent" />
                                </div>
                                <div className="interactive-mock h-16 rounded-md border border-white/5 bg-white/5 p-2">
                                    <div className="mb-2 h-1.5 w-8 rounded-full bg-white/20" />
                                    <div className="h-4 w-12 rounded bg-gradient-to-r from-emerald-500/20 to-transparent" />
                                </div>
                            </div>

                            {/* Large Data Panel */}
                            <div className="relative flex-1 overflow-hidden rounded-md border border-white/5 bg-white/5">
                                {/* Abstract Data Streams */}
                                <div className="data-stream absolute inset-0 opacity-20"
                                    style={{
                                        background: 'linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.4) 45%, rgba(59, 130, 246, 0.1) 50%, transparent 60%)',
                                        backgroundSize: '200% 200%'
                                    }}
                                />

                                <div className="p-3 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white/20" />
                                        <div className="h-1.5 w-1/3 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white/20" />
                                        <div className="h-1.5 w-1/2 rounded-full bg-white/10" />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-white/20" />
                                        <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                                    </div>
                                </div>

                                {/* Floating Graph Line */}
                                <svg className="absolute bottom-0 left-0 h-16 w-full opacity-30" preserveAspectRatio="none">
                                    <path d="M0,50 Q50,20 100,50 T200,40 T300,50 V64 H0 Z" fill="url(#blue-gradient)" />
                                    <defs>
                                        <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}
