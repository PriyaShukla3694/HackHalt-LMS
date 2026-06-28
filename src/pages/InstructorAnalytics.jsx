import { useState, useEffect } from "react";
import "../styles/InstructorAnalytics.css";
import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";
import { authFetch } from "../utils/api";

function InstructorAnalytics() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    authFetch("/instructor/analytics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load instructor metrics");
        return res.json();
      })
      .then((data) => {
        setStats(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading metrics.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalEnrolled = stats.reduce((sum, c) => sum + c.enrolledCount, 0);
  const totalCourses = stats.length;
  const avgCompletion = totalCourses
    ? Math.round(stats.reduce((sum, c) => sum + c.avgCompletionPercent, 0) / totalCourses)
    : 0;
  const totalCertificates = stats.reduce((sum, c) => sum + c.certificatesIssued, 0);

  // Find top course
  const sortedByEnrollment = [...stats].sort((a, b) => b.enrolledCount - a.enrolledCount);
  const topCourse = sortedByEnrollment[0];

  return (
    <div className="analytics-page">
      <InstructorSidebar />

      <div className="analytics-content">
        <Topbar />

        {/* HEADER */}
        <div className="analytics-header">
          <div>
            <span>PERFORMANCE INSIGHTS</span>
            <h1>Instructor Analytics</h1>
            <p>Track student engagement and course performance.</p>
          </div>
        </div>

        {loading ? (
          <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "40px" }}>
            <h3>Loading metrics...</h3>
          </div>
        ) : error ? (
          <div style={{ color: "#f87171", textAlign: "center", padding: "40px" }}>
            <h3>{error}</h3>
          </div>
        ) : stats.length === 0 ? (
          <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "40px" }}>
            <h3>No courses created yet.</h3>
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="analytics-stats">
              <div className="analytics-card">
                <h2>{totalEnrolled}</h2>
                <p>Total Students</p>
              </div>

              <div className="analytics-card">
                <h2>{totalCourses}</h2>
                <p>Total Courses</p>
              </div>

              <div className="analytics-card">
                <h2>{avgCompletion}%</h2>
                <p>Avg Completion Rate</p>
              </div>

              <div className="analytics-card">
                <h2>{totalCertificates}</h2>
                <p>Certificates Issued</p>
              </div>
            </div>

            {/* COURSE PERFORMANCE */}
            <div className="chart-section">
              <div className="chart-header">
                <h2>Course Enrollment Performance</h2>
              </div>

              <div className="chart-grid">
                <div className="y-axis">
                  <span>Max</span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span>0</span>
                </div>

                <div className="chart-area">
                  <div className="chart-bars">
                    {stats.map((c, idx) => {
                      const maxVal = Math.max(...stats.map((s) => s.enrolledCount), 1);
                      const heightPct = Math.round((c.enrolledCount / maxVal) * 100);
                      return (
                        <div className="chart-item" key={c.courseId}>
                          <span className="bar-value">{c.enrolledCount}</span>
                          <div
                            className={`bar bar${(idx % 5) + 1}`}
                            style={{ height: `${heightPct}%` }}
                          ></div>
                          <p>{c.title}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* COURSE SUMMARY */}
            <div className="analytics-summary">
              <div className="summary-card">
                <h3>🔥 Top Performing Course</h3>
                <p>{topCourse ? topCourse.title : "None"}</p>
                <span>{topCourse ? topCourse.enrolledCount : 0} Active Learners</span>
              </div>

              <div className="summary-card">
                <h3>📈 Avg Course Syllabus</h3>
                <p>Fully Seedeed</p>
                <span>All course modules verified</span>
              </div>

              <div className="summary-card">
                <h3>⭐ Certificate Rate</h3>
                <p>{totalCertificates} Issued</p>
                <span>Completion certification validated</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default InstructorAnalytics;