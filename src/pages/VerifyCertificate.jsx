import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShield,
  FiAward,
  FiCheckCircle,
  FiXCircle,
  FiCalendar,
  FiUser,
  FiBookOpen,
  FiArrowLeft,
} from "react-icons/fi";
import { verifyCertificate } from "../utils/api";
import AuthNavbar from "../components/AuthNavbar";
import Button from "../components/Button";
import "../styles/VerifyCertificate.css";

function VerifyCertificate() {
  const { certId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [certInfo, setCertInfo] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!certId) {
      setLoading(false);
      setErrorMsg("No certificate ID provided.");
      return;
    }

    setLoading(true);
    verifyCertificate(certId)
      .then(async (res) => {
        const envelope = await res.json();
        if (res.ok && envelope.valid) {
          setCertInfo(envelope);
          setErrorMsg("");
        } else {
          setCertInfo(null);
          setErrorMsg(envelope.message || "Certificate could not be verified or is invalid.");
        }
      })
      .catch((err) => {
        console.error("Error verifying certificate:", err);
        setCertInfo(null);
        setErrorMsg("Network error verifying certificate. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [certId]);

  return (
    <div className="verify-page">
      <AuthNavbar />

      <section className="verify-hero">
        <div className="verify-blob verify-blob-a" />
        <div className="verify-blob verify-blob-b" />

        <motion.div
          className="verify-heading"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1>Credential Verification</h1>
          <p>Instantly confirm the authenticity of HackHalt LMS certifications.</p>
        </motion.div>

        <motion.div
          className="verify-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          {loading ? (
            <div className="verify-loading">
              <div className="spinner" />
              <p>Verifying credential on the secure ledger...</p>
            </div>
          ) : certInfo ? (
            <div className="verify-result success">
              <div className="status-badge success-badge">
                <FiCheckCircle className="badge-icon" />
                <span>Verified Certification</span>
              </div>

              <div className="badge-seal">
                <FiAward />
              </div>

              <h2 className="success-title">Verified Authentic</h2>
              <p className="success-desc">
                This certificate was officially issued by HackHalt LMS to the recipient below:
              </p>

              <div className="cert-details-list">
                <div className="cert-detail-item">
                  <FiUser className="item-icon" />
                  <div>
                    <label>Recipient Name</label>
                    <strong>{certInfo.studentName}</strong>
                  </div>
                </div>

                <div className="cert-detail-item">
                  <FiBookOpen className="item-icon" />
                  <div>
                    <label>Course Completed</label>
                    <strong>{certInfo.courseTitle}</strong>
                  </div>
                </div>

                <div className="cert-detail-item">
                  <FiUser className="item-icon" />
                  <div>
                    <label>Instructed By</label>
                    <strong>{certInfo.instructorName}</strong>
                  </div>
                </div>

                <div className="cert-detail-item">
                  <FiCalendar className="item-icon" />
                  <div>
                    <label>Issued On</label>
                    <strong>
                      {new Date(certInfo.issuedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </strong>
                  </div>
                </div>

                <div className="cert-detail-item">
                  <FiShield className="item-icon" />
                  <div>
                    <label>Credential ID</label>
                    <strong className="mono">{certId}</strong>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                onClick={() => navigate("/")}
                style={{ width: "100%", marginTop: "24px" }}
              >
                <FiArrowLeft style={{ marginRight: "8px" }} />
                Back to Home
              </Button>
            </div>
          ) : (
            <div className="verify-result error">
              <div className="status-badge error-badge">
                <FiXCircle className="badge-icon" />
                <span>Verification Failed</span>
              </div>

              <h2 className="error-title">Invalid Credential</h2>
              <p className="error-desc">
                {errorMsg || "The certificate ID provided could not be matched against our database records."}
              </p>

              <div className="error-card-box">
                <p>
                  <strong>Security Advisory:</strong> If this QR code or URL was provided as proof of achievement, the credential may have been altered, revoked, or counterfeited.
                </p>
                <p style={{ marginTop: "12px" }}>
                  Entered ID: <span className="mono bold">{certId}</span>
                </p>
              </div>

              <Button
                variant="secondary"
                onClick={() => navigate("/")}
                style={{ width: "100%", marginTop: "24px" }}
              >
                <FiArrowLeft style={{ marginRight: "8px" }} />
                Go to Homepage
              </Button>
            </div>
          )}
        </motion.div>

        <p className="verify-ssl-note">
          <FiShield /> Secure SSL Cryptographic Ledger Verification
        </p>
      </section>

      {/* FOOTER */}
      <footer className="verify-footer">
        <div className="verify-footer-inner">
          <div className="verify-footer-brand">
            <span>INTEXIA</span>
            <p>© 2026 INTEXIA. Secured with SHA-256 verification.</p>
          </div>
          <div className="verify-footer-links">
            <a href="#privacy" onClick={(e) => e.preventDefault()}>
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => e.preventDefault()}>
              Terms of Service
            </a>
            <a href="#help" onClick={(e) => e.preventDefault()}>
              Help Center
            </a>
            <a href="#contact" onClick={(e) => e.preventDefault()}>
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default VerifyCertificate;
