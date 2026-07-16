import { useState } from "react";
import { motion } from "framer-motion";

import {
  FiSearch,
  FiPlus,
  FiEye,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSave,
  FiUsers,
} from "react-icons/fi";
import EmptyState from "../components/EmptyState";

import InstructorSidebar from "../components/InstructorSidebar";
import Topbar from "../components/Topbar";

import "../styles/ManageStudents.css";

function ManageStudents() {

  /* ===========================
      MOBILE SIDEBAR
  =========================== */

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ===========================
      SEARCH
  =========================== */

  const [search, setSearch] = useState("");

  /* ===========================
      STUDENTS
  =========================== */

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      course: "Cyber Security",
      progress: "72%",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      phone: "+91 9123456780",
      course: "Ethical Hacking",
      progress: "58%",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Gupta",
      email: "aman@example.com",
      phone: "+91 9988776655",
      course: "Python Programming",
      progress: "90%",
      status: "Completed",
    },
  ]);

  /* ===========================
      FILTER
  =========================== */

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ===========================
      POPUPS
  =========================== */

  const [showDetails, setShowDetails] = useState(false);

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [showAddPopup, setShowAddPopup] =
    useState(false);

  const [showEditPopup, setShowEditPopup] =
    useState(false);

  /* ===========================
      ADD FORM
  =========================== */

  const [newStudent, setNewStudent] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    progress: "",
    status: "",
  });

  /* ===========================
      EDIT FORM
  =========================== */

  const [editStudent, setEditStudent] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    course: "",
    progress: "",
    status: "",
  });

  /* ===========================
      DELETE
  =========================== */

  const handleDelete = (id) => {

    if (window.confirm("Delete this student?")) {

      setStudents(
        students.filter(
          (student) => student.id !== id
        )
      );

    }

  };

  /* ===========================
      ADD STUDENT
  =========================== */

  const handleAddStudent = () => {

    if (
      newStudent.name.trim() === "" ||
      newStudent.email.trim() === "" ||
      newStudent.course.trim() === ""
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const student = {
      id: Date.now(),
      ...newStudent,
    };

    setStudents([...students, student]);

    setNewStudent({
      name: "",
      email: "",
      phone: "",
      course: "",
      progress: "",
      status: "",
    });

    setShowAddPopup(false);

  };

  /* ===========================
      OPEN EDIT
  =========================== */

  const openEdit = (student) => {

    setEditStudent(student);

    setShowEditPopup(true);

  };

  /* ===========================
      SAVE EDIT
  =========================== */

  const handleSaveEdit = () => {

    setStudents(

      students.map((student) =>

        student.id === editStudent.id

          ? editStudent

          : student

      )

    );

    setShowEditPopup(false);

  };

    return (

    <div className="students-page">

      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="students-main">

        <Topbar
          title="Manage Students"
          subtitle="View and manage all enrolled students"
          onMenuClick={() => setSidebarOpen(true)}
          hideTitle={true}
        />

        <div className="students-content" id="main-content" tabIndex="-1">

          {/* HEADER */}

          <div className="students-header">

            <div>

              <h1>Manage Students</h1>

              <p>
                View, edit and manage enrolled students.
              </p>

            </div>

            <button
              className="add-btn"
              onClick={() => setShowAddPopup(true)}
            >

              <FiPlus />

              Add Student

            </button>

          </div>

          <div className="students-search">
            <label htmlFor="search-student-input" className="sr-only">Search student</label>
            <FiSearch />
            <input
              id="search-student-input"
              type="text"
              placeholder="Search student..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {/* STUDENTS */}

          {filteredStudents.length === 0 ? (
            <EmptyState
              icon={FiUsers}
              title="No students found"
              description="There are no students enrolled under your courses yet, or none matching your search."
              ctaText="Add Student"
              onCtaClick={() => setShowAddPopup(true)}
            />
          ) : (
            <motion.div
              className="student-grid"
              variants={{
                initial: {},
                animate: { transition: { staggerChildren: 0.06 } }
              }}
              initial="initial"
              animate="animate"
            >
              {filteredStudents.map((student) => (
                <motion.div
                  className="student-card"
                  key={student.id}
                  variants={{
                    initial: { opacity: 0, y: 10 },
                    animate: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="student-avatar">
                    {student.name.charAt(0)}
                  </div>
                  <h3>{student.name}</h3>
                  <p>{student.course}</p>
                  <span>{student.progress}</span>
                  <div className="student-buttons">
                    <button
                      className="view-btn"
                      onClick={() => {
                        setSelectedStudent(student);
                        setShowDetails(true);
                      }}
                    >
                      <FiEye />
                      View
                    </button>
                    <button
                      className="edit-btn"
                      onClick={() => openEdit(student)}
                    >
                      <FiEdit2 />
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(student.id)
                      }
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

      </div>

            {/* ==========================
          VIEW STUDENT
      ========================== */}

      {showDetails && selectedStudent && (

        <div
          className="popup-overlay"
          onClick={() => setShowDetails(false)}
        >

          <div
            className="details-popup"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="close-btn"
              onClick={() => setShowDetails(false)}
              aria-label="Close"
            >
              <FiX />
            </button>

            <div className="details-avatar">
              {selectedStudent.name.charAt(0)}
            </div>

            <h2>{selectedStudent.name}</h2>

            <div className="details-scroll">

              <div className="details-list">

                <div className="detail-row">
                  <strong>Email</strong>
                  <span>{selectedStudent.email}</span>
                </div>

                <div className="detail-row">
                  <strong>Phone</strong>
                  <span>{selectedStudent.phone}</span>
                </div>

                <div className="detail-row">
                  <strong>Course</strong>
                  <span>{selectedStudent.course}</span>
                </div>

                <div className="detail-row">
                  <strong>Progress</strong>
                  <span>{selectedStudent.progress}</span>
                </div>

                <div className="detail-row">
                  <strong>Status</strong>
                  <span>{selectedStudent.status}</span>
                </div>

                <div className="detail-row">
                  <strong>Enrollment ID</strong>
                  <span>STD-{selectedStudent.id}</span>
                </div>

                <div className="detail-row">
                  <strong>Attendance</strong>
                  <span>94%</span>
                </div>

                <div className="detail-row">
                  <strong>Assignments</strong>
                  <span>18 / 20 Submitted</span>
                </div>

                <div className="detail-row">
                  <strong>Quiz Score</strong>
                  <span>89%</span>
                </div>

                <div className="detail-row">
                  <strong>Last Login</strong>
                  <span>Today • 10:35 AM</span>
                </div>

              </div>

            </div>

            <button
              className="save-btn"
              onClick={() => setShowDetails(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}

      {/* ==========================
          ADD STUDENT
      ========================== */}

      {showAddPopup && (

        <div
          className="popup-overlay"
          onClick={() => setShowAddPopup(false)}
        >

          <div
            className="student-popup"
            onClick={(e) => e.stopPropagation()}
          >

              <button
                className="close-btn"
                onClick={() => setShowAddPopup(false)}
                aria-label="Close"
              >
                <FiX />
              </button>

              <h2>Add Student</h2>

              <label htmlFor="add-student-name" className="sr-only">Student Name</label>
              <input
                id="add-student-name"
                type="text"
                placeholder="Student Name"
                value={newStudent.name}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    name:e.target.value,
                  })
                }
              />

              <label htmlFor="add-student-email" className="sr-only">Email</label>
              <input
                id="add-student-email"
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    email:e.target.value,
                  })
                }
              />

              <label htmlFor="add-student-phone" className="sr-only">Phone</label>
              <input
                id="add-student-phone"
                type="text"
                placeholder="Phone"
                value={newStudent.phone}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    phone:e.target.value,
                  })
                }
              />

              <label htmlFor="add-student-course" className="sr-only">Course</label>
              <input
                id="add-student-course"
                type="text"
                placeholder="Course"
                value={newStudent.course}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    course:e.target.value,
                  })
                }
              />

              <label htmlFor="add-student-progress" className="sr-only">Progress</label>
              <input
                id="add-student-progress"
                type="text"
                placeholder="Progress"
                value={newStudent.progress}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    progress:e.target.value,
                  })
                }
              />

              <label htmlFor="add-student-status" className="sr-only">Status</label>
              <input
                id="add-student-status"
                type="text"
                placeholder="Status"
                value={newStudent.status}
                onChange={(e)=>
                  setNewStudent({
                    ...newStudent,
                    status:e.target.value,
                  })
                }
              />

            <button
              className="save-btn"
              onClick={handleAddStudent}
            >
              <FiPlus />
              Add Student
            </button>

          </div>

        </div>

      )}

            {/* ==========================
          EDIT STUDENT
      ========================== */}

      {showEditPopup && (

        <div
          className="popup-overlay"
          onClick={() => setShowEditPopup(false)}
        >

          <div
            className="student-popup"
            onClick={(e) => e.stopPropagation()}
          >

              <button
                className="close-btn"
                onClick={() => setShowEditPopup(false)}
                aria-label="Close"
              >
                <FiX />
              </button>

              <h2>Edit Student</h2>

              <label htmlFor="edit-student-name" className="sr-only">Student Name</label>
              <input
                id="edit-student-name"
                type="text"
                value={editStudent.name}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    name: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-student-email" className="sr-only">Email</label>
              <input
                id="edit-student-email"
                type="email"
                value={editStudent.email}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    email: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-student-phone" className="sr-only">Phone</label>
              <input
                id="edit-student-phone"
                type="text"
                value={editStudent.phone}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    phone: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-student-course" className="sr-only">Course</label>
              <input
                id="edit-student-course"
                type="text"
                value={editStudent.course}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    course: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-student-progress" className="sr-only">Progress</label>
              <input
                id="edit-student-progress"
                type="text"
                value={editStudent.progress}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    progress: e.target.value,
                  })
                }
              />

              <label htmlFor="edit-student-status" className="sr-only">Status</label>
              <input
                id="edit-student-status"
                type="text"
                value={editStudent.status}
                onChange={(e) =>
                  setEditStudent({
                    ...editStudent,
                    status: e.target.value,
                  })
                }
              />

            <button
              className="save-btn"
              onClick={handleSaveEdit}
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

export default ManageStudents;