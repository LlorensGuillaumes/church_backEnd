const express = require("express"); /*  -> express nos servirá para levantar nuestro servidor, para las rutas...; */

const cors = require("cors"); /*  -> las cors sirven para permitir o denegar que se pueda acceder al servidor desde x sitios */

const db = require("./src/utils/db"); /* -> importar db */

db.connectDB(); /* -> utilizamos la función que me conecta con la base de datos de nuestro archivo db */

// All Routes imports -> para luego poder utilizarlas en nuestro servidor
const indexRoutes = require("./src/api/index/index.routes");
const churchesRoutes = require("./src/api/churches/churches.routes");
let churchDetailsRoutes = require("./src/api/churcheDetails/churchDetails.routes")
// let coursesRoutes = require("./src/api/courses/courses.routes")

// declaramos el puerto en el que se levantará nuestro servidor
const PORT = 3000;
//const PORT = process.env.PORT

// ejecutamos nuestro express() para tener acceso al server y poder hacer ciertas cosas sobre el
const server = express();

// Para que admita peticiones desde otro servidor, front o app. -> las cors al estar vacías indicará que todo el mundo puede acceder a nuestro servidor
server.use(cors());

// Transformar el contenido o cuerpo de las peticiones POST (req.body)
// Convierte cuando enviamos un post con json al servidor
server.use(express.json());
// convierte cuando mandamos un form o formData al servidor
server.use(express.urlencoded({ extended: true }));

// Configuración de todas las rutas de nuestro servidor
server.use("/churches", churchesRoutes);
server.use("/churchDetails", churchDetailsRoutes);
// server.use("/courses", coursesRoutes)
server.use("/", indexRoutes);

// Por aquí pasarán todas las rutas que no existan.
// si no hacen match en las rutas previas, llegarán aquí y harán match con asterisco (todo entra!)
server.use("*", (req, res, next) => {
  return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});

// Controlador de errores.
server.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Unexpected Error!";
  return res.status(status).json(message);
});

server.listen(PORT, () => {
  console.log(`[Server] funcionando en http://localhost:${PORT}`);
});
