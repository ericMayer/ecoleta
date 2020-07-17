import connection from "../database/connection";
import { Request, Response } from "express";

export default class PointsController {
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

    return response.json({
      id: idPointInserted[0],
      ...point,
    });
  }
}
