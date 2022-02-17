const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {type: String, unique: true},
    username: {type: String, unique: true},
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);

//we want in the schema...
//firstName
//lastName
//email
//username
//password
