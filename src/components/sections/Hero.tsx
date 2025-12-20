"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import MagneticButton from "../ui/MagneticButton";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Particle System (Rising Dust)
            const canvas = canvasRef.current;
            if (canvas && containerRef.current) {
                const c = canvas.getContext("2d");
                if (c) {
                    let width = containerRef.current.offsetWidth;
                    let height = containerRef.current.offsetHeight;
                    canvas.width = width;
                    canvas.height = height;

                    const particles: { x: number; y: number; speed: number; opacity: number; size: number }[] = [];
                    const particleCount = 60; // Minimal dust

                    for (let i = 0; i < particleCount; i++) {
                        particles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            speed: 0.2 + Math.random() * 0.3,
                            opacity: Math.random() * 0.5,
                            size: Math.random() * 2,
                        });
                    }

                    const animateParticles = () => {
                        c.clearRect(0, 0, width, height);
                        c.fillStyle = "white";

                        particles.forEach((p) => {
                            p.y -= p.speed;
                            if (p.y < 0) p.y = height;

                            c.globalAlpha = p.opacity * 0.3; // Very subtle
                            c.beginPath();
                            c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                            c.fill();
                        });
                        requestAnimationFrame(animateParticles);
                    };
                    animateParticles();

                    const handleResize = () => {
                        if (containerRef.current && canvas) {
                            width = containerRef.current.offsetWidth;
                            height = containerRef.current.offsetHeight;
                            canvas.width = width;
                            canvas.height = height;
                        }
                    };
                    window.addEventListener("resize", handleResize);
                }
            }

            // 2. Mouse Spotlight Logic removed (User Request)

            // 3. Entry Animation
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Split Text
            let titleSplit: SplitType | null = null;
            if (titleRef.current) {
                titleSplit = new SplitType(titleRef.current, { types: "chars" });
                // Hide initially
                gsap.set(titleSplit.chars, { y: 100, opacity: 0 });
            }

            tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 1 })
                .to(titleSplit?.chars || [], {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.5")
                .fromTo(".hero-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.8")
                .fromTo(".hero-cta-anim", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]">
            {/* 1. Dust Particles Background */}
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

            {/* 2. Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
                {/* 4. Status Badge with Glowing Border Flow */}
                <div ref={badgeRef} className="opacity-0 translate-y-[-20px] relative inline-flex overflow-hidden rounded-full p-[1px]">
                    {/* Moving Gradient Border - The 'Flux' */}
                    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-40" />

                    {/* Content Container */}
                    <div className="relative flex h-full items-center gap-2 rounded-full bg-[#050505] px-4 py-1.5 backdrop-blur-3xl border border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-neutral-300 tracking-wide">Available for freelance</span>
                    </div>
                </div>

                {/* Main Text (Unchanged) */}
                <h1
                    ref={titleRef}
                    className="font-sans text-5xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl overflow-hidden leading-[1.1]"
                >
                    MATTÉO ROSSI
                </h1>

                <p className="hero-subtitle max-w-xl text-xl text-neutral-400 sm:text-2xl font-mono">
                    Creative Developer & Full-stack Architect
                </p>

                <div className="hero-cta-anim mt-8 flex flex-col gap-4 sm:flex-row">
                    <MagneticButton>
                        <button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 sm:text-base">
                            Available for work
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 mix-blend-difference">
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">Scroll</span>
                <div className="h-10 w-[1px] bg-white/20 overflow-hidden">
                    <div className="h-full w-full bg-white/80 animate-[drop_2s_infinite]" />
                </div>
            </div>

            <style jsx global>{`
                @keyframes drop {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(100%); }
                }
                @keyframes border-flow {
                   0% { transform: translateX(-100%); }
                   100% { transform: translateX(100%); }
                }
             `}</style>
        </section>
    );
}
