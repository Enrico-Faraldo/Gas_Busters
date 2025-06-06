var database = require("../database/config");

function buscarUltimasMedidas(idPlataforma, limite_linhas) {

    var instrucaoSql = `SELECT 
        quantidade as percentual_de_gas, 
                        dataLeitura,
                        DATE_FORMAT(dataLeitura,'%H:%i:%s') as momento_grafico,
                        MAX(l.fksensor)
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.fkSensor = s.idSensor 
                    WHERE s.fkPlataforma = ${idPlataforma}
                    GROUP BY percentual_de_gas, dataLeitura, momento_grafico, idLeitura
                    ORDER BY idLeitura DESC LIMIT ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idPlataforma) {

    var instrucaoSql = `SELECT 
        quantidade as percentual_de_gas, 
                        dataLeitura,
                        DATE_FORMAT(dataLeitura,'%H:%i:%s') as momento_grafico,
                        MAX(l.fksensor)
                    FROM Leitura l
                    INNER JOIN Sensor s ON l.fkSensor = s.idSensor 
                    WHERE s.fkPlataforma = ${idPlataforma}
                    GROUP BY percentual_de_gas, dataLeitura, momento_grafico, idLeitura
                    ORDER BY idLeitura DESC LIMIT 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
