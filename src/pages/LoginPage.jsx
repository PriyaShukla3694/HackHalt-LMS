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
import "../styles/LoginPage.css";

const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    const { email, password, role } = formData;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (!role) {
      setError("Please select a role.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }

      login(data.token, data.refreshToken, data.user);

      // (Renamed to userRole — the original code redeclared `role` here,
      // which collides with the `role` already destructured above and
      // throws a SyntaxError at build time.)
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

  

const [selectedRole, setSelectedRole] = useState("");

  const handleOAuth = (provider) => {
    setError("");
    setNotice(`${provider} sign-in isn't connected yet — coming soon.`);
  };

  return (
    <div className="login-page">
      {/* NAVBAR */}
      <nav className="log-navbar">
        <span className="log-logo" onClick={() => navigate("/")}>
          INTEXIA
        </span>
        <div className="log-nav-links">
          <a
            href="/#pricing"
            onClick={(e) => {
              e.preventDefault();
              navigate("/#pricing");
            }}
          >
            Pricing
          </a>
          <a
            href="/#features"
            onClick={(e) => {
              e.preventDefault();
              navigate("/#features");
            }}
          >
            Resources
          </a>
          <span className="log-nav-active">Log In</span>
        </div>
      </nav>

      {/* HERO */}
      <section className="log-hero">
        <div className="log-hero-inner">
          <motion.div
            className="log-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1>
              Welcome back,
              <br />
              <span>keep learning.</span>
            </h1>

            <p>
              Pick up right where you left off — your courses, progress and
              certificates are waiting for you.
            </p>

            <ul className="log-perks">
              <li>
                <FiCheckCircle /> Personalized dashboard
              </li>
              <li>
                <FiCheckCircle /> Track your progress
              </li>
              <li>
                <FiCheckCircle /> Resume any course instantly
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="log-card"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
            <h2>Log In</h2>
            <p className="log-card-subtext">Access your INTEXIA account.</p>

            <form onSubmit={handleLogin}>
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

              <label htmlFor="password">Password</label>
              <div className="password-shell">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

              <div className="demo-login">

  <h3>Explore Dashboard</h3>

  <select
    value={selectedRole}
    onChange={(e) => {
      const role = e.target.value;
      setSelectedRole(role);

      if (role === "student") navigate("/student-dashboard");
      if (role === "teacher") navigate("/teacher-dashboard");
      if (role === "admin") navigate("/admin-dashboard");
    }}
  >
    <option value="">Choose Dashboard</option>
    <option value="student">🎓 Student Dashboard</option>
    <option value="teacher">👨‍🏫 Teacher Dashboard</option>
    <option value="admin">🛡️ Admin Dashboard</option>
  </select>

</div>

              <label htmlFor="role">Login As</label>
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

              <p
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </p>

              {error && <p className="form-banner error">{error}</p>}
              {notice && !error && (
                <p className="form-banner notice">{notice}</p>
              )}

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Logging In..." : "Log In"}
                {!loading && <FiArrowRight />}
              </button>
            </form>

            <div className="divider">
              <span>OR SIGN IN WITH</span>
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
              New here?{" "}
              <span onClick={() => navigate("/register")}>Create Account</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="log-footer">
        <div className="log-footer-inner">
          <div className="log-footer-brand">
            <span>INTEXIA</span>
            <p>© 2026 INTEXIA. Empowering modern education.</p>
          </div>
          <div className="log-footer-links">
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

export default LoginPage;