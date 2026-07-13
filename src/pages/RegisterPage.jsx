import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import {
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { MOCK_MODE, buildMockUser, buildMockTokens } from "../utils/mockMode";
import "../styles/RegisterPage.css";
import AuthNavbar from "../components/AuthNavbar";


const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

function RegisterPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const getPasswordStrength = (pwd) => {
    if (!pwd) return { label: "", color: "" };
    const hasNumber = /\d/.test(pwd);
    const hasSpecialOrUpper = /[A-Z!@#$%^&*(),.?":{}|<>]/.test(pwd);
    if (pwd.length < 8 || !hasNumber) {
      return { label: "Weak", color: "var(--danger)" };
    }
    if (hasSpecialOrUpper) {
      return { label: "Strong", color: "var(--success)" };
    }
    return { label: "Medium", color: "var(--warning)" };
  };

  const validateField = (name, value, allData = formData) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) {
        error = "Full Name is required";
      } else if (value.trim().length < 3) {
        error = "Name must be at least 3 characters";
      }
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address";
      }
    } else if (name === "mobile") {
      if (!value.trim()) {
        error = "Mobile number is required";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Enter a valid 10-digit mobile number";
      }
    } else if (name === "role") {
      if (!value) {
        error = "Please select a role";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        error = "Please confirm your password";
      } else if (value !== allData.password) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    const error = validateField(name, value, updatedForm);
    setErrors((prev) => {
      const next = { ...prev, [name]: error };
      if (name === "password") {
        next.confirmPassword = validateField("confirmPassword", updatedForm.confirmPassword, updatedForm);
      }
      return next;
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setNotice("");

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (!agreeTerms) {
      newErrors.agree = "You must agree to the Terms of Service and Privacy Policy";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please check the validation errors", "error");
      return;
    }

    setLoading(true);
    const { name, email, mobile, role, password } = formData;

    // ---- MOCK MODE: skip the real backend entirely ----
    if (MOCK_MODE) {
      setTimeout(() => {
        const mockUser = buildMockUser({ name, email, mobile, role });
        const { token, refreshToken } = buildMockTokens();
        login(token, refreshToken, mockUser);
        showToast("Account created successfully (Demo)!", "success");

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
      }, 500);
      return;
    }

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

      login(data.token, data.refreshToken, data.user);
      showToast("Account created successfully!", "success");
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
      showToast(err.message, "error");
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setNotice("");

    if (!formData.role) {
      showToast("Please select a role before continuing with Google.", "error");
      return;
    }

    if (!agreeTerms) {
      showToast("Please agree to the Terms of Service and Privacy Policy.", "error");
      return;
    }

    if (!MOCK_MODE) {
      setNotice("Google sign-up isn't connected to a real backend yet.");
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
      showToast("Signed up with Google (Demo)!", "success");

      switch (formData.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "instructor":
          navigate("/instructor-dashboard");
          break;
        default:
          navigate("/student-dashboard");
      }
    }, 600);
  };

  return (
    <div className="register-page">

      
      <AuthNavbar />
     

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

            {MOCK_MODE && (
              <p className="demo-mode-badge">
                Demo Mode — no backend needed, accounts aren't saved
              </p>
            )}

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
              {errors.name && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.name}
                </span>
              )}

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
              {errors.email && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.email}
                </span>
              )}

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
              {errors.mobile && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.mobile}
                </span>
              )}

              <label htmlFor="password">Password</label>
              <div className="password-shell">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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
              {formData.password && (
                <div style={{ marginTop: "6px" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: getPasswordStrength(formData.password).color }}>
                    Password Strength: {getPasswordStrength(formData.password).label}
                  </div>
                  <div style={{ height: "4px", background: "#e5e7eb", borderRadius: "2px", marginTop: "4px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: getPasswordStrength(formData.password).label === "Weak" ? "33%" : getPasswordStrength(formData.password).label === "Medium" ? "66%" : "100%",
                      background: getPasswordStrength(formData.password).color,
                      transition: "all 0.3s ease"
                    }} />
                  </div>
                </div>
              )}
              {errors.password && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.password}
                </span>
              )}

              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-shell">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="eye-toggle"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.confirmPassword}
                </span>
              )}

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
              {errors.role && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.role}
                </span>
              )}

              <label className="terms-row">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setErrors((prev) => ({ ...prev, agree: "" }));
                  }}
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
              {errors.agree && (
                <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                  {errors.agree}
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
                Create Account
              </Button>
            </form>

            <div className="divider">
              <span>OR SIGN UP WITH</span>
            </div>

            <div className="oauth-row">
              <button
                type="button"
                className="google-btn"
                onClick={handleGoogleSignup}
                disabled={googleLoading}
              >
                <FcGoogle />
                {googleLoading ? "Signing up..." : "Continue with Google"}
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