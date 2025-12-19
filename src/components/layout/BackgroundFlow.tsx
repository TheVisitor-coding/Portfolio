"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScroll } from "framer-motion";

// Using a custom hook or direct props for scroll speed would be fine, 
// but since we want it to react to the global Lenis scroll, we can tap into it via a simple scroll listener 
// or pass it down. For simplicity in a global background, we'll listen to window scroll in the effect.

function StreamParticles({ count = 300 }) {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Random initial positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 50; // Wide spread X
            const y = (Math.random() - 0.5) * 50; // Wide spread Y
            const z = (Math.random() - 0.5) * 20; // Depth
            const speed = 0.02 + Math.random() * 0.05;
            const offset = Math.random() * 100;
            temp.push({ x, y, z, speed, offset });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        // Get scroll progress (0 to 1)
        // We can estimate max scroll or just use absolute scroll Y
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(Math.max(scrollY / (maxScroll || 1), 0), 1);

        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            // Move particles "forward" or "down" based on flow
            // We'll mimic a stream moving towards the user or sideways
            // Let's make them flow gently upwards like energy

            let yPos = particle.y + (time * particle.speed) + (scrollY * 0.01 * particle.speed);
            // Loop them
            if (yPos > 25) yPos = -25;

            // Wave motion in X
            const xWave = Math.sin(time * 0.5 + particle.offset) * 2;

            dummy.position.set(
                particle.x + xWave,
                yPos,
                particle.z
            );

            // Gentle rotation
            dummy.rotation.x = time * 0.1 + particle.offset;
            dummy.rotation.y = time * 0.1;

            const scale = (Math.sin(time + particle.offset) + 2) * 0.02; // Small particles
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current!.setMatrixAt(i, dummy.matrix);

            // Color Shift based on Scroll
            // Start: Purple/Indigo (Outer Wilds) -> End: Tech Blue/Green
            const color = new THREE.Color();

            // Interpolate Hue: 
            // Purple (~270) to Cyan (~180) to Green (~120)
            // Normalized Hue: 0.75 -> 0.4
            const startHue = 0.75; // Purple
            const endHue = 0.4;    // Greenish/Cyan

            // Linear interpolation based on scroll
            const currentHue = startHue - (scrollProgress * (startHue - endHue));

            color.setHSL(currentHue, 0.8, 0.5);
            mesh.current!.setColorAt(i, color);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
        if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshBasicMaterial transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
}

export default function BackgroundFlow() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ antialias: false, alpha: false }}>
                {/* Dark fog to blend particles into the void */}
                <fog attach="fog" args={['#000', 5, 20]} />
                <StreamParticles count={400} />
            </Canvas>
        </div>
    );
}
