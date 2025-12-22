"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef1 = useRef<SVGPathElement>(null);
    const pathRef2 = useRef<SVGPathElement>(null);
    const pathRef3 = useRef<SVGPathElement>(null);
    const pathRef4 = useRef<SVGPathElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate lines along paths
            const paths = [pathRef1.current, pathRef2.current, pathRef3.current, pathRef4.current];

            paths.forEach((path, i) => {
                if (!path) return;

                // Get length of path
                const length = path.getTotalLength();

                // Set initial dash array/offset to hide it
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    opacity: 0.5
                });

                // Animate dashoffset to reveal and travel
                // We want a "projectile" look, so we manipulate dasharray to create a short segment?
                // Or just standard "draw" animation that loops.
                // Request: "Trait lumineux le long de ces chemins"

                // Create a "short dash" effect
                gsap.set(path, {
                    strokeDasharray: `100, ${length}`, // 100px dash, rest gap
                    strokeDashoffset: length + 100 // Start fully retracted
                });

                gsap.to(path, {
                    strokeDashoffset: 0,
                    duration: 2 + (i * 0.5),
                    repeat: -1,
                    ease: "power1.inOut",
                    delay: i * 0.2
                });
            });

            // Heartbeat button
            gsap.to(buttonRef.current, {
                scale: 1.05,
                boxShadow: "0 0 40px rgba(56, 189, 248, 0.4)", // Cyan glos
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative flex h-[80vh] w-full flex-col items-center justify-center overflow-hidden bg-black">
            {/* SVG Container for Convergence Lines */}
            <svg className="absolute inset-0 h-full w-full pointer-events-none z-0">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                </defs>

                {/* Curves converging to center (approx 50% 50% or where button is) */}
                {/* Let's assume button is at 50% 60% of container height-ish */}

                {/* Left Top to Center */}
                <path ref={pathRef1} d="M-100,100 C200,100 300,400 50% 60%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />

                {/* Left Bottom to Center */}
                <path ref={pathRef2} d="M-100,800 C200,800 300,500 50% 60%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />

                {/* Right Top to Center */}
                <path ref={pathRef3} d="M110%,100 C80%,100 70%,400 50% 60%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />

                {/* Right Bottom to Center */}
                <path ref={pathRef4} d="M110%,800 C80%,800 70%,500 50% 60%" stroke="url(#line-gradient)" strokeWidth="2" fill="none" />
            </svg>

            <div className="relative z-10 flex flex-col items-center gap-10">
                <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                    Let's build the impossible.
                </h2>

                {/* Button Container - positioned to match SVG convergence roughly */}
                <div ref={buttonRef} className="rounded-full bg-white relative mt-8">
                    <MagneticButton>
                        <a
                            href="https://calendly.com/matteorossiroy/30min"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-8 py-4 text-black font-bold tracking-wide rounded-full transition-colors hover:bg-neutral-100"
                        >
                            <span>Initialiser la Collaboration</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </MagneticButton>
                </div>
            </div>

            <div className="absolute bottom-6 w-full text-center text-[10px] text-zinc-600 uppercase tracking-widest">
                © 2025 Emotive Engineering.
            </div>
        </footer>
    );
}
