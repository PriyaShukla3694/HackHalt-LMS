import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiActivity, FiFlag, FiBookOpen } from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TerminalLab from "../components/TerminalLab";
import { authFetch } from "../utils/api";
import { useToast } from "../context/ToastContext";
import Skeleton from "../components/Skeleton";
import "../styles/VerifyCertificate.css"; // Reuse general verify wrapper backgrounds

function LabDetails() {
  const { id, labId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lab, setLab] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoading(true);
    authFetch(`/labs/${labId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not retrieve lab details.");
        return res.json();
      })
      .then((data) => {
        setLab(data.data);
      })
      .catch((err) => {
        console.error(err);
        showToast("Error loading sandbox lab environment details", "error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [labId]);

  const handleLabComplete = async (flag) => {
    setSubmitting(true);
    try {
      const res = await authFetch(`/labs/${labId}/complete`, {
        method: "POST",
      });

      if (res.ok) {
        showToast(`🎉 CTF Flag Submitted! Lab Completed successfully.`, "success");
        setLab((prev) => ({ ...prev, completed: true }));
      } else {
        showToast("Failed to verify flag on server.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error submitting flag.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="student-dashboard">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main-content">
        <Topbar
          title="Sandbox Terminal Lab"
          subtitle="Execute real-world security tools in a containerized simulator."
          onMenuClick={() => setSidebarOpen(true)}
          hideTitle={true}
        />

        <div className="progress-content" style={{ padding: "30px 24px" }} id="main-content" tabIndex="-1">
          {/* Back Action */}
          <button
            onClick={() => navigate(`/course/${id}`)}
            className="prev-btn"
            style={{ marginBottom: "20px", display: "inline-flex", alignItems: "center", gap: "8px" }}
          >
            <FiArrowLeft /> Back to Course Syllabus
          </button>

          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <Skeleton variant="text" width="60%" height="35px" />
              <Skeleton variant="card" width="100%" height="160px" />
              <Skeleton variant="card" width="100%" height="320px" />
            </div>
          ) : !lab ? (
            <div style={{ color: "var(--text-secondary)", textAlign: "center", padding: "80px" }}>
              <h3>Lab Scenario Not Found</h3>
              <p>The requested virtual laboratory scenario is not available or locked.</p>
            </div>
          ) : (
            <div className="lab-workspace-grid" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              
              {/* Lab Briefing Header */}
              <div
                className="lab-briefing-card"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "11px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        color: "var(--orange)",
                        background: "rgba(255, 140, 0, 0.1)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                    >
                      <FiActivity /> Live Virtual Target
                    </span>
                    <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", margin: "0 0 8px 0" }}>
                      {lab.title}
                    </h2>
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        color: lab.completed ? "var(--success)" : "var(--muted)",
                        background: lab.completed ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.03)",
                        border: `1px solid ${lab.completed ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.06)"}`,
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontWeight: "600",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <FiFlag /> {lab.completed ? "Completed" : "Not Started"}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: "14.5px", color: "var(--muted)", lineHeight: "1.6", margin: "16px 0 0 0" }}>
                  {lab.briefing}
                </p>
              </div>

              {/* Terminal Console */}
              <TerminalLab lab={lab} onComplete={handleLabComplete} />
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default LabDetails;
