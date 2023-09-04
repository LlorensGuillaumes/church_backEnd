const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateToken, verifyJwt } = require("../../utils/jwt/jwt");

const register = async (req, res, next) => {
  try {
    const { mail, password } = req.body;
    const hashedPassoword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      mail,
      password: hashedPassoword,
    });

    const userDB = await newUser.save();

    return res.status(201).json({ userDB });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Error during registration", message: error.message });
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
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
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
      return res.status(400).json({ error: "usuari no trobat" });
    }

    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateToken(userDB.mail, userDB.password);

      return res.status(200).json({ token, userDB });
    } else {
      return res.status(401).json({ error: "error al logejar usuari" });
    }
  } catch (error) {
    res.status(500).json({ error: "error en el servidor" });
  }
};

const modifyUser = async (req, res, next) => {
  const { userId } = req.params;
  const oldPasword = req.body.oldPasword;
  const newPasword = req.body.newPasword;
  console.log(userId, oldPasword, newPasword);

  try {
    const userDb = await User.findById(userId);

    if (!userDb) {
      console.log('no user')
      return res.status(400).json({ error: "usuari no trobat" });
    }

    if (bcrypt.compareSync(oldPasword, userDb.password)) {
      console.log('si contrasenya bona')
      const hashedPassoword = bcrypt.hashSync(newPasword, 10);

      const updateUser = await User.findByIdAndUpdate(userId, {
        password: hashedPassoword,
      });

      return res.status(200).json({ token, ok: true, updateUser });
    } else {
      return res.status(401).json({ error: "error al logejar usuari" });
    }
  } catch (error) {
    return res.status(404).json({ error: "error" });
  }
};

module.exports = {
  allUsers,
  isUser,
  register,
  getUserByMail,
  deleteUser,
  login,
  modifyUser,
  getById,
};
