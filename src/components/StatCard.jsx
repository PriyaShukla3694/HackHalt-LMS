import "./StatCard.css";

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <h4>{title}</h4>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;