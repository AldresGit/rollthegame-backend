'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

router.get('/home', UserController.home);
router.post('/test', UserController.test);
router.post('/register', UserController.register);
router.get('/user/:id?', UserController.getUser);
router.get('/users', UserController.getUsers);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);


module.exports = router;