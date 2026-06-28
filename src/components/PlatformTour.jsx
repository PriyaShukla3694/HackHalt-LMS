import { useState, useEffect } from "react";
import "./PlatformTour.css";

const STEPS = [
  {
    selector: ".command-center",
    title: "🛡 Welcome to Command Center",
    desc: "This is your main dashboard control center. Here, you can monitor your current level, experience points (XP), course progress, and quickly resume your lessons.",
    placement: "bottom"
  },
  {
    selector: ".sidebar",
    title: "🧭 Command Deck Navigation",
    desc: "Use this sidebar to navigate between your student dashboard, enrolled courses, progress database, earned certificates, and account settings. It expands automatically when hovered!",
    placement: "right",
    bodyClass: "tour-step-navigation"
  },
  {
    selector: ".stats-row",
    title: "⚡ Tactical Metrics",
    desc: "Monitor your key statistics at a glance: the number of active courses, your study streak, certificates achieved, and total learning hours spent on the platform.",
    placement: "top"
  },
  {
    selector: ".dashboard-block",
    title: "📚 Cyber Training Catalog",
    desc: "Browse our security tracks. Click any course to view its curriculum, modular lessons, and enroll in new missions.",
    placement: "top"
  },
  {
    selector: ".bottom-grid",
    title: "🏆 Operations Timeline & Achievements",
    desc: "Check your recent activity logs and check your unlocked achievements here. Earn more badges by completing modules and finishing courses!",
    placement: "top"
  }
];

function PlatformTour({ onClose }) {
  const [step, setStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);

  // Synchronize dynamic scrolling and bounding rect calculation
  useEffect(() => {
    if (step < 0 || step >= STEPS.length) return;
    const currentStep = STEPS[step];

    // Apply step-specific body class if specified
    if (currentStep.bodyClass) {
      document.body.classList.add(currentStep.bodyClass);
    }

    // Scroll element into view smoothly before calculating position
    const el = document.querySelector(currentStep.selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    // Coordinates update hook
    const updateRect = () => {
      const targetEl = document.querySelector(currentStep.selector);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        // Add 5px padding around target element for better visual padding
        setTargetRect({
          left: Math.max(0, rect.left - 6),
          top: Math.max(0, rect.top - 6),
          width: rect.width + 12,
          height: rect.height + 12,
          right: rect.right + 6,
          bottom: rect.bottom + 6
        });
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    
    // Check multiple times during smooth scrolling to align perfectly
    const timer1 = setTimeout(updateRect, 100);
    const timer2 = setTimeout(updateRect, 300);
    const timer3 = setTimeout(updateRect, 600);

    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect);

    return () => {
      if (currentStep.bodyClass) {
        document.body.classList.remove(currentStep.bodyClass);
      }
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect);
    };
  }, [step]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      localStorage.setItem("lms_tour_completed", "true");
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("lms_tour_completed", "true");
    onClose();
  };

  // Generate CSS clip-path for transparent spotlight cutout
  const getClipPath = () => {
    if (!targetRect) return "polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)";
    
    const { left, top, right, bottom } = targetRect;
    return `polygon(
      0% 0%,
      0% 100%,
      ${left}px 100%,
      ${left}px ${top}px,
      ${right}px ${top}px,
      ${right}px ${bottom}px,
      ${left}px ${bottom}px,
      ${left}px 100%,
      100% 100%,
      100% 0%
    )`;
  };

  // Compute position of floating tooltip card relative to highlighted cutout
  const getTooltipStyle = () => {
    if (!targetRect) {
      // Center of screen fallback
      return {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      };
    }

    const { left, top, width, height, right, bottom } = targetRect;
    const placement = STEPS[step].placement;

    switch (placement) {
      case "bottom":
        return {
          left: `${left + width / 2}px`,
          top: `${bottom + 20}px`,
          transform: "translateX(-50%)"
        };
      case "top":
        return {
          left: `${left + width / 2}px`,
          top: `${top - 20}px`,
          transform: "translate(-50%, -100%)"
        };
      case "right":
        return {
          left: `${right + 20}px`,
          top: `${top + height / 2}px`,
          transform: "translateY(-50%)"
        };
      case "left":
        return {
          left: `${left - 20}px`,
          top: `${top + height / 2}px`,
          transform: "translate(-100%, -50%)"
        };
      default:
        return {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        };
    }
  };

  const currentStep = STEPS[step];
  const tooltipStyle = getTooltipStyle();
  const clipPathStyle = getClipPath();

  return (
    <div className="tour-overlay-container">
      {/* Darkened backdrop with dynamic blur cutout */}
      <div 
        className="tour-backdrop" 
        style={{ clipPath: clipPathStyle }}
        onClick={handleSkip}
      />

      {/* Spotlight border around the active zone */}
      {targetRect && (
        <div 
          className="tour-spotlight-border"
          style={{
            left: `${targetRect.left}px`,
            top: `${targetRect.top}px`,
            width: `${targetRect.width}px`,
            height: `${targetRect.height}px`
          }}
        />
      )}

      {/* Floating Info Tooltip */}
      <div 
        className="tour-tooltip-positioner"
        style={tooltipStyle}
      >
        <div className="tour-tooltip-card">
          <h3>{currentStep.title}</h3>
          <p>{currentStep.desc}</p>
          
          <div className="tour-actions">
            <button className="tour-btn-skip" onClick={handleSkip}>
              Skip
            </button>

            <div className="tour-dots">
              {STEPS.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`tour-dot ${idx === step ? "active" : ""}`}
                  onClick={() => setStep(idx)}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>

            <div className="tour-nav-buttons">
              {step > 0 && (
                <button className="tour-btn-back" onClick={handleBack}>
                  Back
                </button>
              )}
              <button className="tour-btn-next" onClick={handleNext}>
                {step === STEPS.length - 1 ? "Finish ✓" : "Next →"}
              </button>
            </div>
          </div>

          {/* Pointer Arrow */}
          {targetRect && (
            <div className={`tour-arrow tour-arrow-${currentStep.placement}`} />
          )}
        </div>
      </div>
    </div>
  );
}

export default PlatformTour;
