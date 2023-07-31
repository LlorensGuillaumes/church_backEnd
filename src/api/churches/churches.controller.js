let Church = require("./churches.model");

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
    console.log(req.params)
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
  try {
    let { id } = req.params;
    let fields = { ...req.body };
    let options = { new: true };
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
  indexGet,
  getById,
  createChurch,
  editChurch,
  deleteChurch,
};
