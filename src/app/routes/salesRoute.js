const express = require("express");
const {
  save,
  findAll,
  update,
  remove,
} = require("../controllers/salesController");
const { auth } = require("../middlewares/interceptor");
const router = express.Router();

router.post("/save", auth, save);
router.get("/findAll", auth, findAll);
router.put("/update/:id", auth, update);
router.delete("/delete/:id", auth, remove);

module.exports = router;
