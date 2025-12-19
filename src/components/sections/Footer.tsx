"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Colors from the request: "Outer Wilds" to "Tech"
            const colors = ["#818cf8", "#c084fc", "#34d399", "#22d3ee"];
            const containerWidth = containerRef.current?.offsetWidth || window.innerWidth;
            const containerHeight = containerRef.current?.offsetHeight || window.innerHeight;

            // Create "Circuit Lines" that converge to center
            const linesCount = 20;

            for (let i = 0; i < linesCount; i++) {
                const line = document.createElement("div");
                const color = colors[i % colors.length];

                line.className = "absolute blur-[1px]";
                line.style.backgroundColor = color;

                const isLeft = i % 2 === 0;

                // Start position: Edges
                line.style.top = `${Math.random() * 100}%`;
                line.style.left = isLeft ? "-10%" : "110%";
                line.style.width = "40px";
                line.style.height = "2px";

                containerRef.current?.appendChild(line);

                // Converge to center (approximate button position)
                gsap.to(line, {
                    left: "50%",
                    top: "50%",
                    width: "2px",
                    height: "2px",
                    opacity: 0,
                    duration: 1.5 + Math.random() * 1.5,
                    delay: Math.random() * 2,
                    repeat: -1,
                    ease: "power2.in",
                    onRepeat: () => {
                        // Reset position slightly
                        gsap.set(line, {
                            top: `${Math.random() * 100}%`,
                            left: isLeft ? "-10%" : "110%",
                            width: "40px",
                            height: "2px",
                            opacity: 1
                        });
                    }
                });
            }

            // Heartbeat effect on the button wrapper when energy arrives
            gsap.to(buttonRef.current, {
                scale: 1.05,
                boxShadow: "0 0 30px rgba(96, 165, 250, 0.4)",
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer id="contact" ref={containerRef} className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black text-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black" />

            <div className="relative z-10 flex flex-col items-center gap-16 px-4">
                <div>
                    <h2 className="text-5xl font-bold tracking-tighter text-white sm:text-7xl md:text-9xl mix-blend-soft-light">
                        THE FINAL
                    </h2>
                    <h2 className="text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 sm:text-7xl md:text-9xl animate-pulse">
                        COMMIT
                    </h2>
                </div>

                <p className="max-w-md text-lg text-zinc-300 font-light">
                    Your vision needs an architect. <br />
                    I'm ready when you are.
                </p>

                <div ref={buttonRef} className="rounded-full">
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
            </div>

            <div className="absolute bottom-10 w-full px-12 flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                <span>Local Time: {new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
                <span>© 2025 MR</span>
            </div>
        </footer>
    );
}
