const { Op } = require("sequelize");
const Users = require("../models/Users");
const validator = require("validator").default;

exports.saveValidation = async (body) => {
  let errors = [];

  if (!body.email || !validator.isEmail(body.email))
    errors.push({
      error: true,
      message: "Wrong email",
    });
  const findOne = await Users.findOne({
    where: {
      email: {
        [Op.like]: body.email,
      },
    },
  });
  if (findOne)
    errors.push({
      error: true,
      message: "Email already exists",
    });
  if (
    !body.password ||
    !(String(body.password).length >= 8) ||
    !(String(body.password).length <= 50)
  )
    errors.push({
      error: true,
      message: "Wrong password",
    });
  if (
    !body.confirmPassword ||
    !(String(body.confirmPassword).length >= 8) ||
    !(String(body.confirmPassword).length <= 50)
  )
    errors.push({
      error: true,
      message: "Wrong confirmation password",
    });
  if (body.confirmPassword !== body.password)
    errors.push({
      error: true,
      message: "Passwords don't match",
    });
  return {
    all: [...errors],
    first: errors.shift(),
  };
};

exports.findByPkValidation = async function (params) {
  let errors = [];

  if (!params.id) {
    errors.push({
      error: true,
      message: "Missing id",
    });
  }
  const user = await Users.findByPk(params.id);
  if (!user) {
    errors.push({
      error: true,
      message: "User not found",
    });
  }
  return {
    all: [...errors],
    first: errors.shift(),
  };
};
