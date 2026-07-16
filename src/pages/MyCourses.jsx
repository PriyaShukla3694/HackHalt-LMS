import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import CourseCard from "../components/CourseCard";
import EmptyState from "../components/EmptyState";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import cyberSecurity from "../assets/Cyber_Security.webp";
import ethicalHacking from "../assets/Ethical_Hacking.webp";
import pythonAI from "../assets/Python.webp";
import "../styles/MyCourses.css";

function MyCourses() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search] = useState("");

  const courses = [
    {
      id: 1,
      title: "Cyber Security",
      image: cyberSecurity,
      lessons: 12,
      progress: 75,
      level: "Beginner",
    },
    {
      id: 2,
      title: "Ethical Hacking",
      image: ethicalHacking,
      lessons: 18,
      progress: 42,
      level: "Intermediate",
    },
    {
      id: 3,
      title: "Python Programming",
      image: pythonAI,
      lessons: 20,
      progress: 10,
      level: "Beginner",
    },
  ];

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="courses-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="courses-main">
        <Topbar
          title="My Courses"
          subtitle="Continue learning and improve your skills."
          onMenuClick={() => setSidebarOpen(true)}
          hideTitle={true}
        />

        <div className="courses-content" id="main-content" tabIndex="-1">
          <div className="courses-header">
            <div>
              <h1>My Courses 📚</h1>
              <p>Continue learning and improve your skills.</p>
            </div>
          </div>

          {filteredCourses.length === 0 ? (
            <EmptyState
              icon={FiBookOpen}
              title="No courses enrolled"
              description="You are not enrolled in any courses yet. Browse our catalog to start learning."
              ctaText="Browse Courses"
              onCtaClick={() => navigate("/student-dashboard")}
            />
          ) : (
            <motion.div
              className="course-grid"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.06 } }
              }}
              initial="initial"
              animate="animate"
            >
              {filteredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={{
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                >
                  <CourseCard
                    title={course.title}
                    image={course.image}
                    lessons={course.lessons}
                    progress={course.progress}
                    level={course.level}
                    isDashboard={false}
                    onResume={() => setShowPopup(true)}
                    onDetails={() => navigate(`/course/${course.id}`)}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {showPopup && (
            <div className="popup-overlay" onClick={() => setShowPopup(false)}>
              <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                <h2>Ready to start learning</h2>
                <p>
                  All the best for your learning journey!
                  <br />
                  Thanks!!
                </p>
                <button onClick={() => setShowPopup(false)}>OK</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;