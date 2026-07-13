import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiZap } from "react-icons/fi";
import "./AuthNavbar.css";

const NAV_LINKS = [
  { label: "Courses",  href: "#courses" },
  { label: "Features", href: "#features" },
  { label: "Pricing",  href: "#pricing" },
  { label: "About",    href: "#about" },
];

function AuthNavbar({ active }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleNavLinkClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== "/") {
      // Navigate home first, then scroll once mounted
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={`auth-navbar-band ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="auth-navbar">
        {/* Logo */}
        <button className="auth-navbar-logo" onClick={() => goTo("/")}>
          <span className="auth-navbar-logo-icon">
            <FiZap />
          </span>
          <span className="auth-navbar-logo-text">
            Intexia<span className="auth-navbar-logo-dot">.</span>
          </span>
        </button>

        {/* Centre nav links (desktop) — button-style pills */}
        <div className={`auth-navbar-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="auth-navbar-pill"
              onClick={(e) => handleNavLinkClick(e, link.href.replace("#", ""))}
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