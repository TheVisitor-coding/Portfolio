'use client';

import { useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const MagneticButton = ({ children, className, onClick }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const onMouseMove = contextSafe((e: MouseEvent) => {
    const button = buttonRef.current;
    if (!button) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = button.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);

    gsap.to(button, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.8,
      ease: 'power4.out',
    });
    
    gsap.to(textRef.current, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 1,
      ease: 'power4.out',
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to([buttonRef.current, textRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.6)',
    });
  });

  return (
    <button
      ref={buttonRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative rounded-full bg-blue-600 text-white px-8 py-4 transition-colors duration-300 hover:bg-blue-500 ${className}`}
    >
      <span ref={textRef} className="inline-block">
        {children}
      </span>
    </button>
  );
};

export default MagneticButton;
