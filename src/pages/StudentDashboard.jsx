import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";

import {
  FiBookOpen,
  FiAward,
  FiTrendingUp,
  FiArrowRight,
  FiPlayCircle,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import CourseCard from "../components/CourseCard";
import ContinueCard from "../components/ContinueCard";
import Button from "../components/Button";
import PlatformTour from "../components/PlatformTour";
import AchievementsPanel from "../components/AchievementsPanel";
import ThreatWidget from "../components/ThreatWidget";

import cyberSecurity from "../assets/Cyber_Security.webp";
import ethicalHacking from "../assets/Ethical_Hacking.webp";
import pythonAI from "../assets/Python.webp";

import "../styles/StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTour, setShowTour] = useState(() => {
    return !localStorage.getItem("lms_tour_completed");
  });

  const [activeCourse, setActiveCourse] = useState(null);
  const [activeProgress, setActiveProgress] = useState(null);

  useEffect(() => {
    authFetch("/courses/enrolled")
      .then((res) => res.json())
      .then(async (enrolledList) => {
        if (!enrolledList || enrolledList.length === 0) return;

        let selectedCourse = enrolledList[0];
        let selectedProgress = null;

        for (const c of enrolledList) {
          try {
            const progRes = await authFetch(`/courses/${c.id}/progress`);
            if (progRes.ok) {
              const progData = await progRes.json();
              const completedCount = progData && Array.isArray(progData.data) ? progData.data.length : 0;
              const totalCount = c.modules ? c.modules.length : 0;

              if (completedCount > 0 && completedCount < totalCount) {
                selectedCourse = c;
                selectedProgress = progData;
                break;
              }
              if (!selectedProgress) {
                selectedCourse = c;
                selectedProgress = progData;
              }
            }
          } catch (e) {
            console.error(e);
          }
        }

        setActiveCourse(selectedCourse);
        setActiveProgress(selectedProgress);
      })
      .catch((err) => console.error("Error loading dashboard skill tree details:", err));
  }, []);

  const courses = [
    {
      id: 1,
      title: "Cyber Security",
      image: cyberSecurity,
      lessons: "12 Lessons",
      progress: 70,
    },
    {
      id: 2,
      title: "Ethical Hacking",
      image: ethicalHacking,
      lessons: "18 Lessons",
      progress: 35,
    },
    {
      id: 3,
      title: "Python Programming",
      image: pythonAI,
      lessons: "20 Lessons",
      progress: 0,
    },
  ];

  return (
    <div className="student-shell">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="student-main">

        <Topbar
          title="Dashboard"
          subtitle="Welcome Back!"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="student-content" id="main-content" tabIndex="-1">

          {/* ================= HERO ================= */}

          <div className="hero-card command-center">

            <div>

              <h1>
                Welcome Back 👋
              </h1>
              
              <AchievementsPanel />
              <ThreatWidget />

              <p>
                Continue your cybersecurity journey and build
                real-world skills.
              </p>

              <Button
                className="hero-btn"
                onClick={() => navigate("/my-courses")}
              >
                Continue Learning
                <FiArrowRight style={{ marginLeft: "6px" }} />
              </Button>

            </div>

            <div className="hero-progress">

              <h2>68%</h2>

              <span>
                Overall Progress
              </span>

            </div>

          </div>

          {/* ================= STATS ================= */}

          <div className="stats-grid stats-row">

            <StatCard
              icon={<FiBookOpen />}
              value="03"
              title="Courses"
            />

            <StatCard
              icon={<FiTrendingUp />}
              value={localStorage.getItem('lms_streak_count') || '0'}
              title="Day Streak"
            />

            <StatCard
              icon={<FiAward />}
              value="02"
              title="Certificates"
            />

            <StatCard
              icon={<FiPlayCircle />}
              value="18h"
              title="Learning Hours"
            />

          </div>

          {/* ================= COURSES ================= */}

          <div className="section-head dashboard-block">

            <h2>
              My Courses
            </h2>

            <button
              onClick={() => navigate("/my-courses")}
            >
              View All
            </button>

          </div>

          <div className="course-grid">

            {courses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                image={course.image}
                lessons={course.lessons}
                progress={course.progress}
                isDashboard={true}
                onExplore={() => navigate(`/course/${course.id}`)}
              />
            ))}

          </div>

          {/* ================= CONTINUE LEARNING ================= */}

          <ContinueCard
            description={
              activeCourse
                ? `Resume your ${activeCourse.title} course where you left off.`
                : "Resume your cybersecurity journey where you left off."
            }
            onClick={() => {
              if (activeCourse) {
                navigate(`/course/${activeCourse.id}/learning`);
              } else {
                navigate("/my-courses");
              }
            }}
          />

          {/* ================= DYNAMIC SKILL TREE PATH ================= */}
          {activeCourse && activeProgress && (
            <div className="dashboard-skill-tree-section">
              <div className="section-head">
                <h2>Skill Tree Progress: {activeCourse.title}</h2>
                <button onClick={() => navigate(`/course/${activeCourse.id}`)}>
                  View Syllabus
                </button>
              </div>
              <div className="dashboard-skill-tree-card">
                <div className="mini-nodes-row">
                  {activeCourse.skillTree &&
                    activeCourse.skillTree.map((node, index) => {
                      const completedIds = activeProgress.data || [];
                      const totalModules = node.moduleIds.length;
                      const completedCount = node.moduleIds.filter((id) =>
                        completedIds.includes(id)
                      ).length;
                      const isAllCompleted = completedCount === totalModules && totalModules > 0;

                      let status = "locked";
                      let previousCompleted = true;
                      if (index > 0) {
                        const prevNode = activeCourse.skillTree[index - 1];
                        const prevTotal = prevNode.moduleIds.length;
                        const prevCompletedCount = prevNode.moduleIds.filter((id) =>
                          completedIds.includes(id)
                        ).length;
                        previousCompleted = prevCompletedCount === prevTotal && prevTotal > 0;
                      }

                      if (isAllCompleted) {
                        status = "completed";
                      } else if (previousCompleted) {
                        status = "in-progress";
                      }

                      const statusEmoji =
                        status === "completed" ? "✅" : status === "in-progress" ? "🔥" : "🔒";

                      return (
                        <div
                          key={node.id}
                          className={`mini-node-item ${status}`}
                          onClick={() =>
                            status !== "locked" &&
                            navigate(`/course/${activeCourse.id}/learning`)
                          }
                          style={{ cursor: status !== "locked" ? "pointer" : "not-allowed" }}
                        >
                          <span className="mini-status-icon">{statusEmoji}</span>
                          <div className="mini-node-meta">
                            <strong className="mini-node-name">{node.title}</strong>
                            <span className="mini-node-pct">
                              {completedCount}/{totalModules}
                            </span>
                          </div>
                          {index < activeCourse.skillTree.length - 1 && (
                            <span className="mini-arrow">➔</span>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* ================= QUICK ACCESS ================= */}

          <div className="section-head">

            <h2>
              Quick Access
            </h2>

          </div>

          <div className="quick-grid bottom-grid">

            <div
              className="quick-card"
              onClick={() => navigate("/my-courses")}
            >

              📚

              <h3>
                Courses
              </h3>

            </div>

            <div
              className="quick-card"
              onClick={() => navigate("/progress")}
            >

              📈

              <h3>
                Progress
              </h3>

            </div>

            <div
              className="quick-card"
              onClick={() => navigate("/certificates")}
            >

              🏆

              <h3>
                Certificates
              </h3>

            </div>

            <div
              className="quick-card"
              onClick={() => navigate("/settings")}
            >

              ⚙️

              <h3>
                Settings
              </h3>

            </div>

          </div>

        </div>

      </div>

      {showTour && (
        <PlatformTour onClose={() => setShowTour(false)} />
      )}
    </div>
  );
}

export default StudentDashboard;