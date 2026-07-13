import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonAI from "../assets/Python.jpeg";

import "../styles/StudentDashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    const tourCompleted = localStorage.getItem("lms_tour_completed");
    if (!tourCompleted) {
      setShowTour(true);
    }
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

        <div className="student-content">

          {/* ================= HERO ================= */}

          <div className="hero-card command-center">

            <div>

              <h1>
                Welcome Back 👋
              </h1>

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
              value="12"
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
            description="Resume your Cyber Security course where you left off."
            onClick={() => navigate("/my-courses")}
          />

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