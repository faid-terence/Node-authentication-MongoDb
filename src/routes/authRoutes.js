const express = require('express');
const router = express.Router();
const { userRegister } = require('../controller/registerController');
const { loginUser } = require('../controller/signInController');
const auth = require('../middleware/authMiddleware');

router.get('/private', auth, (req, res) => {
    res.status(200).send('Ur in a Private Territoty')
})
router.post('/signup', userRegister);
router.post('/signin', loginUser);



module.exports = router;
