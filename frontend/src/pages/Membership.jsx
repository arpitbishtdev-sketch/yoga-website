import React from "react";
import "./Membership.css";
import { useNavigate } from "react-router-dom";
import man from "../assets/memb/logo.png";

export default function Membership() {
  const navigate = useNavigate();

  return (
    <section className="membership-section">
      <div className="membership-card">
        {/* LEFT */}
        <div className="membership-left">
          <h1>Choose Your Yoga Practice Plan</h1>
          <p>
            Practice at your own pace. Flexible class plans, calm environment,
            and guidance for balance, breath and mindfulness.
          </p>

          <button className="join-btn" onClick={() => navigate("/plans")}>
            Join Now
          </button>
        </div>

        {/* RIGHT */}
        <div className="membership-right">
          <img src={man} alt="gym" />
        </div>
      </div>
    </section>
  );
}
