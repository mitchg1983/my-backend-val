var express = require("express");
var router = express.Router();
const { createUser, userLogin, updateProfile } = require("./controller/userController");
const {
  checkIsEmpty,
  jwtMiddleware,
  validateCreateData,
  validateLoginData,
  validateUpdateData,
} = require("./lib/authMiddleware/index");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create-user", checkIsEmpty, validateCreateData, createUser);

router.post("/login", checkIsEmpty, validateLoginData, userLogin);

router.put("/update-profile", jwtMiddleware, checkIsEmpty, validateUpdateData, updateProfile);
//create a profile route
//post request
//using jwt docs, check if the token is good
//my token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJMZWFoIiwibGFzdE5hbWUiOiJNaXRjaGVsbCIsImVtYWlsIjoibGVhaEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxtaXRjaDA5IiwiaWF0IjoxNjQ1NjM1MTYwLCJleHAiOjE2NDU2NzgzNjB9.LewqnYt6A_nPaKH6pRao4X10IrWmiEbOMHsXTpv-th0"

module.exports = router;
