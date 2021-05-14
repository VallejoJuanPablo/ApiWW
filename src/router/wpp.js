const express = require("express");
const router = express.Router();
const wpp_controller = require("../controllers/wpp");
const mid_auth = require("../middleware/auth");

//Principal de Facturas no hace nada 
router.get("/", (req, res) => res.send("Principal de WPP"));

router.get("/asd", (req, res) => res.send("Principal de WPP"));

//POST: endpoint para consultar las facturas relacionadas con un cliente, en un periodo de tiempo. Requiere token para autenticar el logueo.
router.post("/conectar", function (req, res) {
wpp_controller.conectApi(req, res)
.catch (err => console.log("unexpected error: " + err) )
})

router.get("/status",function (req, res) {
    wpp_controller.status(req, res)
    .catch (err => console.log("unexpected error: " + err) )
})
   
router.post("/check",function (req, res) {
    wpp_controller.checkNum(req, res)
})

router.post("/enviar",function (req, res) {
    wpp_controller.sendMessage(req, res)
})

    
/* router.post("/conectar",  mid_auth, function (req, res) {
    wpp_controller.conectApi(req, res)
    })
    
    
    router.post("/enviar",  mid_auth, function (req, res) {
        wpp_controller.sendMessage(req, res)
    }) */
    
    
module.exports = router;



