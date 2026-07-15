import React from "react";
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
    <div className="course-card">
      <img src={image} alt={title} width={360} height={200} loading="lazy" />
      
      {isDashboard ? (
        <div className="course-content">
          <h3>{title}</h3>
          <p>{lessons}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
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
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
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
    </div>
  );
}

export default CourseCard;