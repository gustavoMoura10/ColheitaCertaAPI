const { default: Axios } = require("axios");
const jwt = require("jsonwebtoken");

const io = require("socket.io");
const Users = require("../app/models/Users");
let host = `http://localhost:${process.env.PORT}`;
exports.start = (server) => {
  const socket = io(server);
  socket.use(async (socket, next) => {
    const token = socket.handshake.query.token;
    const jwtToken = token.split(" ")[1];
    if (!jwtToken) {
      return next(new Error("ERROR"));
    } else {
      const result = jwt.decode(jwtToken, process.env.JWT_TOKEN);
      if (result) {
        const user = await Users.findByPk(result.id);
        if (user) {
          return next();
        } else {
          return next(new Error("ERROR"));
        }
      } else {
        return next(new Error("ERROR"));
      }
    }
  });
  socket.on("connection", (client) => {
    client.on("new-sale", (data) => {
      (async () => {
        try {
          console.log(data.requester);
          const request = await Axios.post(
            `${host}/sales/save`,
            {
              totalAmount: data.total,
              typePayment: data.formPayment,
              payed: data.formPayment === "CARTAO_CREDITO",
              comission: data.tax,
              status: "SOLICITADO",
              requesterId: data.requester.location.userId,
              stockId: data.stock.id,
            },
            {
              headers: {
                Authorization: client.handshake.query.token,
              },
            }
          );
          const user = data.stock.user;

          socket.sockets.emit(`${user.id}`, {
            ...request.data,
            action: "save",
          });
        } catch (error) {
          console.log(error);
        }
      })();
    });
    client.on("sale-update", (data) => {
      (async () => {
        try {
          let id = data.id;
          delete data.id;

          const request = await Axios.put(`${host}/sales/update/${id}`, data, {
            headers: {
              Authorization: client.handshake.query.token,
            },
          });
          const sale = request.data;
          console.log(`${sale.requesterId}`);
          socket.sockets.emit(`${sale.requesterId}`, {
            ...request.data,
            action: "update",
          });
        } catch (error) {
          console.log(error);
        }
      })();
    });
    client.on("sale-delete", (data) => {
      (async () => {
        try {
          let id = data.id;

          const request = await Axios.delete(`${host}/sales/delete/${id}`, {
            headers: {
              Authorization: client.handshake.query.token,
            },
          });
          socket.sockets.emit(`${request.data.requesterId}`, {
            ...request.data,
            action: "delete",
          });
        } catch (error) {
          console.log(error);
        }
      })();
    });
  });
};
