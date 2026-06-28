import "./Topbar.css";
import { FaSearch } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

const today = new Date().toLocaleDateString("en-IN", {
day: "numeric",
month: "long",
year: "numeric",
});

return ( <div className="topbar">


  <div className="topbar-left">

    <div className="search-box">
      <FaSearch />

      <input
        type="text"
        placeholder="Search courses..."
      />
    </div>

  </div>

  <div className="topbar-right">

    <button className="welcome-btn" onClick={() => navigate("/")}>
      Welcome
    </button>

    <div className="date-box">
      {today}
    </div>

    <div className="user-profile">

      <div className="avatar">
        {user?.avatar ? (
          <img 
            src={user.avatar.startsWith("http") ? user.avatar : `${(import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace("/api", "")}${user.avatar}`} 
            alt="Avatar" 
            style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} 
          />
        ) : (
          (user?.name?.charAt(0) || "S").toUpperCase()
        )}
      </div>

      <div className="user-info">
        <h4>{user?.name || "Student"}</h4>
        <p>{user?.role || "Student"}</p>
      </div>

    </div>

  </div>

</div>


);
}

export default Topbar;
