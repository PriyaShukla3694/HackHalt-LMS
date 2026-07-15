import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StatCard from "../components/StatCard";
import Button from "../components/Button";

import {
  FiBookOpen,
  FiUsers,
  FiBarChart2,
  FiDollarSign,
  FiArrowRight,
  FiStar,
  FiCalendar,
} from "react-icons/fi";

import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

import cyberSecurity from "../assets/Cyber_Security.webp";
import ethicalHacking from "../assets/Ethical_Hacking.webp";
import pythonProgramming from "../assets/Python.webp";

import "../styles/InstructorDashboard.css";

function InstructorDashboard() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const courses = [
    {
      id: 1,
      title: "Cyber Security",
      students: 125,
      image: cyberSecurity,
      rating: "4.9",
    },
    {
      id: 2,
      title: "Ethical Hacking",
      students: 92,
      image: ethicalHacking,
      rating: "4.8",
    },
    {
      id: 3,
      title: "Python Programming",
      students: 160,
      image: pythonProgramming,
      rating: "4.7",
    },
  ];

  return (
    <div className="instructor-dashboard">

      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="instructor-main">

        <Topbar
          title="Instructor Dashboard"
          subtitle="Welcome Back!"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="instructor-content" id="main-content" tabIndex="-1">

          {/* HERO */}

          <div className="instructor-hero">

            <div>

              <h1>Welcome Back, Instructor 👨‍🏫</h1>

              <p>
                Manage your courses, monitor students and track your
                teaching performance from one place.
              </p>

              <Button
                className="hero-action-btn"
                onClick={() => navigate("/manage-courses")}
              >
                Manage Courses
                <FiArrowRight style={{ marginLeft: "6px" }} />
              </Button>

            </div>

            <div className="hero-summary">

              <h2>377</h2>

              <span>Total Students</span>

            </div>

          </div>

          {/* STATS */}

          <div className="instructor-stats">

            <StatCard
              icon={<FiBookOpen />}
              value="03"
              title="Total Courses"
              className="instructor-stat-card"
            />

            <StatCard
              icon={<FiUsers />}
              value="377"
              title="Students"
              className="instructor-stat-card"
            />

            <StatCard
              icon={<FiStar />}
              value="4.8"
              title="Average Rating"
              className="instructor-stat-card"
            />

            <StatCard
              icon={<FiDollarSign />}
              value="₹18K"
              title="Monthly Revenue"
              className="instructor-stat-card"
            />

          </div>

          {/* COURSES */}

          <div className="section-header">

            <h2>My Courses</h2>

            <button
              onClick={() => navigate("/manage-courses")}
            >
              View All
            </button>

          </div>

          <div className="instructor-course-grid">

            {courses.map((course) => (

              <div
                className="instructor-course-card"
                key={course.id}
              >

                <img
                  src={course.image}
                  alt={course.title}
                  width={360}
                  height={200}
                  loading="lazy"
                />

                <div className="course-info">

                  <h3>{course.title}</h3>

                  <p>{course.students} Students Enrolled</p>

                  <div className="course-rating">

                    <FiStar />

                    <span>{course.rating}</span>

                  </div>

                  <button
                    className="manage-btn"
                    onClick={() => navigate("/manage-courses")}
                  >
                    Manage Course
                  </button>

                </div>

              </div>

            ))}

                    </div>

          {/* QUICK ACTIONS */}

          <div className="section-header">

            <h2>Quick Actions</h2>

          </div>

          <div className="quick-actions-grid">

            <div
              className="quick-action-card"
              onClick={() => navigate("/manage-courses")}
            >

              <FiBookOpen />

              <h3>Manage Courses</h3>

              <p>
                Create, update or remove your courses.
              </p>

            </div>

            <div
              className="quick-action-card"
              onClick={() => navigate("/manage-students")}
            >

              <FiUsers />

              <h3>Students</h3>

              <p>
                View enrolled students and monitor progress.
              </p>

            </div>

            <div
              className="quick-action-card"
              onClick={() => navigate("/instructor-analytics")}
            >

              <FiBarChart2 />

              <h3>Analytics</h3>

              <p>
                Track performance and engagement.
              </p>

            </div>

            <div
              className="quick-action-card"
              onClick={() => navigate("/instructor-settings")}
            >

              <FiCalendar />

              <h3>Settings</h3>

              <p>
                Manage profile and instructor preferences.
              </p>

            </div>

          </div>

          {/* UPCOMING SCHEDULE */}

          <div className="section-header">

            <h2>Upcoming Schedule</h2>

          </div>

          <div className="schedule-card">

            <div className="schedule-item">

              <div>

                <h3>Cyber Security Live Session</h3>

                <p>Today • 4:00 PM</p>

              </div>

              <button
                onClick={() =>
                  alert("Live class feature coming soon!")
                }
              >
                Join
              </button>

            </div>

            <div className="schedule-item">

              <div>

                <h3>Ethical Hacking Workshop</h3>

                <p>Tomorrow • 11:00 AM</p>

              </div>

              <button
                onClick={() =>
                  alert("Workshop feature coming soon!")
                }
              >
                View
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default InstructorDashboard;  