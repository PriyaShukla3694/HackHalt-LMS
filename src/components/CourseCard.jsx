import React from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { FiArrowRight } from "react-icons/fi";

function CourseCard({
  title,
  lessons,
  progress,
  image,
  level,
  isDashboard = false,
  onExplore,
  onDetails,
  onResume,
}) {
  return (
    <motion.div
      className="course-card"
      whileHover={{ y: -4, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <img src={image} alt={title} width={360} height={200} loading="lazy" />
      
      {isDashboard ? (
        <div className="course-content">
          <h3>{title}</h3>
          <p>{lessons}</p>
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span>{progress}% Completed</span>
          <Button onClick={onExplore} variant="primary" size="sm" className="explore-btn">
            Explore Course
          </Button>
        </div>
      ) : (
        <div className="course-body">
          {level && <span className="level">{level}</span>}
          <h2>{title}</h2>
          <p>{lessons} Lessons</p>
          <div className="progress">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <small>{progress}% Completed</small>
          <div className="course-buttons">
            <Button className="resume-btn" variant="primary" size="sm" onClick={onResume}>
              Resume
            </Button>
            <Button className="details-btn" variant="secondary" size="sm" onClick={onDetails}>
              Details
              <FiArrowRight style={{ marginLeft: "4px" }} />
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default CourseCard;