"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

// Organic "Thinking" Particles
function SynapseField({ count = 1000 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 15 + Math.random() * 10; // Slightly tighter radius

            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);

            temp.push({ x, y, z, originalX: x, originalY: y, originalZ: z });
        }
        return temp;
    }, [count]);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!mesh.current) return;
        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            const noise = noise3D(particle.x * 0.08, particle.y * 0.08, time * 0.3);
            const scale = 1 + noise * 0.8;

            const breath = Math.sin(time * 0.5) * 0.5;

            dummy.position.set(
                particle.originalX + Math.sin(time + i) * 0.5,
                particle.originalY + Math.cos(time + i) * 0.5,
                particle.originalZ + Math.sin(time * 0.5 + i) * 0.5
            );

            const s = Math.max(0.2, scale + breath); // Minimum scale increased
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s, s, s);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);

            // Much brighter colors
            const color = new THREE.Color();
            // Cyan to Purple shift, high lightness
            color.setHSL(0.6 + noise * 0.2, 0.9, 0.7);
            mesh.current!.setColorAt(i, color);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;

        mesh.current.rotation.y = time * 0.1;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.2, 0]} />
            {/* MeshBasicMaterial is self-illuminated, better for visibility */}
            <meshBasicMaterial transparent opacity={0.6} blending={THREE.AdditiveBlending} toneMapped={false} />
        </instancedMesh>
    );
}

export default function Experience() {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 40], fov: 60 }} gl={{ antialias: true }}>
                    <fog attach="fog" args={['#000', 30, 90]} />
                    {/* Added ambient light just in case, though MeshBasic ignores it */}
                    <ambientLight intensity={1} />
                    <SynapseField count={1200} />
                </Canvas>
            </div>

            <div className="pointer-events-none relative z-10 flex h-full items-center justify-center text-center">
                <div className="max-w-2xl px-6 mix-blend-difference">
                    <div className="mx-auto mb-6 h-12 w-[1px] bg-white" />

                    <h2 className="text-3xl font-light tracking-wide text-white sm:text-5xl font-serif italic drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        "Cognitive Resonance"
                    </h2>
                    <p className="mt-4 text-sm font-bold text-white uppercase tracking-widest drop-shadow-md">
                        Bridging Imagination & Logic
                    </p>
                </div>
            </div>
        </section>
    );
}
