'use client';

import { useRef, MouseEvent } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const CreativeDevCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<HTMLElement[]>([]);

  const { contextSafe } = useGSAP(() => {
    layersRef.current = gsap.utils.toArray<HTMLElement>('[data-depth]');
  }, { scope: containerRef });

  const onMouseMove = contextSafe((e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width, height } = container.getBoundingClientRect();
    
    // Position de la souris normalisée de -1 à 1
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    
    // Animation du conteneur principal pour l'effet "tilt"
    gsap.to(container, {
      rotateY: x * 15, // Inclinaison en Y
      rotateX: -y * 15, // Inclinaison en X
      ease: 'power3.out',
      duration: 1,
    });

    // Animation des couches en parallaxe
    layersRef.current.forEach(layer => {
      const depth = parseFloat(layer.dataset.depth || '0');
      gsap.to(layer, {
        x: x * depth * 25,
        y: y * depth * 25,
        ease: 'power2.out',
        duration: 1.2,
      });
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(containerRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'elastic.out(1, 0.5)',
      duration: 1.5,
    });
    layersRef.current.forEach(layer => {
      gsap.to(layer, {
        x: 0,
        y: 0,
        ease: 'elastic.out(1, 0.5)',
        duration: 1.5,
      });
    });
  });

  return (
    <div
      ref={containerRef}
      className="w-full h-full p-6 flex flex-col justify-between"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Couches pour l'effet de parallaxe */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        {/* Couche 1: Fond */}
        <div data-depth="0.1" className="absolute inset-0 bg-blue-900/30"></div>

        {/* Couche 2: Icônes flottantes */}
        <Image
          data-depth="0.2"
          src="/globe.svg"
          alt="Globe"
          width={80}
          height={80}
          className="absolute top-1/4 left-1/4 opacity-30"
        />
        <Image
          data-depth="0.4"
          src="/window.svg"
          alt="Window"
          width={100}
          height={100}
          className="absolute top-1/2 left-1/2 opacity-40 -translate-x-1/2 -translate-y-1/2"
        />
        <Image
          data-depth="0.3"
          src="/file.svg"
          alt="File"
          width={60}
          height={60}
          className="absolute bottom-8 right-12 opacity-30"
        />
      </div>

      {/* Couche 3: Contenu texte */}
      <div data-depth="0.6" className="relative z-10">
        <h3 className="text-3xl font-bold text-neutral-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Creative & AR Dev
        </h3>
        <p className="text-neutral-300 mt-2">
          Experiences that merge pixels and reality.
        </p>
      </div>

      {/* Couche 4: Indicateur (ex: "Live") */}
      <div data-depth="0.2" className="relative z-10 self-end">
         <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm font-medium">Live Interaction</span>
          </div>
      </div>
    </div>
  );
};

export default CreativeDevCard;