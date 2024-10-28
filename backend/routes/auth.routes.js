const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { signupValidation } = require('../middleware/validation.middleware');
const rateLimit = require('../middleware/rateLimit.middleware');

router.post('/signup', rateLimit, signupValidation, authController.signup);
router.post('/login', rateLimit, authController.login);

module.exports = router;
