"use client";

import SaaSMasterCard from "../bento/SaaSMasterCard";
import ARCard from "../bento/ARCard";
import ArchitectureCard from "../bento/ArchitectureCard";
import AutomationCard from "../bento/AutomationCard";
import CreativeInterfacesCard from "../bento/CreativeInterfacesCard";

export default function BentoGrid() {
    return (
        <section className="container mx-auto max-w-7xl px-4 py-32">
            <div className="mb-16">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">Expertise & Stratégie</h2>
                <p className="mt-4 text-lg text-muted-foreground">Comprehensive solutions for modern digital problems.</p>
            </div>

            {/* 
         Structure:
         Row 1: SaaS (2x2) | AR (1x2) | Architecture (1x2)
         Row 2: SaaS (..cont) | AR (..cont) | Architecture (..cont)
         Row 3: Automation (2x1) | Creative (2x1)
       */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(180px,auto)] gap-4 lg:gap-6">

                {/* Main SaaS Card - Big focus */}
                <SaaSMasterCard />

                {/* Vertical Pillars */}
                <ARCard />
                <ArchitectureCard />

                {/* Bottom Row Fillers */}
                <div className="col-span-1 md:col-span-2 row-span-1">
                    <AutomationCard />
                </div>
                <div className="col-span-1 md:col-span-2 row-span-1">
                    <CreativeInterfacesCard />
                </div>
            </div>
        </section>
    );
}
