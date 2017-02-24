const express = require('express');
const router  = express.Router();
const usersController = require('./users.controller');

router.get('/users/add', usersController.addForm);
router.post('/users/add', usersController.add);

module.exports = router;
