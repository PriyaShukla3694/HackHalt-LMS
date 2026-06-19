import "../styles/Certificates.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function Certificates() {
  return (
    <div className="student-dashboard">

      <Sidebar />

      <div className="main-content">

        <Topbar />

        <h1 className="page-title">
          My Certificates
        </h1>

        <p className="page-subtitle">
          Showcase your achievements and completed courses.
        </p>

        <div className="certificate-grid">

          <div className="certificate-card">

            <div className="certificate-badge">
              🏆
            </div>

            <h2>Cyber Security Basics</h2>

            <p>
              Successfully completed the course.
            </p>

            <button>
              Download Certificate
            </button>

          </div>

          <div className="certificate-card">

            <div className="certificate-badge">
              🎖️
            </div>

            <h2>Ethical Hacking</h2>

            <p>
              Successfully completed the course.
            </p>

            <button>
              Download Certificate
            </button>

          </div>

          <div className="certificate-card">

            <div className="certificate-badge">
              🥇
            </div>

            <h2>Python For AI</h2>

            <p>
              Successfully completed the course.
            </p>

            <button>
              Download Certificate
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Certificates;