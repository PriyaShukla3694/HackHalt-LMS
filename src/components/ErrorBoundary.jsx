import React, { Component } from "react";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";
import Button from "./Button";
import AnimatedBackground from "./AnimatedBackground";
import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error details to console.error for developer debugging
    console.error("ErrorBoundary caught an uncaught exception:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-fallback">
          {/* Reuse brand animated background background overlay */}
          <AnimatedBackground />

          <div className="error-boundary-card">
            <div className="error-icon-wrapper">
              <FiAlertTriangle />
            </div>

            <h1>System Anomaly Detected</h1>
            <p>
              An unexpected process termination has occurred. Security telemetry has captured this event.
            </p>

            <div className="error-actions">
              <Button
                variant="primary"
                icon={FiRefreshCw}
                onClick={this.handleReload}
                className="error-reload-btn"
              >
                Reboot Session (Reload)
              </Button>
              <a href="/" className="error-home-link">
                <FiHome /> Return to Secure Vector
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
