let ChurchDetail = require("./churchDetails.model");

indexGet = async(req, res, next) => {
    try {
        let details = await ChurchDetail.find()
        return res.status(200).json(details);
    } catch(error) {
        return next(error);
    }
}
let getByChurch = async ( req, res, next) => {
    try {
        let { church } = req.params
        let found = await ChurchDetail.find({church:church})
        return res.status(200).json(found)
    }catch{
        return next(error)
    }
};


let getByType = async ( req, res, next ) => {
    try {
        let { type } = req.params
        let found = await ChurchDetail.find({detailType:type})
        return res.status(200).json(found)
    }catch (error){
        return next(error)
    }
};

let createDetail = async (req, res, next) => {
    try {
        let detailToCreate = new ChurchDetail(req.body)
    let created = await detailToCreate.save()
    return res.status(201).json(created)
    }catch (error){
        return next(error)
    }
    
}

let editDetail = async (req, res, next) => {
    try {
        let { id } = req.params
        let fields = { ...req.body}
        let options = { new:true}
        let edited = await ChurchDetail.findByIdAndUpdate(id, fields, options)
        return res.status(200).json(edited)
    }catch (error) {
        return next(error);
    }
}

let deleteDetail = async (req, res, next) => {
    try {
        let { id } = req.params
        let deleted = await ChurchDetail.deleteMany({ _id: id})
        if (deleted.deletedCount) {
            return res.status(200).json("Detalle eliminado")
        }else {
            return res.status(200).json("Detalle no encontrado")
        }
    }catch {
        return next(error)
    }
}

module.exports = {
    indexGet,
    getByChurch,
    getByType,
    createDetail,
    editDetail,
    deleteDetail,
}
