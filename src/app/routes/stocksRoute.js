const express = require("express");
const router = express.Router();
const {
  findAll,
  save,
  deleteById,
} = require("../controllers/stocksController");
const { auth, notProducer } = require("../middlewares/interceptor");

router.get("/findAll", auth, findAll);
router.post("/save", auth, notProducer, save);
router.delete("/deleteById/:id", auth, notProducer, deleteById);

module.exports = router;
