let express = require("express");
let controller = require('./churches.controller');

let router = express.Router();

router.get('/', controller.indexGet);   //totes les esglèsies
router.get('/id/:id',controller.getById);   //una sol per id
router.post('/newChurch', controller.createChurch); //nova
router.put('/modifyChurch/:id', controller.editChurch); // modificar
router.delete('/deleteChuch/:id', controller.deleteChurch); //eliminar


module.exports = router;