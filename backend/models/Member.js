const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },

  gym: {
    type: String,
    enum: ["Gym 1", "Gym 2"],
    required: true,
  },

  //   plan kitne din ka hai (expiry ke liye best)
  planDays: {
    type: Number, // 30 | 90 | 180 | 365
    required: true,
  },

  //   plan tab tak start nahi hoga jab tak payment nahi hota
  planStart: {
    type: Date,
    default: null,
  },

  planExpiry: {
    type: Date,
    default: null,
  },

  paymentDate: {
    type: Date,
    default: null,
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },

  amount: {
    type: Number,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Member", memberSchema);
