// Arquivo de configuração
// do Knex para que seja possível
// fazer a criação das tabelas

import path from "path";

// na configuração do banco de dados,
// não é possível utilizar javascript, por isso
// a sintaxe abaixo
// é utilizado a mesma forma que faz a conexão com o bd,
// porém é adicionado os migrations (histórico do bd),
//
module.exports = {
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "src", "database", "seeds"),
  },
  useNullAsDefault: true,
  // propagateCreateError: false,
};
