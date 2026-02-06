import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthChoiceModal from "../components/AuthChoiceModal";
import "./Home.css";
import RotatingText from "../components/RotatingText";
import WhatWeOffer from "./WhatWeOffer";
import ScrollVelocity from "../components/ScrollVelocity";
import "../components/ScrollVelocity.css";

import Membership from "./Membership";
import CardSwap, { Card } from "../components/CardSwap";
import ScrollReveal from "../components/ScrollReveal";
import CountUp from "../components/CountUp";
import EnquiryCTA from "../components/EnquiryCTA";

import gbImg from "../assets/gb.png";
import card1 from "../assets/swapcard/card1.jpg";
import card2 from "../assets/swapcard/card2.png";
import card3 from "../assets/swapcard/card3.avif";

import logoImg from "../assets/memb/logo.png";

import gymIcon from "../assets/Countup/gym (1).png";
import trainerIcon from "../assets/Countup/trainer.png";
import certIcon from "../assets/Countup/certificate.png";

import { API } from "../api"; // path adjust

function Home() {
  const [showChoice, setShowChoice] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    checkAuth();

    const onFocus = () => checkAuth(); // jab page pe wapas aao
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleHeroButtonClick = () => {
    if (!isLoggedIn) {
      setShowChoice(true);
    } else {
      navigate("/plans");
    }
  };

  return (
    <>
      <section className="home">
        <div
          className="hero"
          style={{
            backgroundImage: `url(${gbImg})`,

            backgroundSize: "cover",

            backgroundPosition: "center",

            position: "relative",

            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(99, 94, 94, 0.45)",
              borderRadius: "inherit",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 className="hero-title">
              Transform{" "}
              <span className="rotate-box">
                <RotatingText
                  texts={["Your Mind 🧘", "Your Breath 🌿", "Your Balance 🪷"]}
                />
              </span>
            </h1>

            <p style={{ color: "#4A90E2" }}>
              Experience calm, balance and strength through guided yoga
              sessions.
            </p>

            <button className="join-btn" onClick={handleHeroButtonClick}>
              {isLoggedIn ? "View Plans" : "Join Now"}
            </button>
          </div>
        </div>
      </section>

      <WhatWeOffer />

      <Membership />
      <ScrollVelocity
        texts={[
          <>
            <span className="ip-highlight">• MAHADEVAM YOGA</span> STUDIO
          </>,
          "• BREATHE • BALANCE • FLOW",
        ]}
        velocity={100}
        className="custom-scroll-text"
      />

      <section className="experience-section">
        <div className="experience-left">
          <h1>Why Students Love Practicing Here</h1>

          <p>
            More than a gym — this is a place where discipline, energy and
            transformation live every day.
          </p>

          <ul>
            <li>✔️ Peaceful and welcoming environment</li>
            <li>✔️ Certified yoga instructors</li>
            <li>✔️ Clean and calming studio</li>
            <li>✔️ Community focused practice</li>
          </ul>
        </div>

        <div className="experience-right cardswap-wrapper">
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={3000}
            pauseOnHover={false}
          >
            <Card>
              <img src={card1} alt="" className="swap-img" />
            </Card>

            <Card>
              <img src={card2} alt="" className="swap-img" />
            </Card>

            <Card>
              <img src={card3} alt="" className="swap-img" />
            </Card>
          </CardSwap>
        </div>
      </section>

      <section className="stats-section">
        {/* LEFT LOGO */}
        <div className="stats-left">
          <img src={logoImg} alt="Gym Logo" className="stats-logo" />
        </div>

        {/* RIGHT STATS */}
        <div className="stats-right">
          <div className="stat-box">
            <div className="stat-top">
              <img src={gymIcon} className="stat-icon" alt="Members icon" />
              <div className="stat-number">
                <CountUp to={500} />
                <span className="plus">+</span>
              </div>
            </div>
            <div className="stat-label">Active Members</div>
          </div>

          <div className="stat-box">
            <div className="stat-top">
              <img src={trainerIcon} className="stat-icon" alt="Trainer icon" />
              <div className="stat-number">
                <CountUp to={12} />
              </div>
            </div>
            <div className="stat-label">Expert Trainers</div>
          </div>

          <div className="stat-box">
            <div className="stat-top">
              <img
                src={certIcon}
                className="stat-icon"
                alt="Certificate icon"
              />
              <div className="stat-number">
                <CountUp to={8} />
              </div>
            </div>
            <div className="stat-label">Years of Excellence</div>
          </div>
        </div>
      </section>

      <ScrollReveal
        baseOpacity={0.1}
        enableBlur
        baseRotation={2}
        blurStrength={20}
      >
        <div>
          <EnquiryCTA />
        </div>
      </ScrollReveal>

      {showChoice && (
        <AuthChoiceModal
          onClose={() => setShowChoice(false)}
          onLogin={() => {
            setShowChoice(false);
            navigate("/auth/login");
          }}
          onRegister={() => {
            setShowChoice(false);
            navigate("/auth/register");
          }}
        />
      )}
    </>
  );
}

export default Home;
