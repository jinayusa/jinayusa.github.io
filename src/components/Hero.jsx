// src/pages/Hero.jsx
import AnimatedRoleType from "./AnimatedRoleType";
import MonitorScreen from "../pages/MonitorScreen";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden min-h-[70vh]
                 px-4 sm:px-10 lg:px-16 py-16 sm:py-24"
    >
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-100">
        {/* Left: Text */}
        <div className="relative lg:col-span-7">
          {/* Name Tag */}
          <span
            className="absolute -top-6 sm:-top-8 text-sm tracking-[0.35em]
                       text-gray-700 dark:text-gray-400 select-none"
          >
            Jinay&nbsp;Shah
          </span>

          {/* Primary Role */}
          <h1 className="text-4xl sm:text-5xl lg:text-[5rem] font-extrabold leading-tight
                         text-gray-900 dark:text-white break-words mt-10 sm:mt-6">
            Engineer
            <span className="block h-px w-full max-w-xl bg-white/30 mt-5" />
          </h1>

          {/* + Plus + Animated Title */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 pl-1 sm:pl-4 mt-4">
            <span
              className="text-4xl sm:text-5xl lg:text-[5rem] font-extrabold
                         text-gray-600 dark:text-gray-400"
              aria-hidden
            >
              +
            </span>

            <AnimatedRoleType
              words={["Data Scientist", "Backend", "Fullstack", "AI Engineer", "Frontend"]}
              typeSpeed={110}
              eraseSpeed={60}
              pause={1800}
              className="text-4xl sm:text-5xl lg:text-[5rem] font-extrabold leading-tight
                         text-gray-900 dark:text-white whitespace-nowrap"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
