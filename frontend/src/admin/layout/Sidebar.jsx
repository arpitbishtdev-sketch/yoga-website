import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./adminTheme.css";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Plans", path: "/admin/plans", icon: "💳" },
    { name: "Members", path: "/admin/members", icon: "👥" },
    { name: "Back to Website", path: "/", icon: "🌐" },
  ];

  return (
    <div className="sidebar-modern">
      <div className="sidebar-logo">GYM Admin</div>

      <div className="sidebar-links">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`sidebar-link ${
              location.pathname === link.path ? "active" : ""
            }`}
          >
            <span className="icon">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
