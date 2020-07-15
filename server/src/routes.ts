import express from "express";

const routes = express.Router();

// uma roda padrão na raiz da aplicação em get,
// e a resposta em json
routes.get("/", (request, response) => {
  response.json();
});

// exportando a rota
export default routes;
