const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const wpp_controller = require("../src/controllers/wpp");
require("dotenv").config();



//body parse(para leer atributos en el body)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//cors 
app.use(cors());

//Ruta de iniciog
app.get('/', (req, res) => res.send("Esta es mi raiz de api"));

//rutas wpp (trae las rutas de otro archivo para que no se junten todas)
app.use('/wpp', require('./router/wpp'));


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});


wpp_controller.reConectar();
//dependencias : Body-parser.express,cors,dotenv,twilio