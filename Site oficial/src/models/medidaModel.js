var database = require("../database/config");

function buscarUltimasMedidas(idSensor, limite_linhas) {

    var instrucaoSql = `SELECT 
        quantidade as percentual_de_gas, 
                        dataLeitura,
                        DATE_FORMAT(dataLeitura,'%H:%i:%s') as momento_grafico
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.fkSensor = s.idSensor 
                    WHERE s.idSensor = ${idSensor}
                    GROUP BY percentual_de_gas, dataLeitura, momento_grafico, idLeitura
                    ORDER BY idLeitura DESC LIMIT ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idSensor) {

    var instrucaoSql = `SELECT 
        quantidade as percentual_de_gas, 
                        dataLeitura,
                        DATE_FORMAT(dataLeitura,'%H:%i:%s') as momento_grafico
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.fkSensor = s.idSensor 
                    WHERE s.idSensor = ${idSensor}
                    GROUP BY percentual_de_gas, dataLeitura, momento_grafico, idLeitura
                    ORDER BY idLeitura DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarLocaisPorPlataforma(idPlataforma) {

    var instrucaoSql = `SELECT idSensor, posicionamento FROM Sensor WHERE fkPlataforma = ${idPlataforma};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasCriticas(idEmpresa) {

    var instrucaoSql = `SELECT p.nome nome_plataforma, posicionamento, quantidade percentual_de_gas, DATE_FORMAT(dataLeitura, '%H:%i:%s') hora_captura
                    FROM Plataforma p
                    INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
                    INNER JOIN Leitura l ON s.idSensor = l.fkSensor
                    WHERE p.fkEmpresa = ${idEmpresa};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarLocaisPorPlataforma(idPlataforma) {

    var instrucaoSql = `SELECT idSensor, posicionamento FROM Sensor WHERE fkPlataforma = ${idPlataforma};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal,
    buscarLocaisPorPlataforma,
    buscarMedidasCriticas
}
