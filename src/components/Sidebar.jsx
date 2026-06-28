import { useState, useEffect } from "react";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  FaHome,
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar_collapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebar_collapsed", collapsed);

    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [collapsed]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* ================= HEADER ================= */}

      <div>

        <div className="sidebar-header">

          <div className="brand-top">

            {!collapsed && (
              <div className="sidebar-brand">
                <h1>INTEXIA</h1>
                <p>Cyber Learning Hub</p>
              </div>
            )}

            <button
              className="toggle-btn"
              onClick={() => setCollapsed(!collapsed)}
            >
              <FaBars />
            </button>

          </div>

          {!collapsed && (

            <div className="user-card">

              <div className="user-avatar">
                <FaUserCircle />
              </div>

              <div className="user-info">
                <h3>Student</h3>
                <span>Keep Learning 🚀</span>
              </div>

            </div>

          )}

        </div>

        {/* ================= NAVIGATION ================= */}

        <div className="menu-title">
          {!collapsed && <span>Main Menu</span>}
        </div>

        <nav className="sidebar-nav">

          <NavLink to="/student-dashboard" className="nav-link">
            <div className="nav-item">
              <FaHome />
              {!collapsed && <span>Dashboard</span>}
            </div>
          </NavLink>

          <NavLink to="/my-courses" className="nav-link">
            <div className="nav-item">
              <FaBookOpen />
              {!collapsed && <span>My Courses</span>}
            </div>
          </NavLink>

          <NavLink to="/progress" className="nav-link">
            <div className="nav-item">
              <FaChartLine />
              {!collapsed && <span>Progress</span>}
            </div>
          </NavLink>

          <NavLink to="/certificates" className="nav-link">
            <div className="nav-item">
              <FaCertificate />
              {!collapsed && <span>Certificates</span>}
            </div>
          </NavLink>

          <NavLink to="/settings" className="nav-link">
            <div className="nav-item">
              <FaCog />
              {!collapsed && <span>Settings</span>}
            </div>
          </NavLink>

        </nav>

        {/* ================= ALERTS ================= */}

        {!collapsed && (

          <div className="sidebar-alerts">

            <h3>
              <FaBell />
              <span>Today's Alerts</span>
            </h3>

            <div className="alert-card">
              <strong>📝 Assignment</strong>
              <small>Due Tomorrow</small>
            </div>

            <div className="alert-card">
              <strong>🎥 New Lesson</strong>
              <small>Machine Learning Module</small>
            </div>

            <div className="alert-card">
              <strong>🏆 Certificate</strong>
              <small>Python Basics Ready</small>
            </div>

          </div>

        )}

      </div>

      {/* ================= FOOTER ================= */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          {!collapsed && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;