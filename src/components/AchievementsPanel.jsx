import React, { useEffect, useState } from "react";
import AchievementCard from "./AchievementCard";
import { ACHIEVEMENT_DEFINITIONS } from "../utils/mockMode";

function AchievementsPanel() {
  const [unlocked, setUnlocked] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lms_mock_achievements");
    if (stored) {
      try {
        setUnlocked(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse achievements", e);
        setUnlocked([]);
      }
    }
  }, []);

  const unlockedDefs = ACHIEVEMENT_DEFINITIONS.filter((def) => unlocked.includes(def.id));

  return (
    <div className="achievements-panel" style={{
      background: "var(--soft-bg)",
      borderRadius: "var(--radius-lg)",
      padding: "16px",
      marginBottom: "24px",
      boxShadow: "var(--shadow-md)"
    }}>
      <h3 style={{ margin: "0 0 12px 0", color: "var(--ink)" }}>Achievements</h3>
      {unlockedDefs.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No achievements unlocked yet.</p>
      ) : (
        <div className="achievements-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "12px"
        }}>
          {unlockedDefs.map((ach) => (
            <AchievementCard
              key={ach.id}
              title={ach.title}
              description={ach.description}
              unlocked={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AchievementsPanel;
