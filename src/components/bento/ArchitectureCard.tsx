"use client";

import BentoCard from "../ui/BentoCard";
import { Database, Terminal, GitBranch, LayoutTemplate } from "lucide-react";

export default function ArchitectureCard() {
    return (
        <BentoCard
            colSpan={1}
            rowSpan={2}
            title="System Architecture"
            subtitle="Deep Stack"
        >
            <div className="group relative h-full w-full flex items-center justify-center perspective-[1000px] overflow-visible">

                {/* Layer 1 (Bottom): Database / Infrastructure */}
                <div
                    className="absolute w-32 h-32 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out
                               group-hover:translate-y-12 group-hover:scale-90 group-hover:opacity-60 z-10 p-3 flex flex-col gap-2"
                >
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                        <Database size={12} className="text-emerald-500" />
                        <span className="text-[8px] font-mono text-white/40">postgres</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="h-1.5 w-full bg-emerald-500/10 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-emerald-500/10 rounded-full" />
                        <div className="h-1.5 w-1/2 bg-emerald-500/10 rounded-full" />
                    </div>
                </div>

                {/* Layer 2: Backend / API */}
                <div
                    className="absolute w-32 h-32 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out delay-[50ms]
                               group-hover:translate-y-4 group-hover:scale-95 group-hover:opacity-80 z-20 p-3 font-mono"
                >
                    <div className="flex items-center gap-2 mb-2 text-white/30">
                        <Terminal size={12} />
                        <span className="text-[8px]">server.ts</span>
                    </div>
                    <div className="text-[6px] text-green-400/80 leading-tight space-y-1">
                        <p>{`> init_server()`}</p>
                        <p>{`> connect_db()`}</p>
                        <p className="animate-pulse">{`> listening...`}</p>
                    </div>
                </div>

                {/* Layer 3: Logic / Orchestration */}
                <div
                    className="absolute w-32 h-32 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out delay-[100ms]
                               group-hover:-translate-y-4 group-hover:scale-100 group-hover:opacity-100 z-30
                               p-3 flex items-center justify-center"
                >
                    <div className="relative flex items-center justify-center w-full h-full">
                        <GitBranch size={24} className="text-blue-500 opacity-80" />
                        <div className="absolute top-2 right-2 text-[8px] font-mono text-blue-300 bg-blue-500/10 px-1 rounded">LOGIC</div>
                        {/* Connecting dots */}
                        <div className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                        <div className="absolute bottom-2 right-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    </div>
                </div>

                {/* Layer 4 (Top): Frontend / UI */}
                <div
                    className="absolute w-32 h-32 rounded-xl border border-white/20 bg-neutral-900/90 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out delay-[150ms]
                               group-hover:-translate-y-12 group-hover:scale-105 group-hover:border-indigo-400 z-40
                               p-2 flex flex-col gap-2"
                >
                    {/* UI Mockup Header */}
                    <div className="h-4 w-full bg-indigo-500/10 rounded flex items-center px-1 gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        <div className="h-1 w-8 bg-white/10 rounded-full" />
                    </div>
                    {/* UI Mockup Body */}
                    <div className="flex-1 rounded border border-white/5 bg-black/20 p-1 flex gap-1">
                        <div className="w-1/4 h-full bg-white/5 rounded-sm" />
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="h-2 w-full bg-white/10 rounded-sm" />
                            <div className="h-8 w-full bg-gradient-to-br from-indigo-500/20 to-transparent rounded-sm" />
                        </div>
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
