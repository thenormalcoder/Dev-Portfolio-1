import { useState, useEffect, Suspense, lazy } from "react";
import { ArrowUp } from "lucide-react";
import GridBackground from "@/components/background/GridBackground";
import CodeRain from "@/components/background/CodeRain";
import NeuralNetwork from "@/components/background/NeuralNetwork";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/layout/Loader";
import CustomCursor from "@/components/layout/CustomCursor";
import Hero from "@/components/sections/Hero";
import Journey from "@/components/sections/Journey";

const Projects = lazy(() => import("@/components/sections/Projects"));
const Credentials = lazy(() => import("@/components/sections/Credentials"));

function SectionSkeleton() {
  return (
    <div className="py-24 md:py-32 px-5 md:px-8" aria-hidden="true">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="mx-auto mb-16 h-8 w-48 rounded-lg bg-surface-2" />
        <div className="space-y-6">
          <div className="h-48 rounded-2xl bg-surface-2" />
          <div className="h-48 rounded-2xl bg-surface-2" />
        </div>
      </div>
    </div>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible ? (
    <button
      onClick={() =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
      aria-label="Back to top"
      className="fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-surface border border-border text-text hover:border-accent hover:text-accent transition-colors shadow-lg flex items-center justify-center"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 1.25rem)" }}
    >
      <ArrowUp size={20} />
    </button>
  ) : null;
}

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-surface focus:border focus:border-accent focus:text-text"
      >
        Skip to content
      </a>

      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <CustomCursor />
      <GridBackground />
      <NeuralNetwork />
      <CodeRain />
      <Navbar />

      <main id="main">
        <Hero />
        <Journey />
        <Suspense fallback={<SectionSkeleton />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Credentials />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}

export default App;
