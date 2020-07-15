import express from "express";
import routes from "./routes";

// criando o servidor da aplicação e dizendo que vai
// utilizar a biblioteca express
const server = express();

// dizendo que irá utilizar o padrão de dados em json
server.use(express.json());

// dizendo que irá utilizar as rotas
server.use(routes);

// o servidor irá ficar rodando na porta 3000
server.listen(3000);
