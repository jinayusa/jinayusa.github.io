import { memo } from "react";

/**
 * Big, faint name watermark across the page.
 * Pointer-events: none, so it never blocks clicks.
 */
export default memo(function Watermark({
  text = "Jinay Shah",
  angle = -18,               // rotation in degrees
  className = "",
}) {
  return (
    <div className={"fixed inset-0 pointer-events-none z-[1] " + className} aria-hidden>
      <div
        className="absolute inset-0 hidden md:flex items-center justify-center
                   opacity-[0.05] dark:opacity-[0.08] select-none"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        <span
          className="
            font-extrabold tracking-[0.25em]
            text-[10vw] sm:text-[8vw] lg:text-[6vw] leading-none
            text-zinc-900 dark:text-white
            mix-blend-soft-light
          "
        >
          {text.toUpperCase()} • {text.toUpperCase()} • {text.toUpperCase()}
        </span>
      </div>
    </div>
  );
});
