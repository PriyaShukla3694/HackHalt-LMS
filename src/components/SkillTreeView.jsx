import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import * as FiIcons from "react-icons/fi";
import "./SkillTreeView.css";

function SkillTreeView({ course, progress }) {
  const navigate = useNavigate();

  if (!course || !course.skillTree || course.skillTree.length === 0) {
    return null;
  }

  // extract completed module ids
  const completedIds = progress && Array.isArray(progress.data) ? progress.data : [];

  // calculate status of each node
  const nodesWithStatus = course.skillTree.map((node, index, arr) => {
    const totalModules = node.moduleIds.length;
    const completedCount = node.moduleIds.filter((id) => completedIds.includes(id)).length;
    const isAllCompleted = completedCount === totalModules && totalModules > 0;

    // determine if previous node was fully completed (first node is always unlocked)
    let previousCompleted = true;
    if (index > 0) {
      const prevNode = arr[index - 1];
      const prevTotal = prevNode.moduleIds.length;
      const prevCompletedCount = prevNode.moduleIds.filter((id) => completedIds.includes(id)).length;
      previousCompleted = prevCompletedCount === prevTotal && prevTotal > 0;
    }

    let status = "locked";
    if (isAllCompleted) {
      status = "completed";
    } else if (previousCompleted) {
      status = "in-progress";
    }

    return {
      ...node,
      status,
      completedCount,
      totalModules,
    };
  });

  const handleNodeClick = (node) => {
    if (node.status === "locked") {
      alert("This section is locked! Complete all modules in previous stages to unlock.");
      return;
    }
    // link to course learning workspace
    navigate(`/course/${course.id}/learning`);
  };

  return (
    <div className="skill-tree-container">
      <div className="skill-tree-header">
        <h3>Skill Tree Path</h3>
        <p>Complete milestones sequentially to unlock advanced modules.</p>
      </div>

      <div className="skill-tree-path">
        {nodesWithStatus.map((node, index) => {
          // Resolve icon
          const IconComp = FiIcons[node.icon] || FiIcons.FiBookOpen;
          const isCompleted = node.status === "completed";
          const isInProgress = node.status === "in-progress";
          const isLocked = node.status === "locked";

          // Tooltip/Detail labels
          const progressLabel = `${node.completedCount}/${node.totalModules} Completed`;

          return (
            <div key={node.id} className={`skill-tree-node-wrapper ${node.status}`}>
              {/* Connector line (not drawn for the last node) */}
              {index < nodesWithStatus.length - 1 && (
                <div
                  className={`skill-tree-connector ${
                    isCompleted ? "completed" : ""
                  }`}
                />
              )}

              {/* Interactive Node Badge */}
              <motion.div
                className={`skill-tree-node-circle ${node.status}`}
                whileHover={!isLocked ? { scale: 1.1, y: -2 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => handleNodeClick(node)}
                role="button"
                aria-label={`Milestone: ${node.title}, Status: ${node.status}, Progress: ${progressLabel}`}
                tabIndex={!isLocked ? 0 : -1}
                onKeyDown={(e) => {
                  if (!isLocked && (e.key === "Enter" || e.key === " ")) {
                    handleNodeClick(node);
                  }
                }}
              >
                {/* Pulse ring for in-progress nodes */}
                {isInProgress && <div className="pulse-ring" />}

                {isLocked ? (
                  <FiIcons.FiLock className="node-icon locked-icon" />
                ) : (
                  <IconComp className="node-icon" />
                )}
              </motion.div>

              {/* Text labels */}
              <div className="skill-tree-node-info">
                <span className="node-title">{node.title}</span>
                <span className="node-progress-text">{progressLabel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SkillTreeView;
