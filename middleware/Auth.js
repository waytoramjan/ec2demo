require("dotenv").config();

const { User } = require("../models");
const jwt = require("jsonwebtoken");

const isAuthenticate = async (request, response, next) => {
  const bearerHeader = request.headers["authorization"];
  request.timezone = request.headers["timezone"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    jwt.verify(bearerToken, process.env.SECRET_KEY, async (err, decode) => {
      if (err) {
        return response.status(403).json({
          msg: "You have no authorization to access this property.",
        });
      }
      const userData = await User.findByPk(decode.id);
      request.userId = userData.id;
      next();
    });
  } else {
    response.status(403).json({
      msg: "You have no authorization to access this property.",
    });
  }
};

module.exports = isAuthenticate;
