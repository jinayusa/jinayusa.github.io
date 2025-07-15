// src/pages/Home.jsx
import "../pages/PageStyles.css";
import Hero from "../components/Hero";
import AboutMe from "./AboutMe";

export default function Home() {
  return (
    <main>

      {/* SECTION 1 – HERO (transparent) */}
      <section id="hero" className="section-block section-bg-none">
        <Hero />
      </section>

      {/* SECTION 2 – ABOUT ME (light background) */}
      <section id="about" className="section-block section-bg-none">
        <AboutMe showEducation={false} />
      </section>

    </main>
  );
}
