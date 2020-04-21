const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  //tokens are normally sent as the Authorization header
  const token = req.headers.authorization;

  if (token) {
    //verify that the token is valid
    jwt.verify(token, secrets.jwtSecret, (error, decodedToken) => {
      //if everything is good with the token, the error will be undefined
      if (error) {
        res.status(401).json({ you: "cannot pass!!" });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({ message: `You have no token!!!` });
  }
};
