import "./AnimatedBackground.css";

const STATIC_PARTICLES = [...Array(40)].map((_, index) => ({
  id: index,
  x: `${Math.random() * 100}%`,
  size: `${3 + Math.random() * 8}px`,
  delay: `${Math.random() * 10}s`,
  duration: `${15 + Math.random() * 15}s`,
}));

function AnimatedBackground() {
  return (
    <div className="animated-bg">
      {/* Moving Mesh */}
      <div className="mesh-gradient"></div>

      {/* Glow Blobs */}
      <div className="glow glow-1"></div>
      <div className="glow glow-2"></div>
      <div className="glow glow-3"></div>

      {/* Floating Particles */}
      <div className="particles">
        {STATIC_PARTICLES.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              "--x": p.x,
              "--size": p.size,
              "--delay": p.delay,
              "--duration": p.duration,
            }}
          />
        ))}
      </div>

      {/* Noise Texture */}
      <div className="noise-layer"></div>
    </div>
  );
}

export default AnimatedBackground;