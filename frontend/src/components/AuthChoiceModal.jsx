// import "./AuthModal.css";

// export default function AuthChoiceModal({ onClose, onLogin, onRegister }) {
//   return (
//     <div className="auth-overlay" onClick={onClose}>
//       <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
//         <h2>Welcome 👋</h2>
//         <p>How would you like to continue?</p>

//         <button className="auth-btn login" onClick={onLogin}>
//           Login
//         </button>

//         <button className="auth-btn register" onClick={onRegister}>
//           Register
//         </button>
//       </div>
//     </div>
//   );
// }

import { createPortal } from "react-dom";
import "./AuthModal.css";

export default function AuthChoiceModal({ onClose, onLogin, onRegister }) {
  return createPortal(
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Welcome 👋</h2>
        <p>How would you like to continue?</p>

        <button
          className="auth-btn login"
          onClick={() => {
            onClose(); // close modal first
            window.location.href = "/auth/login";
          }}
        >
          Login
        </button>

        <button
          className="auth-btn register"
          onClick={() => {
            onClose();
            window.location.href = "/auth/register";
          }}
        >
          Register
        </button>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
}
