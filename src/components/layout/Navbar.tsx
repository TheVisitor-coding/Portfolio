"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show navbar when scrolled past 100vh
        const showNav = () => {
            if (window.scrollY > window.innerHeight) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", showNav);
        return () => window.removeEventListener("scroll", showNav);
    }, []);

    useEffect(() => {
        if (isVisible) {
            gsap.to(".nav-capsule", {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            gsap.to(".nav-capsule", {
                y: -100,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            });
        }
    }, [isVisible]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
            <nav className="nav-capsule pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-2 py-2 opacity-0 backdrop-blur-xl -translate-y-24 shadow-lg shadow-purple-500/10 transition-shadow hover:shadow-purple-500/20">

                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                </button>

                <div className="h-4 w-[1px] bg-white/10 mx-2" />

                <button onClick={() => scrollToSection('works')} className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">Works</button>
                <button onClick={() => scrollToSection('stack')} className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">Stack</button>
                <button onClick={() => scrollToSection('contact')} className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">Contact</button>

                <a
                    href="https://calendly.com/matteorossiroy/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="ml-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-neutral-200 transition-colors"
                >
                    Book
                </a>
            </nav>
        </div>
    );
}
