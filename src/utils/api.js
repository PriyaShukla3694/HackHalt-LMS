const rawBase = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const BASE = rawBase.endsWith("/api") ? rawBase : `${rawBase}/api`;

export const authFetch = async (path, options = {}) => {
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
          return res;
        }
      } catch (err) {
        console.error("Token refresh failed:", err);
      }
    }

    // Token refresh failed or no refresh token found — force logout
    localStorage.removeItem("lms_token");
    localStorage.removeItem("lms_refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return res;
};
