'use client';

import { useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils'; // Assurez-vous d'avoir un utilitaire `cn` pour fusionner les classes Tailwind

type BentoCardProps = {
  className?: string;
  children: React.ReactNode;
};

/**
 * Une carte Bento réactive et stylisée avec une bordure animée et un effet de brillance au survol.
 * L'animation d'entrée est destinée à être gérée par un conteneur parent avec GSAP et ScrollTrigger.
 */
const BentoCard = ({ className, children }: BentoCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Met à jour les propriétés CSS pour l'effet de brillance
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        // Style de base
        'bento-card relative w-full h-full p-6 bg-[#101010] border border-transparent rounded-2xl overflow-hidden',
        // Effet de bordure brillante (pseudo-élément ::before)
        "before:content-[''] before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:opacity-0",
        'before:bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(255,255,255,0.2),_transparent_40%)]',
        'hover:before:opacity-100 transition-opacity duration-300',
        // Effet de lueur de fond (pseudo-élément ::after)
        "after:content-[''] after:absolute after:inset-0 after:rounded-2xl after:opacity-0",
        'after:bg-[radial-gradient(200px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(255,255,255,0.1),_transparent_40%)]',
        'hover:after:opacity-100 transition-opacity duration-300',
        // Appliquer les classes personnalisées
        className
      )}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default BentoCard;