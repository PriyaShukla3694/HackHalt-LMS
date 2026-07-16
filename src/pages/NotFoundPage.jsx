import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAlertOctagon, FiHome } from "react-icons/fi";
import Button from "../components/Button";
import AnimatedBackground from "../components/AnimatedBackground";
import PageTransition from "../components/PageTransition";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      {/* Background decoration */}
      <AnimatedBackground />

      <PageTransition>
        <div className="not-found-container">
          <motion.div
            className="not-found-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="not-found-badge">ERROR 404</span>

            <div className="not-found-icon-wrapper">
              <FiAlertOctagon />
            </div>

            <h1>Terminal Access Denied</h1>
            <p>
              The requested directory or node does not exist or has been relocated within the secure network perimeter.
            </p>

            <div className="not-found-actions">
              <Button
                variant="primary"
                icon={FiHome}
                onClick={() => navigate("/")}
                className="not-found-btn"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </div>
  );
}

export default NotFoundPage;
