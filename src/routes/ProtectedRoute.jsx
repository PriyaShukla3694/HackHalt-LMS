import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user.role?.toLowerCase();
  const targetRole = role?.toLowerCase();

  if (targetRole && userRole !== targetRole) {
    if (userRole === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (userRole === "instructor") {
      return <Navigate to="/instructor-dashboard" replace />;
    } else {
      return <Navigate to="/student-dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;