import React from "react";
import "./RecentActivities.css";

function RecentActivities({ activities }) {
  const defaultActivities = [
    { title: "New student enrolled in Cyber Security Course" },
    { title: "Ethical Hacking course updated" },
    { title: "Certificate issued to student" },
    { title: "Instructor uploaded a new lesson" },
    { title: "Course approved by admin" },
  ];

  const list = activities || defaultActivities;

  return (
    <div className="activities-card">
      <h2>Recent Activities</h2>
      {list.map((item, index) => (
        <div className="activity-item" key={index}>
          <div className="activity-dot"></div>
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>{item.title}</p>
            {item.time && (
              <small style={{ color: "var(--muted)", display: "block", marginTop: "4px" }}>
                {item.time}
              </small>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentActivities;
