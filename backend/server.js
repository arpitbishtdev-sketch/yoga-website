require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Plan = require("./models/Plan");
const Member = require("./models/Member");
const User = require("./models/User");
const Review = require("./models/Review");
const Contact = require("./models/Contact");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const axios = require("axios"); // ⬅️ add at top
const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.OWNER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

/* -------------------- Middlewares -------------------- */

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gym-website-1-ewue.onrender.com",
    ],
    credentials: true,
  }),
);

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    await Contact.create({ name, email, phone, message });

    // 1️⃣ Mail to OWNER
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Iron Paradise Gym",
          email: process.env.OWNER_EMAIL,
        },
        to: [
          {
            email: process.env.OWNER_EMAIL,
            name: "Gym Owner",
          },
        ],
        subject: "New Gym Enquiry Received",
        htmlContent: `
          <h3>New Enquiry</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Message:</b> ${message}</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    // 2️⃣ Auto reply to CLIENT
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Iron Paradise Gym",
          email: process.env.OWNER_EMAIL,
        },
        to: [
          {
            email: email,
            name: name,
          },
        ],
        subject: "Thanks for contacting Iron Paradise Gym",
        htmlContent: `
          <p>Hi ${name},</p>
          <p>We received your enquiry. Our team will contact you shortly.</p>
          <p>– Iron Paradise Gym</p>
        `,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({ success: true });
  } catch (err) {
    console.log(err.response?.data || err.message);
    res.status(500).json({ success: false });
  }
});

/* -------------------- MongoDB Atlas Connection -------------------- */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

/* -------------------- Helper -------------------- */

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

/* -------------------- AUTH APIs -------------------- */

// Register
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hash,
    });

    res.json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login → Cookie based
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid password" });

    const token = createToken(user);

    res.json({
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check auth from cookie
app.get("/api/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ msg: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ role: user.role });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

// Check auth (ProtectedRoute will use)
app.get("/api/check-auth", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ ok: false });

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ ok: true, role: decoded.role });
  } catch {
    res.status(401).json({ ok: false });
  }
});

// Logout
app.post("/api/logout", (req, res) => {
  res.json({ msg: "Logged out" });
});

/* -------------------- PLANS APIs -------------------- */

// Get all plans
app.get("/api/plans", async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a plan (admin)
app.put("/api/plans/:id", async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed plans
app.get("/seed-plans", async (req, res) => {
  await Plan.deleteMany();

  await Plan.insertMany([
    {
      duration: "1 Month",
      boysPrice: 1200,
      girlsPrice: 800,
      couplePrice: 1800,
    },
    {
      duration: "3 Months",
      boysPrice: 3000,
      girlsPrice: 1800,
      couplePrice: 4500,
    },
    {
      duration: "6 Months",
      boysPrice: 5500,
      girlsPrice: 3500,
      couplePrice: 8500,
    },
    {
      duration: "1 Year",
      boysPrice: 10000,
      girlsPrice: 6000,
      couplePrice: 14000,
    },
  ]);

  res.send("Plans Seeded");
});

/* -------------------- MEMBERS APIs -------------------- */

// Get all members
app.get("/api/members", async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add member
app.post("/api/members", authUser, async (req, res) => {
  try {
    const { name, gender, gym, planDuration, planDays, amount } = req.body;

    const newMember = new Member({
      name,
      gender,
      gym,
      planDuration,
      planDays,
      amount,
      userId: req.userId,
      planStart: null,
      planExpiry: null,
      paymentDate: null,
      paymentStatus: "pending",
    });

    await newMember.save();
    res.json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Do payment → plan start
app.put("/api/members/pay/:id", async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ msg: "Member not found" });

    const now = new Date();
    member.paymentStatus = "paid";
    member.paymentDate = now;
    member.planStart = now;
    member.planExpiry = new Date(
      now.getTime() + member.planDays * 24 * 60 * 60 * 1000,
    );

    await member.save();
    res.json({ msg: "Payment done, plan started", member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Seed members
app.get("/seed-members", async (req, res) => {
  await Member.deleteMany();

  await Member.insertMany([
    {
      name: "Rahul",
      gender: "Male",
      gym: "Gym 1",
      planDuration: "3 Months",
      planDays: 90,
      amount: 3000,
      paymentStatus: "pending",
    },
    {
      name: "Priya",
      gender: "Female",
      gym: "Gym 2",
      planDuration: "1 Month",
      planDays: 30,
      amount: 1000,
      paymentStatus: "pending",
    },
  ]);

  res.send("Members Seeded");
});

/* ================= REVIEW + USER MEMBERSHIP APIs ================= */

// Get logged in user's membership
app.get("/api/my-membership", authUser, async (req, res) => {
  const member = await Member.findOne({ userId: req.userId });

  if (!member) return res.status(404).json({ msg: "No membership found" });

  res.json(member);
});

app.post("/api/review", authUser, async (req, res) => {
  const { review } = req.body;

  // check if user has PAID membership
  const member = await Member.findOne({
    userId: req.userId,
    paymentStatus: "paid",
  });

  if (!member) {
    return res
      .status(403)
      .json({ msg: "Only active members can submit review" });
  }

  await Review.create({
    userId: req.userId,
    review,
  });

  res.json({ msg: "Review submitted" });
});

/* -------------------- Server -------------------- */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
