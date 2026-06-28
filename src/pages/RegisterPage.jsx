import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import "../styles/RegisterPage.css";

const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const { name, email, mobile, role, password } = formData;

    if (name.trim().length < 3) {
      setError("Name must be at least 3 characters.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          mobile: mobile.trim(),
          role,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Registration failed");
      }

      // Log the new user in immediately so the dashboard redirect below
      // actually has a valid session.
      login(data.token, data.refreshToken, data.user);

      const userRole = data.user.role.toLowerCase();

      switch (userRole) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "instructor":
          navigate("/instructor-dashboard");
          break;
        case "student":
          navigate("/student-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleOAuth = (provider) => {
    setError("");
    setNotice(`${provider} sign-up isn't connected yet — coming soon.`);
  };

  return (
    <div className="register-page">
      {/* NAVBAR */}
      <nav className="reg-navbar">
        <span className="reg-logo" onClick={() => navigate("/")}>
          INTEXIA
        </span>
        <div className="reg-nav-links">
          <a href="/#pricing" onClick={(e) => { e.preventDefault(); navigate("/#pricing"); }}>
            Pricing
          </a>
          <a href="/#features" onClick={(e) => { e.preventDefault(); navigate("/#features"); }}>
            Resources
          </a>
          <span className="reg-nav-active">Get Started</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="reg-hero">
        <div className="reg-hero-inner">
          <motion.div
            className="reg-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1>
              Master the art of
              <br />
              <span>learning.</span>
            </h1>

            <p>
              Join thousands of learners accelerating their skills through
              structured courses, hands-on projects and mentor-led guidance.
            </p>

            <ul className="reg-perks">
              <li>
                <FiCheckCircle /> Curated career pathways
              </li>
              <li>
                <FiCheckCircle /> Industry-recognized certification
              </li>
              <li>
                <FiCheckCircle /> 1-on-1 mentorship sessions
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="reg-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <h2>Create Account</h2>
            <p className="reg-card-subtext">
              Start your learning journey today.
            </p>

            <form onSubmit={handleRegister}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="mobile">Mobile Number</label>
              <input
                id="mobile"
                name="mobile"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={formData.mobile}
                onChange={handleChange}
                maxLength={10}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-shell">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <label htmlFor="role">Register As</label>
              <div className="select-shell">
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="admin">Admin</option>
                </select>
                <FiChevronDown className="select-chevron" />
              </div>

              <label className="terms-row">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span>
                  I agree to the{" "}
                  <a href="#terms" onClick={(e) => e.preventDefault()}>
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#privacy" onClick={(e) => e.preventDefault()}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {error && <p className="form-banner error">{error}</p>}
              {notice && !error && (
                <p className="form-banner notice">{notice}</p>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <div className="divider">
              <span>OR SIGN UP WITH</span>
            </div>

            <div className="oauth-row">
              <button type="button" onClick={() => handleOAuth("Google")}>
                <FcGoogle /> Google
              </button>
              <button type="button" onClick={() => handleOAuth("GitHub")}>
                <FaGithub /> GitHub
              </button>
            </div>

            <p className="switch-text">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Log In</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="reg-footer">
        <div className="reg-footer-inner">
          <div className="reg-footer-brand">
            <span>INTEXIA</span>
            <p>© 2026 INTEXIA. Empowering modern education.</p>
          </div>
          <div className="reg-footer-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="#help" onClick={(e) => e.preventDefault()}>
              Help Center
            </a>
            <a href="#contact" onClick={(e) => e.preventDefault()}>
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RegisterPage;