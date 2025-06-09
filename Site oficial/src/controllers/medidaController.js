var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idSensor = req.params.idSensor;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idSensor, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idSensor = req.params.idSensor;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idSensor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarLocaisPorPlataforma(req, res) {

    var idPlataforma = req.params.idPlataforma;

    console.log(`Recuperando locais por plataforma`);

    medidaModel.buscarLocaisPorPlataforma(idPlataforma).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as plataformas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasCriticas(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medidas críticas`);

    medidaModel.buscarMedidasCriticas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas críticas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidasSemiCriticas(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medidas críticas`);

    medidaModel.buscarMedidasSemiCriticas(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medidas semi críticas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMedidaMaxima(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medida máxima`);

    medidaModel.buscarMedidaMaxima(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as medida máxima.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarAlertasMensais(req, res) {

    var idEmpresa = req.params.idEmpresa;

    console.log(`Recuperando medida máxima`);

    medidaModel.buscarAlertasMensais(idEmpresa).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os alertas mensais.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimasMedidasMensais(req, res) {

    var idPlataforma = req.params.idPlataforma;

    console.log(`Recuperando as ultimas medidas mensais`);

    medidaModel.buscarUltimasMedidasMensais(idPlataforma).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas mensais.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoRealMensal(req, res) {

    var idPlataforma = req.params.idPlataforma;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoRealMensal(idPlataforma).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas mensais em tempo real.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarLocaisPorPlataforma,
    buscarMedidasCriticas,
    buscarMedidaMaxima,
    buscarAlertasMensais,
    buscarUltimasMedidasMensais,
    buscarMedidasEmTempoRealMensal,
    buscarMedidasSemiCriticas

}