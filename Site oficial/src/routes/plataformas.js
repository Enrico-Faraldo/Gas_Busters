var express = require("express");
var router = express.Router();

var plataformaController = require("../controllers/plataformaController");

router.get("/:empresaId", function (req, res) {
  plataformaController.buscarPlataformasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  plataformaController.cadastrar(req, res);
})

module.exports = router;