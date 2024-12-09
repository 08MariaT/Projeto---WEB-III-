const bcryptjs = require("bcryptjs");
const UsuarioModel = require("../models/UsuarioModel");

class UsuarioController{

    static async listar(req, res){
        const status = req.query.s;
        const usuarios = await UsuarioModel.find();
        res.render("usuario/listagemUsuario", {usuarios, status});

    }

    static async cadastrarPost(req, res){
        const salt = bcryptjs.genSaltSync();
        const hash = bcryptjs.hashSync(req.body.senha, salt);
        if (req.body._id){
            await UsuarioModel.findOneAndUpdate({_id: req.body._id}, {
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            });
            res.redirect("/usuarios?s=3"); 
        } else {
            const novoUsuario = new UsuarioModel({
                nome: req.body.nome,
                email: req.body.email,
                senha: hash
            });
            await novoUsuario.save();
            res.redirect("/usuarios?s=1"); 
        }
    
    }
    
    static async cadastrarGet(req, res){
        const status = req.query.s;
        const id = req.params.id;
        let usuario = {};
        if (id != undefined){
            usuario = await UsuarioModel.findOne({_id: id});
        }

        res.render("usuario/cadastrarUsuario", {usuario, status});
    }
    

    static async detalhar(req, res){
        const id = req.params.id;
        const usuario = await UsuarioModel.findOne({_id: id});
        res.render("usuario/detalharUsuario", {usuario});
    }

    static async remover(req, res){
        const id = req.params.id;
        await UsuarioModel.deleteOne({_id: id});
        res.redirect("/usuarios?s=2");
    }

    static loginGet(req, res){
        const status = req.query.s;
        res.render("usuario/login", {status});
    }

    static async loginPost(req, res){
        console.log(req.body);
        const usuario = await UsuarioModel.findOne({
            email: req.body.email
        });
        console.log(usuario);
        if(usuario == null){
            res.redirect("/usuarios/login?s=1");
        }else{
            if (bcryptjs.compareSync(req.body.senha, usuario.senha) == true){
                req.session.usuario = req.body.email;
                res.redirect("/")
            }else{
                res.redirect("/usuarios/login?s=1");
            }
        }
        
    }
    static logout(req,res){
        req.session.usuario = null;
        res.redirect("/usuarios/login");
    }
}
    
module.exports = UsuarioController;