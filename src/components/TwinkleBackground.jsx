import { useMemo, useEffect, useState } from "react";

export default function TwinkleBackground({
  starCount = 280,
  minSize = 1,
  maxSize = 2,
  driftSpeed = 30, // lower is slower
  interval = 5000, // constellation switch
}) {
  const patterns = {
    CODE: [
      "  #   #   ",
      "   # #    ",
      "    #     ",
      "   # #    ",
      "  #   #   ",
    ],
    PEACE: [
      " #      #  ",
      "  #   #    ",
      "  ## # ##  ",
      "   #####   ",
      "    # #    ",
    ],
    BULB: [
      "   ###    ",
      "  #   #   ",
      "  #   #   ",
      "   ###    ",
      "   ###    ",
      "    #     ",
    ],
    BRAIN: [
      " ######   ",
      "# ##  ##  ",
      "# ##  ##  ",
      "# ##  ##  ",
      " ######   ",
    ],
    HEART: [
        " #   # ",
        "### ###",
        "#######",
        " ##### ",
        "  ###  ",
        "   #   ",
    ],
    SMILE: [
        "       ",
        " #   # ",
        "       ",
        "       ",
        " #   # ",
        "  ###  ",
    ],
  };

  const patternKeys = Object.keys(patterns);
  const [currentPattern, setCurrentPattern] = useState(0);

  // Floating stars with random drift
  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => ({
        startTop: Math.random() * 100,
        startLeft: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        driftX: Math.random() * 10 - 5,
        driftY: Math.random() * 10 - 5,
        duration: Math.random() * driftSpeed + driftSpeed,
        delay: Math.random() * driftSpeed,
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [starCount, minSize, maxSize, driftSpeed]
  );

  // Change constellation shape
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPattern((p) => (p + 1) % patternKeys.length);
    }, interval);
    return () => clearInterval(timer);
  }, [patternKeys.length, interval]);

  // Convert current pattern to dot stars
  const getConstellationStars = (key, scale = 2.2) => {
    const pattern = patterns[key];
    const topOffset = 20 + Math.random() * 40;
    const leftOffset = 10 + Math.random() * 60;
    const result = [];

    for (let y = 0; y < pattern.length; y++) {
      for (let x = 0; x < pattern[y].length; x++) {
        if (pattern[y][x] === "#") {
          result.push({
            top: topOffset + y * scale,
            left: leftOffset + x * scale,
            size: 2.5,
            opacity: 1,
          });
        }
      }
    }
    return result;
  };

  const constellationStars = getConstellationStars(patternKeys[currentPattern]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white dark:bg-black">
      {/* Floating drift stars */}
      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute rounded-full bg-black dark:bg-white"
          style={{
            top: `${s.startTop}vh`,
            left: `${s.startLeft}vw`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `drift ${s.duration}s linear ${s.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Constellation dots */}
      {constellationStars.map((s, i) => (
        <span
          key={`constellation-${i}`}
          className="absolute rounded-full bg-black dark:bg-white transition-all duration-1000"
          style={{
            top: `${s.top}vh`,
            left: `${s.left}vw`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
