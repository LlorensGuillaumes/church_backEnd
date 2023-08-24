const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateToken, verifyJwt } = require("../../utils/jwt/jwt");

const register = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDB = await newUser.save();

    return res.status(201).json(userDB);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const isUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Token not provided" });
        }

        const isUser = verifyJwt(token);

        if (!isUser) {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Realiza alguna lógica con "isUser" si es necesario

        // Pasa la solicitud al siguiente middleware o controlador
        return next();

    } catch (error) {
        return res.status(400).json(error);
    }
};
const allUsers = async (req, res, next) => {
  try {
    let users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

const getUserByMail = async (req, res, next) => {
  try {
    const { mail } = req.params;
    const userDB = await User.findOne({ mail: mail });
    return res.status(200).json(userDB);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findByIdAndRemove(id);
    return res.status(200).json(userDB);
  } catch (error) {
    return res.status(400).josn(error);
  }
};

const login = async (req, res, next) => {


    try {
      const userDB = await User.findOne({ mail: req.body.mail });
      
      if (!userDB) {
        return res.status(400).json("usuari no trobat");
      }
   
      if (bcrypt.compareSync(req.body.password, userDB.password)) {
        const token = generateToken(userDB._id, userDB.mail);  
        return res.status(200).json({ token, userDB });
      } else {
        return res.status(401).json("error al logejar usuari");
      }
    } catch (error) {
      res.status(401).json(error);
    }
  };

module.exports = {
  allUsers,
  isUser,
  register,
  getUserByMail,
  deleteUser,
  login,
};
