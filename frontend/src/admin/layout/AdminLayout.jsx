import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./adminLayout.css";
import "./adminTheme.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-main">
        <Topbar />
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
