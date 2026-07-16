import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import AchievementCard from "../components/AchievementCard";
import Button from "../components/Button";
import {
  FiTrendingUp,
  FiAward,
  FiClock,
  FiTarget,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import "../styles/ProgressAnalytics.css";

function ProgressAnalytics() {
  
  const navigate = useNavigate();

const [sidebarOpen, setSidebarOpen] = useState(false);

  const courses = [
    {
      id: 1,
      name: "Cyber Security",
      progress: 75,
    },
    {
      id: 2,
      name: "Ethical Hacking",
      progress: 45,
    },
    {
      id: 3,
      name: "Python Programming",
      progress: 20,
    },
  ];

  return (
    <div className="progress-shell">

      <Sidebar
    isOpen={sidebarOpen}
    onClose={() => setSidebarOpen(false)}
/>

      <div className="progress-main">

        <Topbar
    title="Progress Analytics"
    subtitle="Track your learning journey and achievements."
    onMenuClick={() => setSidebarOpen(true)}
/>

        <div className="progress-content" id="main-content" tabIndex="-1">

          {/* Stats */}

          <div className="stats-grid">

            <div className="stat-card">

              <FiTrendingUp />

              <h2>75%</h2>

              <p>Overall Progress</p>

            </div>

            <div className="stat-card">

              <FiClock />

              <h2>18h</h2>

              <p>Learning Hours</p>

            </div>

            <div className="stat-card">

              <FiAward />

              <h2>2</h2>

              <p>Certificates</p>

            </div>

            <div className="stat-card">

              <FiTarget />

              <h2>12</h2>

              <p>Day Streak</p>

            </div>

          </div>

          {/* Course Progress */}

          <div className="progress-card">

            <h2>Course Progress</h2>

            {courses.map((course) => (

              <div
                className="course-progress"
                key={course.id}
              >

                <div className="course-top">

                  <h3>{course.name}</h3>

                  <span>{course.progress}%</span>

                </div>

                <div className="progress-bar">

                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />

                </div>

                <Button
                  className="details-btn"
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate("/course/1")}
                >
                  Course Details
                </Button>

              </div>

            ))}

          </div>

          {/* Achievement */}

          <AchievementCard
            description="🎉 Amazing! You've completed more than half of your learning journey. Keep going to unlock more certificates."
          />

        </div>

      </div>

    </div>
  );
}

export default ProgressAnalytics;