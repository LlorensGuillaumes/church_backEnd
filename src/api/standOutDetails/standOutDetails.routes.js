let express = require("express");
let controller = require('./standOutDetails.controller');

let router = express.Router();

router.get('/', controller.indexGet);
router.get('/church/:id', controller.getByChurch);
router.get('/type/:type', controller.getByType);
router.post('/new', controller.createDetail);
router.put('/modify/:id', controller.editDetail);
router.delete('/delete/:id', controller.deleteDetail);

module.exports = router;