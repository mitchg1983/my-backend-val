const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,

    orderHistory: [{ type: mongoose.Schema.ObjectId, ref: "order" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
