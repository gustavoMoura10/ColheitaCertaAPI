const Parameters = require("../models/Parameters");
const { saveValidation } = require("../validators/parametersValidator");

exports.findAll = async (req, resp, next) => {
  let status = 400;
  try {
    status = 500;
    const parameters = await Parameters.findAll();
    status = 200;
    return resp.status(status).json(parameters);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
exports.save = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await saveValidation(req.body);
    if (all.length > 0) throw all;
    status = 500;
    const parameters = await (await Parameters.create(req.body)).toJSON();
    status = 200;
    return resp.status(status).json(parameters);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
