const express = require('express');
const router  = express.Router();
const usersController = require('./users.controller');

router.get('/users/add', usersController.addForm);

module.exports = router;
