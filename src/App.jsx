import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import WelcomePage from "./pages/WelcomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

/* STUDENT */
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const MyCourses = lazy(() => import("./pages/MyCourses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const VideoLearning = lazy(() => import("./pages/VideoLearning"));
const ProgressAnalytics = lazy(() => import("./pages/ProgressAnalytics"));
const Certificates = lazy(() => import("./pages/Certificates"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));

/* INSTRUCTOR */
const InstructorDashboard = lazy(() => import("./pages/InstructorDashboard"));
const ManageCourses = lazy(() => import("./pages/ManageCourses"));
const ManageStudents = lazy(() => import("./pages/ManageStudents"));
const InstructorAnalytics = lazy(() => import("./pages/InstructorAnalytics"));
const InstructorSettings = lazy(() => import("./pages/InstructorSettings"));

/* ADMIN */
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserManagement = lazy(() => import("./pages/UserManagement"));
const CourseApproval = lazy(() => import("./pages/CourseApproval"));
const PlatformAnalytics = lazy(() => import("./pages/PlatformAnalytics"));
const AdminSettings = lazy(() => import("./pages/AdminSettings"));

const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const VerifyCertificate = lazy(() => import("./pages/VerifyCertificate"));
const LabDetails = lazy(() => import("./pages/LabDetails"));

/* AUTH */
import ProtectedRoute from "./routes/ProtectedRoute";

import AnimatedBackground from "./components/AnimatedBackground";
import PageTransition from "./components/PageTransition";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

// Premium centered loading fallback using theme styles
function PageLoader() {
  return (
    <div className="page-spinner-container">
      <div className="page-spinner" />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ========================= */}
        {/* PUBLIC ROUTES */}
        {/* ========================= */}

        <Route
          path="/"
          element={
            <>
              <AnimatedBackground />
              <PageTransition>
                <WelcomePage />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/login"
          element={
            <>
              <AnimatedBackground />
              <PageTransition>
                <LoginPage />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/register"
          element={
            <>
              <AnimatedBackground />
              <PageTransition>
                <RegisterPage />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <>
              <AnimatedBackground />
              <PageTransition>
                <ForgotPasswordPage />
              </PageTransition>
            </>
          }
        />

        <Route
          path="/verify/:certId"
          element={
            <Suspense fallback={<PageLoader />}>
              <>
                <AnimatedBackground />
                <PageTransition>
                  <VerifyCertificate />
                </PageTransition>
              </>
            </Suspense>
          }
        />

        {/* ========================= */}
        {/* STUDENT ROUTES */}
        {/* ========================= */}

        <Route
          path="/student-dashboard"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <StudentDashboard />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/my-courses"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <MyCourses />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/course/:id"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <CourseDetails />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/course/:id/learning"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <VideoLearning />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/course/:id/lab/:labId"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <LabDetails />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/progress"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <ProgressAnalytics />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/certificates"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <Certificates />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="student">
                <PageTransition>
                  <Settings />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* ========================= */}
        {/* INSTRUCTOR ROUTES */}
        {/* ========================= */}

        <Route
          path="/instructor-dashboard"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="instructor">
                <PageTransition>
                  <InstructorDashboard />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/manage-courses"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="instructor">
                <PageTransition>
                  <ManageCourses />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/manage-students"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="instructor">
                <PageTransition>
                  <ManageStudents />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/instructor-analytics"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="instructor">
                <PageTransition>
                  <InstructorAnalytics />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/instructor-settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="instructor">
                <PageTransition>
                  <InstructorSettings />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* ========================= */}
        {/* ADMIN ROUTES */}
        {/* ========================= */}

        <Route
          path="/admin-dashboard"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="admin">
                <PageTransition>
                  <AdminDashboard />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/user-management"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="admin">
                <PageTransition>
                  <UserManagement />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/course-approval"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="admin">
                <PageTransition>
                  <CourseApproval />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/platform-analytics"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="admin">
                <PageTransition>
                  <PlatformAnalytics />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        <Route
          path="/admin-settings"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProtectedRoute role="admin">
                <PageTransition>
                  <AdminSettings />
                </PageTransition>
              </ProtectedRoute>
            </Suspense>
          }
        />

        {/* ========================= */}
        {/* FALLBACK */}
        {/* ========================= */}

        <Route
          path="*"
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;