let Church = require("./churches.model");
const multer = require('multer');
const path = require('path');
// const express = require('express');
// const fileUpload = require('express-fileupload')

let saveNames = [];

const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    cb(null, './src/api/churches/images');
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename );
    saveNames.push(filename)
    // cb(null, `hola-${file.originalname}`);
  }
})

const upload = multer({storage: storage});

// const app = express();

const postImage = async (req, res, next) => {

  try {
    upload.any('file')(req, res, (err) => {
  
      if (err) {
        return res.status(500).json({ message: 'Error al subir la imagen', error: err });
      }
      return res.status(200).json({ saveNames });
    });
  } catch (error) {
    return next(error);
  }
};



let indexGet = async (req, res, next) => {
  try {
    let churches = await Church.find().populate("churchDetail");
    return res.status(200).json(churches)
  } catch (error) {
    return next(error);
  }
};

let getById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let churchFound = await Church.find({ _id: id });
    return res.status(200).json(churchFound);
  } catch (error){
    return next(error);
  }
};
// falta afegir més ítems de búsqueda

let createChurch = async (req, res, next) => {
  try {
    let churchToCreate = new Church(req.body)
    let created = await churchToCreate.save()
    return res.status(201).json(created)
  } catch (error){
    return next(error);
    //return ("hola")
  }
};

let editChurch = async (req, res, next) => {
  console.log(req.params)
  console.log(req.body)
  console.log('entra per aqui')
  try {
    let { id } = req.params;
    let fields = { ...req.body };
    let options = { new: true };
    console.log (id)

    let edited = await Church.findByIdAndUpdate(id, fields, options);
    return res.status(200).json(edited);
  } catch (error) {
    return next(error);
  }
};

let deleteChurch = async (req, res, next) => {
  try {
    let { id } = req.params;
    let deleted = await Church.delete({ _id: id });
    if (deleted.deletedCount) {
      return res.status(200).json("Elemento eliminado");
    } else {
      return res.status(200).json("Elemento no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  postImage,
  indexGet,
  getById,
  createChurch,
  editChurch,
  deleteChurch,
};
