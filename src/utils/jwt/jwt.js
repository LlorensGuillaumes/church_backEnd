const jwt = require('jsonwebtoken');

const generateToken = (id, mail) => {
    return jwt.sign({ id, mail }, process.env.JWT_SECRET, { expiresIn: "30s" });
};

const verifyJwt = (token) => {
    try {
        // Intenta verificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken;
    } catch (error) {
        // Si el token no es válido o ha expirado, devuelve false o maneja el error como desees
        console.log('Error al verificar el token:', error.message);
        return false;
    }
};


module.exports = { generateToken, verifyJwt}