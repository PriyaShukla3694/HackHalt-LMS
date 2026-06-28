import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiMenu,
  FiX,
  FiSearch,
  FiTrendingUp,
  FiCode,
  FiBarChart2,
  FiArrowRight,
  FiCloud,
  FiZap,
  FiShield,
  FiShare2,
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

import "../styles/WelcomePage.css";

const NAV_LINKS = [
  { label: "Courses", target: "home" },
  { label: "Features", target: "features" },
  { label: "Pricing", target: "pricing" },
  { label: "About", target: "footer" },
];

const TRUSTED_LOGOS = [
  { name: "SkyNet", icon: FiCloud },
  { name: "GreenLife", icon: FaLeaf },
  { name: "VoltSync", icon: FiZap },
  { name: "Fortis", icon: FiShield },
  { name: "Nexus", icon: FiShare2 },
];

const FEATURES = [
  {
    icon: FiTrendingUp,
    title: "Built for Scale",
    description:
      "Whether you have 10 learners or 10,000, our infrastructure expands with your ambitions without missing a beat.",
    link: "Learn more",
  },
  {
    icon: FiCode,
    title: "Seamless Integration",
    description:
      "Connect with Zoom, Slack, Stripe and 2,000+ other apps to automate your entire learning ecosystem.",
    link: "View APIs",
  },
  {
    icon: FiBarChart2,
    title: "Advanced Analytics",
    description:
      "Gain deep insight into learner performance and engagement with real-time data visualization and reports.",
    link: "Explore data",
  },
];

function WelcomePage() {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("Courses");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id, label) => {
    setActiveLink(label);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="welcome-page">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo-section">
          <span className="logo">Shourya</span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={`#${link.target}`}
              className={activeLink === link.label ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(link.target, link.label);
              }}
            >
              {link.label}
            </a>
          ))}

          <div className="mobile-auth">
            <button className="signin-link" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button className="get-started-btn" onClick={() => navigate("/register")}>
              Get Started
            </button>
          </div>
        </div>

        <div className="top-actions">
          <button className="signin-link" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="get-started-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>

        <button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* HERO */}
      <section className="hero-section" id="home">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="eyebrow-badge">NEXT-GEN LMS PLATFORM</span>

          <h1>
            Master Your Future
            <br />
            with Shourya
          </h1>

          <p className="hero-description">
            The all-in-one platform for modern learning and course
            management. Empower your educators, engage your students and
            scale your curriculum with ease.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Start Free Trial
            </button>
            <button
              className="btn-outline"
              onClick={() => scrollToSection("features", "Features")}
            >
              View Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
        >
          <div className="mockup-frame">
            <div className="mockup-card">
              <div className="mockup-topbar">
                <span className="mockup-dot" />
                <span className="mockup-title">INTEXIA Dashboard</span>
                <FiSearch className="mockup-search" />
              </div>

              <div className="mockup-progress" />

              <div className="mockup-body">
                <div className="mockup-list">
                  <div className="mockup-row">
                    <span className="mockup-bar" style={{ width: "70%" }} />
                    <span className="mockup-tag">85%</span>
                  </div>
                  <div className="mockup-row">
                    <span className="mockup-bar" style={{ width: "45%" }} />
                    <span className="mockup-tag">62%</span>
                  </div>
                  <div className="mockup-row">
                    <span className="mockup-bar" style={{ width: "58%" }} />
                    <span className="mockup-tag">71%</span>
                  </div>
                  <div className="mockup-row">
                    <span className="mockup-bar" style={{ width: "32%" }} />
                    <span className="mockup-tag">40%</span>
                  </div>
                </div>

                <div className="mockup-chart">
                  {[40, 65, 30, 80, 55, 95, 70].map((h, i) => (
                    <span key={i} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TRUSTED BY */}
      <section className="trusted-section">
        <p className="trusted-label">TRUSTED BY GLOBAL LEADERS</p>
        <div className="trusted-row">
          {TRUSTED_LOGOS.map(({ name, icon: Icon }) => (
            <span className="trusted-item" key={name}>
              <Icon />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <motion.div
          className="features-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Everything you need to grow</h2>
          <p>
            Powering the next generation of online education with tools that
            make learning intuitive and administration effortless.
          </p>
        </motion.div>

        <div className="features-grid">
          {FEATURES.map(({ icon: Icon, title, description, link }, i) => (
            <motion.div
              className="feature-card"
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="feature-icon">
                <Icon />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
              <a
                href="#features"
                className="feature-link"
                onClick={(e) => e.preventDefault()}
              >
                {link} <FiArrowRight />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-wrapper" id="pricing">
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to transform your education?</h2>
          <p>
            Join thousands of educators and organizations delivering
            world-class learning experiences with INTEXIA.
          </p>
          <button className="btn-primary" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">INTEXIA</span>
            <p>© 2026 Shourya. Empowering modern education.</p>
          </div>

          <div className="footer-links">
            <a href="#footer" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a href="#footer" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="#footer" onClick={(e) => e.preventDefault()}>
              Contact Support
            </a>
            <a href="#footer" onClick={(e) => e.preventDefault()}>
              Careers
            </a>
            <a href="#footer" onClick={(e) => e.preventDefault()}>
              API Docs
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WelcomePage;