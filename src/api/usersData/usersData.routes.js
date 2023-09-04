const express = require('express');
const controller = require('./usersData.controller');
const router = express.Router();

router.get('/userId/:userId',controller.getByUserId);
router.post('/new',controller.createUserData);
router.put('/edit/:id', controller.editUserData);

module.exports = router;