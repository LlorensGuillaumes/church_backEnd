const express = require("express"); 
const cors = require("cors"); 
const db = require("./src/utils/db"); 
const path = require("path");

db.connectDB();

const indexRoutes = require("./src/api/index/index.routes");
const churchesRoutes = require("./src/api/churches/churches.routes");
const standOutDetailsRoutes = require("./src/api/standOutDetails/standOutDetails.routes");
const appListRoutes = require("./src/api/appList/appList.routes");
const userRoutes = require("./src/api/users/users.routes");
const userDataRoutes = require('./src/api/usersData/usersData.routes');


const PORT = 5000;
//const PORT = process.env.PORT

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use("/churches", churchesRoutes);
server.use("/standOutDetails", standOutDetailsRoutes);
server.use("/appList", appListRoutes);
server.use("/users", userRoutes);
server.use("/userData", userDataRoutes);
server.use("/", indexRoutes);
server.use("*", (req, res, next) => { 
  return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});

server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Unexpected Error!";
  return res.status(status).json(message);
});

server.listen(PORT, () => {
  console.log(`[Server] funcionando en http://localhost:${PORT}`);
});
