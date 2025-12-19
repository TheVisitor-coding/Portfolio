"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Icons } from "@/components/ui/Icons";

gsap.registerPlugin(ScrollTrigger);

const TOOLS = [
    { name: "Next.js", icon: Icons.nextjs },
    { name: "React", icon: Icons.react },
    { name: "TypeScript", icon: Icons.typescript },
    { name: "Tailwind", icon: Icons.tailwind },
    { name: "GSAP", icon: Icons.gsap },
    { name: "Node.js", icon: Icons.nodejs },
    { name: "Docker", icon: Icons.docker },
    { name: "Figma", icon: Icons.figma },
    { name: "Unity", icon: Icons.unity },
    { name: "Three.js", icon: Icons.threejs },
];

export default function Tools() {
    const sectionRef = useRef<HTMLElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const setCanvasSize = () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        };

        window.addEventListener("resize", setCanvasSize);
        setCanvasSize();

        // Mouse Tracker
        const mouse = { x: -1000, y: -1000 };
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        // We only care about mouse relative to the container when hovering the container?
        // Or global? Let's do container relative for the lines logic.
        // But for smoother UX, maybe listen on window but adjust? 
        // Let's listen on container for simplicity of "inside section".
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", () => { mouse.x = -1000; mouse.y = -1000; });

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            iconRefs.current.forEach((icon) => {
                if (!icon) return;

                // Get icon center position relative to canvas (container)
                // Since icons are absolutely positioned or flexed inside container, and canvas is absolute inset-0
                const iconRect = icon.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const ix = iconRect.left - containerRect.left + iconRect.width / 2;
                const iy = iconRect.top - containerRect.top + iconRect.height / 2;

                const dx = ix - mouse.x;
                const dy = iy - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    const opacity = 1 - (dist / 200);
                    ctx.beginPath();
                    ctx.moveTo(ix, iy);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Optional: Highlight icon
                    icon.style.transform = `scale(${1 + opacity * 0.2})`;
                } else {
                    icon.style.transform = `scale(1)`;
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            container.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Random positioning logic
    // We want them centered but random.
    // Solution: predefined random positions or generate on client?
    // Client side generation causes hydration mismatch.
    // We'll use CSS classes with predefined random-ish positions or styles, OR use a useEffect to set positions.
    // Best for "Refais entièrement": Use a layout that looks random but is reliable.
    // Let's use absolute positioning with percentage.

    // Seeded random-ish positions (x%, y%)
    const positions = [
        { top: '20%', left: '25%' },
        { top: '30%', left: '60%' },
        { top: '15%', left: '45%' },
        { top: '50%', left: '30%' },
        { top: '45%', left: '70%' },
        { top: '65%', left: '40%' },
        { top: '75%', left: '65%' },
        { top: '80%', left: '25%' },
        { top: '35%', left: '80%' },
        { top: '60%', left: '15%' },
    ];

    return (
        <section ref={sectionRef} className="relative w-full py-24 flex flex-col items-center">
            <div className="mb-12 text-center z-10">
                <h2 className="text-4xl font-bold uppercase tracking-widest text-white/50 mix-blend-overlay">The Arsenal</h2>
            </div>

            <div ref={containerRef} className="relative h-[600px] w-full max-w-6xl rounded-3xl border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden cursor-crosshair">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

                {TOOLS.map((tool, i) => (
                    <div
                        key={tool.name}
                        ref={(el) => { iconRefs.current[i] = el; }}
                        className="absolute flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300"
                        style={{
                            top: positions[i % positions.length].top,
                            left: positions[i % positions.length].left,
                        }}
                    >
                        <div className="h-8 w-8 text-neutral-300 pointer-events-none">
                            <tool.icon className="h-full w-full" />
                        </div>
                        <span className="absolute -bottom-6 text-[10px] uppercase tracking-widest text-neutral-500 opacity-0 transition-opacity group-hover:opacity-100">{tool.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
