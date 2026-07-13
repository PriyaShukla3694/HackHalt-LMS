import "./AnimatedBackground.css";

function AnimatedBackground() {

  const particles = [...Array(40)];

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

        {particles.map((_, index) => (

          <span
            key={index}
            className="particle"
            style={{
              "--x": `${Math.random() * 100}%`,
              "--size": `${3 + Math.random() * 8}px`,
              "--delay": `${Math.random() * 10}s`,
              "--duration": `${15 + Math.random() * 15}s`,
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