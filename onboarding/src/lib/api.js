const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8787";

const request = async (path, { method = "POST", body, headers = {} } = {}) => {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const err = new Error(data.error || data.message || `Request failed (${res.status})`);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
};

export const authAPI = {
  register: (payload) => request("/auth/register", { body: payload }),
  login: (payload) => request("/auth/login", { body: payload }),
  google: (payload) => request("/auth/google", { body: payload }),
  forgotPassword: (payload) => request("/auth/forgot-password", { body: payload }),
  deleteAccount: (payload) =>
    request("/auth/delete-account", {
      body: payload,
      headers: { Authorization: `Bearer ${localStorage.getItem("multydocs_auth_token") || ""}` },
    }),
};
