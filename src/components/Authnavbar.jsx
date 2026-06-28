import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./AuthNavbar.css";

const NAV_LINKS = [
  { label: "Courses",   href: "/#home" },
  { label: "Pricing",   href: "/#pricing" },
  { label: "Resources", href: "/#features" },
  { label: "About",     href: "/#footer" },
];

function AuthNavbar({ active }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <header className="auth-navbar-band">
      <nav className="auth-navbar">
        {/* Logo */}
        <button className="auth-navbar-logo" onClick={() => goTo("/")}>
          INTEXIA
        </button>

        {/* Centre nav links (desktop) */}
        <div className={`auth-navbar-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          {/* Mobile-only actions inside the dropdown */}
          <div className="auth-navbar-mobile-actions">
            <button
              className={`auth-navbar-textlink ${active === "login" ? "is-active" : ""}`}
              onClick={() => goTo("/login")}
            >
              Log In
            </button>
            <button
              className={`auth-navbar-cta ${active === "register" ? "is-active" : ""}`}
              onClick={() => goTo("/register")}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right actions (desktop) */}
        <div className="auth-navbar-actions">
          <button
            className={`auth-navbar-textlink ${active === "login" ? "is-active" : ""}`}
            onClick={() => goTo("/login")}
          >
            Log In
          </button>
          <button
            className={`auth-navbar-cta ${active === "register" ? "is-active" : ""}`}
            onClick={() => goTo("/register")}
          >
            Get Started
          </button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="auth-navbar-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>
    </header>
  );
}

export default AuthNavbar;