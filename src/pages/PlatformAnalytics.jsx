import { useState } from "react";
import WeeklyActivity from "../components/WeeklyActivity";

import {
  FiUsers,
  FiBookOpen,
  FiTrendingUp,
  FiAward,
  FiActivity,
  FiServer,
} from "react-icons/fi";

import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

import "../styles/AdminPages.css";

function PlatformAnalytics() {

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
      icon: <FiTrendingUp />,
      color: "green",
    },

    {
      title: "Instructors",
      value: "28",
      icon: <FiAward />,
      color: "blue",
    },

    {
      title: "Courses",
      value: "18",
      icon: <FiBookOpen />,
      color: "purple",
    },

  ];

  const topCourses = [

    {
      title: "Cyber Security",
      students: 420,
      rating: "4.9",
    },

    {
      title: "Ethical Hacking",
      students: 390,
      rating: "4.8",
    },

    {
      title: "Python Programming",
      students: 320,
      rating: "4.7",
    },

    {
      title: "Networking",
      students: 250,
      rating: "4.6",
    },

  ];

    return (

    <div className="admin-page">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">

        <Topbar
          title="Platform Analytics"
          subtitle="Track platform performance and engagement"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="admin-content">

          {/* PAGE HEADER */}

          <div className="page-header">

            <div>

              <h1>Platform Analytics</h1>

              <p>
                Track overall platform performance and user engagement.
              </p>

            </div>

          </div>

          {/* OVERVIEW */}

          <div className="analytics-grid">

            {stats.map((item, index) => (

              <div
                className="analytics-card"
                key={index}
              >

                <div className={`analytics-icon ${item.color}`}>

                  {item.icon}

                </div>

                <div>

                  <h2>{item.value}</h2>

                  <h4>{item.title}</h4>

                  <p>Updated Today</p>

                </div>

              </div>

            ))}

          </div>

          {/* ANALYTICS */}

          <div className="analytics-flex">

            {/* PIE CARD */}

            <div className="pie-card">

              <h2>Course Distribution</h2>

              <div className="pie-chart"></div>

              <div className="pie-legend">

                <div>

                  <span className="dot cyber"></span>

                  Cyber Security (40%)

                </div>

                <div>

                  <span className="dot ethical"></span>

                  Ethical Hacking (25%)

                </div>

                <div>

                  <span className="dot python"></span>

                  Python Programming (20%)

                </div>

                <div>

                  <span className="dot network"></span>

                  Networking (15%)

                </div>

              </div>

            </div>

            {/* SERVER STATUS */}

            <div className="server-card">

              <h2>

                <FiServer />

                System Status

              </h2>

              <div className="server-item">

                <span>CPU Usage</span>

                <strong>48%</strong>

              </div>

              <div className="server-item">

                <span>Memory</span>

                <strong>62%</strong>

              </div>

              <div className="server-item">

                <span>Storage</span>

                <strong>78%</strong>

              </div>

              <div className="server-item">

                <span>Uptime</span>

                <strong>99.9%</strong>

              </div>

            </div>

          </div>

                    {/* TOP COURSES */}

          <h2 className="section-title">

            Top Performing Courses

          </h2>

          <div className="analytics-table">

            <table>

              <thead>

                <tr>

                  <th>Course</th>

                  <th>Students</th>

                  <th>Rating</th>

                </tr>

              </thead>

              <tbody>

                {topCourses.map((course, index) => (

                  <tr key={index}>

                    <td>{course.title}</td>

                    <td>{course.students}</td>

                    <td>⭐ {course.rating}</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* WEEKLY ACTIVITY */}

          <h2 className="section-title">

            Weekly Activity

          </h2>

          <WeeklyActivity />

          {/* RECENT ACTIVITY */}

          <h2 className="section-title">

            Recent Activity

          </h2>

          <div className="recent-card">

            <div className="recent-item">

              <div className="recent-dot"></div>

              <p>

                <b>Rohit Sharma</b> enrolled in
                <b> Cyber Security</b>

              </p>

              <span>2 mins ago</span>

            </div>

            <div className="recent-item">

              <div className="recent-dot"></div>

              <p>

                <b>Priya Singh</b> completed
                <b> Python Programming</b>

              </p>

              <span>12 mins ago</span>

            </div>

            <div className="recent-item">

              <div className="recent-dot"></div>

              <p>

                <b>Instructor Aman</b> uploaded a new
                <b> Networking</b> module

              </p>

              <span>35 mins ago</span>

            </div>

            <div className="recent-item">

              <div className="recent-dot"></div>

              <p>

                <b>Database Backup</b> completed successfully

              </p>

              <span>Today</span>

            </div>

          </div>

          {/* PLATFORM HEALTH */}

          <h2 className="section-title">

            Platform Health

          </h2>

          <div className="health-grid">

            <div className="health-card">

              <h2>99.9%</h2>

              <p>Server Uptime</p>

            </div>

            <div className="health-card">

              <h2>0</h2>

              <p>Critical Errors</p>

            </div>

            <div className="health-card">

              <h2>18</h2>

              <p>Published Courses</p>

            </div>

            <div className="health-card">

              <h2>97%</h2>

              <p>User Satisfaction</p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default PlatformAnalytics;