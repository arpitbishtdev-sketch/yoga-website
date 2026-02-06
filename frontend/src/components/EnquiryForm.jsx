import { useState } from "react";
import axios from "axios";
import { API } from "../api";
import { toast } from "react-toastify";
import "./EnquiryForm.css";

export default function EnquiryForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/contact`, {
        name: form.firstName + " " + form.lastName,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      toast.success("Enquiry sent! We will contact you soon 💪");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <h2>Send us a message</h2>
      <p style={{ color: "#666", marginBottom: "10px" }}>
        Have questions about memberships or classes? We’re here to help.
      </p>

      <div className="row">
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <input
        name="email"
        placeholder="Email address"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone number"
        value={form.phone}
        onChange={handleChange}
        required
      />

      <textarea
        name="message"
        placeholder="Type your message here..."
        rows={5}
        value={form.message}
        onChange={handleChange}
      />

      <button type="submit">Send Message</button>
    </form>
  );
}
