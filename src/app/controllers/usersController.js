const Users = require("../models/Users");
const {
  saveValidation,
  findByPkValidation,
} = require("../validators/usersValidator");

exports.save = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await saveValidation(req.body);
    if (all.length > 0) throw all;
    status = 500;
    delete req.body.confirmPassword;
    const user = await (await Users.create(req.body)).toJSON();
    delete user.password;
    status = 200;
    return resp.status(status).json(user);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
exports.findByPk = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await findByPkValidation(req.params);
    if (all.length > 0) throw all;
    status = 403;
    if (params.id !== req.headers["user-id"]) {
      throw new Error({
        error: true,
        message: "User not found",
      });
    }
    status = 500;
    delete req.body.confirmPassword;
    const user = await (await Users.create(req.body)).toJSON();
    delete user.password;
    status = 200;
    return resp.status(status).json(user);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
