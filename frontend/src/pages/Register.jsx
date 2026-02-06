import React, { useState } from "react";
import AuthLayout from "../layout/AuthLayout";
import { toast } from "react-toastify";
import "./Login.css";
import { API } from "../api"; // path adjust

export default function Register() {
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateStep1 = () => {
    if (!name.trim()) return toast.error("Enter your full name");
    if (!email.includes("@") || !email.includes("."))
      return toast.error("Enter a valid email address");

    setStep(2);
  };

  const registerUser = async () => {
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const res = await fetch(`${API}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Account created successfully 🎉");
        setStep(3);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <AuthLayout>
      <div className="login-card">
        <div className="stepper">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="line" />
          <div className={`step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="line" />
          <div className={`step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h2>Create Account</h2>

            <button className="google-btn">Continue with Google</button>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="login-btn" onClick={validateStep1}>
              Next
            </button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h2>Set Password</h2>

            <input
              type="password"
              placeholder="Create Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button className="login-btn" onClick={registerUser}>
              Register
            </button>

            <span className="back" onClick={() => setStep(1)}>
              ← Back
            </span>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h2>🎉 Account Created!</h2>
            <p>You can now login to your account</p>

            <button
              className="login-btn"
              onClick={() => (window.location.href = "/auth/login")}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
