let AppList = require('./appList.model');

indexGet = async(req, res, next) => {
    try{
        let details = await AppList.find()
        return res.status(200).json(details)

    }catch(error){
        return next(error)
    }
};

let createList = async (req, res, next) => {
    try{
        let listToCreate = new AppList(req.body)
        let created = await listToCreate.save()
        return res.status(201).json(created)
    }catch(error){
        return next(error)
    }
}

let editList = async (req, res, next) => {
    try{
        let { id } = req.params
        let fields = { ...req.body }
        let options = { new:true }
        let edited = await AppList.findByIdAndUpdate(id, fields, options)
        return res.status(200).json(edited)    
    }catch(error){
        return next(error)
    }
}

module.exports = {
    indexGet,
    createList,
    editList
}