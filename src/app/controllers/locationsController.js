const moment = require("moment");
const { Op } = require("sequelize");
const Locations = require("../models/Locations");
const Users = require("../models/Users");
const {
  locationCoordinates,
  locationsDistance,
} = require("../services/bingService");
const {
  saveValidation,
  distanceValidation,
} = require("../validators/locationsValidator");

exports.save = async (req, resp, next) => {
  let status = 400;
  try {
    const { all } = await saveValidation(req.body, req.headers["user-id"]);
    if (all.length > 0) throw all;
    status = 500;
    req.body.userId = req.headers["user-id"];
    const location = await Locations.create(req.body);
    status = 200;
    return resp.status(status).json(location);
  } catch (error) {
    console.log(error);
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};

exports.distance = async (req, resp, next) => {
  let status = 400;
  try {
    let userId = req.headers["user-id"];
    const { all } = await distanceValidation(req.params);
    if (all.length > 0) throw all;
    status = 500;
    const locationRequester = await (
      await Locations.findOne({
        where: {
          userId: {
            [Op.eq]: userId,
          },
        },
      })
    ).toJSON();
    const locationUser = await (
      await Locations.findOne({
        where: {
          userId: {
            [Op.eq]: req.params.id,
          },
        },
      })
    ).toJSON();
    const coordinatesRequester = await locationCoordinates(locationRequester);
    const coordinatesUser = await locationCoordinates(locationUser);
    const distance = await locationsDistance(
      coordinatesRequester,
      coordinatesUser
    );
    status = 200;
    return resp.status(status).json({ distance });
  } catch (error) {
    return resp
      .status(status)
      .send(
        status === 500 ? { error: true, message: "Error in Server" } : error
      );
  }
};
