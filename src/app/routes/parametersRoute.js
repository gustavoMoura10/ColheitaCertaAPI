const express = require("express");
const router = express.Router();
const { findAll, save } = require("../controllers/parametersController");
const { auth } = require("../middlewares/interceptor");

router.get("/findAll", auth, findAll);
router.post("/save", auth, save);

module.exports = router;
