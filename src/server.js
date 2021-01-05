const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const middlewares = require("./config/middlewares");
const database = require("./config/database");
const routes = require("./config/routes");
const socket = require("./config/socket");

(async () => {
  try {
    middlewares.config(app);
    const connection = database.getConnection();
    await connection.authenticate();
    routes.route(app);
    app.use((req, resp, next) => {
      resp.json({
        message: "API COLHEITA CERTA",
      });
    });
  } catch (error) {
    app.use((req, resp, next) => {
      resp.status(500).json({ error: "Error on Server" });
    });
    console.log(error);
  }
  const server = app.listen(process.env.PORT, () =>
    console.log(`RUNNING ON PORT:${process.env.PORT}`)
  );
  socket.start(server);
})();
