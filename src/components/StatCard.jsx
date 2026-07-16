import React from "react";
import { motion } from "framer-motion";
import "./StatCard.css";

function StatCard({ title, value, icon, className = "" }) {
  return (
    <motion.div
      className={`stat-card ${className}`}
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="stat-icon">{icon}</div>
      <div>
        <h2>{value}</h2>
        <p>{title}</p>
      </div>
    </motion.div>
  );
}

export default StatCard;