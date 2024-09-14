const express = require('express');
const router = express.Router();

const { saveUser, loginUser} = require('../controllers/userController.cjs');

router.post('/register', saveUser);
router.post('/login', loginUser);

module.exports = router;