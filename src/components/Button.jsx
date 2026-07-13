import React from "react";
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
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${loading ? "btn-loading" : ""} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner" />}
      {!loading && Icon && <Icon className="btn-icon" />}
      <span className="btn-text">{children}</span>
    </button>
  );
}

export default Button;
