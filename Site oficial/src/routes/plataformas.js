var express = require("express");
var router = express.Router();

var plataformaController = require("../controllers/plataformaController");


router.get("/pesquisarPlataforma", function (req, res) {
  plataformaController.pesquisarPlataforma(req, res);
});

router.post("/cadastrar", function (req, res) {
  plataformaController.cadastrar(req, res);
})
router.get("/buscarPlataformasPorEmpresa", function (req, res) {
  plataformaController.buscarPlataformasPorEmpresa(req, res);
});

module.exports = router;