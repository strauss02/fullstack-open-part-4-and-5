const express = require('express');
const router = express.Router();
const { createUser, logIn } = require('../controller/users');

router.post('/', createUser);
router.post('/login', logIn);

module.exports = router;
