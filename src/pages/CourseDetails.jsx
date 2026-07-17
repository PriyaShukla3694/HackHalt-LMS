import { motion } from "framer-motion";
import "../styles/CourseDetails.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCourse } from "../hooks/useCourses";
import { authFetch } from "../utils/api";
import Skeleton from "../components/Skeleton";
import { useToast } from "../context/ToastContext";
import SkillTreeView from "../components/SkillTreeView";

import cyberSecurity from "../assets/Cyber_Security.webp";
import ethicalHacking from "../assets/Ethical_Hacking.webp";
import pythonAI from "../assets/Python.webp";
import trishul from "../assets/trishul.webp";

const getCourseImage = (id) => {
  const parsedId = id?.toString();
  if (parsedId === "1") return cyberSecurity;
  if (parsedId === "2") return ethicalHacking;
  if (parsedId === "3") return pythonAI;
  return trishul;
};

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { course, loading, error } = useCourse(id);

  const [enrolled, setEnrolled] = useState(false);
  const [progress, setProgress] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    if (!id) return;

    authFetch(`/courses/${id}/progress`)
      .then((res) => {
        if (res.status === 401) return null;
        return res.json();
      })
      .then((data) => {
        if (data) {
          setEnrolled(true);
          setProgress(data);
        } else {
          setEnrolled(false);
        }
      })
      .catch((err) => console.error("Error fetching progress:", err));

    authFetch(`/courses/${id}/labs`)
      .then((res) => {
        if (res.ok) return res.json();
        return null;
      })
      .then((data) => {
        if (data && data.data) {
          setLabs(data.data);
        }
      })
      .catch((err) => console.error("Error fetching course labs:", err));
  }, [id]);

  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const res = await authFetch(`/courses/${id}/enroll`, {
        method: "POST",
      });

      if (res.ok) {
        setEnrolled(true);
        showToast("Successfully enrolled in this course!", "success");
        // trigger progress fetch
        const progRes = await authFetch(`/courses/${id}/progress`);
        if (progRes.ok) {
          const progData = await progRes.json();
          setProgress(progData);
        }
        // fetch labs
        const labsRes = await authFetch(`/courses/${id}/labs`);
        if (labsRes.ok) {
          const labsData = await labsRes.json();
          setLabs(labsData.data);
        }
      } else {
        alert("Failed to enroll in course.");
      }
    } catch (err) {
      console.error(err);
      alert("Error enrolling in course.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="course-details-page">
        <Sidebar />
        <div className="course-details-content">
          <Topbar />
          
          <div className="course-hero">
            <div className="course-left">
              <Skeleton variant="text" width="80px" height="24px" style={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width="60%" height="40px" style={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width="90%" height="16px" />
              <Skeleton variant="text" width="85%" height="16px" />
              <Skeleton variant="text" width="70%" height="16px" style={{ marginBottom: "24px" }} />
              
              <div className="course-stats" style={{ display: "flex", gap: "24px" }}>
                <Skeleton variant="text" width="80px" height="32px" />
                <Skeleton variant="text" width="80px" height="32px" />
                <Skeleton variant="text" width="80px" height="32px" />
              </div>
              
              <Skeleton variant="text" width="180px" height="48px" style={{ marginTop: "24px", borderRadius: "var(--radius-sm)" }} />
            </div>
            
            <div className="course-right">
              <Skeleton variant="card" width="100%" height="260px" />
            </div>
          </div>
          
          <div className="progress-section" style={{ marginTop: "30px" }}>
            <div className="progress-card">
              <Skeleton variant="text" width="150px" height="24px" style={{ marginBottom: "16px" }} />
              <Skeleton variant="text" width="100%" height="16px" />
            </div>
          </div>

          <div className="skills-section" style={{ marginTop: "40px" }}>
            <Skeleton variant="text" width="200px" height="28px" style={{ marginBottom: "20px" }} />
            <div className="skills-grid" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Skeleton variant="text" width="120px" height="38px" style={{ borderRadius: "20px" }} />
              <Skeleton variant="text" width="140px" height="38px" style={{ borderRadius: "20px" }} />
              <Skeleton variant="text" width="110px" height="38px" style={{ borderRadius: "20px" }} />
              <Skeleton variant="text" width="130px" height="38px" style={{ borderRadius: "20px" }} />
            </div>
          </div>

          <Footer />
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="course-details-page">
        <Sidebar />
        <div className="course-details-content">
          <Topbar />
          <div style={{ padding: "40px", textAlign: "center", color: "var(--text-primary)" }} id="main-content" tabIndex="-1">
            <h2>Course Not Found</h2>
            <p>{error || "The requested course could not be found."}</p>
            <button
              onClick={() => navigate("/my-courses")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "var(--accent-glow)",
                border: "none",
                color: "#fff",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Back to My Courses
            </button>
          </div>
          <Footer />
        </div>
      </div>
    );
  }

  const completionPct = course.totalLessons > 0 && progress
    ? ((progress.completedLessons / course.totalLessons) * 100).toFixed(0)
    : "0";

  return (
    <div className="course-details-page">
      <Sidebar />

      <div className="course-details-content">
        <Topbar />

        <div className="course-details-main" id="main-content" tabIndex="-1">
          {/* HERO */}
          <div className="course-hero">
            <div className="course-left">
              <span className="course-tag">
                {course.tag}
              </span>

              <h1>
                {course.title}
              </h1>

              <p>
                {course.description}
              </p>

              <div className="course-stats">
                <div>
                  <h3>{course.totalLessons}</h3>
                  <span>Lessons</span>
                </div>

                <div>
                  <h3>{course.duration}</h3>
                  <span>Duration</span>
                </div>

                <div>
                  <h3>{enrolled ? `${completionPct}%` : "—"}</h3>
                  <span>Completed</span>
                </div>

              </div>

              {enrolled ? (
                <button
                  className="start-learning-btn"
                  onClick={() => navigate(`/course/${course.id}/learning`)}
                >
                  {progress?.completedLessons > 0 ? "Continue Learning →" : "Start Learning →"}
                </button>
              ) : (
                <button
                  className="start-learning-btn"
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll in Course →"}
                </button>
              )}

            </div>

            <div className="course-right">
              <img
                src={getCourseImage(course.id)}
                alt={course.title}
                width={480}
                height={300}
                loading="eager"
              />
            </div>

          </div>

        {/* COURSE PROGRESS */}
        <div className="progress-section">
          <div className="progress-card">
            <h2>Your Progress</h2>

            {enrolled ? (
              <>
                <div className="progress-top">
                  <span>Completed</span>
                  <span>{completionPct}%</span>
                </div>

                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${completionPct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </>
            ) : (
              <p style={{ color: "var(--text-secondary)", marginTop: "10px" }}>
                Enroll in this course to track your learning progress.
              </p>
            )}

          </div>

        </div>

        {/* SKILLS */}
        <div className="skills-section">
          <h2>Skills You'll Learn</h2>

          <div className="skills-grid">
            {course.difficulty && (
              <div className="skill-card" style={{ border: "1px solid var(--accent-glow)" }}>
                Difficulty: {course.difficulty}
              </div>
            )}
            {/* Split comma list or standard array */}
            {Array.isArray(course.skills) ? (
              course.skills.map((skill, index) => (
                <div key={index} className="skill-card">
                  {skill}
                </div>
              ))
            ) : (
              // Fallback default skills list based on course type
              (course.title.includes("Security")
                ? ["Network Security", "Threat Analysis", "Ethical Hacking", "Penetration Testing", "Malware Detection", "Cyber Defense"]
                : course.title.includes("Hacking")
                ? ["Penetration Testing", "Vulnerability Assessment", "Footprinting", "Social Engineering", "Wireless Security", "Web App Hacking"]
                : ["Python Basics", "Numpy & Pandas", "Machine Learning", "Neural Networks", "TensorFlow / PyTorch", "AI Deployment"]
              ).map((skill, index) => (
                <div key={index} className="skill-card">
                  {skill}
                </div>
              ))
            )}
          </div>

        </div>

        {/* SKILL TREE */}
        {enrolled && (
          <SkillTreeView course={course} progress={progress} />
        )}

        {/* MODULES */}
        <div className="module-section">
          <h2>Course Modules</h2>

          <div className="module-grid">
            {course.modules && course.modules.map((mod, index) => (
              <div key={mod.id || index} className="module-card">
                <span>{(index + 1).toString().padStart(2, "0")}</span>
                {mod.title} ({mod.duration})
              </div>
            ))}
          </div>

        </div>

        {/* HANDS-ON LABS */}
        {enrolled && labs && labs.length > 0 && (
          <div className="labs-section" style={{ marginTop: "40px" }}>
            <h2>Hands-on Practice Labs</h2>
            <div className="labs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "16px" }}>
              {labs.map((labItem) => (
                <div
                  key={labItem.labId}
                  className="lab-card"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderRadius: "var(--radius-md)",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "14px"
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#fff", margin: "0 0 6px 0" }}>{labItem.title}</h3>
                    <p style={{ fontSize: "13px", color: "var(--muted)", margin: 0, lineHeight: "1.4" }}>
                      {labItem.briefing.substring(0, 100)}...
                    </p>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", color: labItem.completed ? "var(--success)" : "var(--orange)" }}>
                      {labItem.completed ? "✓ Completed" : "⚡ Active Staging"}
                    </span>
                    <button
                      className="resume-btn"
                      onClick={() => navigate(`/course/${course.id}/lab/${labItem.labId}`)}
                      style={{ padding: "8px 14px", fontSize: "13px", borderRadius: "8px" }}
                    >
                      {labItem.completed ? "Enter Sandbox" : "Start Lab"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSTRUCTOR */}
        <div className="instructor-card">
          <h2>Instructor</h2>

          <h3>{course.instructor}</h3>

          <p>
            Certified Cyber Security Experts with industry experience in Ethical Hacking, Digital Forensics and Security Operations.
          </p>

        </div>

        <Footer />

        </div>
      </div>
    </div>
  );
}

export default CourseDetails;