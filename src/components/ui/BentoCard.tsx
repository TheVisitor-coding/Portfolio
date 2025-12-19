"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    subtitle?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3;
}

export default function BentoCard({
    children,
    className,
    title,
    subtitle,
    colSpan = 1,
    rowSpan = 1,
}: BentoCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

        // GSAP hover scale
        gsap.to(cardRef.current, {
            scale: 0.99,
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
        if (cardRef.current) {
            gsap.to(cardRef.current, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
            });
        }
    };

    // Map colSpan/rowSpan to Tailwind classes
    const colSpanClass = {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-3",
        4: "col-span-1 md:col-span-2 lg:col-span-4",
    }[colSpan];

    const rowSpanClass = {
        1: "row-span-1",
        2: "row-span-1 md:row-span-2",
        3: "row-span-1 md:row-span-3",
    }[rowSpan];

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "group relative overflow-hidden rounded-xl bg-neutral-900/40 p-6 backdrop-blur-md transition-all border border-white/5",
                colSpanClass,
                rowSpanClass,
                className
            )}
        >
            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.06), transparent 40%)`,
                }}
            />
            {/* Border Beam Effect attempt using localized gradient */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,.1), transparent 40%)`,
                    maskImage: "linear-gradient(black, black), content-box(black, black)",
                    maskComposite: "exclude",
                    padding: "1px" // border width
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col">
                {children}

                {(title || subtitle) && (
                    <div className="mt-auto pt-4 transition-transform duration-300 group-hover:-translate-y-1">
                        {title && <h3 className="text-lg font-semibold text-foreground tracking-tight">{title}</h3>}
                        {subtitle && <p className="text-sm text-muted-foreground font-mono">{subtitle}</p>}
                    </div>
                )}
            </div>
        </div>
    );
}
