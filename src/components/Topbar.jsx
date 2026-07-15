import "./Topbar.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaSearch,
  FaHome,
  FaBars,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Topbar({

  title = "Dashboard",

  subtitle = "Welcome Back!",

  onMenuClick,

}) {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  const today = new Date().toLocaleDateString("en-IN", {

    day: "numeric",

    month: "long",

    year: "numeric",

  });

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  return (
    <header className="topbar">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* LEFT */}
      <div className="topbar-left">
        {onMenuClick && (
          <button
            className="mobile-menu-btn"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
          >
            <FaBars />
          </button>
        )}

        {/* Mobile Logo */}
        <h2 className="mobile-logo">
          INTEXIA
        </h2>

        {/* Desktop Title */}
        <div className="title-section">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <div className="search-box">
          <label htmlFor="topbar-search" className="sr-only">Search</label>
          <FaSearch className="search-icon" />
          <input
            id="topbar-search"
            type="text"
            placeholder="Search..."
          />
        </div>
        <button
          className="portal-btn"
          onClick={() => navigate("/")}
          aria-label="Portal Homepage"
        >
          <FaHome />
          <span className="portal-text">Portal</span>
        </button>

        <div
          className="user-info"
          ref={profileRef}
        >
          <div
            className="user-box"
            onClick={() => setShowProfile((prev) => !prev)}
            role="button"
            aria-haspopup="true"
            aria-expanded={showProfile}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowProfile((prev) => !prev);
              }
            }}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.name || "User"
              )}&background=ff8c00&color=fff`}
              alt={user?.name || "User"}
              width={44}
              height={44}
              loading="eager"
            />

            <div className="user-details">

              <h4>
                {user?.name || "User"}
              </h4>

              <p>{today}</p>

            </div>

          </div>

          {showProfile && (

            <div className="profile-dropdown">

              <div className="profile-name">

                <strong>{user?.name || "User"}</strong>

              </div>

              <button
                className="logout-item"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>

  );

}

export default Topbar;