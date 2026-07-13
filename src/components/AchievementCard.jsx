import React from "react";

function AchievementCard({ title = "Your Achievement", description }) {
  return (
    <div className="achievement-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default AchievementCard;
