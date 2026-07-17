import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Streak tracking helpers
function getTodayDateString() {
  const now = new Date();
  return now.toISOString().split('T')[0]; // YYYY-MM-DD
}

function getYesterdayDateString() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

const AUTH_KEY = "lms_token";
const REFRESH_KEY = "lms_refresh_token";
const USER_KEY = "user";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem(AUTH_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (token && storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (err) {
        console.error("Error parsing stored user:", err);
        return null;
      }
    }
    return null;
  });

  // Login
  const login = (token, refreshToken, userData) => {
    const safeUser = {
      id: userData.id,
      name: userData.name || "",
      email: userData.email || "",
      role: (userData.role || "").toLowerCase(),
      mobile: userData.mobile || "",
    };

    // Streak handling
    const today = getTodayDateString();
    const lastLogin = localStorage.getItem("lms_last_login_date");
    const previousStreak = parseInt(localStorage.getItem("lms_streak_count") || "0");
    let newStreak = 1;
    if (lastLogin === today) {
      // same day login, keep current streak
      newStreak = previousStreak;
    } else if (lastLogin === getYesterdayDateString()) {
      // consecutive day
      newStreak = previousStreak + 1;
    } else {
      // reset streak
      newStreak = 1;
    }
    localStorage.setItem("lms_streak_count", newStreak);
    localStorage.setItem("lms_last_login_date", today);

    localStorage.setItem(AUTH_KEY, token);

    if (refreshToken) {
      localStorage.setItem(REFRESH_KEY, refreshToken);
    }

    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

    setUser(safeUser);
  };

  // Logout
  const logout = async () => {
    const refreshToken = localStorage.getItem(REFRESH_KEY);

    if (refreshToken) {
      try {
        const rawBase =
          import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        const BASE = rawBase.endsWith("/api")
          ? rawBase
          : `${rawBase}/api`;

        await fetch(`${BASE}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        });
      } catch (err) {
        console.error("Logout Error:", err);
      }
    }

    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);

    setUser(null);
  };

  // Update User
  const updateUser = (updatedFields) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        ...updatedFields,
      };

      localStorage.setItem(
        USER_KEY,
        JSON.stringify(updatedUser)
      );

      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);