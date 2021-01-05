const usersRoute = require("../app/routes/usersRoute");
const authRoute = require("../app/routes/authRoute");
const profilesRoute = require("../app/routes/profilesRoute");
const locationsRoute = require("../app/routes/locationsRoute");
const stocksRoute = require("../app/routes/stocksRoute");
const productsRoute = require("../app/routes/productsRoute");
const parametersRoute = require("../app/routes/parametersRoute");
const salesRoute = require("../app/routes/salesRoute");

exports.route = (app) => {
  app.use("/users", usersRoute);
  app.use("/auth", authRoute);
  app.use("/profiles", profilesRoute);
  app.use("/locations", locationsRoute);
  app.use("/stocks", stocksRoute);
  app.use("/products", productsRoute);
  app.use("/parameters", parametersRoute);
  app.use("/sales", salesRoute);
};
