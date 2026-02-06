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
          <h1>Choose Your Perfect Membership</h1>
          <p>
            Train solo or with your partner. Flexible plans, premium equipment,
            and an environment built for real transformation.
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
