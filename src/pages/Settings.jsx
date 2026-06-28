import { useState, useEffect } from "react";
import "../styles/Settings.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useEnrolledCourses } from "../hooks/useCourses";
import { authFetch } from "../utils/api";

function Settings() {
  const { user, updateUser } = useAuth();
  const { enrolledCourses } = useEnrolledCourses();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [certificatesCount, setCertificatesCount] = useState(0);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (enrolledCourses.length === 0) return;

    authFetch("/courses/certificates")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setCertificatesCount(data ? data.length : 0))
      .catch(console.error);

    Promise.all(
      enrolledCourses.map((course) =>
        authFetch(`/courses/${course.id}/progress`)
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      )
    ).then((list) => {
      let total = 0;
      list.forEach((item) => {
        if (item) total += item.completedLessons || 0;
      });
      setCompletedModulesCount(total);
    });
  }, [enrolledCourses]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("File must be below 2MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("mobile", formData.mobile);

      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      const res = await authFetch(`/users/${user.id}`, {
        method: "PATCH",
        body: form,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      updateUser(data);

      alert("Profile Updated Successfully");
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      alert("Fill all fields");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      alert("Minimum 8 characters");
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    alert("Password Updated");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getInitials = (name) => {
    if (!name) return "ST";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="student-dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="settings-header">
          <div>
            <span className="settings-tag">
              ACCOUNT MANAGEMENT
            </span>

            <h1 className="page-title">
              Settings
            </h1>

            <p className="page-subtitle">
              Manage your profile, learning account and credentials.
            </p>
          </div>
        </div>

        <div className="settings-container">

          {/* PERSONAL PROFILE */}

          <div className="settings-card">

            <h2>Personal Profile</h2>

            <div className="profile-avatar">

              {avatarPreview ? (

                <img
                  className="avatar-image"
                  src={avatarPreview}
                  alt="Avatar"
                />

              ) : user?.avatar ? (

                <img
                  className="avatar-image"
                  src={
                    user.avatar.startsWith("http")
                      ? user.avatar
                      : `${(
                          import.meta.env.VITE_API_URL ||
                          "http://localhost:5000/api"
                        ).replace("/api", "")}${user.avatar}`
                  }
                  alt="Avatar"
                />

              ) : (
                getInitials(formData.name)
              )}

            </div>

            <label className="avatar-upload">
              Choose Avatar Image

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                hidden
              />
            </label>

            <form
              className="settings-form"
              onSubmit={handleProfileUpdate}
            >

              <label className="input-label">
                Full Name
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
              />

              <label className="input-label">
                Email Address
              </label>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
              />

              <label className="input-label">
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="+91 9876543210"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mobile: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="save-btn"
              >
                Update Profile
              </button>

            </form>

          </div>
                    {/* ACADEMIC INFORMATION */}

          <div className="settings-card">

            <h2>Academic Information</h2>

            <div className="detail-box">
              <span>Account ID</span>
              <h4>SEC-USER-{user?.id || "N/A"}</h4>
            </div>

            <div className="detail-box">
              <span>Access Role</span>
              <h4>{user?.role?.toUpperCase() || "STUDENT"}</h4>
            </div>

            <div className="detail-box">
              <span>Academic Track</span>
              <h4>Cyber Security & Hacking</h4>
            </div>

            <div className="detail-box">
              <span>Batch Assigned</span>
              <h4>Elite Cyber Batch 2026</h4>
            </div>

            <div className="detail-box">
              <span>Authorized Mentor</span>
              <h4>Shourya Cyber Academy Support</h4>
            </div>

          </div>

          {/* SECURITY */}

          <div className="settings-card">

            <h2>Security Center</h2>

            <form
              className="settings-form"
              onSubmit={handlePasswordChange}
            >

              <input
                type="password"
                placeholder="Current Password"
                value={passwordData.currentPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentPassword: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="New Password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <button
                type="submit"
                className="save-btn"
              >
                Change Password
              </button>

            </form>

            <div className="security-info">

              <div className="detail-box">
                <span>Account Status</span>
                <h4>Protected & Active</h4>
              </div>

            </div>

          </div>

          {/* LEARNING OVERVIEW */}

          <div className="settings-card">

            <h2>Learning Overview</h2>

            <div className="stats-grid">

              <div className="stat-box">
                <h3>
                  {enrolledCourses.length
                    .toString()
                    .padStart(2, "0")}
                </h3>

                <span>Courses Enrolled</span>
              </div>

              <div className="stat-box">
                <h3>
                  {completedModulesCount
                    .toString()
                    .padStart(2, "0")}
                </h3>

                <span>Lessons Finished</span>
              </div>

              <div className="stat-box">
                <h3>
                  {certificatesCount
                    .toString()
                    .padStart(2, "0")}
                </h3>

                <span>Certificates</span>
              </div>

              <div className="stat-box">
                <h3>
                  {(completedModulesCount * 1.5).toFixed(1)}
                </h3>

                <span>Hours Studied</span>
              </div>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Settings;