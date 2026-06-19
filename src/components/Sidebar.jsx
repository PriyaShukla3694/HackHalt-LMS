import "./Sidebar.css";
import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div>

        <div className="sidebar-header">
          <h1>SHOURYA</h1>
          <p>Learning Platform</p>
        </div>

        <nav className="sidebar-nav">

          <NavLink
            to="/student-dashboard"
            className="nav-link"
          >
            <div className="nav-item">
              <FaHome />
              <span>Dashboard</span>
            </div>
          </NavLink>

          <NavLink
            to="/my-courses"
            className="nav-link"
          >
            <div className="nav-item">
              <FaBookOpen />
              <span>My Courses</span>
            </div>
          </NavLink>

          <NavLink
            to="/progress"
            className="nav-link"
          >
            <div className="nav-item">
              <FaChartLine />
              <span>Progress</span>
            </div>
          </NavLink>

          <NavLink
            to="/certificates"
            className="nav-link"
          >
            <div className="nav-item">
              <FaCertificate />
              <span>Certificates</span>
            </div>
          </NavLink>

          <NavLink
            to="/settings"
            className="nav-link"
          >
            <div className="nav-item">
              <FaCog />
              <span>Settings</span>
            </div>
          </NavLink>

        </nav>

      </div>

      <div className="sidebar-footer">

        <NavLink
          to="/"
          className="nav-link"
        >
          <div className="logout-btn">
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
        </NavLink>

      </div>

    </aside>
  );
}

export default Sidebar;