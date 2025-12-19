import { Terminal, Cpu, Database, LayoutTemplate, Box, Globe, Workflow, PenTool, Gamepad2, Component } from "lucide-react";

export const Icons = {
    nextjs: Globe, // Fallback
    react: Component, // Fallback
    typescript: Terminal, // Fallback
    tailwind: LayoutTemplate, // Fallback
    gsap: Workflow, // Fallback
    nodejs: Database, // Fallback
    docker: Box, // Fallback
    figma: PenTool, // Fallback
    unity: Gamepad2, // Fallback
    threejs: Box, // Fallback

    // Utilities
    arrowRight: ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
    ),
    calendar: ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    )
};
