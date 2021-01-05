const express = require('express');
const router = express.Router();
const { save, findByPk } = require('../controllers/profilesController');
const { auth } = require('../middlewares/interceptor');

router.post('/save', auth, save);


module.exports = router;