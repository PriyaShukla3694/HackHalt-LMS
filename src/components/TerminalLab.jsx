import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTerminal, FiAward, FiAlertCircle, FiRotateCcw, FiHelpCircle } from "react-icons/fi";
import "./TerminalLab.css";

function TerminalLab({ lab, onComplete }) {
  const [activeStep, setActiveStep] = useState(0);
  const [inputText, setInputText] = useState("");
  const [history, setHistory] = useState([
    { text: "HackHalt secure sandboxed lab interface v1.0.2", type: "system" },
    { text: "Initializing virtualization containers... ready.", type: "system" },
    { text: `Type commands below to achieve milestone. Lab: ${lab.title}`, type: "system" },
    { text: "--------------------------------------------------------", type: "system" },
  ]);
  const [failCount, setFailCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  const consoleEndRef = useRef(null);

  // Auto-scroll to bottom of console history
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = inputText.trim();
    if (!cmd) return;

    // Add command to history
    const userLine = { text: `student@hackhalt:~$ ${cmd}`, type: "command" };
    setHistory((prev) => [...prev, userLine]);
    setInputText("");

    const currentStep = lab.steps[activeStep];
    const expected = currentStep.expectedCommand.trim().toLowerCase();
    const actual = cmd.toLowerCase();

    if (actual === expected) {
      // SUCCESS match!
      const outLine = { text: currentStep.output, type: "output" };
      setHistory((prev) => [...prev, outLine]);

      // Move to next step or finish
      if (activeStep < lab.steps.length - 1) {
        const nextIdx = activeStep + 1;
        setActiveStep(nextIdx);
        setHistory((prev) => [
          ...prev,
          { text: `[System] Milestone ${activeStep + 1} completed.`, type: "success" },
          { text: `Next objective: ${lab.steps[nextIdx].prompt}`, type: "system" }
        ]);
        setFailCount(0);
        setShowHint(false);
      } else {
        // Lab Completed!
        setCompleted(true);
        setHistory((prev) => [
          ...prev,
          { text: "=========================================", type: "success" },
          { text: "SUCCESS: ALL MILESTONES SECURED!", type: "success" },
          { text: `ACQUIRED CTF FLAG: ${lab.flag}`, type: "flag" },
          { text: "=========================================", type: "success" }
        ]);
        if (onComplete) {
          onComplete(lab.flag);
        }
      }
    } else {
      // FAIL match
      const errLine = { text: `bash: command not found: ${cmd} (or incorrect parameters)`, type: "error" };
      setHistory((prev) => [...prev, errLine]);
      const nextFail = failCount + 1;
      setFailCount(nextFail);
      if (nextFail >= 2) {
        setShowHint(true);
      }
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setFailCount(0);
    setShowHint(false);
    setCompleted(false);
    setHistory([
      { text: "Terminal containers rebooted successfully.", type: "system" },
      { text: "--------------------------------------------------------", type: "system" },
      { text: `Objective: ${lab.steps[0].prompt}`, type: "system" }
    ]);
  };

  return (
    <div className="terminal-shell">
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title">
            <FiTerminal /> bash — student@hackhalt-sandbox
          </div>
          <div className="terminal-controls">
            <button className="term-ctrl-btn" onClick={handleReset} title="Reset Terminal">
              <FiRotateCcw /> Reset
            </button>
          </div>
        </div>

        {/* Console logs */}
        <div className="terminal-body">
          {history.map((line, idx) => (
            <div key={idx} className={`terminal-line ${line.type}`}>
              {line.text}
            </div>
          ))}

          {/* Current prompting command line */}
          {!completed && (
            <form onSubmit={handleSubmit} className="terminal-prompt-form">
              <span className="prompt-label">student@hackhalt:~$</span>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                autoFocus
                className="terminal-input"
                placeholder="type command..."
                aria-label="Terminal input line"
              />
            </form>
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>

      {/* Lab objective panel overlay below terminal */}
      <div className="terminal-objective-box">
        <div className="obj-header">
          <h4>Active Task Objective</h4>
          {showHint && (
            <div className="hint-pill">
              <FiHelpCircle /> Hint available
            </div>
          )}
        </div>
        <p className="obj-text">
          {!completed ? lab.steps[activeStep].prompt : "Lab complete! Copy the flag above and submit it."}
        </p>

        {showHint && !completed && (
          <motion.div
            className="hint-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiAlertCircle className="hint-icon" />
            <span><strong>Suggested syntax:</strong> <code>{lab.steps[activeStep].hint}</code></span>
          </motion.div>
        )}

        {completed && (
          <div className="lab-success-card">
            <FiAward className="success-award-icon" />
            <div>
              <h5>Milestone Secured</h5>
              <p>Lab credentials stored in your secure learning profile. Submit the CTF flag to claim full module completions.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TerminalLab;
