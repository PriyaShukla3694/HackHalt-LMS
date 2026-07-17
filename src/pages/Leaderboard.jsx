import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import StatCard from "../components/StatCard";

function Leaderboard() {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    authFetch("/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success) {
          setBoard(data.data);
        }
      })
      .catch((err) => console.error("Error loading leaderboard:", err));
  }, []);

  return (
    <div className="leaderboard-page" style={{ padding: "24px" }}>
      <h2 style={{ color: "var(--ink)", marginBottom: "16px" }}>Leaderboard</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--soft-bg)" }}>
            <th style={{ padding: "8px", textAlign: "left" }}>Rank</th>
            <th style={{ padding: "8px", textAlign: "left" }}>Name</th>
            <th style={{ padding: "8px", textAlign: "right" }}>Points</th>
          </tr>
        </thead>
        <tbody>
          {board.map((item) => (
            <tr
              key={item.userId}
              style={{
                background: "var(--card)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--soft-bg)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--card)")}
            >
              <td style={{ padding: "8px" }}>{item.rank}</td>
              <td style={{ padding: "8px" }}>{item.name}</td>
              <td style={{ padding: "8px", textAlign: "right" }}>{item.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
