const express = require("express");
const routes = express.Router();
const usuarioController = require("../controllers/usuarioController");
const auth = require("../middlewares/usuarioAuth");



routes.get("/usuarios", usuarioController.listar);
routes.post("/usuarios/", usuarioController.cadastrarPost);
routes.get("/usuarios/cadastrar/:id?", usuarioController.cadastrarGet);
routes.get("/usuarios/remover/:id", auth, usuarioController.remover);
routes.get("/usuarios/login", usuarioController.loginGet);
routes.get("/usuarios/logout", usuarioController.logout);
routes.post("/usuarios/login", usuarioController.loginPost);
routes.get("/usuarios/:id", auth, usuarioController.detalhar);



module.exports = routes;