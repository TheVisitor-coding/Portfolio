"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple "Energy Lines" moving towards center
            // Create 20 lines
            const lines = Array.from({ length: 20 });

            lines.forEach((_, i) => {
                const line = document.createElement("div");
                line.className = "absolute bg-gradient-to-r from-transparent via-white/20 to-transparent";
                line.style.height = "1px";
                line.style.width = "40%";
                line.style.top = `${Math.random() * 100}%`;
                line.style.left = i % 2 === 0 ? "-20%" : "120%"; // Start from sides

                containerRef.current?.appendChild(line);

                // Animate towards center
                gsap.to(line, {
                    x: i % 2 === 0 ? "50vw" : "-50vw", // Move towards center
                    opacity: 0,
                    duration: 2 + Math.random() * 2,
                    repeat: -1,
                    ease: "power1.inIn",
                    delay: Math.random() * 2,
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-center">
            {/* Background Energy Field */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-50" />

            <div className="relative z-10 flex flex-col items-center gap-12">
                <h2 className="text-4xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl">
                    Let's build the <br />
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">impossible</span>.
                </h2>

                <p className="max-w-md text-lg text-neutral-400">
                    Every great journey ends with a new beginning. <br />
                    Ready to start yours?
                </p>

                <MagneticButton className="mt-8">
                    <a
                        href="https://calendly.com/matteorossiroy/30min"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center gap-4 overflow-hidden rounded-full bg-white px-8 py-4 text-black transition-transform hover:scale-105"
                    >
                        {/* Energy Pulse Background of Button */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 transition-opacity group-hover:opacity-20" />

                        <span className="relative z-10 text-lg font-bold tracking-wide">BOOK A CALL</span>
                        <span className="relative z-10 text-xl transition-transform group-hover:translate-x-1">→</span>
                    </a>
                </MagneticButton>
            </div>

            <div className="absolute bottom-10 w-full px-12 flex justify-between text-xs text-neutral-600 uppercase tracking-widest mix-blend-difference">
                <span>© 2025 Mattéo Rossi</span>
                <span>Emotive Engineering</span>
            </div>
        </footer>
    );
}
