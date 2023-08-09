const { verifyJwt } = require("../jwt/jwt");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return res.status(403).json({ message: "token no vailido" });
  }

  req.decodedToken = decodedToken;
  next();
};

const authenticateSA = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  const decodedToken = verifyJwt(token);
  if (!decodedToken) {
    return res.status(403).json({ message: "token no vailido" });
  }

  if (decodedToken.rol !== "SA" ) {
    return res.status(403).json({ message: "no autorizado" });
  }

  req.decodedToken = decodedToken;
  next();
};

const authenticateAD = (req, res, next) => {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: "Token requerido" });
    }
  
    const decodedToken = verifyJwt(token);
    if (!decodedToken) {
      return res.status(403).json({ message: "token no vailido" });
    }
  
    if (decodedToken.rol !== "AD" || decodedToken.rol !== 'SA') {
      return res.status(403).json({ message: "no autorizado" });
    }
  
    req.decodedToken = decodedToken;
    next();
  };

module.exports = {
    authenticateToken,
    authenticateSA,
    authenticateAD,
};
