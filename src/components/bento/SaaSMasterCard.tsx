"use client";

import { useEffect, useRef } from "react";
import BentoCard from "../ui/BentoCard";
import gsap from "gsap";

export default function SaaSMasterCard() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Bar Charts animation
            gsap.utils.toArray<HTMLElement>(".chart-bar").forEach((bar, i) => {
                gsap.to(bar, {
                    height: "random(20%, 90%)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    delay: i * 0.1,
                    ease: "power2.inOut"
                });
            });

            // Activity list staggers
            gsap.fromTo(".activity-item",
                { opacity: 0.5, x: -5 },
                { opacity: 1, x: 0, stagger: 0.2, duration: 1, repeat: -1, yoyo: true }
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <BentoCard
            colSpan={2}
            rowSpan={2}
            title="SaaS Architecture"
            subtitle="Scalable Data Visualization & Dashboards"
        >
            <div ref={containerRef} className="relative flex h-full min-h-[300px] w-full flex-col gap-4 overflow-hidden rounded-lg border border-white/5 bg-black/20 p-4">

                {/* Header Mockup */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <div className="h-2 w-16 rounded bg-neutral-700/50" />
                    <div className="flex gap-2">
                        <div className="h-4 w-4 rounded-full bg-red-500/20" />
                        <div className="h-4 w-4 rounded-full bg-yellow-500/20" />
                        <div className="h-4 w-4 rounded-full bg-green-500/20" />
                    </div>
                </div>

                <div className="flex h-full gap-4">
                    {/* Sidebar Mockup */}
                    <div className="hidden w-12 flex-col gap-2 border-r border-white/5 pr-2 sm:flex">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-8 w-8 rounded-lg bg-neutral-800/50" />
                        ))}
                    </div>

                    {/* Main Content Mockup */}
                    <div className="flex flex-1 flex-col gap-4">
                        {/* Top Stats */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-16 rounded bg-blue-500/10 p-2 border border-blue-500/20">
                                <div className="mb-2 h-2 w-8 rounded bg-blue-500/30" />
                                <div className="h-4 w-12 rounded bg-blue-500/50" />
                            </div>
                            <div className="h-16 rounded bg-purple-500/10 p-2 border border-purple-500/20">
                                <div className="mb-2 h-2 w-8 rounded bg-purple-500/30" />
                                <div className="h-4 w-12 rounded bg-purple-500/50" />
                            </div>
                            <div className="h-16 rounded bg-emerald-500/10 p-2 border border-emerald-500/20">
                                <div className="mb-2 h-2 w-8 rounded bg-emerald-500/30" />
                                <div className="h-4 w-12 rounded bg-emerald-500/50" />
                            </div>
                        </div>

                        {/* Charts Area */}
                        <div className="flex flex-1 items-end gap-1 rounded bg-neutral-900/30 p-2">
                            {[...Array(15)].map((_, i) => (
                                <div
                                    key={i}
                                    className="chart-bar w-full rounded-t bg-neutral-700 hover:bg-neutral-500 transition-colors"
                                    style={{ height: '30%' }}
                                />
                            ))}
                        </div>

                        {/* Activity List */}
                        <div className="flex flex-col gap-1">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="activity-item flex items-center justify-between rounded bg-white/5 p-2 text-[10px] text-muted-foreground">
                                    <span>User activity detected</span>
                                    <span>2m ago</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </BentoCard>
    );
}
