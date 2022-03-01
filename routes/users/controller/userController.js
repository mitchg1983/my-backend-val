const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../utils/errorHandler");

const getCurrentUser = async (req, res) => {
  try {

    console.log(res.locals)

    const { decodedToken } = res.locals;

    // console.log(decodedToken);

    const foundUser = await User.findOne({
      email: decodedToken.email,
    }).populate("orderHistory", "-orderOwner -__v");

    // console.log(foundUser);

    res
      .status(200)
      .json({ message: "Hello from getCurrentUser", payload: foundUser });
  } catch (error) {
    res.status(500).json({ error: errorHandler(error) });
  }
};

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
    // if (error.code === 11000) {
    //   let errorKey = Object.keys(error.keyValue);
    //   let errorVal = Object.values(error.keyValue);

    //   return res.status(500).json({
    //     message: "Error",
    //     error: `This ${errorKey}, ${errorVal}, is already in use!`,
    //   });
    // }
    res.status(500).json({ error: errorHandler(error) });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log("hello from userLogin");

    if (foundUser === null) throw { message: "Email not found" };

    const comparedPassword = await bcrypt.compare(password, foundUser.password);

    if (!comparedPassword) throw { message: "Email & Password do not match" };

    const jwtToken = jwt.sign(
      {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
        username: foundUser.username,
      },
      process.env.SECRET_KEY,
      { expiresIn: "12h" }
    );

    res.status(200).json({ payload: jwtToken });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateProfile = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashedPassword;
    const updatedUser = await User.findOneAndUpdate(
      { email: decodedToken.email },
      req.body,
      { new: true }
    );

    res.status(200).json({ message: "updatedUser", payload: updatedUser });
  } catch (error) {
    res.status(500).json({ error: errorHandler(error) });
  }
};

//create a jwt middlware
//check the token, if good, move on to next middleware
//if not good, catch error and say they need to log-in

module.exports = {
  createUser,
  userLogin,
  updateProfile,
  getCurrentUser,
};
