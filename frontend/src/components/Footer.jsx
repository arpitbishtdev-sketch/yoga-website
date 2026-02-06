import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left */}
        <div className="footer-brand">
          <h2>IRON PARADISE GYM</h2>
          <p>Build strength. Build discipline. Build yourself.</p>
        </div>

        {/* Middle */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="http://localhost:5173/">Home</a>
          <a href="#">Membership</a>
          <a href="http://localhost:5173/gallery">Gallery</a>
          <a href="#">Contact</a>
        </div>

        {/* Right */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>📍 Your City, India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉️ ironparadisegym@gmail.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Iron Paradise Gym. All Rights Reserved.
      </div>
    </footer>
  );
}
