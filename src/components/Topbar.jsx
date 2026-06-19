import "./Topbar.css";
import { FaBell, FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  return (
    <div className="topbar">

      <div className="search-box">
        <FaSearch />
        <input
          type="text"
          placeholder="Search courses, paths..."
        />
      </div>

      <div className="topbar-right">

        <button className="notification-btn">
          <FaBell />
        </button>

        <div className="user-profile">

          <div className="avatar">
            {(user?.name?.charAt(0) || "S").toUpperCase()}
          </div>

          <div>
            <h4>{user?.name || "Student"}</h4>
            <p>{user?.role || "Student"}</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Topbar;