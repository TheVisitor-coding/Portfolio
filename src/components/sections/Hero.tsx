"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        // Mouse follower gradient
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const { clientX, clientY } = e;
                const rect = containerRef.current.getBoundingClientRect();
                const x = clientX - rect.left;
                const y = clientY - rect.top;
                containerRef.current.style.setProperty("--x", `${x}px`);
                containerRef.current.style.setProperty("--y", `${y}px`);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Split Text Animation
        if (titleRef.current && subtitleRef.current) {
            const titleSplit = new SplitType(titleRef.current, { types: "chars,words" });
            const subtitleSplit = new SplitType(subtitleRef.current, { types: "words" });

            const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

            tl.from(titleSplit.chars, {
                y: 100,
                opacity: 0,
                rotateZ: 5,
                stagger: 0.05,
                duration: 1.2,
            })
                .from(
                    subtitleSplit.words,
                    {
                        y: 20,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.8,
                    },
                    "-=0.8"
                )
                .fromTo(
                    ".hero-cta",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.6"
                );

            return () => {
                titleSplit.revert();
                subtitleSplit.revert();
                window.removeEventListener("mousemove", handleMouseMove);
            };
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center [--x:50%] [--y:50%]"
        >
            {/* Dynamic Background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-1000"
                style={{
                    background: "radial-gradient(600px circle at var(--x) var(--y), rgba(255, 255, 255, 0.06), transparent 40%)",
                }}
            />

            <div className="z-10 flex flex-col items-center gap-8">
                <h1
                    ref={titleRef}
                    className="font-sans text-6xl font-bold tracking-tight text-foreground sm:text-8xl md:text-9xl overflow-hidden leading-[1.1]"
                >
                    MATTÉO ROSSI
                </h1>

                <p
                    ref={subtitleRef}
                    className="max-w-xl text-xl text-muted-foreground sm:text-2xl font-mono"
                >
                    Creative Developer & Full-stack Architect
                </p>

                <div className="hero-cta mt-8 flex flex-col gap-4 sm:flex-row">
                    <MagneticButton>
                        <button className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90 sm:text-base">
                            Available for work
                        </button>
                    </MagneticButton>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Scroll</span>
                <div className="h-10 w-[1px] overflow-hidden bg-white/10">
                    <div className="h-full w-full bg-white/50 animate-[drop_1.5s_infinite]" />
                </div>
            </div>

            <style jsx global>{`
        @keyframes drop {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
       `}</style>
        </section>
    );
}
