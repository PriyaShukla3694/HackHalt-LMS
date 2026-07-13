import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FiSearch,
  FiTrendingUp,
  FiCode,
  FiBarChart2,
  FiArrowRight,
  FiCloud,
  FiZap,
  FiShield,
  FiShare2,
  FiCheck,
  FiUsers,
  FiTarget,
  FiHeart,
  FiClock,
  FiAward,
} from "react-icons/fi";
import { FaLeaf } from "react-icons/fa";

import AuthNavbar from "../components/AuthNavbar";
import "../styles/WelcomePage.css";

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonAI from "../assets/Python.jpeg";

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

const COURSES = [
  {
    id: 1,
    title: "Cyber Security Fundamentals",
    level: "Beginner",
    lessons: 24,
    duration: "6 weeks",
    image: cyberSecurity,
  },
  {
    id: 2,
    title: "Ethical Hacking Masterclass",
    level: "Intermediate",
    lessons: 32,
    duration: "8 weeks",
    image: ethicalHacking,
  },
  {
    id: 3,
    title: "Python for AI & Automation",
    level: "Beginner",
    lessons: 28,
    duration: "7 weeks",
    image: pythonAI,
  },
];

const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    tagline: "For curious learners getting started",
    features: [
      "Access to 5 starter courses",
      "Community forum access",
      "Basic progress tracking",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹999",
    period: "/month",
    tagline: "For serious learners and professionals",
    features: [
      "Unlimited course access",
      "Verified certificates",
      "1-on-1 mentor sessions",
      "Priority support",
      "Downloadable resources",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Institution",
    price: "Custom",
    period: "",
    tagline: "For schools, colleges and organizations",
    features: [
      "Bulk student licensing",
      "Dedicated account manager",
      "Custom analytics dashboard",
      "API & LMS integrations",
      "On-demand onboarding",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

const ABOUT_STATS = [
  { icon: FiUsers, value: "12,000+", label: "Active Learners" },
  { icon: FiAward, value: "150+", label: "Expert-led Courses" },
  { icon: FiClock, value: "500K+", label: "Learning Hours Logged" },
  { icon: FiTarget, value: "94%", label: "Course Completion Rate" },
];

function WelcomePage() {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
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
      <AuthNavbar />

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
            with Intexia
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
              onClick={() => scrollToSection("courses")}
            >
              View Courses
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
                <span className="mockup-title">Intexia Dashboard</span>
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

      {/* ═══════════════ COURSES ═══════════════ */}
      <section className="courses-section" id="courses">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">OUR COURSES</span>
          <h2>Learn skills that matter</h2>
          <p>
            Hand-crafted courses in cyber security, ethical hacking and AI,
            taught by industry practitioners.
          </p>
        </motion.div>

        <div className="courses-grid">
          {COURSES.map((course, i) => (
            <motion.div
              className="course-card-public"
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="course-card-public-image">
                <img src={course.image} alt={course.title} />
                <span className="course-card-public-badge">{course.level}</span>
              </div>
              <div className="course-card-public-body">
                <h3>{course.title}</h3>
                <div className="course-card-public-meta">
                  <span>{course.lessons} Lessons</span>
                  <span className="dot">•</span>
                  <span>{course.duration}</span>
                </div>
                <button
                  className="course-card-public-btn"
                  onClick={() => navigate("/register")}
                >
                  Explore Course <FiArrowRight />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="features-section" id="features">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">FEATURES</span>
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

      {/* ═══════════════ PRICING ═══════════════ */}
      <section className="pricing-section" id="pricing">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-eyebrow">PRICING</span>
          <h2>Plans for every kind of learner</h2>
          <p>
            Start free, upgrade when you're ready, or bring your whole
            institution on board.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {PRICING_PLANS.map((plan, i) => (
            <motion.div
              className={`pricing-card ${plan.highlighted ? "is-highlighted" : ""}`}
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {plan.highlighted && (
                <span className="pricing-card-tag">Most Popular</span>
              )}
              <h3 className="pricing-card-name">{plan.name}</h3>
              <p className="pricing-card-tagline">{plan.tagline}</p>
              <div className="pricing-card-price">
                <span className="pricing-card-amount">{plan.price}</span>
                {plan.period && (
                  <span className="pricing-card-period">{plan.period}</span>
                )}
              </div>
              <ul className="pricing-card-features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <FiCheck /> {f}
                  </li>
                ))}
              </ul>
              <button
                className={plan.highlighted ? "btn-primary" : "btn-outline"}
                onClick={() => navigate("/register")}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section className="about-section" id="about">
        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow">ABOUT INTEXIA</span>
            <h2>Education built around real outcomes</h2>
            <p>
              Intexia was founded to close the gap between traditional
              education and the skills employers actually need. We bring
              together expert instructors, hands-on projects and
              data-driven feedback so every learner makes measurable
              progress — not just collects video views.
            </p>
            <div className="about-points">
              <div className="about-point">
                <FiHeart />
                <span>Learner-first course design</span>
              </div>
              <div className="about-point">
                <FiTarget />
                <span>Outcome-driven curriculum</span>
              </div>
              <div className="about-point">
                <FiUsers />
                <span>Active mentor community</span>
              </div>
            </div>
            <button className="btn-primary" onClick={() => navigate("/register")}>
              Join Intexia
            </button>
          </motion.div>

          <motion.div
            className="about-stats-grid"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {ABOUT_STATS.map(({ icon: Icon, value, label }) => (
              <div className="about-stat-card" key={label}>
                <div className="about-stat-icon">
                  <Icon />
                </div>
                <h3>{value}</h3>
                <p>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-wrapper">
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
            world-class learning experiences with Intexia.
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
            <span className="footer-logo">Intexia</span>
            <p>© 2026 Intexia. Empowering modern education.</p>
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