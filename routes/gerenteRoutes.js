const express = require("express");
const routes = express.Router();
const gerenteController = require("../controllers/gerenteController");


routes.get("/gerentes", gerenteController.listar);
routes.post("/gerentes", gerenteController.cadastrarPost);
routes.get("/gerentes/cadastrar/:id?", gerenteController.cadastrarGet);
routes.get("/gerentes/:id", gerenteController.detalhar);
routes.get("/gerentes/remover/:id", gerenteController.remover);

module.exports = routes;
