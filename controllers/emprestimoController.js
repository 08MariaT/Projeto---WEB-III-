const EmprestimoModel = require("../models/EmprestimoModel");

class EmprestimoController{

    static async listar(req, res){
        const status = req.query.s;
        const emprestimos = await EmprestimoModel.find();
        res.render("emprestimo/listagem", {emprestimos, status});

    }

    static async cadastrarPost(req, res){
        console.log(req.body);
        if (req.body._id){
            await EmprestimoModel.findOneAndUpdate({_id: req.body._id}, {
                id: req.body.id,
                nome: req.body.nome,
                valor: req.body.valor
            });



            res.redirect("/emprestimos?s=3"); 
        } else {
            const novoEmprestimo = new EmprestimoModel({
                id: req.body.id,
                nome: req.body.nome,
                valor: req.body.valor 
            });
            await novoEmprestimo.save();
            res.redirect("/emprestimos?s=1"); 
        }
    
    }

    static async cadastrarGet(req, res){
        const id = req.params.id;
        let emprestimo = {};
        console.log(id);
        if (id != undefined){
            emprestimo = await EmprestimoModel.findOne({id});
        }

        res.render("emprestimo/cadastrar", {emprestimo});
    }

    static async detalhar(req, res){
        const id = req.params.id;
        const emprestimo = await EmprestimoModel.findOne({id});
        res.render("emprestimo/detalhar", {emprestimo});
    }

    static async remover(req, res){
        const id = req.params.id;
        await EmprestimoModel.deleteOne({id: id});
        res.redirect("/emprestimos?s=2");
    }
    
}


module.exports = EmprestimoController;