"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MagneticButton from "../ui/MagneticButton";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

function Constellation() {
    const count = 400;
    const connectionDistance = 1.5;
    const connectionDistanceSq = connectionDistance * connectionDistance;

    // Geometry refs
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);

    // State management for positions
    const [positions, originalPositions] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const orig = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles across a wide area
            const x = (Math.random() - 0.5) * 25;
            const y = (Math.random() - 0.5) * 15;
            const z = (Math.random() - 0.5) * 10;

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;

            orig[i * 3] = x;
            orig[i * 3 + 1] = y;
            orig[i * 3 + 2] = z;
        }
        return [pos, orig];
    }, []);

    // Line geometry buffer (max lines: ~count * 5 is a safe heuristic buffer, 
    // but calculating full N^2 buffer is safest to avoid overflow errors, 
    // though simplified to a reasonable max for performance)
    // 400 points could theoretically have N*(N-1)/2 lines. 
    // We'll use a pragmatic buffer size for perf.
    const maxLines = 1000; // Cap lines for aesthetic minimal look
    const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), []);

    // Mouse interaction vectors
    const mouse = useRef(new THREE.Vector3());
    const dummy = useRef(new THREE.Vector3());

    const { size, viewport } = useThree();

    useFrame((state) => {
        // Optimization: Skip if tab hidden
        if (document.hidden) return;

        // Mouse to 3D world conversion (approximate at z=0 plane)
        // We map normalized device coords (-1 to 1) to viewport units
        const x = (state.pointer.x * viewport.width) / 2;
        const y = (state.pointer.y * viewport.height) / 2;
        mouse.current.set(x, y, 0);

        let lineIndex = 0;
        const positionsAttribute = pointsRef.current.geometry.attributes.position;

        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const iy = i * 3 + 1;
            const iz = i * 3 + 2;

            // Current pos
            const px = positions[ix];
            const py = positions[iy];
            const pz = positions[iz];

            // Original pos
            const ox = originalPositions[ix];
            const oy = originalPositions[iy];
            const oz = originalPositions[iz];

            // 1. Repulsion Logic
            dummy.current.set(px, py, pz);
            const distToMouse = dummy.current.distanceTo(mouse.current);
            const repelDist = 4;

            let targetX = ox;
            let targetY = oy;
            let targetZ = oz;

            if (distToMouse < repelDist) {
                const force = (repelDist - distToMouse) / repelDist;
                const angle = Math.atan2(py - mouse.current.y, px - mouse.current.x);
                // Push away
                targetX += Math.cos(angle) * force * 2;
                targetY += Math.sin(angle) * force * 2;
                // targetZ += force; // Optional z-push
            }

            // Smooth Lerp back to target (original + repulsion offset)
            positions[ix] += (targetX - px) * 0.05;
            positions[iy] += (targetY - py) * 0.05;
            positions[iz] += (targetZ - pz) * 0.05;

            // 2. Lines Logic (Inner Loop)
            // Only check some neighbors to save perf or check all if count low
            // For 400 points, strict N^2 is 80k checks. acceptable.
            // But we limit maxLines drawn to keep it clean.
            if (lineIndex < maxLines) {
                for (let j = i + 1; j < count; j++) {
                    if (lineIndex >= maxLines) break;
                    const jx = positions[j * 3];
                    const jy = positions[j * 3 + 1];
                    const jz = positions[j * 3 + 2];

                    const dx = positions[ix] - jx;
                    const dy = positions[iy] - jy;
                    const dz = positions[iz] - jz;
                    const distSq = dx * dx + dy * dy + dz * dz;

                    if (distSq < connectionDistanceSq) {
                        // Add line
                        linePositions[lineIndex * 6] = positions[ix];
                        linePositions[lineIndex * 6 + 1] = positions[iy];
                        linePositions[lineIndex * 6 + 2] = positions[iz];

                        linePositions[lineIndex * 6 + 3] = jx;
                        linePositions[lineIndex * 6 + 4] = jy;
                        linePositions[lineIndex * 6 + 5] = jz;

                        lineIndex++;
                    }
                }
            }
        }

        // Update Attributes
        positionsAttribute.needsUpdate = true;

        linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
        linesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            {/* Points */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    size={0.05}
                    color="#ffffff"
                    transparent
                    opacity={0.6}
                    sizeAttenuation={true}
                />
            </points>

            {/* Lines */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={maxLines * 2}
                        array={linePositions}
                        itemSize={3}
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#666666" // Darker grey for subtlety
                    transparent
                    opacity={0.2}
                    linewidth={1}
                />
            </lineSegments>
        </group>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const badgeRef = useRef<HTMLDivElement>(null);

    // Initial fade-in of UI elements
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Split Text
            let titleSplit: SplitType | null = null;
            if (titleRef.current) {
                // Ensure SplitType works correctly
                try {
                    titleSplit = new SplitType(titleRef.current, { types: "chars" });
                    gsap.set(titleSplit.chars, { y: 100, opacity: 0 });
                } catch (e) {
                    console.error("SplitType error:", e);
                }
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

            // 2. Parallax Effect
            if (canvasRef.current) {
                gsap.to(canvasRef.current, {
                    yPercent: 30, // Move down slightly as user scrolls down (slower than scroll -> "far away")
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true,
                    }
                });
            }

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Canvas fade-in animation
    const [canvasOpacity, setCanvasOpacity] = useState(0);
    useEffect(() => {
        // Simple delay to let Three.js init then fade in
        const t = setTimeout(() => setCanvasOpacity(1), 500);
        return () => clearTimeout(t);
    }, []);

    return (
        <section ref={containerRef} className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]">

            {/* 3D Scene Background */}
            <div ref={canvasRef} className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out`} style={{ opacity: canvasOpacity }}>
                {/* 
                  dpr: Device Pixel Ratio optimization (1 to 2 is good balance).
                  gl: preserveDrawingBuffer not strictly needed but good for some fx.
                */}
                <Canvas
                    camera={{ position: [0, 0, 15], fov: 75 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Constellation />
                    </Float>
                </Canvas>
            </div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 pointer-events-none z-[1] opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center pointer-events-none">
                {/* Status Badge */}
                <div ref={badgeRef} className="opacity-0 translate-y-[-20px] relative inline-flex overflow-hidden rounded-full p-[1px]">
                    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#ffffff_50%,#000000_100%)] opacity-40" />
                    <div className="relative flex h-full items-center gap-2 rounded-full bg-[#050505] px-4 py-1.5 backdrop-blur-3xl border border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-medium text-neutral-300 tracking-wide">Available for freelance</span>
                    </div>
                </div>

                {/* Main Text */}
                <h1
                    ref={titleRef}
                    className="font-sans text-5xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl overflow-hidden leading-[1.1]"
                >
                    MATTÉO ROSSI
                </h1>

                <p className="hero-subtitle max-w-xl text-xl text-neutral-400 sm:text-2xl font-mono">
                    Creative Developer & Full-stack Architect
                </p>

                <div className="hero-cta-anim mt-8 flex flex-col gap-4 sm:flex-row pointer-events-auto">
                    <MagneticButton>
                        <button className="rounded-full bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 sm:text-base">
                            Available for work
                        </button>
                    </MagneticButton>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-75 mix-blend-difference z-10 pointer-events-none">
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
             `}</style>
        </section>
    );
}

