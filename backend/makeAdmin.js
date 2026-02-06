require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await User.updateOne(
    { email: "yourgmail@gmail.com" }, // apna email
    { $set: { role: "admin" } },
  );

  console.log("User promoted to admin ✅");
  process.exit();
});
