import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-brand">
          <h2>MAHADEVAM YOGA STUDIO</h2>
          <p>Balance your body. Calm your mind. Awaken your soul.</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/plans">Plans</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>📍 Dilshad Garden, Delhi</p>
          <p>📞 +91 XXXXX XXXXX</p>
          <p>✉️ mahadevamyoga@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Mahadevam Yoga Studio. All Rights Reserved.
      </div>
    </footer>
  );
}
