import express from "express";

import routes from "./routes";

const server = express();

server.use(routes);
