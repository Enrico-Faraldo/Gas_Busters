var database = require("../database/config");

function buscarPlataformasPorEmpresa(idEmpresa) {

  var instrucaoSql = `SELECT * FROM Plataforma a WHERE fkEmpresa = ${idEmpresa}`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(idEmpresa, descricao) {
  
  var instrucaoSql = `INSERT INTO (descricao, fk_empresa) aquario VALUES (${descricao}, ${idEmpresa})`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


module.exports = {
  buscarPlataformasPorEmpresa,
  cadastrar
}
