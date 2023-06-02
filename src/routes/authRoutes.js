const express = require('express');
const router = express.Router();
const { userRegister } = require('../controller/registerController');
const { loginUser } = require('../controller/signInController');

router.post('/signup', userRegister);
router.post('/signin', loginUser);

module.exports = router;
