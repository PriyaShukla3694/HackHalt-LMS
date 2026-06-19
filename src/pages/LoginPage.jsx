import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      email: formData.email,
      role: formData.role,
    };

    login(userData);

    if (formData.role === "student") {
      navigate("/student-dashboard");
    } else {
      navigate("/instructor-dashboard");
    }
  };

  return (
    <motion.div
      className="auth-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="auth-box glass">

        <h2>Welcome Back</h2>
        <p>Login to continue your journey</p>

        <form onSubmit={handleLogin}>

          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <select
            name="role"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
          </select>

          <button type="submit">Login</button>
        </form>

        <p className="switch-text">
          New user?{" "}
          <span onClick={() => navigate("/register")}>
            Create account
          </span>
        </p>

      </div>
    </motion.div>
  );
}

export default LoginPage;