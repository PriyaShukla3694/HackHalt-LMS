import "../styles/StudentDashboard.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonAI from "../assets/Python.jpeg";

import { useNavigate } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        {/* COMMAND CENTER HERO */}

        <div className="command-center">

          <div className="command-left">

            <span className="warrior-tag">
              ⚔ CYBER WARRIOR • LEVEL 07
            </span>

            <h1>
              Welcome Back, Shourya
            </h1>

            <p>
              Continue mastering cybersecurity,
              ethical hacking and AI.
              Your next achievement is waiting.
            </p>

            <div className="xp-box">

              <div>
                <h3>1280 XP</h3>
                <span>Total Experience</span>
              </div>

              <div>
                <h3>68%</h3>
                <span>Course Progress</span>
              </div>

            </div>

            <button
              className="continue-btn"
              onClick={() => navigate("/my-courses")}
            >
              Continue Learning →
            </button>

          </div>

          <div className="command-right">
            <img src={cyberSecurity} alt="Cyber Security" />
          </div>

        </div>

        {/* STATS */}

        <div className="stats-row">

          <div className="premium-stat">
            <h2>04</h2>
            <p>Active Courses</p>
          </div>

          <div className="premium-stat">
            <h2>07</h2>
            <p>Day Streak</p>
          </div>

          <div className="premium-stat">
            <h2>03</h2>
            <p>Certificates</p>
          </div>

          <div className="premium-stat">
            <h2>128</h2>
            <p>Learning Hours</p>
          </div>

        </div>

        {/* CONTINUE LEARNING */}

        <div className="dashboard-block">

          <div className="section-head">
            <h2>Continue Learning</h2>
            <span>View All</span>
          </div>

          <div className="course-grid">

            {/* Cyber Security */}

            <div
              className="course-card"
              onClick={() => navigate("/course-details")}
            >
              <img src={cyberSecurity} alt="Cyber Security" />

              <div className="course-content">

                <h3>Cyber Security Basics</h3>

                <p>12 Lessons Remaining</p>

                <div className="mini-progress">
                  <div style={{ width: "68%" }}></div>
                </div>

              </div>
            </div>

            {/* Ethical Hacking */}

            <div
              className="course-card"
              onClick={() => navigate("/course-details")}
            >
              <img src={ethicalHacking} alt="Ethical Hacking" />

              <div className="course-content">

                <h3>Ethical Hacking</h3>

                <p>8 Lessons Remaining</p>

                <div className="mini-progress">
                  <div style={{ width: "35%" }}></div>
                </div>

              </div>
            </div>

            {/* Python */}

            <div
              className="course-card"
              onClick={() => navigate("/course-details")}
            >
              <img src={pythonAI} alt="Python AI" />

              <div className="course-content">

                <h3>Python For AI</h3>

                <p>4 Lessons Remaining</p>

                <div className="mini-progress">
                  <div style={{ width: "80%" }}></div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ACTIVITY + ACHIEVEMENTS */}

        <div className="bottom-grid">

          <div className="activity-box">

            <h2>Recent Activity</h2>

            <div className="timeline">
              <p>✅ Completed Networking Module</p>
              <p>🏆 Earned Cyber Warrior Badge</p>
              <p>📚 Finished Assignment 03</p>
              <p>🔥 7 Day Learning Streak</p>
            </div>

          </div>

          <div className="achievement-box">

            <h2>Achievements</h2>

            <div className="badge">
              🥇 Cyber Warrior
            </div>

            <div className="badge">
              🔥 Consistency Master
            </div>

            <div className="badge">
              🏆 Elite Learner
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default StudentDashboard;