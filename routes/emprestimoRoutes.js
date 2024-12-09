const express = require("express");
const routes = express.Router();
const emprestimoController = require("../controllers/emprestimoController");


routes.get("/emprestimos", emprestimoController.listar);
routes.post("/emprestimos", emprestimoController.cadastrarPost);
routes.get("/emprestimos/cadastrar/:id?", emprestimoController.cadastrarGet);
routes.get("/emprestimos/:id", emprestimoController.detalhar);
routes.get("/emprestimos/remover/:id", emprestimoController.remover);

module.exports = routes;
