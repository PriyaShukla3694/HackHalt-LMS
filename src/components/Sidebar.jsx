import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBookOpen,
  FiTrendingUp,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
     onClose();
    navigate("/login");
  };

  return (
    <>
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>

      <div>

        <div className="logo">
          <h2>INTEXIA</h2>
          <p>Learning Platform</p>
        </div>

        <nav>

          <NavLink
            to="/student-dashboard"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
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
                <FiGrid style={{ position: "relative", zIndex: 2 }} />
                <span style={{ position: "relative", zIndex: 2 }}>Dashboard</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/my-courses"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
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
                <FiBookOpen style={{ position: "relative", zIndex: 2 }} />
                <span style={{ position: "relative", zIndex: 2 }}>My Courses</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/progress"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
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
                <FiTrendingUp style={{ position: "relative", zIndex: 2 }} />
                <span style={{ position: "relative", zIndex: 2 }}>Progress</span>
              </>
            )}
          </NavLink>

          <NavLink
            to="/settings"
            onClick={onClose}
            className={({ isActive }) =>
              isActive ? "menu active" : "menu"
            }
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
                <FiSettings style={{ position: "relative", zIndex: 2 }} />
                <span style={{ position: "relative", zIndex: 2 }}>Settings</span>
              </>
            )}
          </NavLink>

        </nav>

      </div>

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </button>

    </aside>

    {isOpen && (
    <div
        className="sidebar-overlay"
        onClick={onClose}
    />
)}
</>
  );
}

export default Sidebar;