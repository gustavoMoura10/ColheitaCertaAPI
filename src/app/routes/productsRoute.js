const express = require('express');
const router = express.Router();
const { findAll } = require('../controllers/productsController');
const { auth } = require('../middlewares/interceptor');

router.get('/findAll', auth, findAll);


module.exports = router;