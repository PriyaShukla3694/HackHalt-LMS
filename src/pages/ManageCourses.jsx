import { useState } from "react";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiSave,
  FiBookOpen,
} from "react-icons/fi";
import EmptyState from "../components/EmptyState";

import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

import cyberSecurity from "../assets/Cyber_Security.jpeg";
import ethicalHacking from "../assets/Ethical_Hacking.jpeg";
import pythonProgramming from "../assets/Python.jpeg";

import "../styles/ManageCourses.css";

function ManageCourses() {

  /* ===========================
      MOBILE SIDEBAR
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
      SEARCH
  =========================== */

  const [search, setSearch] = useState("");

  /* ===========================
      COURSES
  =========================== */

  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Cyber Security",
      students: 120,
      image: cyberSecurity,
    },
    {
      id: 2,
      title: "Ethical Hacking",
      students: 95,
      image: ethicalHacking,
    },
    {
      id: 3,
      title: "Python Programming",
      students: 160,
      image: pythonProgramming,
    },
  ]);

  /* ===========================
      POPUPS
  =========================== */

  const [showPopup, setShowPopup] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [showAddPopup, setShowAddPopup] = useState(false);

  const [showEditPopup, setShowEditPopup] = useState(false);

  /* ===========================
      ADD COURSE FORM
  =========================== */

  const [newCourse, setNewCourse] = useState({
    title: "",
    students: "",
  });

  /* ===========================
      EDIT COURSE FORM
  =========================== */

  const [editCourse, setEditCourse] = useState({
    id: null,
    title: "",
    students: "",
    image: cyberSecurity,
  });

  /* ===========================
      SEARCH FILTER
  =========================== */

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ===========================
      DELETE
  =========================== */

  const handleDelete = (id) => {

    if (window.confirm("Delete this course?")) {

      setCourses(
        courses.filter((course) => course.id !== id)
      );

    }

  };

  /* ===========================
      ADD COURSE
  =========================== */

  const handleAddCourse = () => {

    if (
      newCourse.title.trim() === "" ||
      newCourse.students === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const course = {
      id: Date.now(),
      title: newCourse.title,
      students: Number(newCourse.students),
      image: cyberSecurity,
    };

    setCourses([...courses, course]);

    setNewCourse({
      title: "",
      students: "",
    });

    setShowAddPopup(false);

  };

  /* ===========================
      OPEN EDIT
  =========================== */

  const openEdit = (course) => {

    setEditCourse(course);

    setShowEditPopup(true);

  };

  /* ===========================
      SAVE EDIT
  =========================== */

  const handleEditCourse = () => {

    setCourses(
      courses.map((course) =>
        course.id === editCourse.id
          ? editCourse
          : course
      )
    );

    setShowEditPopup(false);

  };

    return (

    <div className="manage-page">

      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="manage-main">

        <Topbar
          title="Manage Courses"
          subtitle="Create, edit and manage your courses"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="manage-content">

          {/* HEADER */}

          <div className="manage-header">

            <div>

              <h1>Manage Courses</h1>

              <p>Create, edit and manage all your courses.</p>

            </div>

            <button
              className="add-course-btn"
              onClick={() => setShowAddPopup(true)}
            >

              <FiPlus />

              Add Course

            </button>

          </div>

          {/* SEARCH */}

          <div className="search-bar">

            <FiSearch />

            <input
              type="text"
              placeholder="Search course..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* COURSE GRID */}

          {filteredCourses.length === 0 ? (
            <EmptyState
              icon={FiBookOpen}
              title="No courses found"
              description="You have not created any courses yet, or none match your search."
              ctaText="Add Course"
              onCtaClick={() => setShowAddPopup(true)}
            />
          ) : (
            <div className="course-list">
              {filteredCourses.map((course) => (
                <div
                  className="manage-card"
                  key={course.id}
                >
                  <img
                    src={course.image}
                    alt={course.title}
                  />
                  <div className="manage-info">
                    <h2>{course.title}</h2>
                    <p>
                      {course.students} Students Enrolled
                    </p>
                    <div className="manage-buttons">
                      <button
                        className="view-btn"
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowPopup(true);
                        }}
                      >
                        <FiEye />
                        View
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => openEdit(course)}
                      >
                        <FiEdit2 />
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(course.id)
                        }
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

                  </div>
      </div>

      {/* ==========================
          VIEW COURSE POPUP
      ========================== */}

      {showPopup && selectedCourse && (

        <div
          className="popup-overlay"
          onClick={() => setShowPopup(false)}
        >

          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              <FiX />
            </button>

            <img
              src={selectedCourse.image}
              alt={selectedCourse.title}
            />

            <h2>{selectedCourse.title}</h2>

            <p>
              <strong>Students :</strong>{" "}
              {selectedCourse.students}
            </p>

            <p>
              <strong>Instructor :</strong> You
            </p>

            <p>
              <strong>Duration :</strong> 8 Weeks
            </p>

            <p>
              <strong>Status :</strong> Active
            </p>

            <button
              className="popup-action"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* ==========================
          ADD COURSE
      ========================== */}

      {showAddPopup && (

        <div
          className="popup-overlay"
          onClick={() => setShowAddPopup(false)}
        >

          <div
            className="popup-box form-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowAddPopup(false)}
            >
              <FiX />
            </button>

            <h2>Add Course</h2>

            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.title}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  title: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Students"
              value={newCourse.students}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  students: e.target.value,
                })
              }
            />

            <button
              className="popup-action"
              onClick={handleAddCourse}
            >
              <FiPlus />

              Add Course

            </button>

          </div>

        </div>

      )}

      {/* ==========================
          EDIT COURSE
      ========================== */}

      {showEditPopup && (

        <div
          className="popup-overlay"
          onClick={() => setShowEditPopup(false)}
        >

          <div
            className="popup-box form-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowEditPopup(false)}
            >
              <FiX />
            </button>

            <h2>Edit Course</h2>

            <input
              type="text"
              value={editCourse.title}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  title: e.target.value,
                })
              }
            />

            <input
              type="number"
              value={editCourse.students}
              onChange={(e) =>
                setEditCourse({
                  ...editCourse,
                  students: Number(e.target.value),
                })
              }
            />

            <button
              className="popup-action"
              onClick={handleEditCourse}
            >
              <FiSave />

              Save Changes

            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default ManageCourses;