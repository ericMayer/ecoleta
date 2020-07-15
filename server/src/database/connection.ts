import knex from "knex";
import path from "path";

// criando conexão com o banco de dados
// dizendo que o banco que será usado
// é sqlite3, também é necessário instalar o sqlite3
// npm install sqlite3
// para conexão irá utilizar o dirname que seria
// o diretório desse arquivo, isso resolve problema
// de nomenclaturas diferentes de cada sistema operacional
// também é necessário apontar o arquivo que será usado
// para a conexão
const connection = knex({
  client: "sqlite3",
  connection: {
    filename: path.resolve(__dirname, "database.sqlite"),
  },
  useNullAsDefault: true,
});

// exportando função de conexão com o bd
export default connection;
