const express = require("express");
const router = express.Router();
const { save, distance } = require("../controllers/locationsController");
const { auth } = require("../middlewares/interceptor");

router.post("/save", auth, save);
router.get("/distance/:id", auth, distance);

module.exports = router;
