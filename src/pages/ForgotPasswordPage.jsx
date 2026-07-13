import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import "../styles/Auth.css";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validate = (val) => {
    if (!val.trim()) {
      return "Email is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      return "Enter a valid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    const err = validate(val);
    setErrors({ email: err });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(email);
    if (err) {
      setErrors({ email: err });
      showToast("Please check the email format", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage("If this email is registered, check your inbox for password reset instructions.");
      showToast("Reset instructions sent successfully!", "success");
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Forgot Password</h2>
        <p>Enter your registered email</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={handleEmailChange}
            required
            style={{ width: "100%", boxSizing: "border-box" }}
          />
          {errors.email && (
            <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.85rem", marginTop: "4px", display: "block", textAlign: "left" }}>
              {errors.email}
            </span>
          )}

          <Button
            type="submit"
            loading={loading}
            disabled={loading || !!errors.email}
            style={{ width: "100%", marginTop: "16px" }}
          >
            Recover Password
          </Button>
        </form>

        {message && (
          <p className="switch-text" style={{ color: "var(--success)" }}>
            {message}
          </p>
        )}

        <p className="switch-text">
          <span onClick={() => navigate("/login")}>Back to Login</span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;