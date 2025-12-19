"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

// Organic "Thinking" Particles
function SynapseField({ count = 1500 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const noise3D = useMemo(() => createNoise3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            // Sphere distribution
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos((Math.random() * 2) - 1);
            const radius = 20 + Math.random() * 5;

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
            // Organic noise movement
            const noise = noise3D(particle.x * 0.05, particle.y * 0.05, time * 0.2);
            const scale = 1 + noise * 0.5;

            // Breathing effect
            const breath = Math.sin(time * 0.5) * 0.5;

            dummy.position.set(
                particle.originalX + Math.sin(time + i) * 0.5,
                particle.originalY + Math.cos(time + i) * 0.5,
                particle.originalZ + Math.sin(time * 0.5 + i) * 0.5
            );

            const s = Math.max(0.1, scale + breath);
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s, s, s);
            dummy.updateMatrix();

            mesh.current!.setMatrixAt(i, dummy.matrix);
            // Dynamic color based on noise
            const color = new THREE.Color();
            // Blue/Purple synapse shift
            color.setHSL(0.6 + noise * 0.1, 0.8, 0.6);
            mesh.current!.setColorAt(i, color);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;

        // Slight rotation of the whole cloud
        mesh.current.rotation.y = time * 0.05;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <icosahedronGeometry args={[0.15, 0]} />
            <meshStandardMaterial transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
}

export default function Experience() {
    return (
        <section className="relative h-[60vh] w-full overflow-hidden bg-background">
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 50], fov: 60 }} gl={{ antialias: true }}>
                    {/* Ambient context */}
                    <fog attach="fog" args={['#000', 30, 80]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[20, 20, 20]} intensity={2} color="#4f46e5" />
                    <pointLight position={[-20, -20, -20]} intensity={2} color="#a855f7" />

                    <SynapseField count={1000} />
                </Canvas>
            </div>

            <div className="pointer-events-none relative z-10 flex h-full items-center justify-center text-center">
                <div className="max-w-2xl px-6">
                    {/* Decorative line */}
                    <div className="mx-auto mb-6 h-12 w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />

                    <h2 className="text-3xl font-light tracking-wide text-white/90 sm:text-5xl font-serif italic">
                        "Cognitive Resonance"
                    </h2>
                    <p className="mt-4 text-sm font-light text-neutral-400 uppercase tracking-widest">
                        Bridging Imagination & Logic
                    </p>
                </div>
            </div>
        </section>
    );
}
