const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = "mongodb+srv://jllorensguillaumes:0BDRwxV3DRAkSAoK@cluster0.rziktdf.mongodb.net/";

const connectDB = async() => {
    try {
        mongoose.set("strictQuery", true);
        const db = await mongoose.connect(DB_URL);
        const { name, host, port } = db.connection;
        console.log(`[Server] Conectado con éxito a: ${name} en host ${host} en puerto ${port}`);
    }
    catch(error) {
        console.log('[Server ERROR] conectando a la base de datos', error);
    }
};

module.exports = {
    connectDB
}

//0BDRwxV3DRAkSAoK contraseña bd
//jllorensguillaumes usuario bd