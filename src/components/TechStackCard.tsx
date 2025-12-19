'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'GSAP', 'Framer Motion', 'Unity', 'AR'
];

const TechStackCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const techs = gsap.utils.toArray('.tech-item');

    techs.forEach((tech: any) => {
      gsap.set(tech, {
        position: 'absolute',
        left: '50%',
        top: '50%',
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      tl.to(tech, {
        x: gsap.utils.random(-100, 100, 10),
        y: gsap.utils.random(-50, 50, 5),
        rotation: gsap.utils.random(-20, 20),
        duration: gsap.utils.random(15, 25),
        ease: 'power1.inOut',
      });
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      {techStack.map((tech) => (
        <div
          key={tech}
          className="tech-item text-neutral-400 text-lg font-medium py-1 px-3 border border-neutral-700 bg-neutral-800/50 rounded-full"
        >
          {tech}
        </div>
      ))}
    </div>
  );
};

export default TechStackCard;
