import "../styles/Settings.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Settings() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <h1 className="page-title">
          Settings
        </h1>

        <div className="settings-container">

          <div className="settings-card">

            <h2>Profile Information</h2>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <button>
              Save Changes
            </button>

          </div>

          <div className="settings-card">

            <h2>Change Password</h2>

            <input
              type="password"
              placeholder="Current Password"
            />

            <input
              type="password"
              placeholder="New Password"
            />

            <button>
              Update Password
            </button>

          </div>

          <div className="settings-card">

            <h2>Notifications</h2>

            <label>
              <input type="checkbox" />
              Email Notifications
            </label>

            <label>
              <input type="checkbox" />
              Course Updates
            </label>

            <label>
              <input type="checkbox" />
              Assignment Reminders
            </label>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;