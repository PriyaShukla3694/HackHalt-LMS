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
        } catch (err) {
          console.warn("Failed to parse JSON response for error message", err);
        }
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
            const envelope = await refreshRes.json();
            if (envelope && envelope.success && envelope.data) {
              localStorage.setItem("lms_token", envelope.data.token);
              localStorage.setItem("lms_refresh_token", envelope.data.refreshToken);

              // Retry the original request with the new access token
              res = await fetch(`${BASE}${path}`, {
                ...options,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${envelope.data.token}`,
                  ...options.headers,
                },
              });
            }
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

    let data = null;
    let isSuccess = res.ok;
    let errMsg = "";

    const contentType = res.headers.get("content-type");
    const isJson = contentType && contentType.includes("application/json");

    if (isJson || MOCK_MODE) {
      try {
        const cloned = res.clone();
        data = await cloned.json();
        if (data && typeof data === "object") {
          if ("success" in data) {
            isSuccess = res.ok && data.success;
            if (!isSuccess) {
              errMsg = data.message || "Something went wrong";
            }
          } else {
            isSuccess = res.ok;
          }
        }
      } catch (err) {
        console.warn("Failed to parse JSON response during envelope extraction", err);
        isSuccess = res.ok;
      }
    }

    if (!isSuccess) {
      if (!errMsg) {
        errMsg = "Something went wrong";
        try {
          const cloned = res.clone();
          const rawData = await cloned.json();
          if (rawData && rawData.message) errMsg = rawData.message;
        } catch (err) {
          console.warn("Failed to parse raw JSON error response", err);
        }
      }
      toastEmitter.emit(errMsg, "error");
    }

    const unwrappedData = (data && typeof data === "object" && "success" in data) ? data.data : data;

    return {
      ok: isSuccess,
      status: isSuccess ? res.status : (res.status === 200 ? 400 : res.status),
      statusText: res.statusText,
      headers: res.headers,
      json: async () => unwrappedData,
      clone() {
        return this;
      }
    };
  } catch (err) {
    console.error("Network or execution error in authFetch:", err);
    toastEmitter.emit(err.message || "Something went wrong", "error");
    throw err;
  }
};
