const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();



//body parse(para leer atributos en el body)
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//cors 
app.use(cors());

//Ruta de inicio
app.get('/', (req, res) => res.send("Esta es mi raiz de api"));

//rutas wpp (trae las rutas de otro archivo para que no se junten todas)
app.use('/wpp', require('./router/wpp'));


app.listen(3001, () => {
 console.log("El servidor está inicializado en el puerto 3001");
});



//dependencias : Body-parser.express,cors,dotenv,twilio