import React from "react";
import { motion } from "framer-motion";
import "./Button.css";

function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  disabled = false,
  loading = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} btn-${size} ${loading ? "btn-loading" : ""} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={disabled || loading ? {} : { scale: 0.98 }}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {!loading && Icon && <Icon className="btn-icon" />}
      <span className="btn-text">{children}</span>
    </motion.button>
  );
}

export default Button;
