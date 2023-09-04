let UserData = require('./usersData.model');

let createUserData = async (req, res, next)  => {
    const { userId } = req.body;
    const data = {
        userId:userId,
    }
    try{
        const userDataToCreate = new UserData(data)
        let created = await userDataToCreate.save();
        return res.status(201).json(created);

    }catch(error){
        return next(error)
    }
};

let editUserData = async (req, res, next) => {

    try{
        let { id } = req.params;
        let fields = {...req.body};
        let options = {new: true};

        let edited = await UserData.findByIdAndUpdate(id, fields, options);
       
        return res.status(200).json(edited);

    }catch(error){
        return next (error)
    }
}

let getByUserId = async (req, res, next) => {

    try{
        let {userId} = req.params;
        let found = await UserData.find({userId: userId}).populate('favourites');
        return res.status(200).json(found);

    }catch(error){
        return next(error);
    }
}

module.exports = {
    createUserData,
    editUserData,
    getByUserId,
}