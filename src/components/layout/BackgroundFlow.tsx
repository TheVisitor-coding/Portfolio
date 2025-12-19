"use client";

import { useEffect, useRef } from "react";

export default function BackgroundFlow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let time = 0;

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();

        const drawWave = (yOffset: number, amplitude: number, frequency: number, speed: number, colorStart: string, colorEnd: string) => {
            ctx.beginPath();

            // Gradient for the line
            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, colorStart);
            gradient.addColorStop(1, colorEnd);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.globalAlpha = 0.2;

            for (let x = 0; x <= width; x += 5) {
                // Basic wave
                let y = yOffset + Math.sin(x * frequency + time * speed) * amplitude;

                // Mouse interaction: Distort if close
                const dx = x - mouse.x;
                const dy = y - mouse.y; // approximate y
                const dist = Math.sqrt(dx * dx + dy * dy); // roughly check distance to part of wave

                // Simpler interaction: just x-based distortion wave
                // Actually, let's calculate distance to the specific point (x, y)
                // But since y varies, we use the y we just calculated
                const distToMouse = Math.hypot(x - mouse.x, y - mouse.y);

                if (distToMouse < 300) {
                    const force = (300 - distToMouse) / 300;
                    // Push away or pull? Let's push down/up
                    y += Math.sin(distToMouse * 0.05 - time) * 50 * force;
                }

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            time += 0.01;

            // Draw 3 distinct waves sweeping vertically or just horizontal waves flowing?
            // Request said "traversent l'écran verticalement" (cross screen vertically? usually means lines go up/down or lines ARE vertical?)
            // Assuming "Sine Wave Lines" that run horizontally across the screen, or vertical lines? 
            // "Onduler ces lignes lentement" suggests horizontal waves.
            // Let's do horizontal waves that span the full width, stacked vertically.

            // Wave 1
            drawWave(height * 0.3, 50, 0.005, 1, "rgba(76, 29, 149, 0.5)", "rgba(56, 189, 248, 0.5)"); // Purple to Blue

            // Wave 2
            drawWave(height * 0.5, 70, 0.003, 1.5, "rgba(124, 58, 237, 0.5)", "rgba(34, 211, 238, 0.5)"); // Violet to Cyan

            // Wave 3
            drawWave(height * 0.7, 40, 0.006, 0.8, "rgba(139, 92, 246, 0.5)", "rgba(52, 211, 153, 0.5)"); // Purple to Green

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 pointer-events-none bg-black"
        />
    );
}
