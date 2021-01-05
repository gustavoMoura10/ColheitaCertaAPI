const express = require('express');
const router = express.Router();
const { login, changeToken } = require('../controllers/authController');
const { auth } = require('../middlewares/interceptor');

router.post('/login', login);
router.get('/change-token', auth, changeToken);

module.exports = router;