import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();
const AUTH_KEY = "lms_token";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    const stored = localStorage.getItem("user");

    if (token && stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const login = (token, refreshToken, userData) => {
    const safeUser = {
      id: userData.id,
      name: userData.name || "",
      email: userData.email,
      role: userData.role ? userData.role.toLowerCase() : "",
      mobile: userData.mobile || "",
    };

    localStorage.setItem(AUTH_KEY, token);
    if (refreshToken) {
      localStorage.setItem("lms_refresh_token", refreshToken);
    }
    localStorage.setItem("user", JSON.stringify(safeUser));
    setUser(safeUser);
  };

  const logout = () => {
    const refreshToken = localStorage.getItem("lms_refresh_token");
    if (refreshToken) {
      const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;
      fetch(`${BASE}/auth/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }).catch((err) => console.error("Error during server logout:", err));
    }
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("lms_refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => {
      const updated = { ...prev, ...updatedFields };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);