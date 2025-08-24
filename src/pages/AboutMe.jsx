// src/pages/AboutMe.jsx

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeading from "../components/SectionHeading";

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
        if (ref.current) ref.current.textContent = resultArray.join("");
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

  // Animations for Education items
  const eduContainer = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.08 },
    },
  };
  const eduItem = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-transparent flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,40%)] gap-12 px-4 sm:px-8 ml-7 sm:ml-0 lg:ml-7">
        {/* LEFT ───────────────────────── */}
        <motion.article
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          className="max-w-none mx-auto -mt-4 sm:-mt-10 px-2 sm:px-0"
        >
          {/* Frosted, transparent background for readability */}
          <div
            className="
              rounded-2xl
              bg-white/45 dark:bg-zinc-900/40
              backdrop-blur-sm backdrop-saturate-125
              border border-white/40 dark:border-white/10
              shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)]
              p-6 sm:p-8
            "
          >
            <div className="flex flex-col gap-6 text-center sm:text-left">
              <h2
                ref={cryptoRef}
                className="text-5xl font-extrabold mb-2 text-gray-900 dark:text-white"
              >
                Namaste
              </h2>

              <p className="text-gray-800 dark:text-gray-200">
                I’m Jinay Shah, the engineer teams call when
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> data is stubborn </span>
                and
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> decisions cannot wait</span>.
                I combine
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> product curiosity </span>
                with
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> backend grit </span>
                to turn half-formed ideas into
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> dependable systems </span>
                that move
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> real metrics</span>.
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">Decision Theater, Arizona State University</span>:
                Re-architected two flagship analytics engines, cutting
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> API latency </span>
                from 250 ms to 100 ms, enabling more than
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 2,000 policymakers </span>
                to test drought and trade scenarios during live workshops, trimming planning cycles by
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 30 percent</span>.
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">KiVee Softech</span>:
                Led a <span className="font-semibold text-cyan-500 dark:text-cyan-400">voice-biometrics rescue</span> for a banking client.
                By retraining on call-center noise, reduced false rejections
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 20 percent </span>
                and cut support tickets
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 35 percent</span>, securing the annual contract value.
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                <span className="font-semibold text-cyan-600 dark:text-cyan-400">Kintu Designs</span>:
                Replaced a rule-based nutrition chatbot with an
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> NLP pipeline </span>
                learning from
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 100,000 daily user interactions</span>,
                improving diet match rates by
                <span className="font-semibold text-cyan-500 dark:text-cyan-400"> 40 percent</span> and launching a new subscription tier.
              </p>

              <ul className="list-disc pl-6 text-gray-800 dark:text-gray-200">
                <li>
                  Translate <span className="font-semibold text-cyan-500 dark:text-cyan-400">latency charts</span> and
                  <span className="font-semibold text-cyan-500 dark:text-cyan-400"> model confusion matrices</span> into stories executives use to approve roadmaps.
                </li>
                <li>
                  <span className="font-semibold text-cyan-500 dark:text-cyan-400">Prototype early</span> and demo often,
                  aligning <span className="font-semibold text-cyan-500 dark:text-cyan-400">product, design, and ops</span> before code hits production.
                </li>
                <li>
                  Own <span className="font-semibold text-cyan-500 dark:text-cyan-400">post-mortems without spin</span>,
                  adding <span className="font-semibold text-cyan-500 dark:text-cyan-400">observability</span> and
                  <span className="font-semibold text-cyan-500 dark:text-cyan-400"> regression tests</span> to expedite the next release.
                </li>
              </ul>

              <p className="text-gray-800 dark:text-gray-200">
                Python, FastAPI, Kafka, Redis, Java, Spring Boot, PostgreSQL, AWS, Docker, Kubernetes,
                TensorFlow, GitHub Actions.
              </p>

              <p className="text-gray-800 dark:text-gray-200">
                Mentor junior developers, sketch <span className="font-semibold text-cyan-500 dark:text-cyan-400">system diagrams</span> on café napkins, and chase the perfect espresso shot.
              </p>

              <p className="text-gray-900 dark:text-gray-100 font-semibold">
                If your challenge needs equal parts curiosity, clear metrics, and production-grade code, let’s talk.
              </p>
            </div>
          </div>
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
          <div className="relative isolate w-full aspect-square mt-[30%]">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute -top-6 flex items-center gap-4"
            >
              <span className="relative block h-[2px] w-32 bg-cyan-400" />
              <span className="text-cyan-400 tracking-wide uppercase text-sm">About&nbsp;me</span>
            </motion.div>

            <span
              className="hidden sm:block absolute top-[50%] right-0 translate-x-[70%] -translate-y-1/2 
                          font-extrabold text-black/20 dark:text-white/20 
                          text-[min(15vw,7rem)] sm:text-[min(17vw,17rem)]
                          leading-none select-none z-40"
              style={{ pointerEvents: "none" }}
              aria-hidden
            >
              지나이
            </span>

            <img
              src="/assets/jinay.JPEG"
              alt="Jinay standing outdoors"
              className="relative z-10 w-full aspect-square object-cover rounded-lg shadow-lg"
            />

            <p className="mt-2 text-center text-gray-800 dark:text-white text-[10px] font-normal tracking-wide opacity-90">
              Software Developer <span className="text-cyan-600 dark:text-cyan-400">@ ASU Decision Theater Network</span>
            </p>
          </div>

          {/* EDUCATION — Modern timeline cards */}
          {showEducation && (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full bg-transparent mt-28 sm:mt-36 pt-16 sm:pt-20 px-2 sm:px-0"
          >
            <SectionHeading
              label="Background"
              title="Education"
              subtitle="The journey that shaped my technical foundation."
              align="center"
            />

            <div className="grid gap-6 sm:gap-8 max-w-2xl mx-auto mt-8">
              {/* Arizona State University */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 sm:gap-6 rounded-2xl 
                          bg-white/60 dark:bg-white/10 backdrop-blur-xl
                          border border-white/30 dark:border-white/10 
                          shadow-md hover:shadow-xl transition p-5 sm:p-6"
              >
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl 
                                bg-gradient-to-br from-cyan-500 to-emerald-500 
                                text-white font-bold grid place-items-center text-lg">
                  ASU
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Arizona State University
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    MS in Information Technology · 2023–2025 · Tempe, AZ
                  </p>
                </div>

                <span className="ml-auto text-xs px-2 py-1 rounded-full 
                                bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 
                                border border-emerald-500/25">
                  GPA 4.0
                </span>
              </motion.div>

              {/* Uka Tarsadia University */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-4 sm:gap-6 rounded-2xl 
                          bg-white/60 dark:bg-white/10 backdrop-blur-xl
                          border border-white/30 dark:border-white/10 
                          shadow-md hover:shadow-xl transition p-5 sm:p-6"
              >
                <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl 
                                bg-gradient-to-br from-zinc-700 to-zinc-900 
                                text-white font-bold grid place-items-center text-lg">
                  UTU
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Uka Tarsadia University
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                    B.E. in Computer Engineering · 2018–2021 · Surat, India
                  </p>
                </div>

                <span className="ml-auto text-xs px-2 py-1 rounded-full 
                                bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 
                                border border-emerald-500/25">
                  GPA 3.63
                </span>
              </motion.div>
            </div>
          </motion.section>
        )}

        </motion.div>
      </div>
    </section>
  );
}
