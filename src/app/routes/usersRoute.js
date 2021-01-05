const express = require("express");
const router = express.Router();
const { save, findByPk } = require("../controllers/usersController");
const { auth } = require("../middlewares/interceptor");
router.post("/save", save);
router.get("/findByPk/:id", auth, findByPk);

module.exports = router;
