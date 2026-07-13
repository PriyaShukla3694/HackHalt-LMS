import React from "react";
import "./StatCard.css";

function StatCard({ title, value, icon, className = "" }) {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-icon">{icon}</div>
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
}

export default StatCard;