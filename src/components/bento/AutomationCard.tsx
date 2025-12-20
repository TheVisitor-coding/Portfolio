"use client";

import BentoCard from "../ui/BentoCard";

export default function AutomationCard() {
    return (
        <BentoCard
            colSpan={1}
            rowSpan={1}
            title="Workflow Automation"
            subtitle="Precision Flow"
            className="h-full"
        >
            <div className="relative flex h-full w-full items-center justify-center p-4">
                {/* STRICT SVG IMPLEMENTATION */}
                {/* Fixed size container to ensure compact, elegant presentation */}
                <div className="relative w-full max-w-[180px] aspect-square">
                    <svg
                        viewBox="0 0 200 200"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                        className="overflow-visible"
                    >
                        <defs>
                            {/* Gradient for paths */}
                            <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
                            </linearGradient>

                            {/* Glow for Hub */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Particle Definition */}
                            <circle id="particle" r="3" fill="#fff" />
                        </defs>

                        {/* --- PATHS --- */}
                        {/* Left Source to Hub */}
                        <path
                            id="path1"
                            d="M 50 20 C 50 100 100 100 100 160"
                            fill="none"
                            stroke="url(#pathGrad)"
                            strokeWidth="2"
                        />

                        {/* Center Source to Hub */}
                        <path
                            id="path2"
                            d="M 100 20 C 100 100 100 100 100 160"
                            fill="none"
                            stroke="url(#pathGrad)"
                            strokeWidth="2"
                        />

                        {/* Right Source to Hub */}
                        <path
                            id="path3"
                            d="M 150 20 C 150 100 100 100 100 160"
                            fill="none"
                            stroke="url(#pathGrad)"
                            strokeWidth="2"
                        />

                        {/* --- SOURCES (Top) --- */}
                        <circle cx="50" cy="20" r="6" fill="#171717" stroke="#a855f7" strokeWidth="2" />
                        <circle cx="100" cy="20" r="6" fill="#171717" stroke="#a855f7" strokeWidth="2" />
                        <circle cx="150" cy="20" r="6" fill="#171717" stroke="#a855f7" strokeWidth="2" />

                        {/* --- HUB (Bottom) --- */}
                        <g transform="translate(100, 160)">
                            <circle
                                r="15"
                                fill="#171717"
                                stroke="#a855f7"
                                strokeWidth="2"
                                filter="url(#glow)"
                            >
                                {/* Pulse Animation */}
                                <animateTransform
                                    attributeName="transform"
                                    type="scale"
                                    values="1; 1.2; 1"
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    begin="0s"
                                />
                            </circle>
                            {/* Core Icon/Dot */}
                            <circle r="4" fill="#a855f7" />
                        </g>

                        {/* --- ANIMATED PARTICLES --- */}
                        {/* Particle 1 */}
                        <use href="#particle">
                            <animateMotion dur="3s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
                                <mpath href="#path1" />
                            </animateMotion>
                            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
                        </use>

                        {/* Particle 2 (Delayed) */}
                        <use href="#particle">
                            <animateMotion dur="3s" begin="1s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
                                <mpath href="#path2" />
                            </animateMotion>
                            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="1s" repeatCount="indefinite" />
                        </use>

                        {/* Particle 3 (Delayed further) */}
                        <use href="#particle">
                            <animateMotion dur="3s" begin="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1">
                                <mpath href="#path3" />
                            </animateMotion>
                            <animate attributeName="opacity" values="0;1;0" dur="3s" begin="2s" repeatCount="indefinite" />
                        </use>

                    </svg>
                </div>
            </div>
        </BentoCard>
    );
}
