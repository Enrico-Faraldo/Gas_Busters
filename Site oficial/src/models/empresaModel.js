var database = require("../database/config");

function buscarPorId(id) {
  var instrucaoSql = `SELECT * FROM Empresa WHERE idEmpresa = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT e.idEmpresa id, e.nome, e.cnpj, t.codigo FROM Empresa e
                      INNER JOIN Token t on t.fkEmpresa = e.idEmpresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM Empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(nome, cnpj) {
  var instrucaoSql = `INSERT INTO Empresa (nome, cnpj) VALUES ('${nome}', '${cnpj}')`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };
