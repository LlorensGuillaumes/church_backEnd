const Country = require('./towns.model');

const indexGet = async(req, res, next) => {
    try {
        const countries = await Country.find();
        return res.status(200).json(countries);
        
    } catch (error) {
        return next(error);     
    };
};

const createTowns = async(req, res, next) => {
    try {
        const countryToCreate = new Country(req.body);
        const created = await countryToCreate.save();
        return res.status(200).json(created);
    } catch (error) {
        return next(error);
    };
};

const editTown = async(req, res, next) => {
    try {
        const {id} = req.params;
        const fields = {...req.body};
        const options = {new: true};
        const edited = await Country.findByIdAndUpdate(id, fields, options);
        return res.status(200).json(edited);
    } catch (error) {
        return next(error);
    };
};

const deleteTown = async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleted = await Country.deleteMany({_id:id});
        if (deleted.deletedCount){
            return res.status(200).json('Elemento eliminado con éxito');
        }else{
            return res.status(200).json('No se encuentra el elemento para eliminar');
        }
    } catch (error) {
        return next(error);
    };
};

module.exports = {
    indexGet,
    createTowns,
    editTown,
    deleteTown,
};