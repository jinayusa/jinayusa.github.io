// src/pages/Hero.jsx
import AnimatedRoleType from "./AnimatedRoleType";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden min-h-[60vh]
                 flex flex-col justify-center items-start
                 px-6 sm:px-12 lg:px-16"
    >
      {/* inner block now left-aligned but still vertically centered */}
      <div className="max-w-6xl">

        <span
          className="absolute top-6 text-sm tracking-[0.35em]
                     text-gray-700 dark:text-gray-400 select-none"
        >
          Jinay&nbsp;Shah
        </span>

        <h1 className="text-[min(11vw,5rem)] font-extrabold leading-none
                       text-gray-900 dark:text-white">
          Developer
          <span className="block h-px w-full max-w-xl bg-white/30 mt-5" />
        </h1>

        <div className="flex items-center gap-4 pl-4">
          <span
            className="text-[min(14vw,5rem)] font-extrabold
                       text-gray-600 dark:text-gray-400"
            aria-hidden
          >
            +
          </span>

          <AnimatedRoleType
            words={["Data Scienctist", "Backend", "Fullstack","AI Engineer", "Frontend"]}
            typeSpeed={110}
            eraseSpeed={60}
            pause={1800}
            className="text-[min(11vw,5rem)] font-extrabold leading-none
                       text-gray-900 dark:text-white whitespace-nowrap"
          />
        </div>
      </div>
    </section>
  );
}
