import "./AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaShieldAlt,
} from "react-icons/fa";

function AdminSidebar({ isOpen, onClose }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    onClose?.();
  };

  return (
    <>

      {/* Overlay */}

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`admin-sidebar ${isOpen ? "open" : ""}`}
      >

        <div>

          {/* LOGO */}

          <div className="admin-logo">

            <div className="admin-logo-icon">
              <FaShieldAlt />
            </div>

            <div>

              <h2>INTEXIA</h2>

              <p>Admin Panel</p>

            </div>

          </div>

          {/* NAVIGATION */}

          <nav className="admin-nav">

            <NavLink
              to="/admin-dashboard"
              className="admin-link"
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <FaTachometerAlt style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>Dashboard</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/user-management"
              className="admin-link"
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <FaUsers style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>User Management</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/course-approval"
              className="admin-link"
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <FaBook style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>Course Approval</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/platform-analytics"
              className="admin-link"
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <FaChartLine style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>Platform Analytics</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/admin-settings"
              className="admin-link"
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <FaCog style={{ position: "relative", zIndex: 2 }} />
                  <span style={{ position: "relative", zIndex: 2 }}>Settings</span>
                </>
              )}
            </NavLink>

          </nav>

        </div>

        {/* LOGOUT */}

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

    </>
  );

}

export default AdminSidebar;