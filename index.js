const express = require("express");
require('dotenv/config');
const app = express();
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

const mongoose = require("mongoose");
const session = require("express-session");
app.use(session({
    secret: 'ifpe',
    saveUninitialized:false,
    resave: false
}));

mongoose.connect(process.env.MONGO_URI);

const emprestimoRoutes = require("./routes/emprestimoRoutes");
app.use(emprestimoRoutes);

const gerenteRoutes = require("./routes/gerenteRoutes");
app.use(gerenteRoutes);

const usuarioRoutes = require("./routes/usuarioRoutes");
app.use(usuarioRoutes);

app.get("/", function(req, res){
    if(req.session.usuario){
        res.render("index");
    } else {
        res.redirect("/usuarios/login");
    }
});

app.use(function(req, res){
    res.status(404).render("404");
});

app.listen(process.env.PORT, function(){
    console.log("Rodando...");
});