const { Op } = require("sequelize");
const Locations = require("../models/Locations");
const Products = require("../models/Products");
const Profiles = require("../models/Profiles");
const Sales = require("../models/Sales");
const Stocks = require("../models/Stocks");
const Users = require("../models/Users");
const moment = require("moment");
const {
  saveValidation,
  updateValidation,
  deleteValidation,
} = require("../validators/salesValidator");
const defaultSkip = 10;
exports.save = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await saveValidation(req.body);
    if (all.length > 0) throw all;
    status = 500;
    console.log(moment().format("YYYY-MM-DD hh:mm:ss").split("+")[0].trim());
    const sale = await (
      await Sales.create({
        ...req.body,
        insertionDate: moment()
          .format("YYYY-MM-DD hh:mm:ss")
          .split("+")[0]
          .trim(),
        updated: moment().format("YYYY-MM-DD hh:mm:ss").split("+")[0].trim(),
      })
    ).toJSON();
    status = 200;
    return resp.status(status).json(sale);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};

exports.findAll = async (req, resp, next) => {
  let status = 400;
  try {
    const id = req.headers["user-id"];
    const type = req.headers["user-type"];
    status = 500;
    const conditions = {};
    if (req.query.page) {
      conditions["offset"] = (req.query.page - 1) * defaultSkip;
      conditions["limit"] = req.query.page * defaultSkip;
    }
    let { rows, count } = await Sales.findAndCountAll({
      include: [
        {
          model: Stocks,
          as: "stock",
          where:
            type === "PRODUTOR"
              ? {
                  userId: {
                    [Op.eq]: id,
                  },
                }
              : {},
          include: [
            {
              model: Products,
              as: "product",
            },
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
              as: "user",
              include: [
                {
                  as: "location",
                  model: Locations,
                },
                {
                  as: "profile",
                  model: Profiles,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
          as: "requester",
          include: [
            {
              as: "location",
              model: Locations,
            },
            {
              as: "profile",
              model: Profiles,
            },
          ],
        },
      ],
      where:
        type === "CLIENTE"
          ? {
              requesterId: {
                [Op.eq]: id,
              },
            }
          : {},
      ...conditions,
    });
    status = 200;
    return resp.status(status).json({
      count: count / defaultSkip,
      sales: rows,
    });
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};

exports.update = async (req, resp, next) => {
  let status = 400;
  try {
    const id = req.headers["user-id"];
    const { all } = await updateValidation(req.body, req.params, id);
    if (all.length > 0) throw all;
    status = 500;
    let sale = await (
      await (await Sales.findByPk(req.params.id)).update({
        ...req.body,
        updated: moment().format("YYYY-MM-DD hh:mm:ss").split("+")[0].trim(),
      })
    ).toJSON();
    sale = await Sales.findByPk(sale.id, {

      include: [
        {
          model: Stocks,
          as: "stock",
          include: [
            {
              model: Products,
              as: "product",
            },
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
              as: "user",
              include: [
                {
                  as: "location",
                  model: Locations,
                },
                {
                  as: "profile",
                  model: Profiles,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
          as: "requester",
          include: [
            {
              as: "location",
              model: Locations,
            },
            {
              as: "profile",
              model: Profiles,
            },
          ],
        },
      ],
    });
    status = 200;
    return resp.status(status).json(sale);
  } catch (error) {
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
exports.remove = async (req, resp, next) => {
  let status = 400;
  try {
    const id = req.headers["user-id"];
    const { all } = await deleteValidation(req.params, id);
    if (all.length > 0) throw all;
    status = 500;
    let saleAllInfo = await Sales.findByPk(req.params.id, {

      include: [
        {
          model: Stocks,
          as: "stock",
          include: [
            {
              model: Products,
              as: "product",
            },
            {
              model: Users,
              attributes: {
                exclude: ["password"],
              },
              as: "user",
              include: [
                {
                  as: "location",
                  model: Locations,
                },
                {
                  as: "profile",
                  model: Profiles,
                },
              ],
            },
          ],
        },
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
          as: "requester",
          include: [
            {
              as: "location",
              model: Locations,
            },
            {
              as: "profile",
              model: Profiles,
            },
          ],
        },
      ],
    });
    const sale = 
      await Sales.destroy({
        where: {
          id: {
            [Op.eq]: req.params.id,
          },
        },
      })
    status = 200;
    return resp.status(status).json(saleAllInfo);
  } catch (error) {
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
