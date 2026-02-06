const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  duration: {
    type: String, // 1 Month, 3 Months, 6 Months, 1 Year
    required: true,
  },

  boysPrice: {
    type: Number,
    required: true,
  },

  girlsPrice: {
    type: Number,
    required: true,
  },

  couplePrice: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Plan", planSchema);
