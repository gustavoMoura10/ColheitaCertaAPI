const Users = require("../models/Users");
const validator = require("validator");
const jwt = require("jsonwebtoken");

exports.auth = async (req, resp, next) => {
  let status = 401;
  try {
    let auth = req.headers["authorization"] || req.headers["Authorization"];
    if (!auth)
      throw {
        error: true,
        message: "Authorization missing",
      };
    if (String(auth).split(" ").length === 0)
      throw {
        error: true,
        message: "Wrong authorization token",
      };
    const firstPart = String(auth).split(" ").shift();
    const token = String(auth).split(" ").pop();
    if (firstPart.toLowerCase() !== "bearer")
      throw {
        error: true,
        message: "Missing bearer",
      };
    if (!validator.isJWT(token))
      throw {
        error: true,
        message: "Token is not JWT",
      };
    const verify = jwt.verify(token, process.env.JWT_TOKEN);
    if (!verify)
      throw {
        error: true,
        message: "Wrong token",
      };
    const user = await Users.findByPk(verify.id);
    if (!user)
      throw {
        error: true,
        message: "Token with missing user",
      };
    req.headers["user-id"] = user.id;
    req.headers["user-type"] = user.type;
    next();
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};

exports.notProducer = async (req, resp, next) => {
  let status = 401;
  try {
    if (req.headers["user-type"] !== "PRODUTOR") {
      throw new Error("Wrong type of user");
    }
    next();
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
exports.notClient = async (req, resp, next) => {
  let status = 401;
  try {
    if (req.headers["user-type"] !== "CLIENTE") {
      throw new Error("Wrong type of user");
    }
    next();
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
