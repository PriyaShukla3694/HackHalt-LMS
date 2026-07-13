import { MOCK_MODE, handleMockRequest } from "./mockMode";
import { toastEmitter } from "./toastEmitter";

const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

export const authFetch = async (path, options = {}) => {
  try {
    if (MOCK_MODE) {
      // Artificial delay to simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 300));
      const res = await handleMockRequest(path, options);
      if (!res.ok) {
        let errMsg = "Something went wrong";
        try {
          const cloned = res.clone();
          const data = await cloned.json();
          if (data && data.message) errMsg = data.message;
        } catch (_) {}
        toastEmitter.emit(errMsg, "error");
      }
      return res;
    }

    let token = localStorage.getItem("lms_token");
    const headers = {
      ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    let res = await fetch(`${BASE}${path}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      const refreshToken = localStorage.getItem("lms_refresh_token");
      if (refreshToken) {
        try {
          const refreshRes = await fetch(`${BASE}/auth/refresh`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refreshToken }),
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            localStorage.setItem("lms_token", data.token);
            localStorage.setItem("lms_refresh_token", data.refreshToken);

            // Retry the original request with the new access token
            res = await fetch(`${BASE}${path}`, {
              ...options,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.token}`,
                ...options.headers,
              },
            });
          }
        } catch (err) {
          console.error("Token refresh failed:", err);
        }
      }

      if (!res || res.status === 401) {
        // Token refresh failed or no refresh token found — force logout
        localStorage.removeItem("lms_token");
        localStorage.removeItem("lms_refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return res;
      }
    }

    if (!res.ok) {
      let errMsg = "Something went wrong";
      try {
        const cloned = res.clone();
        const data = await cloned.json();
        if (data && data.message) errMsg = data.message;
      } catch (_) {}
      toastEmitter.emit(errMsg, "error");
    }

    return res;
  } catch (err) {
    console.error("Network or execution error in authFetch:", err);
    toastEmitter.emit(err.message || "Something went wrong", "error");
    throw err;
  }
};
