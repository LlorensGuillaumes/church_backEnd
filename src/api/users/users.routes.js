const express = require('express');
const controller = require('./users.controller');

const router = express.Router();

router.post ('/register', controller.register);
router.post ('/login', controller.login);
router.delete ('/delete/:id', controller.deleteUser);

