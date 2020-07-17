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

    // quando se utiliza o transaction é necessário fazer
    // o commit após finalizar a inserção dos dados
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

    // realizando busca na tabela points, onde o campo id
    // deve ser igual ao id passado como parâmetro,
    // só deve ser retornado o primeiro registro,
    // caso deixar select retorna todos
    const point = await connection("points").where("id", id).first();

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
    const items = await connection("items")
      .join("points_items", "items.id", "=", "points_items.item_id")
      .where("points_items.point_id", id)
      .select("items.title");

    return response.json({ point, items });
  }

  async selectAllWhere(request: Request, response: Response) {
    // pegando dados passados da requisição, usado query,
    // pois será feito um filtro mais específico no banco de dados
    const { uf, city, items } = request.query;

    // pegando todos os items passados e criando uma lista
    // que está sendo quebrada no ',', depois faz um map na lista
    // e retorna o número sem nenhum espaço
    const listItems: number[] = String(items)
      .split(",")
      .map((item) => {
        return Number(item.trim());
      });

    // fazendo seleção na tabela points
    // com um join na tabela poins_item e está sendo verificado
    // se o id da tabela points e está na tabela poinst_items
    // que tenha pelo menos um dos id dos items passados
    // e que seja do estado e cidade passado na query
    // é convertido ambos os valores para String,
    // pois não é possível determinar o valor que será recebido na query
    // é retornado distinct para que seja retornado apenas o ponto
    // de coleta uma vez e não mais de uma,
    // também é retornado apenas as informações dos pontos
    const points = await connection("points")
      .join("points_items", "points.id", "=", "points_items.point_id")
      .whereIn("points_items.item_id", listItems)
      .where("uf", String(uf))
      .where("city", String(city))
      .distinct()
      .select("points.*");

    return response.json({
      points,
    });
  }
}
