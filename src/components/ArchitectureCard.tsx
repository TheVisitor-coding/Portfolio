'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(MotionPathPlugin);

const ArchitectureCard = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const createFlow = (packet: SVGCircleElement, path: SVGPathElement, duration: number, delay: number, repeatDelay: number) => {
      const tl = gsap.timeline({
        repeat: -1,
        delay: delay,
        repeatDelay: repeatDelay,
      });
      
      tl.to(packet, {
        duration: 0.01,
        attr: { r: 2 },
        opacity: 1,
      });

      tl.to(packet, {
        motionPath: {
          path: path,
          align: path,
          alignOrigin: [0.5, 0.5],
        },
        duration: duration,
        ease: 'power1.inOut',
      });
      
      tl.to(packet, {
        duration: 0.01,
        opacity: 0,
        attr: { r: 0 },
      });
    };

    const svg = svgRef.current;
    if (!svg) return;

    const [packet1, packet2, packet3] = gsap.utils.toArray<SVGCircleElement>('.flow-packet');
    const pathClientApi = svg.querySelector<SVGPathElement>('#path-client-api');
    const pathApiDb = svg.querySelector<SVGPathElement>('#path-api-db');
    const pathApiCache = svg.querySelector<SVGPathElement>('#path-api-cache');

    if (packet1 && pathClientApi) createFlow(packet1, pathClientApi, 2.5, 0, 1);
    if (packet2 && pathApiDb) createFlow(packet2, pathApiDb, 2, 0.5, 2);
    if (packet3 && pathApiCache) createFlow(packet3, pathApiCache, 1.5, 1, 0.5);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-2xl font-semibold text-neutral-200">Architecture</h3>
        <p className="text-neutral-400 mt-2 text-sm">
          Visualisation de flux de données robustes et scalables.
        </p>
      </div>
      <div className="relative w-full h-48 mt-4">
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 300 150"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Paths */}
          <path id="path-client-api" d="M40 75 C 80 75, 100 40, 138 40" stroke="rgba(128,128,128,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <path id="path-api-db" d="M162 40 C 200 40, 220 75, 260 75" stroke="rgba(128,128,128,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          <path id="path-api-cache" d="M150 52 V 98" stroke="rgba(128,128,128,0.3)" strokeWidth="1" strokeDasharray="3 3" />
          
          {/* Nodes */}
          <circle cx="30" cy="75" r="10" fill="currentColor" className="text-blue-500" />
          <text x="30" y="105" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Client</text>

          <circle cx="150" cy="40" r="12" fill="currentColor" className="text-green-500" />
          <text x="150" y="20" textAnchor="middle" className="text-xs text-neutral-400 fill-current">API Gateway</text>
          
          <circle cx="150" cy="110" r="10" fill="currentColor" className="text-yellow-500" />
          <text x="150" y="135" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Cache</text>

          <circle cx="270" cy="75" r="10" fill="currentColor" className="text-purple-500" />
          <text x="270" y="105" textAnchor="middle" className="text-xs text-neutral-400 fill-current">Database</text>

          {/* Data Packets (to be animated) */}
          <circle className="flow-packet text-blue-300" r="0" fill="currentColor" opacity="0" />
          <circle className="flow-packet text-green-300" r="0" fill="currentColor" opacity="0" />
          <circle className="flow-packet text-yellow-300" r="0" fill="currentColor" opacity="0" />
        </svg>
      </div>
    </div>
  );
};

export default ArchitectureCard;