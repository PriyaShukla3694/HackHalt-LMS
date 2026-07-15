import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiChevronDown,
  FiShield,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MOCK_MODE, buildMockUser, buildMockTokens } from "../utils/mockMode";
import "../styles/LoginPage.css";
import AuthNavbar from "../components/AuthNavbar";


const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

function redirectForRole(navigate, role) {
  switch (role) {
    case "admin":
      navigate("/admin-dashboard");
      break;
    case "instructor":
      navigate("/instructor-dashboard");
      break;
    default:
      navigate("/student-dashboard");
  }
}

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.trim()) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      }
    } else if (name === "role") {
      if (!value) {
        error = "Please select a role to continue";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotice("");

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the validation errors", "error");
      return;
    }

    setLoading(true);
    const { email, password, role } = formData;

    if (MOCK_MODE) {
      setTimeout(() => {
        const niceName = email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());

        const mockUser = buildMockUser({ name: niceName, email, role });
        const { token, refreshToken } = buildMockTokens();
        login(token, refreshToken, mockUser);
        showToast("Logged in successfully (Demo)!", "success");
        redirectForRole(navigate, role);
      }, 500);
      return;
    }

    try {
      const res = await fetch(`${BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const envelope = await res.json();

      if (!res.ok || !envelope.success) {
        throw new Error(envelope.message || envelope.error || "Login failed");
      }

      const responseData = envelope.data || envelope;
      login(responseData.token, responseData.refreshToken, responseData.user);
      showToast("Logged in successfully!", "success");
      redirectForRole(navigate, responseData.user.role.toLowerCase());
    } catch (err) {
      showToast(err.message, "error");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrors({});
    setNotice("");

    if (!formData.role) {
      setErrors({ role: "Please select a role before continuing with Google." });
      return;
    }

    if (!MOCK_MODE) {
      setNotice("Google sign-in isn't connected to a real backend yet.");
      return;
    }

    setGoogleLoading(true);
    setTimeout(() => {
      const mockUser = buildMockUser({
        name: "Google User",
        email: "google.user@gmail.com",
        role: formData.role,
      });
      const { token, refreshToken } = buildMockTokens();
      login(token, refreshToken, mockUser);
      redirectForRole(navigate, formData.role);
    }, 600);
  };

  return (
    <div className="login-page">

      
       
      <AuthNavbar />
       

      {/* HERO + CARD */}
      <section className="log-hero">
        <div className="log-blob log-blob-a" />
        <div className="log-blob log-blob-b" />

        <motion.div
          className="log-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1>Welcome Back</h1>
          <p>Accelerate your professional growth today.</p>
        </motion.div>

        <motion.div
          className="log-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {MOCK_MODE && (
            <p className="demo-mode-badge">
              Demo Mode — any email/password works, no backend needed
            </p>
          )}

          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email Address</label>
            <div className="input-shell">
              <FiMail />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {errors.email && (
              <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                {errors.email}
              </span>
            )}

            <div className="label-row">
              <label htmlFor="password">Password</label>
              <span
                className="forgot-link"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>
            <div className="input-shell">
              <FiLock />
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
            {errors.password && (
              <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                {errors.password}
              </span>
            )}

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
            {errors.role && (
              <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                {errors.role}
              </span>
            )}

            {notice && (
              <p className="form-banner notice">{notice}</p>
            )}

            <Button
              type="submit"
              className="submit-btn"
              loading={loading}
              disabled={loading || Object.values(errors).some((e) => !!e)}
              style={{ width: "100%", marginTop: "20px" }}
            >
              Log In
            </Button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            <FcGoogle />
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="switch-text">
            New to INTEXIA?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </motion.div>

        <p className="ssl-note">
          <FiShield /> Secure 256-bit SSL Encrypted Connection
        </p>
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