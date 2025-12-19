'use client';

import { useRef, MouseEvent } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const connections: Record<string, string[]> = {
  'node-trigger': ['path-trigger-action', 'path-trigger-check'],
  'node-action': ['path-trigger-action', 'path-action-notify'],
  'node-notify': ['path-action-notify'],
  'node-check': ['path-trigger-check'],
};

const AutomationCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<Record<string, { length: number; path: SVGPathElement }>>({});

  useGSAP(() => {
    const paths = gsap.utils.toArray<SVGPathElement>('path');
    paths.forEach(path => {
      const length = path.getTotalLength();
      pathsRef.current[path.id] = { length, path };
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    });
  }, { scope: containerRef });

  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleNodeHover = contextSafe((e: MouseEvent<SVGGElement>) => {
    const nodeId = e.currentTarget.id;
    const connectedPaths = connections[nodeId] || [];

    connectedPaths.forEach(pathId => {
      const pathInfo = pathsRef.current[pathId];
      if (pathInfo) {
        gsap.to(pathInfo.path, {
          strokeDashoffset: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    });

    gsap.to(`#${nodeId}`, { scale: 1.2, duration: 0.3, transformOrigin: '50% 50%' });
  });

  const handleNodeLeave = contextSafe((e: MouseEvent<SVGGElement>) => {
    const nodeId = e.currentTarget.id;
    const connectedPaths = connections[nodeId] || [];

    connectedPaths.forEach(pathId => {
      const pathInfo = pathsRef.current[pathId];
      if (pathInfo) {
        gsap.to(pathInfo.path, {
          strokeDashoffset: pathInfo.length,
          duration: 0.5,
          ease: 'power1.in',
        });
      }
    });

    gsap.to(`#${nodeId}`, { scale: 1, duration: 0.3, transformOrigin: '50% 50%' });
  });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-neutral-200">Automation</h3>
        <p className="text-neutral-400 mt-2 text-sm">
          Création de workflows dynamiques et interactifs.
        </p>
      </div>
      <div className="relative w-full h-48 mt-4">
        <svg
          className="w-full h-full"
          viewBox="0 0 300 150"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Paths (initially hidden) */}
          <path id="path-trigger-action" d="M60 50 H 240" stroke="currentColor" className="text-blue-400" strokeWidth="2" />
          <path id="path-action-notify" d="M250 62 V 98" stroke="currentColor" className="text-green-400" strokeWidth="2" />
          <path id="path-trigger-check" d="M50 62 V 120 H 138" stroke="currentColor" className="text-yellow-400" strokeWidth="2" />

          {/* Nodes */}
          <g id="node-trigger" className="cursor-pointer" onMouseEnter={handleNodeHover} onMouseLeave={handleNodeLeave}>
            <circle cx="50" cy="50" r="12" fill="currentColor" className="text-blue-600" />
            <text x="50" y="55" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">T</text>
          </g>
           <text x="50" y="30" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Trigger</text>

          <g id="node-action" className="cursor-pointer" onMouseEnter={handleNodeHover} onMouseLeave={handleNodeLeave}>
            <circle cx="250" cy="50" r="12" fill="currentColor" className="text-green-600" />
            <text x="250" y="55" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">A</text>
          </g>
          <text x="250" y="30" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Action</text>

          <g id="node-notify" className="cursor-pointer" onMouseEnter={handleNodeHover} onMouseLeave={handleNodeLeave}>
            <circle cx="250" cy="110" r="12" fill="currentColor" className="text-purple-600" />
            <text x="250" y="115" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">N</text>
          </g>
          <text x="250" y="135" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Notify</text>
          
          <g id="node-check" className="cursor-pointer" onMouseEnter={handleNodeHover} onMouseLeave={handleNodeLeave}>
            <circle cx="150" cy="120" r="12" fill="currentColor" className="text-yellow-600" />
            <text x="150" y="125" textAnchor="middle" className="text-xs font-bold fill-white pointer-events-none">C</text>
          </g>
          <text x="150" y="145" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Check</text>
        </svg>
      </div>
    </div>
  );
};

export default AutomationCard;