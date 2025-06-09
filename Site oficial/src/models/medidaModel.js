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

    var instrucaoSql = `SELECT p.nome AS nome_plataforma, s.posicionamento, l.quantidade AS percentual_de_gas, 
       DATE_FORMAT(l.dataLeitura, '%H:%i:%s') AS hora_captura
FROM Plataforma p
INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
INNER JOIN (
    SELECT fkSensor, MAX(dataLeitura) AS ultimaLeitura
    FROM Leitura
    WHERE dataLeitura >= NOW() - INTERVAL 30 MINUTE
    GROUP BY fkSensor
) ultimas ON s.idSensor = ultimas.fkSensor
INNER JOIN Leitura l ON l.fkSensor = ultimas.fkSensor AND l.dataLeitura = ultimas.ultimaLeitura
WHERE p.fkEmpresa = ${idEmpresa}
  AND l.quantidade >= 5;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasSemiCriticas(idEmpresa) {

    var instrucaoSql = `SELECT p.nome AS nome_plataforma, s.posicionamento, l.quantidade AS percentual_de_gas, 
       DATE_FORMAT(l.dataLeitura, '%H:%i:%s') AS hora_captura
FROM Plataforma p
INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
INNER JOIN (
    SELECT fkSensor, MAX(dataLeitura) AS ultimaLeitura
    FROM Leitura
    WHERE dataLeitura >= NOW() - INTERVAL 30 MINUTE
    GROUP BY fkSensor
) ultimas ON s.idSensor = ultimas.fkSensor
INNER JOIN Leitura l ON l.fkSensor = ultimas.fkSensor AND l.dataLeitura = ultimas.ultimaLeitura
WHERE p.fkEmpresa = ${idEmpresa}
  AND l.quantidade < 5 AND l.quantidade >= 4;
`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarLocaisPorPlataforma(idPlataforma) {

    var instrucaoSql = `SELECT idSensor, posicionamento FROM Sensor WHERE fkPlataforma = ${idPlataforma};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidaMaxima(idEmpresa) {

    var instrucaoSql = `SELECT p.nome nome_plataforma, posicionamento, quantidade percentual_de_gas, DATE_FORMAT(dataLeitura, '%H:%i:%s') hora_captura
                        FROM Plataforma p
                        INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
                        INNER JOIN Leitura l ON s.idSensor = l.fkSensor
                        WHERE p.fkEmpresa = ${idEmpresa} 
                        AND l.dataLeitura >= NOW() - INTERVAL 30 MINUTE
                        AND l.quantidade = (SELECT MAX(l.quantidade) FROM Plataforma p
                        INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
                        INNER JOIN Leitura l ON s.idSensor = l.fkSensor
                        WHERE p.fkEmpresa = ${idEmpresa}
                        AND l.dataLeitura >= NOW() - INTERVAL 30 MINUTE);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarAlertasMensais(idEmpresa) {

    var instrucaoSql = `SELECT COUNT(l.quantidade) numero_de_alertas FROM Plataforma p
INNER JOIN Sensor s ON s.fkPlataforma = p.idPlataforma
INNER JOIN Leitura l ON s.idSensor = l.fkSensor
WHERE p.fkEmpresa = ${idEmpresa} AND l.quantidade >= 5
AND l.dataLeitura >= NOW() - INTERVAL 30 DAY;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimasMedidasMensais(idPlataforma) {

    var instrucaoSql = `SELECT 
    DATE_FORMAT(l.dataLeitura, '%Y-%m') AS ano_mes,
    DATE_FORMAT(l.dataLeitura, '%M') AS nome_mes,
    MAX(l.quantidade) AS maior_leitura
FROM Leitura l
INNER JOIN Sensor s ON l.fkSensor = s.idSensor
INNER JOIN Plataforma p ON s.fkPlataforma = p.idPlataforma
WHERE p.idPlataforma = ${idPlataforma}
  AND l.dataLeitura >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
GROUP BY ano_mes, nome_mes
ORDER BY ano_mes DESC;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealMensal(idPlataforma) {

    var instrucaoSql = `SELECT 
    DATE_FORMAT(l.dataLeitura, '%Y-%m') AS ano_mes,
    DATE_FORMAT(l.dataLeitura, '%M') AS nome_mes,
    MAX(l.quantidade) AS maior_leitura
FROM Leitura l
INNER JOIN Sensor s ON l.fkSensor = s.idSensor
INNER JOIN Plataforma p ON s.fkPlataforma = p.idPlataforma
WHERE p.idPlataforma = ${idPlataforma}
  AND l.dataLeitura >= DATE_SUB(CURRENT_DATE(), INTERVAL 12 MONTH)
GROUP BY ano_mes, nome_mes
ORDER BY ano_mes DESC;;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
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
