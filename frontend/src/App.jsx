import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthChoiceModal from "./components/AuthChoiceModal";

import Home from "./pages/Home";
import Plans from "./inside/Plans";
import Gallery from "./inside/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PlansAdmin from "./admin/pages/PlansAdmin";
import Dashboard from "./admin/pages/Dashboard";
import Members from "./admin/pages/Members";
import UserDashboard from "./pages/UserDashboard";

import Loader from "./components/Loader";

import "react-toastify/dist/ReactToastify.css";

function Layout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [showAuth, setShowAuth] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  // ✅ Check login from backend cookie
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) return setIsLoggedIn(false);

      try {
        const res = await fetch(`${API}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Base cards
  const baseNavItems = [
    {
      label: "About",
      bgColor: "#0f0f1a",
      textColor: "#fff",
      links: [
        { label: "Home", href: "/" },
        { label: "Plans", href: "/plans" },
      ],
    },
    {
      label: "Gallery",
      bgColor: "#151526",
      textColor: "#fff",
      links: [
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
      ],
    },
  ];

  // ✅ User card (only when logged in)
  const userCard = {
    label: "User",
    bgColor: "#0b3d0b",
    textColor: "#fff",
    links: [{ label: "Dashboard", href: "/me" }],
  };

  // ✅ Final items
  const navItems = isLoggedIn ? [...baseNavItems, userCard] : baseNavItems;

  return (
    <>
      {isLoading && <Loader />}

      <ScrollToTop />

      {!isAdminRoute && (
        <Navbar items={navItems} openAuth={() => setShowAuth(true)} />
      )}

      {showAuth && <AuthChoiceModal onClose={() => setShowAuth(false)} />}

      <Routes>
        {/* Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* User Dashboard */}
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute adminOnly={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute adminOnly={true}>
              <PlansAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/members"
          element={
            <ProtectedRoute adminOnly={true}>
              <Members />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}
