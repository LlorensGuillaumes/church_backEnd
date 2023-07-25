let express = require("express");
let controller = require('./churchDetails.controller');

let router = express.Router();

router.get('/church/:id', controller.getByChurch);
router.get('/type/:type', controller.getByType);
router.post('/new', controller.createDetail);
router.put('/modify/:id', controller.editDetail);
router.delete('/delete', controller.deleteDetail);

module.exports = router;