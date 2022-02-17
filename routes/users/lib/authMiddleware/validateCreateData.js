const {
  isAlpha,
  isAlphanumeric,
  isEmail,
  isStrongPassword,
} = require("validator");

function validateCreateData(req, res, next) {
  let errObj = {};
  const { firstName, lastName, username, email, password } = req.body;

  if (!isAlpha(firstName)) {
    errObj.firstName = `Firstname cannot be numbers`;
  }
  if (!isAlpha(lastName)) {
    errObj.lastName = `Lastname cannot be numbers`;
  }
  if (!isAlphanumeric(username)) {
    errObj.username = `Username cannot be special chars`;
  }
  if (!isEmail(email)) {
    errObj.email = "Email invalid.";
  }
  if (!isStrongPassword(password)) {
    errObj.password =
      "Password Invalid - must be 8 characters long, contain one lowercase, one uppercase, one number & one special character.";
  }

  let checkObj = Object.keys(errObj);
  if (checkObj.length > 0) {
    return res.status(500).json({
      message: "Error!",
      error: errObj,
    });
  } else {
    next();
  }
}

module.exports = {
  validateCreateData,
};
