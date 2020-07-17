import express from "express";
import connection from "./database/connection";

const routes = express.Router();

// rota para pegar todos os items cadastrados na aplicação
routes.get("/items", async (request, response) => {
  const items = await connection("items").select("*");

  // será feita a serialização do caminho das imagens
  // para ao invés de apenas o nome
  // ficar o caminho completo, é usado outros campos,
  // pois o map altera o objeto todo o que não queremos
  const tranformItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      itemUrl: `http://localhost:3000/uploads/${item.image}`,
    };
  });

  response.json(tranformItems);
});

// rota para criação de ponto de coleta
// é desestruturado os dados que foram
// recebidos e armazenados em variáveis dos mesmos
// nomes dos dados
// depois é feita a inserção desses dados no banco
// de dados e retornado uma mensagem de sucesso
routes.post("/points", async (request, response) => {
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    uf,
    city,
    address,
    number,
    items,
  } = request.body;

  // existe um padrão conhecido como transaction no knex
  // que geralmente é usado como trx para
  // quando existe duas query seguidas,
  // nesse caso uma der falha a outra não será executada
  const trx = await connection.transaction();

  // por padrão no knex quando é feita só uma inserção
  // é retornado o uma lista com os ids dos items inseridos
  const idPointInserted = await trx("points").insert({
    image: "teste",
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    uf,
    city,
    address,
    number,
  });

  // está sendo pegado o point id que foi inserido
  // e os items que esse ponto coleta
  const items_point = items.map((item: number) => {
    return {
      point_id: idPointInserted[0],
      item_id: item,
    };
  });

  // realizando inserção do id o ponto e dos ids dos items
  // que ele coleta
  await trx("points_items").insert(items_point);

  return response.json({
    mensagem: "sucesso",
  });
});
// exportando a rota
export default routes;
