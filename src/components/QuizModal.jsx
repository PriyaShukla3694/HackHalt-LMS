import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiAward, FiArrowRight, FiArrowLeft, FiX } from "react-icons/fi";
import { authFetch } from "../utils/api";
import Button from "./Button";
import "./QuizModal.css";

function QuizModal({ quiz, courseId, moduleId, onClose, onSuccess }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState(() => Array(quiz.questions.length).fill(null));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSelectOption = (optIdx) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[activeIdx] = optIdx;
      return updated;
    });
  };

  const handleNext = () => {
    if (activeIdx < quiz.questions.length - 1) {
      setActiveIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      setActiveIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch(`/courses/${courseId}/quiz/${quiz.quizId}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers }),
      });

      if (res.ok) {
        const envelope = await res.json();
        setResult(envelope.data);
        if (envelope.data.passed && onSuccess) {
          onSuccess();
        }
      } else {
        alert("Failed to submit quiz results.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error submitting quiz.");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = quiz.questions[activeIdx];
  const allAnswered = !answers.includes(null);

  return (
    <div className="quiz-modal-overlay">
      <motion.div
        className="quiz-modal-card"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        {/* Close Button */}
        <button className="quiz-close-btn" onClick={onClose} aria-label="Close Quiz">
          <FiX />
        </button>

        {!result ? (
          <div className="quiz-content">
            <div className="quiz-header">
              <span className="quiz-badge">Checkpoint Assessment</span>
              <h3>Question {activeIdx + 1} of {quiz.questions.length}</h3>
              <div className="quiz-progress-bar">
                <div
                  className="quiz-progress-fill"
                  style={{ width: `${((activeIdx + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="quiz-body">
              <p className="quiz-question-text">{currentQuestion.question}</p>
              <div className="quiz-options-list">
                {currentQuestion.options.map((opt, oIdx) => {
                  const isSelected = answers[activeIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      className={`quiz-option-button ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectOption(oIdx)}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="quiz-footer">
              <Button
                variant="secondary"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                style={{ opacity: activeIdx === 0 ? 0.4 : 1 }}
              >
                <FiArrowLeft style={{ marginRight: "6px" }} /> Back
              </Button>

              {activeIdx < quiz.questions.length - 1 ? (
                <Button
                  variant="primary"
                  onClick={handleNext}
                  disabled={answers[activeIdx] === null}
                  style={{ opacity: answers[activeIdx] === null ? 0.5 : 1 }}
                >
                  Next <FiArrowRight style={{ marginLeft: "6px" }} />
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={loading}
                  disabled={loading || !allAnswered}
                  style={{ opacity: !allAnswered ? 0.5 : 1 }}
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="quiz-result-view">
            {result.passed ? (
              <div className="result-header success">
                <FiCheckCircle className="result-icon success-icon" />
                <h2>Assessment Passed!</h2>
                <p>Excellent work. You scored {result.score} out of {result.total}.</p>
              </div>
            ) : (
              <div className="result-header fail">
                <FiXCircle className="result-icon fail-icon" />
                <h2>Assessment Failed</h2>
                <p>
                  You scored {result.score} out of {result.total}. You need at least {quiz.passingScore} correct answers to pass.
                </p>
              </div>
            )}

            <div className="result-score-seal">
              <FiAward className={result.passed ? "passed-seal" : "failed-seal"} />
              <div className="seal-text">
                <strong>{((result.score / result.total) * 100).toFixed(0)}%</strong>
                <span>Score</span>
              </div>
            </div>

            <div className="result-actions">
              {result.passed ? (
                <Button variant="primary" onClick={onClose} style={{ width: "100%" }}>
                  Proceed to Next Lesson
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setResult(null);
                      setActiveIdx(0);
                      setAnswers(Array(quiz.questions.length).fill(null));
                    }}
                    style={{ width: "100%", marginBottom: "12px" }}
                  >
                    Retry Assessment
                  </Button>
                  <Button variant="secondary" onClick={onClose} style={{ width: "100%" }}>
                    Review Material
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default QuizModal;
