const User = require("../model/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res, next) => {
  try {
    let errObj = {};
    const { firstName, lastName, username, email, password } = req.body;

    let checkObj = Object.keys(errObj);
    if (checkObj.length > 0) {
      return res.json(errObj);
    }

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    let newUser = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword,
    });

    let savedUser = await newUser.save();

    res.status(200).json({
      message: "New user saved.",
      payload: savedUser,
    });
  } catch (error) {
    if (error.code === 11000) {
      let errorKey = Object.keys(error.keyValue);
      let errorVal = Object.values(error.keyValue);

      return res.status(500).json({
        message: "Error",
        error: `This ${errorKey}, ${errorVal}, is already in use!`,
      });
    }
    res.status(500).json(error);
  }
};

const userLogin = async (req, res) => {
  try {

    res.send("hello from login");
    const { email, password } = req.body;
    console.log(req.body);
  } catch (error) {
    res.status(500).json({ error: error })
  }
};

module.exports = {
  createUser,
  userLogin,
};
