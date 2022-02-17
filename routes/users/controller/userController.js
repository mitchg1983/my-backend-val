const User = require("../model/User");

const checkCharNum = (str) => {
  if (str.match(/[!`\-_=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
    return true;
  } else return false;
};

const checkCharSpace = (str) => {
  return str.match(/[\s!`\-_=@#$%^&*()\[\],.?":;{}|<>]/g);
};

const checkEmail = (str) => {
  return str.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/g);
};

const passwordChecker = (str) => {
  return str.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g
  );
};

const checkIfEmpty = (obj) => {
    for (let kee in obj) {
        console.log(obj[kee]);
    }
}


const createUser = async (req, res, next) => {
  try {
    let errObj = {};

    checkIfEmpty(req.body);

    const { firstName, lastName, username, email, password } = req.body;




    if (checkCharNum(firstName)) {
      errObj.firstName =
        "First name should only have letters, no special characters or numbers.";
    }
    if (checkCharNum(lastName)) {
      errObj.lastName =
        "Last name should only have letters, no special characters or numbers.";
    }
    if (checkCharSpace(username)) {
      errObj.username =
        "Username should only have letters, no special characters or numbers.";
    }
    if (!checkEmail(email)) {
      errObj.email = "Email invalid.";
    }
    if (!passwordChecker(password)) {
      errObj.password =
        "Password Invalid - must be 8 characters long, contain one lowercase, one uppercase, one number & one special character.";
    }

    let checkObj = Object.keys(errObj);
    if (checkObj.length > 0) {
      return res.json(errObj);
    }

    res.status(200).json(firstName);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUser,
};
