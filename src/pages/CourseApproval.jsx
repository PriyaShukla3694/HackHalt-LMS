import { useState } from "react";
import { useToast } from "../context/ToastContext";
import {
  FiSearch,
  FiCheck,
  FiX,
  FiEye,
  FiBookOpen,
} from "react-icons/fi";
import EmptyState from "../components/EmptyState";

import AdminSidebar from "../components/AdminSidebar";
import Topbar from "../components/Topbar";

import "../styles/AdminPages.css";

function CourseApproval() {
  const { showToast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Cyber Security",
      instructor: "John Anderson",
      submitted: "12 Jun 2026",
      description:
        "Complete cyber security course for beginners.",
      status: "Pending",
    },
    {
      id: 2,
      title: "Ethical Hacking",
      instructor: "David Smith",
      submitted: "15 Jun 2026",
      description:
        "Learn penetration testing and ethical hacking.",
      status: "Pending",
    },
    {
      id: 3,
      title: "Python Programming",
      instructor: "Emma Wilson",
      submitted: "20 Jun 2026",
      description:
        "Python from beginner to advanced.",
      status: "Pending",
    },
  ]);

  const filteredCourses = courses.filter((course) =>
    course.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const updateStatus = (id, status) => {
    setCourses(
      courses.map((course) => {
        if (course.id === id) {
          const type = status === "Approved" ? "success" : "error";
          showToast(`Course "${course.title}" has been ${status.toLowerCase()}!`, type);
          return { ...course, status };
        }
        return course;
      })
    );
  };

    return (

    <div className="admin-page">

      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="admin-main">

        <Topbar
          title="Course Approval"
          subtitle="Approve or reject submitted courses"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="admin-content">

          <div className="page-header">

            <div>

              <h1>Course Approval</h1>

              <p>
                Review instructor submitted courses before publishing.
              </p>

            </div>

          </div>

          {/* SEARCH */}

          <div className="search-box">

            <FiSearch />

            <input
              type="text"
              placeholder="Search course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {/* TABLE */}

          {filteredCourses.length === 0 ? (
            <EmptyState
              icon={FiBookOpen}
              title="No courses pending"
              description="There are currently no instructor course submissions pending review."
            />
          ) : (
            <div className="table-card">
              <table>
                <thead>
                  <tr>
                    <th>Course</th>
                    <th>Instructor</th>
                    <th>Submitted</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr key={course.id}>
                      <td>{course.title}</td>
                      <td>{course.instructor}</td>
                      <td>{course.submitted}</td>
                      <td>
                        <span
                          className={
                            course.status === "Approved"
                              ? "status-active"
                              : course.status === "Rejected"
                              ? "status-inactive"
                              : "status-pending"
                          }
                        >
                          {course.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            className="view-btn"
                            onClick={() => {
                              setSelectedCourse(course);
                              setShowDetails(true);
                            }}
                          >
                            <FiEye />
                          </button>
                          <button
                            className="edit-btn"
                            onClick={() =>
                              updateStatus(course.id, "Approved")
                            }
                          >
                            <FiCheck />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={() =>
                              updateStatus(course.id, "Rejected")
                            }
                          >
                            <FiX />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

                    {/* COURSE DETAILS POPUP */}

          {showDetails && selectedCourse && (

            <div
              className="popup-overlay"
              onClick={() => setShowDetails(false)}
            >

              <div
                className="details-card"
                onClick={(e) => e.stopPropagation()}
              >

                <h2>Course Details</h2>

                <div className="detail-row">

                  <strong>Course</strong>

                  <span>{selectedCourse.title}</span>

                </div>

                <div className="detail-row">

                  <strong>Instructor</strong>

                  <span>{selectedCourse.instructor}</span>

                </div>

                <div className="detail-row">

                  <strong>Submitted On</strong>

                  <span>{selectedCourse.submitted}</span>

                </div>

                <div className="detail-row">

                  <strong>Status</strong>

                  <span
                    className={
                      selectedCourse.status === "Approved"
                        ? "status-active"
                        : selectedCourse.status === "Rejected"
                        ? "status-inactive"
                        : "status-pending"
                    }
                  >

                    {selectedCourse.status}

                  </span>

                </div>

                <div className="detail-row">

                  <strong>Description</strong>

                  <span>{selectedCourse.description}</span>

                </div>

                <div className="popup-buttons">

                  <button
                    className="save-btn"
                    onClick={() => {

                      updateStatus(
                        selectedCourse.id,
                        "Approved"
                      );

                      setShowDetails(false);

                    }}
                  >

                    <FiCheck />

                    Approve

                  </button>

                  <button
                    className="cancel-btn"
                    onClick={() => {

                      updateStatus(
                        selectedCourse.id,
                        "Rejected"
                      );

                      setShowDetails(false);

                    }}
                  >

                    <FiX />

                    Reject

                  </button>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );

}

export default CourseApproval;