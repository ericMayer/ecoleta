import { Request, Response } from "express";
import connection from "../database/connection";

export default class PointsController {
  // método de inserção de novo ponto de coleta
  async insert(request: Request, response: Response) {
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

    const point = {
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
    };

    // por padrão no knex quando é feita só uma inserção
    // é retornado o uma lista com os ids dos items inseridos
    const idPointInserted = await trx("points").insert(point);

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

    await trx.commit();

    return response.json({
      id: idPointInserted[0],
      ...point,
    });
  }

  // método de seleção por id de ponto de coleta
  async selectByID(request: Request, response: Response) {
    // pegando o id que foi passado na requisição
    const id = request.params.id;

    const trx = await connection.transaction();

    // realizando busca na tabela points, onde o campo id
    // deve ser igual ao id passado como parâmetro,
    // só deve ser retornado o primeiro registro,
    // caso deixar select retorna todos
    const point = await trx("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({
        mensagem: "Ponto de coleta não encontrado",
      });
    }

    // fazendo a pesquisa dos items que tenham
    // o mesmo id na tabela items e point_items
    // sempre que o point id na tabela points_items for
    // o mesmo que foi passado na rota e
    // selecionando apenas o titulo dos items
    const items = await trx("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }
}
