import { NavLink, useNavigate } from "react-router-dom";
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
      icon: <FiGrid />,
    },
    {
      title: "Manage Courses",
      path: "/manage-courses",
      icon: <FiBookOpen />,
    },
    {
      title: "Students",
      path: "/manage-students",
      icon: <FiUsers />,
    },
    {
      title: "Analytics",
      path: "/instructor-analytics",
      icon: <FiBarChart2 />,
    },
    {
      title: "Settings",
      path: "/instructor-settings",
      icon: <FiSettings />,
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

                {item.icon}

                <span>{item.title}</span>

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