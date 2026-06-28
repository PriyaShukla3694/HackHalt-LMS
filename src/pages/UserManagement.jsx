import { useState, useEffect } from "react";
import "../styles/AdminPages.css";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { authFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";

function UserManagement() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = (selectedFilter = filter, searchQuery = search) => {
    setLoading(true);
    let roleParam = "";
    if (selectedFilter === "Student") roleParam = "STUDENT";
    if (selectedFilter === "Instructor") roleParam = "INSTRUCTOR";
    if (selectedFilter === "Admin") roleParam = "ADMIN";

    let url = `/admin/users?page=1&limit=100`;
    if (roleParam) url += `&role=${roleParam}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    authFetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load users list");
        return res.json();
      })
      .then((data) => {
        setUsers(data.users || data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading system user accounts.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers(filter, search);
  }, [filter, search]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await authFetch(`/admin/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role: newRole }),
      });

      if (res.ok) {
        fetchUsers(filter, search);
      } else {
        alert("Failed to update user role.");
      }
    } catch (err) {
      console.error(err);
      alert("Error changing user role.");
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      const res = await authFetch(`/admin/users/${userId}/status`, {
        method: "PATCH",
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, isActive: !currentStatus } : u))
        );
      } else {
        alert("Failed to update user status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error toggling user status.");
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      alert("You cannot delete your own admin account.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user? This will remove all their enrollments, progress stats, and certificates from the database."
    );

    if (confirmDelete) {
      try {
        const res = await authFetch(`/admin/users/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          fetchUsers(filter, search);
        } else {
          alert("Failed to delete user.");
        }
      } catch (err) {
        console.error(err);
        alert("Error deleting user account.");
      }
    }
  };

  const filteredUsers = users;

  return (
    <div className="admin-page">
      <AdminSidebar />

      <div className="admin-main">
        <Topbar />

        <h1 className="page-title">User Management</h1>

        <div className="user-filter" style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
          <button
            className={filter === "All" ? "active-filter" : ""}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          <button
            className={filter === "Student" ? "active-filter" : ""}
            onClick={() => setFilter("Student")}
          >
            Students
          </button>

          <button
            className={filter === "Instructor" ? "active-filter" : ""}
            onClick={() => setFilter("Instructor")}
          >
            Instructors
          </button>

          <input
            type="text"
            placeholder="Search users by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "10px 16px",
              background: "#181821",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              color: "#fff",
              outline: "none",
              minWidth: "250px",
              marginLeft: "auto"
            }}
          />
        </div>

        {loading ? (
          <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "40px" }}>
            <h3>Loading database users...</h3>
          </div>
        ) : error ? (
          <div style={{ color: "#f87171", textAlign: "center", padding: "40px" }}>
            <h3>{error}</h3>
          </div>
        ) : (
          <div className="users-grid">
            {filteredUsers.length === 0 ? (
              <div style={{ color: "var(--text-secondary)", gridColumn: "1/-1", textAlign: "center", padding: "40px" }}>
                <h3>No Users Found</h3>
              </div>
            ) : (
              filteredUsers.map((u) => (
                <div className="user-card" key={u.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>{u.name}</h3>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        background: u.isActive ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: u.isActive ? "#10b981" : "#ef4444"
                      }}
                    >
                      {u.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  
                  <p>
                    <strong>Email:</strong> {u.email}
                  </p>
                  <p>
                    <strong>Role:</strong> {u.role}
                  </p>

                  <div style={{ marginTop: "12px", display: "flex", gap: "8px", alignItems: "center" }}>
                    <label style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Change Role:</label>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      style={{
                        padding: "4px 8px",
                        background: "#181821",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "6px",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="STUDENT">Student</option>
                      <option value="INSTRUCTOR">Instructor</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>

                  <div className="user-actions" style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <button
                      className="status-btn"
                      onClick={() => handleToggleStatus(u.id, u.isActive)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: u.isActive ? "#d97706" : "#059669",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                      }}
                    >
                      {u.isActive ? "Deactivate Account" : "Activate Account"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(u.id)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;