import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiGlobe,
  FiLock,
  FiShield,
  FiDatabase,
  FiSave,
  FiRefreshCw,
  FiHardDrive,
} from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";
import { useToast } from "../context/ToastContext";
import Button from "../components/Button";
import "../styles/AdminPages.css";

function AdminSettings() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [settings, setSettings] = useState({
    name: "Admin",
    email: "admin@intexia.com",
    phone: "+91 9876543210",
    organization: "INTEXIA LMS",
    website: "www.intexia.com",
    password: "",
    emailNotification: true,
    smsNotification: false,
    twoFactor: true,
    maintenanceMode: false,
    allowRegistration: true,
  });

  const validateField = (name, value) => {
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
    } else if (name === "organization" && !value.trim()) {
      error = "Organization is required";
    } else if (name === "website" && !value.trim()) {
      error = "Website is required";
    } else if (name === "password" && value) {
      if (value.length < 8) {
        error = "Password must be at least 8 characters long";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
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
      const err = validateField(name, val);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleSave = () => {
    const newErrors = {};
    Object.keys(settings).forEach((key) => {
      if (
        key !== "password" &&
        key !== "emailNotification" &&
        key !== "smsNotification" &&
        key !== "twoFactor" &&
        key !== "maintenanceMode" &&
        key !== "allowRegistration"
      ) {
        const err = validateField(key, settings[key]);
        if (err) newErrors[key] = err;
      }
    });

    if (settings.password) {
      const pwdErr = validateField("password", settings.password);
      if (pwdErr) newErrors.password = pwdErr;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showToast("Please check for validation errors", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Admin settings updated successfully!", "success");
    }, 800);
  };

  const handleReset = () => {
    setSettings({
      name: "Admin",
      email: "admin@intexia.com",
      phone: "+91 9876543210",
      organization: "INTEXIA LMS",
      website: "www.intexia.com",
      password: "",
      emailNotification: true,
      smsNotification: false,
      twoFactor: true,
      maintenanceMode: false,
      allowRegistration: true,
    });
    setErrors({});
    showToast("Settings reset to defaults", "info");
  };

  return (
    <div className="admin-page">
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">
        <Topbar
          title="Admin Settings"
          subtitle="Platform Configuration"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="admin-content">
          <div className="page-header">
            <div>
              <h1>Admin Settings</h1>
              <p>Manage administrator profile, security and platform configuration.</p>
            </div>
          </div>

          <div className="settings-card">
            <div className="profile-avatar">
              <FiShield />
            </div>

            <h2>Administrator Profile</h2>
            <div className="settings-grid">
              <div className="input-group">
                <label>
                  <FiUser />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label>
                  <FiMail />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
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
                <label>
                  <FiPhone />
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
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
                <label>
                  <FiGlobe />
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={settings.organization}
                  onChange={handleChange}
                />
                {errors.organization && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.organization}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label>
                  <FiGlobe />
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={settings.website}
                  onChange={handleChange}
                />
                {errors.website && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.website}
                  </span>
                )}
              </div>

              <div className="input-group">
                <label>
                  <FiLock />
                  Change Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter new password"
                  value={settings.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="error-message" style={{ color: "var(--danger)", fontSize: "0.8rem", marginTop: "4px", display: "block" }}>
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            {/* SECURITY SETTINGS */}
            <div className="settings-section">
              <h3>
                <FiShield />
                Security Settings
              </h3>
              <div className="toggle-item">
                <label>🛡 Enable Two Factor Authentication</label>
                <input
                  type="checkbox"
                  name="twoFactor"
                  checked={settings.twoFactor}
                  onChange={handleChange}
                />
              </div>
              <div className="toggle-item">
                <label>👤 Allow New User Registration</label>
                <input
                  type="checkbox"
                  name="allowRegistration"
                  checked={settings.allowRegistration}
                  onChange={handleChange}
                />
              </div>
              <div className="toggle-item">
                <label>⚙ Maintenance Mode</label>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* NOTIFICATION SETTINGS */}
            <div className="settings-section">
              <h3>📢 Notification Settings</h3>
              <div className="toggle-item">
                <label>📧 Email Notifications</label>
                <input
                  type="checkbox"
                  name="emailNotification"
                  checked={settings.emailNotification}
                  onChange={handleChange}
                />
              </div>
              <div className="toggle-item">
                <label>📱 SMS Notifications</label>
                <input
                  type="checkbox"
                  name="smsNotification"
                  checked={settings.smsNotification}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* SYSTEM INFORMATION */}
            <div className="system-card">
              <h3>
                <FiDatabase />
                System Information
              </h3>
              <div className="system-grid">
                <div className="system-box">
                  <h2>1,248</h2>
                  <p>Total Users</p>
                </div>
                <div className="system-box">
                  <h2>18</h2>
                  <p>Total Courses</p>
                </div>
                <div className="system-box">
                  <h2>26</h2>
                  <p>Instructors</p>
                </div>
                <div className="system-box">
                  <h2>
                    <FiHardDrive />
                  </h2>
                  <p>78% Storage Used</p>
                </div>
                <div className="system-box">
                  <h2>99.9%</h2>
                  <p>Server Uptime</p>
                </div>
                <div className="system-box">
                  <h2>v2.5.1</h2>
                  <p>Platform Version</p>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="settings-buttons" style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
              <Button
                className="save-btn"
                loading={loading}
                disabled={loading || Object.values(errors).some((e) => !!e)}
                onClick={handleSave}
              >
                <FiSave style={{ marginRight: "6px" }} />
                Save Settings
              </Button>
              <Button
                className="reset-btn"
                variant="secondary"
                disabled={loading}
                onClick={handleReset}
              >
                <FiRefreshCw style={{ marginRight: "6px" }} />
                Reset Settings
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSettings;