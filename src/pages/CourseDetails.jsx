import "../styles/CourseDetails.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useNavigate } from "react-router-dom";

import trishul from "../assets/trishul.png";

function CourseDetails() {

const navigate = useNavigate();

return ( <div className="course-details-page">

```
  <Sidebar />

  <div className="course-details-content">

    <Topbar />

    <div className="course-hero">

      <div className="course-left">

        <span className="course-tag">
          CYBER SECURITY TRACK
        </span>

        <h1>
          Cyber Security Basics
        </h1>

        <p>
          Learn cybersecurity fundamentals,
          networking concepts, ethical hacking,
          penetration testing and defense systems.
        </p>

        <div className="course-stats">

          <div>
            <h3>24</h3>
            <span>Lessons</span>
          </div>

          <div>
            <h3>12h</h3>
            <span>Duration</span>
          </div>

          <div>
            <h3>60%</h3>
            <span>Completed</span>
          </div>

        </div>

        <button
          className="start-learning-btn"
          onClick={() => navigate("/video-learning")}
        >
          Start Learning →
        </button>

      </div>

      <div className="course-right">
        <img src={trishul} alt="" />
      </div>

    </div>

    <div className="module-section">

      <h2>Course Modules</h2>

      <div className="module-grid">

        <div className="module-card">
          <span>01</span>
          Introduction To Cyber Security
        </div>

        <div className="module-card">
          <span>02</span>
          Networking Fundamentals
        </div>

        <div className="module-card">
          <span>03</span>
          Security Concepts
        </div>

        <div className="module-card">
          <span>04</span>
          Ethical Hacking
        </div>

        <div className="module-card">
          <span>05</span>
          Penetration Testing
        </div>

        <div className="module-card">
          <span>06</span>
          Final Assessment
        </div>

      </div>

    </div>

  </div>

</div>


);
}

export default CourseDetails;
