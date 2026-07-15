import { useState } from "react";

import {
  FiPlus,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiX,
  FiUsers,
} from "react-icons/fi";
import EmptyState from "../components/EmptyState";

import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

import "../styles/AdminPages.css";

function UserManagement() {

  /* ===========================
      SIDEBAR
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
      SEARCH
  =========================== */

  const [search, setSearch] = useState("");

  /* ===========================
      POPUPS
  =========================== */

  const [showPopup, setShowPopup] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [editIndex, setEditIndex] = useState(null);

  /* ===========================
      USERS DATA
  =========================== */

  const [users, setUsers] = useState([

    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      role: "Student",
      status: "Active",
      joined: "12 Jan 2026",
    },

    {
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "+91 9123456780",
      role: "Instructor",
      status: "Active",
      joined: "08 Feb 2026",
    },

    {
      name: "Amit Kumar",
      email: "amit@gmail.com",
      phone: "+91 9988776655",
      role: "Student",
      status: "Inactive",
      joined: "20 Mar 2026",
    },

    {
      name: "Neha Singh",
      email: "neha@gmail.com",
      phone: "+91 9871203456",
      role: "Instructor",
      status: "Active",
      joined: "14 Apr 2026",
    },

  ]);

  /* ===========================
      FORM
  =========================== */

  const [form, setForm] = useState({

    name: "",

    email: "",

    phone: "",

    role: "Student",

    status: "Active",

  });

  /* ===========================
      INPUT CHANGE
  =========================== */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

    /* ===========================
      SAVE USER
  =========================== */

  const handleSave = () => {

    if (
      !form.name ||
      !form.email ||
      !form.phone
    ) {

      alert("Please fill all required fields.");

      return;

    }

    if (editIndex !== null) {

      const updatedUsers = [...users];

      updatedUsers[editIndex] = {

        ...updatedUsers[editIndex],

        ...form,

      };

      setUsers(updatedUsers);

    } else {

      setUsers([

        ...users,

        {

          ...form,

          joined: new Date().toLocaleDateString("en-IN", {

            day: "2-digit",

            month: "short",

            year: "numeric",

          }),

        },

      ]);

    }

    setForm({

      name: "",

      email: "",

      phone: "",

      role: "Student",

      status: "Active",

    });

    setEditIndex(null);

    setShowPopup(false);

  };

  /* ===========================
      EDIT USER
  =========================== */

  const handleEdit = (index) => {

    setForm(users[index]);

    setEditIndex(index);

    setShowPopup(true);

  };

  /* ===========================
      DELETE USER
  =========================== */

  const handleDelete = (index) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {

      setUsers(users.filter((_, i) => i !== index));

    }

  };

  /* ===========================
      SEARCH FILTER
  =========================== */

  const filteredUsers = users.filter((user) =>

    user.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    user.email
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    user.role
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="admin-page">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">

        <Topbar
          title="User Management"
          subtitle="Manage students, instructors and administrators"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="admin-content" id="main-content" tabIndex="-1">

          <div className="page-header">

            <div>

              <h1>User Management</h1>

              <p>
                Manage students, instructors and administrators.
              </p>

            </div>

            <button
              className="primary-btn"
              onClick={() => {

                setEditIndex(null);

                setForm({

                  name: "",

                  email: "",

                  phone: "",

                  role: "Student",

                  status: "Active",

                });

                setShowPopup(true);

              }}
            >

              <FiPlus />

              Add User

            </button>

          </div>

          {/* SEARCH */}

          <div className="search-box">
            <label htmlFor="search-users-input" className="sr-only">Search users</label>
            <FiSearch />
            <input
              id="search-users-input"
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* TABLE */}

          {filteredUsers.length === 0 ? (
            <EmptyState
              icon={FiUsers}
              title="No users found"
              description="There are no users registered on the platform matching your search criteria."
              ctaText="Add User"
              onCtaClick={() => {
                setEditIndex(null);
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  role: "Student",
                  status: "Active",
                });
                setShowPopup(true);
              }}
            />
          ) : (
            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <span
                          className={
                            user.status === "Active"
                              ? "status-active"
                              : "status-inactive"
                          }
                        >
                          {user.status}
                        </span>
                      </td>
                      <td>{user.joined}</td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="view-btn"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDetails(true);
                            }}
                          >
                            <FiEye />
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(index)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(index)}
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ===========================
              ADD / EDIT USER POPUP
          =========================== */}

          {showPopup && (

            <div
              className="popup-overlay"
              onClick={() => setShowPopup(false)}
            >

              <div
                className="popup-card"
                onClick={(e) => e.stopPropagation()}
              >

                <h2>

                  {editIndex !== null
                    ? "Edit User"
                    : "Add User"}

                </h2>

                <label htmlFor="user-form-name" className="sr-only">Full Name</label>
                <input
                  id="user-form-name"
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                />

                <label htmlFor="user-form-email" className="sr-only">Email Address</label>
                <input
                  id="user-form-email"
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                />

                <label htmlFor="user-form-phone" className="sr-only">Phone Number</label>
                <input
                  id="user-form-phone"
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />

                <label htmlFor="user-form-role" className="sr-only">Role</label>
                <select
                  id="user-form-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                >
                  <option>Student</option>
                  <option>Instructor</option>
                  <option>Admin</option>
                </select>

                <label htmlFor="user-form-status" className="sr-only">Status</label>
                <select
                  id="user-form-status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

                <div className="popup-buttons">

                  <button
                    className="save-btn"
                    onClick={handleSave}
                  >
                    Save
                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => setShowPopup(false)}
                  >
                    Cancel
                  </button>

                </div>

              </div>

            </div>

          )}

                    {/* ===========================
              USER DETAILS POPUP
          =========================== */}

          {showDetails && selectedUser && (

            <div
              className="popup-overlay"
              onClick={() => setShowDetails(false)}
            >

              <div
                className="details-card"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  className="close-btn"
                  onClick={() => setShowDetails(false)}
                  aria-label="Close"
                >
                  <FiX />
                </button>

                <h2>User Details</h2>

                <div className="detail-row">
                  <strong>Full Name</strong>
                  <span>{selectedUser.name}</span>
                </div>

                <div className="detail-row">
                  <strong>Email</strong>
                  <span>{selectedUser.email}</span>
                </div>

                <div className="detail-row">
                  <strong>Phone</strong>
                  <span>{selectedUser.phone}</span>
                </div>

                <div className="detail-row">
                  <strong>Role</strong>
                  <span>{selectedUser.role}</span>
                </div>

                <div className="detail-row">
                  <strong>Status</strong>
                  <span>{selectedUser.status}</span>
                </div>

                <div className="detail-row">
                  <strong>Joined On</strong>
                  <span>{selectedUser.joined}</span>
                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default UserManagement;