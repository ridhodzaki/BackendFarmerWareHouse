const jwt = require("jsonwebtoken");
const userModel = require("../model/User")
const { requestResponse } = require('../config/Message')

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.headers["x-access-token"];
  const email =
    req.headers["email"];

  if (!token) {
    return res.status(403).send(requestResponse.gagal("A token is required for authentication"));
  }
  new Promise((resolve, reject) => {
    userModel.findOne({ email: email })
      .then((user) => {
        console.log(user)
        if (user && user.token === token && user.level === 1) {
          try {
            const decoded = jwt.verify(token, config.TOKEN_KEY);
            req.user = decoded;
          } catch (err) {
            console.log(err)
            return res.status(200).send("invalid token")
          }
          return next();
        } else {
          return res.status(401).send(requestResponse.gagal("A token is not defined"))
        }
      })
  })
};

module.exports = verifyToken;