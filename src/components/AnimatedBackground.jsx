import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import "./AnimatedBackground.css";

function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMove = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div className="animated-bg reduced-motion">
        <div className="mesh-gradient-static"></div>
        <div className="grid-overlay-static"></div>
        <div className="noise-layer"></div>
      </div>
    );
  }

  return (
    <div className="animated-bg">
      {/* 1. Base color is defined by page CSS */}
      
      {/* 2. Grid overlay (masked, faded at edges) */}
      <div className="grid-overlay"></div>

      {/* 3. Orbs (3, staggered timing, one cool accent color) */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* 4. Hero focal glow (static position, behind headline) */}
      <div className="hero-glow"></div>

      {/* 5. Mouse spotlight (subtle, tracks cursor) */}
      <div className="spotlight"></div>

      {/* 6. Noise texture (film-grain feel) */}
      <div className="noise-layer"></div>
    </div>
  );
}

export default AnimatedBackground;