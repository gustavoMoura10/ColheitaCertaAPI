const { default: validator } = require("validator");
const moment = require("moment");
const Stocks = require("../models/Stocks");
exports.saveValidation = async (body) => {
  let errors = [];
  let formOfSale = ["ATACADO", "VAREJO"];
  let typeWeight = ["KG", "HG", "DAG", "G", "DG", "CG", "MG"];

  if (!body.formOfSale || !formOfSale.includes(body.formOfSale)) {
    errors.push({
      error: true,
      message: "Wrong form of sale",
    });
  }
  if (!body.weight || typeof body.weight !== "number") {
    errors.push({
      error: true,
      message: "Wrong weight",
    });
  }
  if (!body.typeWeight || !typeWeight.includes(body.typeWeight)) {
    errors.push({
      error: true,
      message: "Wrong type weight",
    });
  }
  if (body.description) {
    if (typeof body.description !== "string") {
      errors.push({
        error: true,
        message: "Wrong description",
      });
    }
  }
  if (!body.quantity || typeof body.quantity !== "number") {
    errors.push({
      error: true,
      message: "Wrong quantity",
    });
  }
  if (!body.value || typeof body.value !== "number") {
    errors.push({
      error: true,
      message: "Wrong value",
    });
  }
  if (
    !body.expirationDate ||
    !moment(body.expirationDate, "DD/MM/YYYY").isValid()
  ) {
    errors.push({
      error: true,
      message: "Wrong expirtation date",
    });
  }

  return {
    all: [...errors],
    first: errors.shift(),
  };
};

exports.deleteValidation = async (params) => {
  let errors = [];
  if (!params.id) {
    errors.push({
      error: true,
      message: "Missing id",
    });
  }
  const stock = await Stocks.findByPk(params.id);
  if (!stock) {
    errors.push({
      error: true,
      message: "Stock don't exist",
    });
  }
  return {
    all: [...errors],
    first: errors.shift(),
  };
};

