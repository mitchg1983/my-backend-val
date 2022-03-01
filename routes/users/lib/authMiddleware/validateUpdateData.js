const {
    isAlpha,
    isAlphanumeric,
    isStrongPassword,
  } = require("validator");
  
  function validateUpdateData(req, res, next) {
    let errObj = {};
    const { firstName, lastName, username, password, confirmPassword } = req.body;
  
    if (!isAlpha(firstName)) {
      errObj.firstName = `Firstname cannot be numbers`;
    }
    if (!isAlpha(lastName)) {
      errObj.lastName = `Lastname cannot be numbers`;
    }
    if (!isAlphanumeric(username)) {
      errObj.username = `Username cannot be special chars`;
    }
    if (!isStrongPassword(password)) {
      errObj.password =
        "Password Invalid - must be 8 characters long, contain one lowercase, one uppercase, one number & one special character.";
    }
    if (password !== confirmPassword) {
        errObj.confirmPassword = "Password & confirmation do not match."
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
    validateUpdateData,
  };
  