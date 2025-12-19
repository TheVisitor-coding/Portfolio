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
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    // Store node positions
    const nodes = useRef<{ x: number, y: number, radius: number }[]>([]);

    useEffect(() => {
        const section = sectionRef.current;

        // Animate section title fade in
        gsap.fromTo(section,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%"
                }
            }
        );

        // GSAP Magnet Effect
        const items = document.querySelectorAll(".tool-node");

        // Distribute randomly but avoid overlapping too much (simple random for now)
        // We will let CSS handle initial grid but then we might break it? 
        // Actually the requested design is "Scattered". Let's use absolute positioning relative to container
        // But for responsiveness, maybe we stick to a loose grid and use transforms to scatter slightly?

        // Better: Use the canvas for lines, and DOM elements for icons

        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !canvasRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            // Attract nodes to mouse
            items.forEach((item, i) => {
                const el = item as HTMLElement;
                // Current pos (we can read from GSAP tracker or just offset)
                // Use QuickTo for performance
            });

            // Draw lines
            const ctx = canvasRef.current.getContext("2d");
            if (!ctx) return;

            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // Update node list from DOM positions
            const currentNodes: { x: number, y: number }[] = [];

            items.forEach((item) => {
                const el = item as HTMLElement;
                // Get center relative to container
                const x = el.offsetLeft + el.offsetWidth / 2;
                const y = el.offsetTop + el.offsetHeight / 2;
                currentNodes.push({ x, y });
            });

            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            ctx.beginPath();

            // Double loop for connections
            for (let i = 0; i < currentNodes.length; i++) {
                for (let j = i + 1; j < currentNodes.length; j++) {
                    const dx = currentNodes[i].x - currentNodes[j].x;
                    const dy = currentNodes[i].y - currentNodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 200) { // Connection threshold
                        ctx.moveTo(currentNodes[i].x, currentNodes[i].y);
                        ctx.lineTo(currentNodes[j].x, currentNodes[j].y);
                    }
                }

                // Connect to mouse if close
                const dmx = currentNodes[i].x - mx;
                const dmy = currentNodes[i].y - my;
                const distM = Math.sqrt(dmx * dmx + dmy * dmy);

                if (distM < 300) {
                    ctx.moveTo(currentNodes[i].x, currentNodes[i].y);
                    ctx.lineTo(mx, my);
                }
            }
            ctx.stroke();
        };

        // Resize canvas
        const handleResize = () => {
            if (containerRef.current && canvasRef.current) {
                canvasRef.current.width = containerRef.current.offsetWidth;
                canvasRef.current.height = containerRef.current.offsetHeight;
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove); // Listener on window for ease or specific container? Better specific
        containerRef.current?.addEventListener("mousemove", handleMouseMove);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
            containerRef.current?.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    // Magnetic Logic separate effect using GSAP QuickTo
    useEffect(() => {
        const xTo: gsap.QuickToFunc[] = [];
        const yTo: gsap.QuickToFunc[] = [];
        const items = document.querySelectorAll(".tool-node");

        items.forEach((item) => {
            xTo.push(gsap.quickTo(item, "x", { duration: 0.5, ease: "power3" }));
            yTo.push(gsap.quickTo(item, "y", { duration: 0.5, ease: "power3" }));
        });

        const handleMove = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            items.forEach((item, i) => {
                const el = item as HTMLElement;
                const ix = el.offsetLeft + el.offsetWidth / 2;
                const iy = el.offsetTop + el.offsetHeight / 2;

                const dist = Math.hypot(mx - ix, my - iy);

                if (dist < 300) {
                    const angle = Math.atan2(my - iy, mx - ix);
                    // Attract by moving CLOSER to mouse
                    const force = (300 - dist) / 10;
                    xTo[i](Math.cos(angle) * force);
                    yTo[i](Math.sin(angle) * force);
                } else {
                    xTo[i](0);
                    yTo[i](0);
                }
            });
        };

        containerRef.current?.addEventListener("mousemove", handleMove);
        return () => containerRef.current?.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <section id="stack" ref={sectionRef} className="relative min-h-[80vh] w-full flex flex-col items-center justify-center py-24 overflow-hidden">
            <div className="mb-12 z-10 text-center">
                <h2 className="text-4xl font-bold uppercase tracking-widest text-white/50 mix-blend-overlay">The Arsenal</h2>
            </div>

            <div ref={containerRef} className="relative h-[600px] w-full max-w-6xl rounded-3xl border border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50 pointer-events-none" />

                {/* Distributed Icons - absolute for organic feel or grid? Let's use a loose grid then offset random */}
                {/* Actually, let's just place them in a flex wrap but give them big margins and relative positioning */}
                <div className="relative z-10 h-full w-full flex flex-wrap items-center justify-center gap-24 p-24 content-center">
                    {TOOLS.map((tool, i) => (
                        <div
                            key={tool.name}
                            className="tool-node relative flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-shadow hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            style={{
                                // Add slight random offset to break the grid
                                transform: `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`
                            }}
                        >
                            <div className="h-8 w-8 text-neutral-300">
                                <tool.icon className="h-full w-full" />
                            </div>
                            <span className="absolute -bottom-6 text-[10px] uppercase tracking-widest text-neutral-500 opacity-0 transition-opacity hover:opacity-100 group-hover:opacity-100">{tool.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
