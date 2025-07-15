import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar          from "./components/Navbar";
import Home            from "./pages/Home";
import AboutMe         from "./pages/AboutMe";
import Projects        from "./pages/Projects";
import Experience        from "./pages/Experience";
import Contact         from "./pages/Contact";
import TwinkleBackground from "./components/TwinkleBackground";
import SocialLinks     from "./components/SocialLinks";
import ExperienceDetailPage from "./pages/ExperienceDetailPage";
import EducationPage from "./pages/EducationPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* full-width wrapper -------------------------------------------------- */}
      <div className="w-full">

        <Navbar />

        <TwinkleBackground
          starCount={280}
          minTime={1}
          maxTime={3}
        />

        <SocialLinks />

        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/about"    element={<AboutMe showEducation={true} />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience"  element={<Experience />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/experience/:orgId" element={<ExperienceDetailPage />} />
          <Route path="/education" element={<EducationPage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}
