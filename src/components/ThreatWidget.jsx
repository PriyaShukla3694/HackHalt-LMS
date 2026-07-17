import React from "react";
import { getMockThreatOfTheDay } from "../utils/mockMode";

function ThreatWidget() {
  const fact = getMockThreatOfTheDay();

  return (
    <div className="threat-widget" style={{
      background: "var(--soft-bg)",
      borderRadius: "var(--radius-md)",
      padding: "16px",
      marginBottom: "24px",
      boxShadow: "var(--shadow-md)"
    }}>
      <h3 style={{ margin: "0 0 8px 0", color: "var(--ink)" }}>{fact.title}</h3>
      <p style={{ margin: 0, color: "var(--muted)" }}>{fact.description}</p>
      <p style={{ marginTop: "8px", fontStyle: "italic", color: "var(--info)" }}>{fact.mitigation}</p>
    </div>
  );
}

export default ThreatWidget;
