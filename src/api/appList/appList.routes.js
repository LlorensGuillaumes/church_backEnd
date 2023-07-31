let express = require('express');
let controller = require('./appList.controller')
let router = express.Router();

router.get('/', controller.indexGet);
router.post('/new', controller.createList);
router.put('/edit', controller.editList);

module.exports = router;