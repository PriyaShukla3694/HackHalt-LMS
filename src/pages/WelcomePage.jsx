import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/WelcomePage.css";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="welcome-page"
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Navbar */}

      <nav className="navbar">
        <h2 className="logo">SHOURYA</h2>

        <div className="nav-buttons">
          <button
            onClick={() => navigate("/login")}
            className="nav-btn"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="nav-btn register"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero */}

      <div className="hero">

        <div className="hero-left">

          <p className="small-text">
            TIMELESS WISDOM • FUTURE SKILLS
          </p>

          <h1>
            Empower Your
            <br />
            Learning Journey
          </h1>

          <p className="description">
            A modern learning platform designed to help
            learners acquire skills, gain knowledge,
            and build expertise through structured
            educational experiences.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Start Learning
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/register")}
            >
              Create Account
            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="hero-right">

          <div className="prism-glow"></div>

          <div className="prism-container">

            <div className="prism"></div>

          </div>

        </div>

      </div>
    </motion.div>
  );
}

export default WelcomePage;