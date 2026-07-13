import "../styles/Certificates.css";
import { useNavigate } from "react-router-dom";
import { FiAward } from "react-icons/fi";
import EmptyState from "../components/EmptyState";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { authFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useEnrolledCourses } from "../hooks/useCourses";
import { MOCK_MODE } from "../utils/mockMode";
import Skeleton from "../components/Skeleton";

function Certificates() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { enrolledCourses } = useEnrolledCourses();

  useEffect(() => {
    authFetch("/courses/certificates")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch certificates");
        return res.json();
      })
      .then((data) => {
        setCertificates(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading certificates.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const totalEnrolled = enrolledCourses ? enrolledCourses.length : 0;
  const earnedCount = certificates.length;
  const pct = totalEnrolled > 0 ? Math.min(100, Math.round((earnedCount / totalEnrolled) * 100)) : 0;
  const angle = (pct / 100) * 360;

  const handleDownload = async (cert) => {
    if (!user) return;
    try {
      if (MOCK_MODE) {
        // Generate a mock certificate PDF blob locally
        const mockPdfContent = `INTEXIA LEARNING PLATFORM\n\nCertificate of Completion\n\nThis is to certify that\n${user.name || "Demo User"}\nhas successfully completed the course:\n${cert.course ? cert.course.title : "LMS Course"}\n\nIssued on: ${new Date(cert.issuedAt).toLocaleDateString()}`;
        const blob = new Blob([mockPdfContent], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        const courseTitle = cert.course ? cert.course.title : "Course";
        a.download = `LMS_Certificate_${courseTitle.replace(/\s+/g, "_")}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      const token = localStorage.getItem("lms_token");
      const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const apiUrl = base.endsWith("/api") ? base : `${base}/api`;

      const res = await fetch(`${apiUrl}/courses/certificates/${cert.id}/download`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error("Failed to download certificate from server.");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const courseTitle = cert.course ? cert.course.title : "Course";
      a.download = `LMS_Certificate_${courseTitle.replace(/\s+/g, "_")}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Error downloading certificate. Please try again later.");
    }
  };


  return (
    <div className="student-dashboard">
      <Sidebar />

      <div className="main-content">
        <Topbar />

        <div className="certificates-header">
          <div>
            <span className="certificate-tag">
              ACHIEVEMENTS & RECOGNITION
            </span>
            <h1 className="page-title">
              My Certificates
            </h1>
            <p className="page-subtitle">
              Showcase your achievements and completed courses.
            </p>
          </div>

          <div
            className="certificate-count"
            style={{
              background: `radial-gradient(circle, #121826 58%, transparent 59%), conic-gradient(#00F5FF 0deg ${angle}deg, #2A2A35 ${angle}deg 360deg)`
            }}
          >
            <h2>{earnedCount.toString().padStart(2, "0")}</h2>
            <span>Certificates Earned</span>
          </div>
        </div>

        {loading ? (
          <div className="certificate-grid">
            <Skeleton variant="card" />
            <Skeleton variant="card" />
            <Skeleton variant="card" />
          </div>
        ) : error ? (
          <div style={{ color: "#f87171", textAlign: "center", padding: "40px" }}>
            <h3>{error}</h3>
          </div>
        ) : certificates.length === 0 ? (
          <EmptyState
            icon={FiAward}
            title="No certificates earned yet"
            description="Complete all modules in an enrolled course to receive a verified certificate of completion."
            ctaText="View Enrolled Courses"
            onCtaClick={() => navigate("/my-courses")}
          />
        ) : (
          <div className="certificate-grid">
            {certificates.map((cert) => (
              <div className="certificate-card" key={cert.id}>
                <div className="certificate-badge">
                  🏆
                </div>
                <h2>{cert.course ? cert.course.title : "Cyber Course"}</h2>
                <p>
                  Successfully completed the course modules and assessments.
                </p>
                <span className="issue-date">
                  Issued: {new Date(cert.issuedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <button onClick={() => handleDownload(cert)}>
                  Download Certificate
                </button>
              </div>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default Certificates;