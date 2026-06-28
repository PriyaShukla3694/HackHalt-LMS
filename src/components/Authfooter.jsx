import { useNavigate } from "react-router-dom";
import "./AuthFooter.css";

const FOOTER_LINKS = ["Privacy Policy", "Terms of Service", "Help Center", "Contact Us"];

function AuthFooter() {
  const navigate = useNavigate();

  return (
    <footer className="auth-footer">
      <div className="auth-footer-brand">
        <span className="auth-footer-logo" onClick={() => navigate("/")}>
          INTEXIA
        </span>
        <p>© 2026 INTEXIA. All rights reserved.</p>
      </div>

      <div className="auth-footer-links">
        {FOOTER_LINKS.map((label) => (
          <a key={label} href="/#footer" onClick={(e) => e.preventDefault()}>
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default AuthFooter;