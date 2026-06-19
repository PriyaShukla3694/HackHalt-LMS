import "../styles/VideoLearning.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function VideoLearning() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <div className="video-layout">

          {/* LEFT SIDE */}

          <div className="video-main">

            <div className="video-player">

              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/inWWhr5tnEA"
                title="Cyber Security"
                allowFullScreen
              ></iframe>

            </div>

            <div className="video-info">

              <span className="lesson-tag">
                MODULE 03
              </span>

              <h1>Security Concepts</h1>

              <p>
                Learn security principles, CIA triad,
                threats, vulnerabilities, attacks and
                protection mechanisms.
              </p>

              <div className="course-progress">

                <div className="progress-top">
                  <span>Course Progress</span>
                  <span>68%</span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: "68%" }}
                  ></div>
                </div>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="playlist-panel">

            <h2>Course Content</h2>

            <div className="lesson completed">
              ✅ Introduction To Cyber Security
            </div>

            <div className="lesson completed">
              ✅ Networking Fundamentals
            </div>

            <div className="lesson active">
              ▶ Security Concepts
            </div>

            <div className="lesson">
              🔒 Ethical Hacking
            </div>

            <div className="lesson">
              🔒 Penetration Testing
            </div>

            <div className="lesson">
              🔒 Vulnerability Assessment
            </div>

            <div className="lesson">
              🔒 Final Assessment
            </div>

          </div>

        </div>

        {/* RESOURCES */}

        <div className="resources-section">

          <h2>Resources</h2>

          <div className="resource-grid">

            <div className="resource-card">
              📄 Cyber Security Notes.pdf
            </div>

            <div className="resource-card">
              📄 Quick Cheat Sheet.pdf
            </div>

            <div className="resource-card">
              📄 Assignment 01.pdf
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default VideoLearning;