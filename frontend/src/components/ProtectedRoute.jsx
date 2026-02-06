import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { API } from "../api";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      setIsAllowed(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        setIsAllowed(false);
        setLoading(false);
        return;
      }

      // ✅ ADMIN CHECK HERE
      if (adminOnly && role !== "admin") {
        setIsAllowed(false);
      } else {
        setIsAllowed(true);
      }

      setLoading(false);
    } catch {
      setIsAllowed(false);
      setLoading(false);
    }
  };

  if (loading) return null;

  if (!isAllowed) return <Navigate to="/auth/login" />;

  return children;
}
