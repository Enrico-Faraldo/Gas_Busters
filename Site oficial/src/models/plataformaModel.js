var database = require("../database/config");

function buscarPlataformasPorEmpresa(empresaId) {

  var instrucaoSql = `SELECT * FROM Plataforma p WHERE fkEmpresa = ${empresaId}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(empresaId, nome) {
  
  var instrucaoSql = `INSERT INTO (nome, fkEmpresa) Plataforma VALUES (${nome}, ${empresaId})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function pesquisarPlataforma(empresaId, nome) {

  var instrucaoSql = `SELECT * FROM Plataforma p WHERE fkEmpresa = ${empresaId} AND nome LIKE '%${nome}%';`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarPlataformasPorEmpresa,
  cadastrar,
  pesquisarPlataforma
}
