import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";

import MyCourses from "./pages/MyCourses";
import CourseDetails from "./pages/CourseDetails";
import VideoLearning from "./pages/VideoLearning";
import ProgressAnalytics from "./pages/ProgressAnalytics";
import Certificates from "./pages/Certificates";
import Settings from "./pages/Settings";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
return ( <BrowserRouter>

```
  <Routes>

    {/* PUBLIC ROUTES */}

    <Route
      path="/"
      element={<WelcomePage />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />

    <Route
      path="/register"
      element={<RegisterPage />}
    />

    {/* STUDENT DASHBOARD */}

    <Route
      path="/student-dashboard"
      element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      }
    />

    {/* MY COURSES */}

    <Route
      path="/my-courses"
      element={
        <ProtectedRoute role="student">
          <MyCourses />
        </ProtectedRoute>
      }
    />

    {/* COURSE DETAILS */}

    <Route
      path="/course-details"
      element={
        <ProtectedRoute role="student">
          <CourseDetails />
        </ProtectedRoute>
      }
    />

    {/* VIDEO LEARNING */}

    <Route
      path="/video-learning"
      element={
        <ProtectedRoute role="student">
          <VideoLearning />
        </ProtectedRoute>
      }
    />

    {/* PROGRESS */}

    <Route
      path="/progress"
      element={
        <ProtectedRoute role="student">
          <ProgressAnalytics />
        </ProtectedRoute>
      }
    />

    {/* CERTIFICATES */}

    <Route
      path="/certificates"
      element={
        <ProtectedRoute role="student">
          <Certificates />
        </ProtectedRoute>
      }
    />

    {/* SETTINGS */}

    <Route
      path="/settings"
      element={
        <ProtectedRoute role="student">
          <Settings />
        </ProtectedRoute>
      }
    />

    {/* INSTRUCTOR */}

    <Route
      path="/instructor-dashboard"
      element={
        <ProtectedRoute role="instructor">
          <InstructorDashboard />
        </ProtectedRoute>
      }
    />

    {/* INVALID ROUTE */}

    <Route
      path="*"
      element={<Navigate to="/" replace />}
    />

  </Routes>

</BrowserRouter>


);
}

export default App;
