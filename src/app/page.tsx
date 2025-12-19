import SmoothScroll from "@/components/layout/SmoothScroll";
import Hero from "@/components/sections/Hero";
import Tools from "@/components/sections/Tools";
import BentoGrid from "@/components/sections/BentoGrid";
import Projects from "@/components/sections/Projects";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="flex min-h-screen flex-col bg-background">
        <Hero />

        <div className="relative z-10 space-y-24 pb-24">
          <BentoGrid />
          <Tools />
          <Projects />
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
