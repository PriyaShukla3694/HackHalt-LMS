import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBook,
  FiLock,
  FiSave,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import "../styles/InstructorSettings.css";

function InstructorSettings() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [settings, setSettings] = useState({
    fullName: "Priya Verma",
    email: "priya@example.com",
    phone: "+91 9123456780",
    specialization: "Ethical Hacking",
    bio: "Certified Security Analyst and LMS Mentor.",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotification: true,
  });

  const validateField = (name, value, allSettings = settings) => {
    let error = "";
    if (name === "fullName" && !value.trim()) {
      error = "Full Name is required";
    } else if (name === "email") {
      if (!value.trim()) {
        error = "Email address is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address";
      }
    } else if (name === "phone" && !value.trim()) {
      error = "Phone number is required";
    } else if (name === "specialization" && !value.trim()) {
      error = "Specialization is required";
    } else if (name === "newPassword" && value) {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
      }
    } else if (name === "confirmPassword" && allSettings.newPassword) {
      if (value !== allSettings.newPassword) {
        error = "Passwords do not match";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    const updated = { ...settings, [name]: val };
    setSettings(updated);

    if (type !== "checkbox") {
      const err = validateField(name, val, updated);
      setErrors((prev) => {
        const next = { ...prev, [name]: err };
        if (name === "newPassword") {
          next.confirmPassword = validateField("confirmPassword", updated.confirmPassword, updated);
        }
        return next;
      });
    }
  };

  const handleSave = () => {
    const newErrors = {};
    Object.keys(settings).forEach((key) => {
      if (
        key !== "currentPassword" &&
        key !== "confirmPassword" &&
        key !== "emailNotification" &&
        key !== "bio"
      ) {
        const err = validateField(key, settings[key]);
        if (err) newErrors[key] = err;
      }
    });

    if (settings.newPassword) {
      const confirmErr = validateField("confirmPassword", settings.confirmPassword);
      if (confirmErr) newErrors.confirmPassword = confirmErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please check for validation errors", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Instructor settings updated successfully!", "success");
    }, 800);
  };

  return (
    <div className="instructor-settings-page">
      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="instructor-settings-main">
        <Topbar
          title="Instructor Settings"
          onMenuClick={() => setSidebarOpen(true)}
          hideTitle={true}
        />

        <div className="settings-content" id="main-content" tabIndex="-1">
          <div className="settings-header">
            <h1>Instructor Settings</h1>
            <p>Update your profile information and account settings.</p>
          </div>

          <div className="settings-card">
            <div className="profile-avatar">
              <FiUser />
            </div>

            <h2>Profile Information</h2>

            <div className="settings-grid">
              <div className="input-group">
                <label htmlFor="inst-fullName">
                  <FiUser />
                  Full Name
                </label>
                <input
                  id="inst-fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={settings.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.fullName}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="inst-email">
                  <FiMail />
                  Email Address
                </label>
                <input
                  id="inst-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={settings.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="inst-phone">
                  <FiPhone />
                  Phone Number
                </label>
                <input
                  id="inst-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={settings.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label htmlFor="inst-specialization">
                  <FiBook />
                  Specialization
                </label>
                <input
                  id="inst-specialization"
                  type="text"
                  name="specialization"
                  placeholder="e.g. Cyber Security"
                  value={settings.specialization}
                  onChange={handleChange}
                />
                {errors.specialization && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.specialization}
                  </span>
                )}
              </div>
            </div>

            <div className="textarea-group">
              <label htmlFor="inst-bio">About Yourself</label>
              <textarea
                id="inst-bio"
                rows="5"
                name="bio"
                placeholder="Write a short bio..."
                value={settings.bio}
                onChange={handleChange}
              />
            </div>

            <div className="settings-options">
              <h3>Notification Settings</h3>
              <div className="toggle-item">
                <label htmlFor="inst-emailNotification">Email Notifications</label>
                <input
                  id="inst-emailNotification"
                  type="checkbox"
                  name="emailNotification"
                  checked={settings.emailNotification}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="password-section">
              <h3>Change Password</h3>
              <div className="settings-grid">
                <div className="input-group">
                  <label htmlFor="inst-currentPassword">
                    <FiLock />
                    Current Password
                  </label>
                  <div className="password-input">
                    <input
                      id="inst-currentPassword"
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      placeholder="Enter current password"
                      value={settings.currentPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          current: !prev.current,
                        }))
                      }
                      aria-label="Toggle current password visibility"
                    >
                      {showPassword.current ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="inst-newPassword">
                    <FiLock />
                    New Password
                  </label>
                  <div className="password-input">
                    <input
                      id="inst-newPassword"
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      placeholder="Enter new password"
                      value={settings.newPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          new: !prev.new,
                        }))
                      }
                      aria-label="Toggle new password visibility"
                    >
                      {showPassword.new ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                      {errors.newPassword}
                    </span>
                  )}
                </div>

                <div className="input-group">
                  <label htmlFor="inst-confirmPassword">
                    <FiLock />
                    Confirm Password
                  </label>
                  <div className="password-input">
                    <input
                      id="inst-confirmPassword"
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={settings.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="eye-btn"
                      onClick={() =>
                        setShowPassword((prev) => ({
                          ...prev,
                          confirm: !prev.confirm,
                        }))
                      }
                      aria-label="Toggle confirm password visibility"
                    >
                      {showPassword.confirm ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="settings-buttons">
              <Button
                className="save-btn"
                loading={loading}
                disabled={loading || Object.values(errors).some((e) => !!e)}
                onClick={handleSave}
              >
                <FiSave />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorSettings;