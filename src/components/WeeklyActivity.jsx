import React from "react";
import { FiUsers, FiBookOpen, FiTrendingUp, FiActivity } from "react-icons/fi";

function WeeklyActivity() {
  const items = [
    { icon: <FiUsers />, value: "126", label: "New Users" },
    { icon: <FiBookOpen />, value: "312", label: "Enrollments" },
    { icon: <FiTrendingUp />, value: "87", label: "Course Completions" },
    { icon: <FiActivity />, value: "684", label: "Daily Active Users" },
  ];

  return (
    <div className="activity-grid">
      {items.map((item, index) => (
        <div className="activity-card" key={index}>
          {item.icon}
          <h3>{item.value}</h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default WeeklyActivity;
