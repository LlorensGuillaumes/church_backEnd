const jwt = require('jsonwebtoken');

const generateToken = (id, mail) => {
    return jwt.sing({ id, user }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const verifyJwt = (token) =>{
    try {
        return jwt.verify(token, procss.env.JWT_SECRET);
    }catch (error){
        return next(error)
    }
};

module.exports = { generateToken, verifyJwt}