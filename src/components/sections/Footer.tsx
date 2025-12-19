"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Colored Energy Lines
            const colors = ["#60a5fa", "#a855f7", "#34d399", "#f472b6"];

            for (let i = 0; i < 30; i++) {
                const line = document.createElement("div");
                const color = colors[i % colors.length];

                line.className = "absolute blur-[1px]";
                line.style.backgroundColor = color;

                // Random dimensions for "laser" look
                const isHorizontal = Math.random() > 0.5;

                if (isHorizontal) {
                    line.style.height = "2px";
                    line.style.width = "100px";
                    line.style.left = Math.random() < 0.5 ? "-20%" : "120%";
                    line.style.top = `${Math.random() * 100}%`;
                } else {
                    line.style.width = "2px";
                    line.style.height = "100px";
                    line.style.top = Math.random() < 0.5 ? "-20%" : "120%";
                    line.style.left = `${Math.random() * 100}%`;
                }

                containerRef.current?.appendChild(line);

                // Animate towards center button area
                gsap.to(line, {
                    left: "50%",
                    top: "60%", // Approximate button location
                    opacity: 0,
                    scale: 0.1,
                    duration: 1 + Math.random() * 2,
                    repeat: -1,
                    ease: "power2.inOut",
                    delay: Math.random() * 2,
                });
            }

            // Background pulse
            gsap.to(".footer-bg-pulse", {
                scale: 1.2,
                opacity: 0.3,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={containerRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-center">
            {/* Dynamic Background Pulse */}
            <div className="footer-bg-pulse absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-black to-black opacity-20" />

            <div className="relative z-10 flex flex-col items-center gap-16 px-4">
                <div>
                    <h2 className="text-5xl font-bold tracking-tighter text-white sm:text-7xl md:text-9xl mix-blend-soft-light">
                        THE FINAL
                    </h2>
                    <h2 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 sm:text-7xl md:text-9xl animate-pulse">
                        COMMIT
                    </h2>
                </div>

                <p className="max-w-md text-lg text-neutral-400 font-light">
                    Your vision needs an architect. <br />
                    I'm ready when you are.
                </p>

                <MagneticButton>
                    <a
                        href="https://calendly.com/matteorossiroy/30min"
                        target="_blank"
                        rel="noreferrer"
                        className="group relative flex items-center justify-center h-24 w-64 overflow-hidden rounded-full bg-white text-black transition-all hover:w-72"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="relative z-10 text-xl font-bold tracking-widest transition-colors group-hover:text-white">START NOW</span>
                    </a>
                </MagneticButton>
            </div>

            <div className="absolute bottom-10 w-full px-12 flex justify-between text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
                <span>Local Time: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                <span>© 2025 MR</span>
            </div>
        </footer>
    );
}
