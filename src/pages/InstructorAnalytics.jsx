import { useState } from "react";
import {
  FiUsers,
  FiBookOpen,
  FiDollarSign,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";

import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

import "../styles/InstructorAnalytics.css";

function InstructorAnalytics() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      title: "Total Students",
      value: "378",
      icon: <FiUsers />,
      change: "+12%",
    },
    {
      title: "Courses",
      value: "08",
      icon: <FiBookOpen />,
      change: "+2",
    },
    {
      title: "Revenue",
      value: "₹18.5K",
      icon: <FiDollarSign />,
      change: "+18%",
    },
    {
      title: "Completion",
      value: "87%",
      icon: <FiTrendingUp />,
      change: "+6%",
    },
  ];

 const performance = [
  { month: "Jan", value: 35 },
  { month: "Feb", value: 52 },
  { month: "Mar", value: 68 },
  { month: "Apr", value: 92 },
  { month: "May", value: 74 },
  { month: "Jun", value: 96 },
];

const graphPoints = performance
  .map((item, index) => {
    const x = 50 + index * 95;
    const y = 210 - item.value * 1.6;
    return `${x},${y}`;
  })
  .join(" ");

  const topCourses = [
    {
      name: "Cyber Security",
      students: 125,
      rating: "4.9",
      completion: "91%",
    },
    {
      name: "Ethical Hacking",
      students: 94,
      rating: "4.8",
      completion: "84%",
    },
    {
      name: "Python Programming",
      students: 159,
      rating: "4.7",
      completion: "88%",
    },
  ];

  return (

<div className="analytics-page">

<InstructorSidebar
isOpen={sidebarOpen}
onClose={()=>setSidebarOpen(false)}
/>

<div className="analytics-main">

<Topbar
title="Instructor Analytics"
onMenuClick={()=>setSidebarOpen(true)}
/>

<div className="analytics-content">

<div className="analytics-hero">

<div>

<h1>Analytics Dashboard 📊</h1>

<p>
Track your students, course growth, revenue and performance from one place.
</p>

</div>

<div className="hero-badge">

<h2>87%</h2>

<span>Completion Rate</span>

</div>

</div>

<div className="analytics-stats">

{stats.map((item,index)=>(

<div
className="analytics-card"
key={index}
>

<div className="analytics-icon">

{item.icon}

</div>

<div className="analytics-info">

<h2>{item.value}</h2>

<p>{item.title}</p>

<div className="analytics-growth">

<FiArrowUpRight/>

<span>{item.change}</span>

</div>

</div>

</div>

))}

</div>

<div className="analytics-section">

  <h2>Monthly Performance</h2>

  <div className="graph-card">

    <svg
      className="performance-svg"
      viewBox="0 0 600 240"
      preserveAspectRatio="none"
    >

      <defs>

        <linearGradient
          id="lineGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#ff8c00" />
          <stop offset="100%" stopColor="#7b5cff" />
        </linearGradient>

        <linearGradient
          id="fillGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgba(255,140,0,.35)" />
          <stop offset="100%" stopColor="rgba(123,92,255,0)" />
        </linearGradient>

      </defs>

      <polyline
        className="graph-fill"
        points={`50,210 ${graphPoints} 525,210`}
      />

      <polyline
        className="graph-line"
        points={graphPoints}
      />

      {performance.map((item, index) => {

        const x = 50 + index * 95;
        const y = 210 - item.value * 1.6;

        return (
          <g key={index}>

            <circle
              cx={x}
              cy={y}
              r="6"
              className="graph-dot"
            />

            <text
              x={x}
              y="230"
              textAnchor="middle"
              className="month-label"
            >
              {item.month}
            </text>

          </g>
        );

      })}

    </svg>

  </div>

</div>

    {/* ========================= */}
    {/* TOP COURSES */}
    {/* ========================= */}

    <div className="analytics-section">

      <div className="section-title">

        <h2>Top Performing Courses</h2>

        <span>Most popular courses this month</span>

      </div>

      <div className="course-table">

        <table>

          <thead>

            <tr>

              <th>Course</th>

              <th>Students</th>

              <th>Rating</th>

              <th>Completion</th>

            </tr>

          </thead>

          <tbody>

            {topCourses.map((course,index)=>(

              <tr key={index}>

                <td>{course.name}</td>

                <td>{course.students}</td>

                <td>⭐ {course.rating}</td>

                <td>

                  <span className="completion-badge">

                    {course.completion}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

    {/* ========================= */}
    {/* RECENT ACTIVITY */}
    {/* ========================= */}

    <div className="analytics-section">

      <div className="section-title">

        <h2>Recent Activity</h2>

        <span>Latest instructor updates</span>

      </div>

      <div className="activity-list">

        <div className="activity-item">

          <div className="activity-dot"></div>

          <div>

            <h4>
              Rahul Sharma completed Cyber Security Module 5
            </h4>

            <p>2 hours ago</p>

          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot"></div>

          <div>

            <h4>
              15 new students enrolled in Python Programming
            </h4>

            <p>Today</p>

          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot"></div>

          <div>

            <h4>
              Ethical Hacking received a 5★ review
            </h4>

            <p>Yesterday</p>

          </div>

        </div>

        <div className="activity-item">

          <div className="activity-dot"></div>

          <div>

            <h4>
              Revenue increased by 18% this month
            </h4>

            <p>3 days ago</p>

          </div>

        </div>

      </div>

    </div>
    
        </div>

  </div>

</div>

  );

}

export default InstructorAnalytics;