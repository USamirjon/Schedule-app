const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/login', auth.showLogin);
router.get('/register', auth.showRegister);
router.post('/login', auth.login);
router.post('/register', auth.register);
router.get('/logout', auth.logout);

module.exports = router;
