import express from "express";

const server = express();

server.get("/users", (request, response) => {
  response.json(["Eric", "Magão", "Fagundeira"]);
});

server.listen(3000);
