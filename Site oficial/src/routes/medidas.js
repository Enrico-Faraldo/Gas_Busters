var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idSensor", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.get("/locaisPorPlataforma/:idPlataforma", function (req, res) {
    medidaController.buscarLocaisPorPlataforma(req, res);
});

router.get("/medidasCriticas/:idEmpresa", function (req, res) {
    medidaController.buscarMedidasCriticas(req, res);
});

router.get("/medidaMaxima/:idEmpresa", function (req, res) {
    medidaController.buscarMedidaMaxima(req, res);
});

router.get("/alertasMensais/:idEmpresa", function (req, res) {
    medidaController.buscarAlertasMensais(req, res);
});

module.exports = router;