const express = require('express');
const router  = express.Router();
const usersController = require('./users.controller');
const userNameNotExitedMiddleware = require('./username-notexisted.middleware.js');

router.get('/users/add', usersController.addForm);
router.post('/users', userNameNotExitedMiddleware, usersController.add);
router.get('/users', usersController.list);

module.exports = router;
