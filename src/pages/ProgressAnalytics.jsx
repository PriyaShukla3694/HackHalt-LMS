import "../styles/ProgressAnalytics.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function ProgressAnalytics() {
  return (
    <div className="progress-page">

      <Sidebar />

      <div className="progress-content">

        <Topbar />

        {/* HERO */}

        <div className="analytics-hero">

          <div>
            <span>LEARNING INSIGHTS</span>

            <h1>Progress Analytics</h1>

            <p>
              Track your learning journey, monitor performance
              and unlock achievements.
            </p>
          </div>

          <div className="progress-circle">
            <h2>82%</h2>
            <p>Completed</p>
          </div>

        </div>

        {/* STATS */}

        <div className="analytics-stats">

          <div className="analytics-card">
            <h2>04</h2>
            <p>Active Courses</p>
          </div>

          <div className="analytics-card">
            <h2>128</h2>
            <p>Learning Hours</p>
          </div>

          <div className="analytics-card">
            <h2>07</h2>
            <p>Day Streak</p>
          </div>

          <div className="analytics-card">
            <h2>03</h2>
            <p>Certificates</p>
          </div>

        </div>

        {/* BAR GRAPH */}

        <div className="progress-section">

          <h2>Course Performance</h2>

          <div className="bar-chart-card">

            <div className="bar-chart">

              <div className="bar-item">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ height: "80%" }}
                  ></div>
                </div>

                <h4>80%</h4>
                <p>Cyber Security</p>
              </div>

              <div className="bar-item">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ height: "65%" }}
                  ></div>
                </div>

                <h4>65%</h4>
                <p>Ethical Hacking</p>
              </div>

              <div className="bar-item">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ height: "72%" }}
                  ></div>
                </div>

                <h4>72%</h4>
                <p>Python For AI</p>
              </div>

              <div className="bar-item">
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{ height: "90%" }}
                  ></div>
                </div>

                <h4>90%</h4>
                <p>Networking</p>
              </div>

            </div>

          </div>

        </div><div className="weekly-section">

  <h2>Weekly Learning Activity</h2>

  <div className="heatmap">

    <div className="heat low"></div>
    <div className="heat medium"></div>
    <div className="heat high"></div>
    <div className="heat low"></div>
    <div className="heat high"></div>
    <div className="heat medium"></div>
    <div className="heat high"></div>

  </div>

</div>

<div className="xp-section">

  <div className="xp-card">

    <div>
      <span>Current Rank</span>
      <h2>Cyber Warrior</h2>
    </div>

    <div>
      <span>XP Points</span>
      <h2>2480 XP</h2>
    </div>

  </div>

  <div className="xp-progress">
    <div
      className="xp-fill"
      style={{ width: "72%" }}
    ></div>
  </div>

  <p>520 XP remaining for Elite Hacker</p>

</div>
        {/* ACHIEVEMENTS */}

        <div className="achievement-section">

          <h2>Achievements</h2>

          <div className="achievement-grid">

            <div className="achievement-card">
              🏆 Cyber Warrior
            </div>

            <div className="achievement-card">
              🔥 7 Day Streak
            </div>

            <div className="achievement-card">
              🎖️ Consistency Master
            </div>

            <div className="achievement-card">
              🚀 Fast Learner
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProgressAnalytics;