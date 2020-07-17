import express from "express";
import PointsController from "./routes-controller/PointsController";
import ItemsControler from "./routes-controller/ItemsController";

const routes = express.Router();
const point = new PointsController();
const items = new ItemsControler();

// rota para pegar todos os items cadastrados na aplicação
routes.get("/items", items.selectAll);

// rota para criação de ponto de coleta
// é desestruturado os dados que foram
// recebidos e armazenados em variáveis dos mesmos
// nomes dos dados
// depois é feita a inserção desses dados no banco
// de dados e retornado uma mensagem de sucesso
routes.post("/points", point.insert);

// rota para seleção de vários pontos de coleta, por filtros
// estado, cidade e items
routes.get("/points", point.selectAllWhere);

// rota para seleção de ponto de coleta por id
routes.get("/points/:id", point.selectByID);

// exportando a rota
export default routes;
