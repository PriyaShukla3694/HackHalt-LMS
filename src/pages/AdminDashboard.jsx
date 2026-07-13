import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../components/StatCard";
import RecentActivities from "../components/RecentActivities";
import Button from "../components/Button";

import {
  FiUsers,
  FiUserCheck,
  FiBookOpen,
  FiShield,
  FiTrendingUp,
  FiFileText,
  FiArrowRight,
} from "react-icons/fi";

import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [

    {
      title: "Total Users",
      value: "1,248",
      icon: <FiUsers />,
      color: "orange",
    },

    {
      title: "Students",
      value: "1,020",
      icon: <FiUserCheck />,
      color: "blue",
    },

    {
      title: "Courses",
      value: "18",
      icon: <FiBookOpen />,
      color: "green",
    },

    {
      title: "Instructors",
      value: "28",
      icon: <FiShield />,
      color: "purple",
    },

  ];

  const recentActivities = [

    {
      title: "12 new students registered",
      time: "10 mins ago",
    },

    {
      title: "Python course submitted for review",
      time: "25 mins ago",
    },

    {
      title: "Instructor account approved",
      time: "1 hour ago",
    },

    {
      title: "Cyber Security course published",
      time: "Today",
    },

  ];

  return (

    <div className="admin-dashboard">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">

        <Topbar
          title="Admin Dashboard"
          subtitle="Manage your LMS efficiently"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="admin-content">

          {/* HERO */}

          <div className="admin-hero">

            <div className="hero-left">

              <h1>Welcome Back, Admin 👋</h1>

              <p>

                Monitor users, courses, instructors and platform
                performance from one place.

              </p>

              <Button

                className="hero-btn"

                onClick={() => navigate("/user-management")}

              >

                Manage Users

                <FiArrowRight style={{ marginLeft: "6px" }} />

              </Button>

            </div>

            <div className="hero-right">

              <div className="health-circle">

                <h2>98%</h2>

                <span>Platform Health</span>

              </div>

            </div>

          </div>

          {/* STATS */}

          <div className="admin-stats">

            {stats.map((item, index) => (
              <StatCard
                key={index}
                icon={item.icon}
                value={item.value}
                title={item.title}
                className={`admin-card ${item.color}`}
              />
            ))}

          </div>

          {/* QUICK ACTIONS */}

          <div className="section-head">

            <h2>Quick Actions</h2>

          </div>

          <div className="quick-grid">

            <div

              className="quick-card"

              onClick={() => navigate("/user-management")}

            >

              👥

              <h3>User Management</h3>

              <p>View & manage users</p>

            </div>

            <div

              className="quick-card"

              onClick={() => navigate("/course-approval")}

            >

              📚

              <h3>Course Approval</h3>

              <p>Approve pending courses</p>

            </div>

                        <div

              className="quick-card"

              onClick={() => navigate("/platform-analytics")}

            >

              📊

              <h3>Platform Analytics</h3>

              <p>View reports & insights</p>

            </div>

            <div

              className="quick-card"

              onClick={() => navigate("/admin-settings")}

            >

              ⚙️

              <h3>Admin Settings</h3>

              <p>Manage platform settings</p>

            </div>

          </div>

          {/* PLATFORM OVERVIEW */}

          <div className="section-head">

            <h2>Platform Overview</h2>

          </div>

          <div className="overview-grid">

            <div className="overview-card">

              <FiTrendingUp className="overview-icon orange"/>

              <div>

                <h2>46</h2>

                <p>Enrollments Today</p>

              </div>

            </div>

            <div className="overview-card">

              <FiBookOpen className="overview-icon blue"/>

              <div>

                <h2>18</h2>

                <p>Courses Published</p>

              </div>

            </div>

            <div className="overview-card">

              <FiFileText className="overview-icon green" />

              <div>

                <h2>08</h2>

                <p>Pending Reviews</p>

              </div>

            </div>

            <div className="overview-card">

              <FiShield className="overview-icon purple"/>

              <div>

                <h2>17</h2>

                <p>Certificates Issued</p>

              </div>

            </div>

          </div>

          <RecentActivities activities={recentActivities} />

          {/* PENDING APPROVALS */}

          <div className="section-head">

            <h2>Pending Approvals</h2>

          </div>

          <div className="approval-grid">

            <div className="approval-card">

              <h3>Instructor Requests</h3>

              <h1>06</h1>

              <Button
                onClick={() => navigate("/user-management")}
                variant="primary"
                size="sm"
              >
                Review
              </Button>

            </div>

            <div className="approval-card">

              <h3>Course Reviews</h3>

              <h1>04</h1>

              <Button
                onClick={() => navigate("/course-approval")}
                variant="primary"
                size="sm"
              >
                Open
              </Button>

            </div>

            <div className="approval-card">

              <h3>User Reports</h3>

              <h1>03</h1>

              <Button
                onClick={() => navigate("/platform-analytics")}
                variant="primary"
                size="sm"
              >
                View
              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;