import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import "../styles/Settings.css";

function Settings() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [profile, setProfile] = useState({
    name: "Kritika Saxena",
    email: "kritika@gmail.com",
    phone: "+91 9876543210",
    college: "ABC University",
    course: "Cyber Security",
    year: "3rd Year",
    password: "",
    confirmPassword: "",
    notifications: true,
  });

  const validateField = (name, value, allProfile = profile) => {
    let error = "";
    if (name === "name" && !value.trim()) {
      error = "Full Name is required";
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address";
      }
    } else if (name === "phone" && !value.trim()) {
      error = "Phone number is required";
    } else if (name === "college" && !value.trim()) {
      error = "College is required";
    } else if (name === "course" && !value.trim()) {
      error = "Course is required";
    } else if (name === "year" && !value.trim()) {
      error = "Academic Year is required";
    } else if (name === "password" && value) {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
      }
    } else if (name === "confirmPassword" && allProfile.password) {
      if (value !== allProfile.password) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updated = { ...profile, [name]: val };
    setProfile(updated);

    if (type !== "checkbox") {
      const err = validateField(name, val, updated);
      setErrors((prev) => {
        const next = { ...prev, [name]: err };
        if (name === "password") {
          next.confirmPassword = validateField("confirmPassword", updated.confirmPassword, updated);
        }
        return next;
      });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    Object.keys(profile).forEach((key) => {
      if (key !== "notifications" && key !== "confirmPassword") {
        const err = validateField(key, profile[key]);
        if (err) newErrors[key] = err;
      }
    });
    if (profile.password) {
      const confirmErr = validateField("confirmPassword", profile.confirmPassword);
      if (confirmErr) newErrors.confirmPassword = confirmErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please fix the validation errors", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Settings Updated Successfully!", "success");
    }, 800);
  };

  return (
    <div className="settings-page">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="settings-main">
        <Topbar
          title="Settings"
          subtitle="Manage your account and preferences."
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="settings-content" id="main-content" tabIndex="-1">
          <div className="settings-card">
            <div className="profile-header">
              <div className="profile-avatar">{profile.name.charAt(0)}</div>
              <div>
                <h2>{profile.name}</h2>
                <span>Cyber Security Student</span>
              </div>
            </div>

            <h3 className="section-heading">Personal Information</h3>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="settings-name">Full Name</label>
                <input
                  id="settings-name"
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="settings-email">Email</label>
                <input
                  id="settings-email"
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="settings-phone">Phone</label>
                <input
                  id="settings-phone"
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="settings-college">College</label>
                <input
                  id="settings-college"
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                />
                {errors.college && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.college}
                  </span>
                )}
              </div>
            </div>

            <h3 className="section-heading">Academic Details</h3>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="settings-course">Course</label>
                <input
                  id="settings-course"
                  type="text"
                  name="course"
                  value={profile.course}
                  onChange={handleChange}
                />
                {errors.course && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.course}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="settings-year">Academic Year</label>
                <input
                  id="settings-year"
                  type="text"
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                />
                {errors.year && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.year}
                  </span>
                )}
              </div>
            </div>

            <h3 className="section-heading">Security</h3>
            <div className="form-grid">
              <div className="input-group">
                <label htmlFor="settings-password">New Password</label>
                <input
                  id="settings-password"
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={profile.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="settings-confirmPassword">Confirm Password</label>
                <input
                  id="settings-confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={profile.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <h3 className="section-heading">Preferences</h3>
            <div className="preference-card">
              <div>
                <h4>Email Notifications</h4>
                <p>Receive updates about courses and announcements.</p>
              </div>

              <label className="switch" htmlFor="settings-notifications">
                <input
                  id="settings-notifications"
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <h2>3</h2>
                <span>Courses</span>
              </div>
              <div className="stat-box">
                <h2>18h</h2>
                <span>Learning</span>
              </div>
              <div className="stat-box">
                <h2>2</h2>
                <span>Certificates</span>
              </div>
              <div className="stat-box">
                <h2>68%</h2>
                <span>Progress</span>
              </div>
            </div>

            <Button
              className="save-btn"
              loading={loading}
              disabled={loading || Object.values(errors).some((e) => !!e)}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;