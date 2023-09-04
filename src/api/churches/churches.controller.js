let Church = require("./churches.model");
const multer = require("multer");
const path = require("path");
const express = require('express');

let saveNames;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/api/churches/images");
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
    saveNames.push(filename);
    // cb(null, `hola-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// const app = express();

const postImage = async (req, res, next) => {
  saveNames = [];
  try {
    upload.any("file")(req, res, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error al subir la imagen", error: err });
      }
      return res.status(200).json({ saveNames });
    });
  } catch (error) {
    return next(error);
  }
};

const getImages = async (req, res, next) =>{

  try{
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, `../churches/images/${imageName}`);

    res.sendFile(imagePath)

  }catch(error){
    return next(error)
  }
}

const indexGet = async (req, res, next) => {
  try {
    const churches = await Church.find().populate("churchDetail");
    return res.status(200).json(churches);
  } catch (error) {
    return next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const churchFound = await Church.find({ _id: id });
    return res.status(200).json(churchFound);
  } catch (error) {
    return next(error);
  }
};
// falta afegir més ítems de búsqueda

const createChurch = async (req, res, next) => {
  try {
    const churchToCreate = new Church(req.body);
    const created = await churchToCreate.save();
    return res.status(201).json(created);
  } catch (error) {
    return next(error);
  }
};

const editChurch = async (req, res, next) => {

  try {
    const { id } = req.params;
    const fields = { ...req.body };
    const options = { new: true };


    const edited = await Church.findByIdAndUpdate(id, fields, options);
    return res.status(200).json(edited);
  } catch (error) {
    return next(error);
  }
};

const deleteChurch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Church.delete({ _id: id });
    if (deleted.deletedCount) {
      return res.status(200).json("Elemento eliminado");
    } else {
      return res.status(200).json("Elemento no encontrado");
    }
  } catch (error) {
    return next(error);
  }
};

const addPuntuation = async (req, res, next) => {
  try{
    const { id } = req.params;
    const { puntuation } = req.params;

    const numericPuntuation = parseFloat(puntuation);
    if(isNaN(numericPuntuation)){
      return res.status(400).json({error: 'Puntuación no válida'});
    }

    const updateChurch = await Church.findByIdAndUpdate(
      id,
      { $push: { puntuation:numericPuntuation } },
      { new: true }
    );

    if (!updateChurch){
      return res.status(404).json({error: 'Edificio no encontrado'});

    }

    return res.status(200).json({message: 'Puntuación añadida'})


  }catch(error){
    return next(error)
  }
};



module.exports = {
  postImage,
  getImages,
  indexGet,
  getById,
  createChurch,
  editChurch,
  deleteChurch,
  addPuntuation,
};
