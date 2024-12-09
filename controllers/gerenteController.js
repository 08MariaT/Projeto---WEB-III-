const GerenteModel = require("../models/GerenteModel");

class GerenteController{

    static async listar(req, res){
        const status = req.query.s;
        const gerentes = await GerenteModel.find();
        res.render("gerente/listagem", {gerentes, status});

    }

    static async cadastrarPost(req, res){
        console.log(req.body);
        if (req.body._id){
            await GerenteModel.findOneAndUpdate({_id: req.body._id}, {
                id: req.body.id,
                nome: req.body.nome,
                email: req.body.email
            });
            res.redirect("/gerentes?s=3"); 
        } else {
            const novoGerente = new GerenteModel({
                id: req.body.id,
                nome: req.body.nome,
                email: req.body.email 
            });
            await novoGerente.save();
            res.redirect("/gerentes?s=1"); 
        }
    
    }

    static async cadastrarGet(req, res){
        const id = req.params.id;
        let gerente = {};
        console.log(id);
        if (id != undefined){
            gerente = await GerenteModel.findOne({id});
        }

        res.render("gerente/cadastrar", {gerente});
    }

    static async detalhar(req, res){
        const id = req.params.id;
        const gerente = await GerenteModel.findOne({id});
        res.render("gerente/detalhar", {gerente});
    }

    static async remover(req, res){
        const id = req.params.id;
        await GerenteModel.deleteOne({id: id});
        res.redirect("/gerentes?s=2");
    }
    
}


module.exports = GerenteController;