import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import { toast } from "react-toastify";
import "./Login.css";
import { API } from "../api"; // path adjust

export default function Login() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      return toast.error("Please enter email and password");
    }

    try {
      const res = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ⭐ SAVE TOKEN HERE
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        toast.success("Login Successful ✅");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      } else {
        toast.error(data?.message || "Invalid credentials");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <AuthLayout>
      <div className="login-card">
        {/* Stepper */}
        <div className="stepper">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="line" />
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Login to Your Account</h2>
            <p>Select a method to continue</p>

            <button className="google-btn">Continue with Google</button>

            <button className="email-btn" onClick={() => setStep(2)}>
              Continue with Email
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Email Login</h2>

            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={loginUser}>
              Login
            </button>

            <span className="back" onClick={() => setStep(1)}>
              ← Back
            </span>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
