import React from "react";
import Button from "./Button";

function ContinueCard({
  title = "Continue Learning",
  description,
  buttonText = "Resume Learning",
  onClick,
}) {
  return (
    <div className="continue-learning">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
        <Button onClick={onClick} className="resume-btn" variant="primary">
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default ContinueCard;
