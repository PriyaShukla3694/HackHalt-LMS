import React from "react";
import Button from "./Button";
import "./EmptyState.css";

function EmptyState({ icon: Icon, title, description, ctaText, onCtaClick }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        {Icon ? <Icon /> : "📁"}
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
      {ctaText && onCtaClick && (
        <Button onClick={onCtaClick} variant="primary" size="md">
          {ctaText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
