const { Op } = require("sequelize");
const Stocks = require("../models/Stocks");
const { ImageKit } = require("../../config/imageKit");
const moment = require("moment");
const Users = require("../models/Users");
const Locations = require("../models/Locations");
const Profiles = require("../models/Profiles");
const Products = require("../models/Products");
const {
  saveValidation,
  deleteValidation,
} = require("../validators/stocksValidator");
const { default: Axios } = require("axios");
const {
  locationCoordinates,
  locationsDistance,
} = require("../services/bingService");
const Sales = require("../models/Sales");
const defaultSkip = 10;
exports.findAll = async (req, resp, next) => {
  let status = 400;
  try {
    status = 500;
    let userId = req.headers["user-id"];
    let userType = req.headers["user-type"];
    let and = [];
    if (userType === "PRODUTOR") {
      and.push({
        userId: {
          [Op.eq]: userId,
        },
      });
    }

    if (req.query.productId && Number(req.query.productId)) {
      let productId = {
        [Op.eq]: Number(req.query.productId),
      };
      and.push({ productId });
    }
    if (req.query.minValue && Number(req.query.minValue) > 0) {
      let value = {
        [Op.gte]: Number(req.query.minValue),
      };
      and.push({ value });
    }
    if (req.query.maxValue && Number(req.query.maxValue) > 0) {
      let value = {
        [Op.lte]: Number(req.query.maxValue),
      };
      and.push({ value });
    }
    if (
      req.query.distance &&
      Number(req.query.distance) > 0 &&
      userType === "CLIENTE"
    ) {
      const locations = await Locations.findAll({
        include: [
          {
            model: Users,
            as: "user",
            where: { type: { [Op.eq]: "PRODUTOR" } },
          },
        ],
      });
      const locationUser = await (
        await Locations.findOne({
          where: {
            userId: {
              [Op.eq]: userId,
            },
          },
        })
      ).toJSON();
      let userPosition = await locationCoordinates(locationUser);
      let ids = [];
      for (let l of locations) {
        let toJson = await l.toJSON();
        let locationPosition = await locationCoordinates(toJson);
        let distance = await locationsDistance(userPosition, locationPosition);
        if (distance <= Number(req.query.distance)) {
          ids.push(toJson.id);
        }
      }
      if (ids.length > 0) {
        and.push({
          userId: {
            [Op.in]: ids,
          },
        });
      } else {
        and.push({
          userId: {
            [Op.eq]: null,
          },
        });
      }
    }
    const conditions = {
      where: { [Op.and]: and },
    };
    if (req.query.page) {
      conditions["offset"] = (req.query.page - 1) * defaultSkip;
      conditions["limit"] = req.query.page * defaultSkip;
    }
    let { rows, count } = await Stocks.findAndCountAll({
      ...conditions,
      order: [["id", "DESC"]],
      include: [
        {
          model: Users,
          as: "user",
          attributes: ["email", "type"],
          include: [
            { model: Locations, as: "location" },
            { model: Profiles, as: "profile" },
            {
              model: Sales,
              required: false,
              as: "sales",
              where: {
                payed: {
                  [Op.eq]: false,
                },
              },
            },
          ],
        },
        {
          model: Products,
          as: "product",
        },
      ],
    });
    status = 200;
    return resp.status(status).json({
      count: count / defaultSkip,
      stocks: rows,
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

exports.save = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await saveValidation(req.body);
    if (all.length > 0) throw all;
    status = 500;
    let defaultImage =
      "https://ik.imagekit.io/hmtqyxcegz/placeholder-image_7WA6LPpZp.png";
    if (req.body.image.mime && req.body.image.data) {
      let extension = req.body.image.mime.split("/").pop();
      const image = await ImageKit.upload({
        file: req.body.image.data, //required
        fileName: `${
          req.headers["user-id"]
        }_stock_${new Date().getTime()}.${extension}`, //required
      });
      req.body.image = image.url;
    } else {
      req.body.image = defaultImage;
    }
    req.body.expirationDate = moment(
      req.body.expirationDate,
      "DD/MM/YYYY"
    ).toDate();
    req.body.insertionDate = moment().toDate();
    req.body.userId = req.headers["user-id"];

    const stock = await (await Stocks.create(req.body)).toJSON();
    status = 200;
    return resp.status(status).json(stock);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};

exports.deleteById = async (req, resp, next) => {
  let status = 400;
  console.log(req.params);
  try {
    const { all } = await deleteValidation(req.params);
    if (all.length > 0) throw all;
    status = 403;
    let stock = await Stocks.findByPk(req.params.id);
    if (stock.userId !== req.headers["user-id"]) {
      throw new Error({
        error: true,
        message: "Not allowed to do this operation",
      });
    }
    stock = await stock.destroy({
      where: {
        id: {
          [Op.eq]: req.params.id,
        },
      },
    });
    status = 200;
    return resp.status(status).json(stock);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
