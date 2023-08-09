const express = require('express');
const controller = require('./users.controller');
const { autenticateToken, authenticateSA, authenticateAD } = require('../../utils/middlewares/auth')

const router = express.Router();

router.get('/', controller.allUsers);
router.post ('/register', controller.register);
router.post ('/login', controller.login);
router.delete ('/delete/:id', controller.deleteUser);
router.get ('/isUser/', controller.isUser)

module.exports = router