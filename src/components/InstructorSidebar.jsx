import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBookOpen,
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiLogOut,
  FiPlusCircle,
} from "react-icons/fi";

import { useAuth } from "../context/AuthContext";
import "./InstructorSidebar.css";

function InstructorSidebar({ isOpen, onClose }) {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    {
      title: "Dashboard",
      path: "/instructor-dashboard",
      icon: <FiGrid style={{ position: "relative", zIndex: 2 }} />,
    },
    {
      title: "Manage Courses",
      path: "/manage-courses",
      icon: <FiBookOpen style={{ position: "relative", zIndex: 2 }} />,
    },
    {
      title: "Students",
      path: "/manage-students",
      icon: <FiUsers style={{ position: "relative", zIndex: 2 }} />,
    },
    {
      title: "Analytics",
      path: "/instructor-analytics",
      icon: <FiBarChart2 style={{ position: "relative", zIndex: 2 }} />,
    },
    {
      title: "Settings",
      path: "/instructor-settings",
      icon: <FiSettings style={{ position: "relative", zIndex: 2 }} />,
    },
  ];

  return (
    <>

      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${isOpen ? "open" : ""}`}
      >

        <div>

          <div className="sidebar-logo">

            <div className="logo-circle">
              I
            </div>

            <div>

              <h2>INTEXIA</h2>

              <p>Instructor Panel</p>

            </div>

          </div>

          <nav className="sidebar-nav">

            {navItems.map((item) => (

              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
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
                    {item.icon}
                    <span style={{ position: "relative", zIndex: 2 }}>{item.title}</span>
                  </>
                )}
              </NavLink>

            ))}

          </nav>

        </div>

        <div className="sidebar-bottom">

          <button
            className="action-btn"
            onClick={() => {
              navigate("/manage-courses");
              onClose?.();
            }}
          >

            <FiPlusCircle />

            Add Course

          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <FiLogOut />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
}

export default InstructorSidebar;