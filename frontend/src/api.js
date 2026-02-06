export const API = import.meta.env.VITE_API_URL;

export const apiFetch = (url, options = {}) => {
  const token = localStorage.getItem("token");

  return fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
};
