import "./AdminSidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

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
              <FaTachometerAlt />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/user-management"
              className="admin-link"
              onClick={onClose}
            >
              <FaUsers />
              <span>User Management</span>
            </NavLink>

            <NavLink
              to="/course-approval"
              className="admin-link"
              onClick={onClose}
            >
              <FaBook />
              <span>Course Approval</span>
            </NavLink>

            <NavLink
              to="/platform-analytics"
              className="admin-link"
              onClick={onClose}
            >
              <FaChartLine />
              <span>Platform Analytics</span>
            </NavLink>

            <NavLink
              to="/admin-settings"
              className="admin-link"
              onClick={onClose}
            >
              <FaCog />
              <span>Settings</span>
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