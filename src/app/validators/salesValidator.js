const Sales = require("../models/Sales");
const Stocks = require("../models/Stocks");
const Users = require("../models/Users");

exports.saveValidation = async (body) => {
  let errors = [];

  if (!body.totalAmount || typeof body.totalAmount !== "number")
    errors.push({
      error: true,
      message: "Wrong total amount",
    });
  if (!body.typePayment || typeof body.typePayment !== "string")
    errors.push({
      error: true,
      message: "Wrong type payment",
    });
  if (
    body.payed === null ||
    body.payed === undefined ||
    typeof body.payed !== "boolean"
  )
    errors.push({
      error: true,
      message: "Wrong payed",
    });
  if (!body.comission || typeof body.comission !== "number")
    errors.push({
      error: true,
      message: "Wrong comission",
    });
  if (!body.status || typeof body.status !== "string")
    errors.push({
      error: true,
      message: "Wrong comission",
    });
  if (!body.requesterId || typeof body.requesterId !== "number")
    errors.push({
      error: true,
      message: "Wrong requester id",
    });
  let requester = await Users.findByPk(body.requesterId);
  if (!requester)
    errors.push({
      error: true,
      message: "Requester not found",
    });
  if (!body.stockId || typeof body.stockId !== "number")
    errors.push({
      error: true,
      message: "Wrong stock id",
    });
  let stock = await Stocks.findByPk(body.stockId);
  if (!requester)
    errors.push({
      error: true,
      message: "Stock not found",
    });
  return {
    all: [...errors],
    first: errors.shift(),
  };
};
exports.updateValidation = async (body, params, id) => {
  let errors = [];
  if (!params.id) {
    errors.push({
      error: true,
      message: "Missing id",
    });
  }
  const sale = await Sales.findByPk(params.id, {
    include: [
      {
        model: Stocks,
        as: "stock",
      },
    ],
  });
  if (!sale) {
    errors.push({
      error: true,
      message: "Sale not found",
    });
  }
  if (sale) {
    let saleToJSON = await sale.toJSON();
    if (saleToJSON.stock.userId !== id)
      if (body.totalAmount) {
        if (typeof body.totalAmount !== "number")
          errors.push({
            error: true,
            message: "Not allowed",
          });
      }
  }
  if (body.typePayment) {
    if (typeof body.typePayment !== "string")
      errors.push({
        error: true,
        message: "Wrong type payment",
      });
  }
  if (body.payed !== null && body.payed !== undefined) {
    if (typeof body.payed !== "boolean")
      errors.push({
        error: true,
        message: "Wrong payed",
      });
  }
  if (body.comission) {
    if (typeof body.comission !== "number")
      errors.push({
        error: true,
        message: "Wrong comission",
      });
  }
  if (body.status) {
    if (typeof body.status !== "string")
      errors.push({
        error: true,
        message: "Wrong comission",
      });
  }
  if (body.requesterId) {
    if (typeof body.requesterId !== "number")
      errors.push({
        error: true,
        message: "Wrong requester id",
      });
  }
  if (body.requesterId) {
    let requester = await Users.findByPk(body.requesterId);
    if (!requester)
      errors.push({
        error: true,
        message: "Requester not found",
      });
  }
  if (body.stockId) {
    if (typeof body.stockId !== "number")
      errors.push({
        error: true,
        message: "Wrong stock id",
      });
  }
  if (body.stockId) {
    let stock = await Stocks.findByPk(body.stockId);
    if (!requester)
      errors.push({
        error: true,
        message: "Stock not found",
      });
  }
  return {
    all: [...errors],
    first: errors.shift(),
  };
};

exports.deleteValidation = async (params, id) => {
  let errors = [];
  if (!params.id) {
    errors.push({
      error: true,
      message: "Missing id",
    });
  }
  const sale = await Sales.findByPk(params.id, {
    include: [
      {
        model: Stocks,
        as: "stock",
      },
    ],
  });
  if (!sale) {
    errors.push({
      error: true,
      message: "Sale not found",
    });
  }
  if (sale) {
    let saleToJSON = await sale.toJSON();
    if (saleToJSON.stock.userId !== id)
      if (body.totalAmount) {
        if (typeof body.totalAmount !== "number")
          errors.push({
            error: true,
            message: "Not allowed",
          });
      }
  }
  return {
    all: [...errors],
    first: errors.shift(),
  };
};
