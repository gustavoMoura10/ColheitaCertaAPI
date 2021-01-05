const { Op } = require("sequelize");
const Users = require("../models/Users");
const validator = require("validator").default;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginValidation = async (body) => {
  let errors = [];
  console.log(body)
  if (!body.email || !validator.isEmail(body.email))
    errors.push({
      error: true,
      message: "Wrong email",
    });
  const findOne = await await Users.findOne({
    where: {
      email: {
        [Op.like]: body.email,
      },
    },
  });
  if (!findOne)
    errors.push({
      error: true,
      message: "User not found",
    });
  if (
    !(String(body.password).length >= 8) ||
    !(String(body.password).length <= 50)
  )
    errors.push({
      error: true,
      message: "Wrong email",
    });
  if (findOne) {
    if (!bcrypt.compareSync(body.password, findOne.password))
      errors.push({
        error: true,
        message: "Wrong password",
      });
  }
  return {
    all: [...errors],
    first: errors.shift(),
  };
};
