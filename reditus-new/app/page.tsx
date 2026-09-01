import Navbar from "@/components/Navbar";
import CinematicBackground from "@/components/CinematicBackground";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Metrics from "@/components/Metrics";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CinematicBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Manifesto />
        <Services />
        <Process />
        <Projects />
        <Metrics />
        <Pricing />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
