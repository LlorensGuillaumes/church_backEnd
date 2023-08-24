const express = require('express');
const controller = require('./towns.controller');
const router = express.Router();

router.get('/', controller.indexGet);
router.post('/new', controller.createTowns);
router.put('/edit/:id', controller.editTown);
router.delete('/delete/:id', controller.deleteTown);

module.exports = router;