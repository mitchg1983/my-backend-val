const jwt = require("jsonwebtoken");

const jwtMiddleware = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const tokenCut = req.headers.authorization.substring(7);
      const decodedToken = jwt.verify(tokenCut, process.env.SECRET_KEY);

      res.locals.decodedToken = decodedToken;
      next();
    } else {
      throw { message: "You don't have the right permission." };
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  jwtMiddleware,
};

// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJMZWFoIiwibGFzdE5hbWUiOiJNaXRjaGVsbCIsImVtYWlsIjoibGVhaEBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImxtaXRjaDA5IiwiaWF0IjoxNjQ1NjM1MTYwLCJleHAiOjE2NDU2NzgzNjB9.LewqnYt6A_nPaKH6pRao4X10IrWmiEbOMHsXTpv-th0"
