
import "../styles/MyCourses.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonAI from "../assets/Python.jpeg";

function MyCourses() {
  const navigate = useNavigate();

  return (
    <div className="student-dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="courses-header">
          <div>
            <span className="courses-tag">
              LEARNING PATH
            </span>

            <h1 className="page-title">
              My Courses
            </h1>

            <p>
              Continue your enrolled courses and track your learning journey.
            </p>
          </div>

          <div className="course-count">
            <h2>04</h2>
            <span>Active Courses</span>
          </div>
        </div>

        <div className="course-grid">

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >
            <div className="course-image">
              <img src={cyberSecurity} alt="Cyber Security" />
              <span className="course-badge">
                Advanced
              </span>
            </div>

            <div className="course-content">
              <h3>Cyber Security Basics</h3>

              <p>
                Master cyber threats, security architecture,
                penetration defense and protection systems.
              </p>

              <div className="course-meta">
                <span>24 Lessons</span>
                <span>12 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>60%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "60%" }}
                />
              </div>

              <button>
                Continue Learning →
              </button>
            </div>
          </div>

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >
            <div className="course-image">
              <img src={ethicalHacking} alt="Ethical Hacking" />
              <span className="course-badge">
                Intermediate
              </span>
            </div>

            <div className="course-content">
              <h3>Ethical Hacking</h3>

              <p>
                Learn penetration testing, vulnerability
                assessment and ethical hacking methodologies.
              </p>

              <div className="course-meta">
                <span>18 Lessons</span>
                <span>8 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>35%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "35%" }}
                />
              </div>

              <button>
                Continue Learning →
              </button>
            </div>
          </div>

          <div
            className="course-card"
            onClick={() => navigate("/course-details")}
          >
            <div className="course-image">
              <img src={pythonAI} alt="Python AI" />
              <span className="course-badge">
                Beginner
              </span>
            </div>

            <div className="course-content">
              <h3>Python For AI</h3>

              <p>
                Build AI applications using Python,
                Machine Learning and Deep Learning tools.
              </p>

              <div className="course-meta">
                <span>30 Lessons</span>
                <span>15 Hours</span>
              </div>

              <div className="progress-top">
                <span>Progress</span>
                <span>80%</span>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: "80%" }}
                />
              </div>

              <button>
                Continue Learning →
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MyCourses;

