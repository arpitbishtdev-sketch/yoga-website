import Login from "../pages/Login";

export default function LoginModal({ onClose }) {
  return (
    <div className="auth-overlay">
      <div className="auth-modal" style={{ width: "450px" }}>
        <span className="close" onClick={onClose}>
          ✕
        </span>
        <Login />
      </div>
    </div>
  );
}
