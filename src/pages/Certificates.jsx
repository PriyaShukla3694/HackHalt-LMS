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
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

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
        // Generate a beautiful landscape certificate using jsPDF
        const doc = new jsPDF({
          orientation: "landscape",
          unit: "mm",
          format: "a4",
        });

        // 1. Draw Gold/Orange Borders
        doc.setDrawColor(255, 140, 0); // Orange
        doc.setLineWidth(2);
        doc.rect(10, 10, 277, 190); // outer border
        doc.setLineWidth(0.5);
        doc.rect(12, 12, 273, 186); // inner border

        // 2. Content
        doc.setFont("helvetica", "bold");
        doc.setFontSize(28);
        doc.setTextColor(226, 92, 0); // brand orange
        doc.text("HACKHALT LMS", 148.5, 35, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.setTextColor(51, 51, 51);
        doc.text("CERTIFICATE OF COMPLETION", 148.5, 48, { align: "center" });

        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.setTextColor(119, 119, 119); // muted
        doc.text("This is proudly presented to", 148.5, 70, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(24);
        doc.setTextColor(18, 24, 38); // --ink
        doc.text(user.name || "Demo User", 148.5, 85, { align: "center" });

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(119, 119, 119);
        doc.text("for successfully completing the course", 148.5, 100, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.setTextColor(226, 92, 0); // brand orange
        doc.text(cert.courseTitle || (cert.course ? cert.course.title : "LMS Course"), 148.5, 115, { align: "center" });

        // Divider lines for signature & date
        doc.setDrawColor(236, 236, 236); // --line
        doc.setLineWidth(0.5);
        doc.line(40, 140, 120, 140);
        doc.line(177, 140, 257, 140);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(119, 119, 119);
        doc.text("Date of Issue", 80, 146, { align: "center" });
        doc.text("Authorized Instructor", 217, 146, { align: "center" });

        doc.setFont("helvetica", "bold");
        doc.setTextColor(51, 51, 51);
        const issueDateStr = new Date(cert.issuedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        });
        doc.text(issueDateStr, 80, 153, { align: "center" });
        doc.text(cert.instructorName || "Dr. Sarah Jenkins", 217, 153, { align: "center" });

        // Generate QR code encoding verifyUrl
        const verifyLink = window.location.origin + (cert.verifyUrl || `/verify/${cert.certId}`);
        const qrDataUrl = await QRCode.toDataURL(verifyLink);

        // Embed QR Code bottom-right
        doc.addImage(qrDataUrl, "PNG", 232, 150, 30, 30);
        
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(119, 119, 119);
        doc.text(cert.certId, 247, 185, { align: "center" });

        // Human-readable verification tagline on bottom-left
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8);
        doc.setTextColor(119, 119, 119);
        doc.text("Verify this certificate at " + window.location.host + "/verify/" + cert.certId, 40, 180);

        // Download
        const courseTitle = cert.course ? cert.course.title : "Course";
        doc.save(`LMS_Certificate_${courseTitle.replace(/\s+/g, "_")}.pdf`);
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
        <Topbar hideTitle={true} />

        <div className="certificates-content" id="main-content" tabIndex="-1">
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
    </div>
  );
}

export default Certificates;