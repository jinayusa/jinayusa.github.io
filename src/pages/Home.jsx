// src/pages/Home.jsx
import "../pages/PageStyles.css";
import Hero from "../components/Hero";
import AboutMe from "./AboutMe";
import Projects from "./Projects";
import Experience from "./Experience";
import ContactSection from "../components/ContactSection";
import Watermark from "../components/Watermark";
import Credits from "../components/Credits";
import Skills from "./Skills";
export default function Home() {
  return (
    <main>
      {/* SECTION 1 – HERO (transparent) */}
      <section id="hero" className="section-block section-bg-none">
        <Hero />
      </section>

      {/* SECTION 2 – ABOUT ME */}
      <section id="about" className="section-block section-bg-none">
        <AboutMe showEducation={true} />
      </section>

      {/* SECTION 3 – skills */}
      <section id="skills" className="section-block section-bg-none">
        <Skills  />
      </section>
      
      {/* SECTION 4 – Projects */}
      <section id="projects" className="section-block section-bg-none">
        <Projects  />
      </section>
      
      {/* SECTION 5 – Experience */}
      <section id="experience" className="section-block section-bg-none">
        <Experience />
      </section>

      {/* SECTION 6 – CONTACT */}
      <section id="contact" className="section-block section-bg-none">
        <ContactSection />
      </section>
      <Credits />
    </main>
  );
}
