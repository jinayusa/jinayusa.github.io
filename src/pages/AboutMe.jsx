// src/pages/AboutMe.jsx

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import myPhoto from "../assets/jinay.JPEG";
import EducationPage from "./EducationPage"; // Make sure this is correctly defined

export default function AboutMe({ showEducation = false }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const controls = useAnimation();
  const cryptoRef = useRef(null);

  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&@!";

  function decodeText(target, ref, speed = 90) {
    let iterations = 0;
    const totalIterations = target.length;
    const resultArray = Array.from({ length: totalIterations }, () => "");

    return new Promise((resolve) => {
      const interval = setInterval(() => {
        for (let i = 0; i < target.length; i++) {
          if (i < iterations) {
            resultArray[i] = target[i];
          } else {
            resultArray[i] = characters[Math.floor(Math.random() * characters.length)];
          }
        }

        iterations += 1;

        if (ref.current) {
          ref.current.textContent = resultArray.join("");
        }

        if (iterations > totalIterations) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  }

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      decodeText("Namaste", cryptoRef);
    }
  }, [inView, controls]);

  return (
    
      <section
        id="about"
        className="relative py-24 lg:py-32 bg-transparent flex justify-center"
      >
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] gap-12 px-4 sm:px-8">
          {/* LEFT ───────────────────────── */}
          <motion.article
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="prose max-w-none mx-auto flex flex-col gap-6 -mt-4 sm:-mt-10 px-2 sm:px-0"
          >
            <h2
              ref={cryptoRef}
              className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-white"
            >
              Namaste
            </h2>

            <p className="text-gray-700 dark:text-gray-300">
              I’m Jinay Shah, the engineer teams call when <span className="font-semibold text-cyan-400">data is stubborn</span> and <span className="font-semibold text-cyan-400">decisions cannot wait</span>. I combine <span className="font-semibold text-cyan-400">product curiosity</span> with <span className="font-semibold text-cyan-400">backend grit</span> to turn half-formed ideas into <span className="font-semibold text-cyan-400">dependable systems</span> that move <span className="font-semibold text-cyan-400">real metrics</span>.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-cyan-400">Decision Theater, Arizona State University</span>: Re-architected two flagship analytics engines, cutting <span className="font-semibold text-cyan-400">API latency</span> from 250 ms to 100 ms, enabling more than <span className="font-semibold text-cyan-400">2,000 policymakers</span> to test drought and trade scenarios during live workshops, trimming planning cycles by <span className="font-semibold text-cyan-400">30 percent</span>.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-cyan-400">KiVee Softech</span>: Led a <span className="font-semibold text-cyan-400">voice-biometrics rescue</span> for a banking client. By retraining on call-center noise, reduced false rejections <span className="font-semibold text-cyan-400">20 percent</span> and cut support tickets <span className="font-semibold text-cyan-400">35 percent</span>, securing the annual contract value.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-cyan-400">Kintu Designs</span>: Replaced a rule-based nutrition chatbot with an <span className="font-semibold text-cyan-400">NLP pipeline</span> learning from <span className="font-semibold text-cyan-400">100,000 daily user interactions</span>, improving diet match rates by <span className="font-semibold text-cyan-400">40 percent</span> and launching a new subscription tier.
            </p>

            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
              <li>
                Translate <span className="font-semibold text-cyan-400">latency charts</span> and <span className="font-semibold text-cyan-400">model confusion matrices</span> into stories executives use to approve roadmaps.
              </li>
              <li>
                <span className="font-semibold text-cyan-400">Prototype early</span> and demo often, aligning <span className="font-semibold text-cyan-400">product, design, and ops</span> before code hits production.
              </li>
              <li>
                Own <span className="font-semibold text-cyan-400">post-mortems without spin</span>, adding <span className="font-semibold text-cyan-400">observability</span> and <span className="font-semibold text-cyan-400">regression tests</span> to expedite the next release.
              </li>
            </ul>

            <p className="text-gray-700 dark:text-gray-300">
              Python, FastAPI, Kafka, Redis, Java, Spring Boot, PostgreSQL, AWS, Docker, Kubernetes, TensorFlow, GitHub Actions.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Mentor junior developers, sketch <span className="font-semibold text-cyan-400">system diagrams</span> on café napkins, and chase the perfect espresso shot.
            </p>

            <p className="text-gray-700 dark:text-gray-300 font-semibold">
              If your challenge needs equal parts curiosity, clear metrics, and production-grade code, let’s talk.
            </p>
          </motion.article>

          {/* RIGHT IMAGE SECTION */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2 } },
            }}
            className="relative isolate w-full pt-8 sm:pt-[20%] aspect-square"
          >
            <div className="relative isolate w-full aspect-square">
              {/* About-me label */}
              <div className="absolute -top-6 flex items-center gap-4 pt-[20%]">
                <span className="relative block h-[2px] w-32 bg-cyan-400" />
                <span className="text-cyan-400 tracking-wide uppercase text-sm">About&nbsp;me</span>
              </div>

              {/* Background name */}
              <span
                className="absolute top-[50%] right-0 translate-x-[70%] -translate-y-1/2 
                            font-extrabold text-black/20 dark:text-white/20 
                            text-[min(15vw,7rem)] sm:text-[min(17vw,17rem)]
                            leading-none select-none z-40"
                style={{ pointerEvents: "none" }}
                aria-hidden
              >
                지나이
              </span>

              <img
                src={myPhoto}
                alt="Jinay standing outdoors"
                className="relative z-10 w-full aspect-square object-cover rounded-lg shadow-lg"
              />

              <p className="mt-2 text-center text-white text-[10px] font-normal tracking-wide opacity-90">
                Software Developer <span className="text-cyan-400">@ ASU Decision Theater Network</span>
              </p>
            </div>
            {showEducation && (
<section className="w-full bg-transparent py-20 px-4 sm:px-8 flex flex-col items-center justify-center">
  <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-white text-center tracking-tight">
    Education
  </h2>

  <div className="flex flex-col gap-8 max-w-2xl w-full">
    {/* Arizona State University */}
    <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 sm:p-8 text-white shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold mb-1">Arizona State University</h3>
      <p className="text-sm text-neutral-400 mb-1">
        MS in Information Technology • 2023–2025
      </p>
      <p className="text-sm text-neutral-400 mb-4">Tempe, AZ • GPA: 4.0</p>
   
    </div>

    {/* Uka Tarsadia University */}
    <div className="rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 p-6 sm:p-8 text-white shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold mb-1">Uka Tarsadia University</h3>
      <p className="text-sm text-neutral-400 mb-1">
        B.E. in Computer Engineering • 2018–2021
      </p>
      <p className="text-sm text-neutral-400 mb-4">Surat, India • GPA: 3.63</p>
      
    </div>
  </div>
</section>
      )}
          </motion.div>
        </div>
      </section>

      
  
  );
}
