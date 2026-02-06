import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import AuthChoiceModal from "./AuthChoiceModal";
import LoginModal from "./LoginModal";
import { GoArrowUpRight } from "react-icons/go";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { API, apiFetch } from "../api";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  const [showChoice, setShowChoice] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

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

  // initial hidden state
  useLayoutEffect(() => {
    gsap.set(navRef.current, { height: 60 });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });
  }, []);

  const toggleMenu = () => {
    const nav = navRef.current;

    if (!open) {
      nav.style.height = "auto";
      const fullHeight = nav.scrollHeight;
      nav.style.height = "60px";

      gsap.to(nav, {
        height: fullHeight,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.to(cardsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
      });
    } else {
      gsap.to(nav, {
        height: 60,
        duration: 0.35,
        ease: "power3.in",
      });

      gsap.to(cardsRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.25,
      });
    }

    setOpen(!open);
  };

  const handleJoinClick = () => {
    if (!isLoggedIn) setShowChoice(true);
    else navigate("/join");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  // ✅ NAV ITEMS YAHI BANENGE (login ke basis pe)
  const dynamicItems = [
    {
      label: "About",
      bgColor: "#0b1220",
      textColor: "white",
      links: [
        { label: "Plans", href: "/plans" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      label: "Enquiry",
      bgColor: "#0b1220",
      textColor: "white",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "Membership Plans", href: "/plans" },
      ],
    },
  ];

  if (isLoggedIn) {
    dynamicItems.push({
      label: "User",
      bgColor: "#0b1220",
      textColor: "white",
      links: [
        { label: "Dashboard", href: "/me" },
        { label: "Logout", action: "logout" },
      ],
    });
  }

  return (
    <div className="card-nav-container">
      <nav ref={navRef} className={`card-nav ${open ? "open" : ""}`}>
        <div className="card-nav-top">
          <div className="hamburger-menu" onClick={toggleMenu}>
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <Link to="/" className="logo-container">
            <h2>MAHADEVAM YOGA STUDIO</h2>
          </Link>

          {!isLoggedIn ? (
            <button className="card-nav-cta-button" onClick={handleJoinClick}>
              Join Now
            </button>
          ) : (
            <button className="card-nav-cta-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        <div className="card-nav-content">
          {dynamicItems.map((item, i) => (
            <div
              key={i}
              className="nav-card"
              ref={(el) => (cardsRef.current[i] = el)}
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor,
              }}
            >
              <div className="nav-card-label">{item.label}</div>

              <div className="nav-card-links">
                {item.links.map((l, j) =>
                  l.action === "logout" ? (
                    <div
                      key={j}
                      className="nav-card-link"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <GoArrowUpRight />
                      {l.label}
                    </div>
                  ) : (
                    <Link key={j} to={l.href} className="nav-card-link">
                      <GoArrowUpRight />
                      {l.label}
                    </Link>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {showChoice && (
        <AuthChoiceModal
          onClose={() => setShowChoice(false)}
          onLogin={() => {
            setShowChoice(false);
            setShowLogin(true);
          }}
          onRegister={() => {
            setShowChoice(false);
            navigate("/auth/register");
          }}
        />
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default Navbar;
