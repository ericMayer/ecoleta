import { Request, Response } from "express";
import connection from "../database/connection";

export default class ItemsController {
  async selectAll(request: Request, response: Response) {
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
  }
}
