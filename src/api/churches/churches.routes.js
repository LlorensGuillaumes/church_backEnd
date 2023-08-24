const express = require("express");
const controller = require('./churches.controller');
const { autenticateToken, authenticateSA, authenticateAD } = require('../../utils/middlewares/auth')

const router = express.Router();



router.get('/', controller.indexGet);   //totes les esglèsies
router.get('/id/:id',controller.getById);   //una sol per id
router.post('/newChurch', controller.createChurch); //nova
router.put('/modifyChurch/:id', controller.editChurch); // modificar
router.delete('/deleteChurch/:id', controller.deleteChurch);
router.post('/images', controller.postImage);   //per pujar imatges
router.get('/getImages/:imageName', controller.getImages);


module.exports = router;