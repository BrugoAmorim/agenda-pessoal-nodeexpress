
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

// business
const validar = require('../services/categoriasservices.js');

async function listarCategorias(req, res){

    await Categorias.find({}).lean().exec().then((docs) => {

        res.render('categorias', { Docs: docs });
    });

}

async function adicionarCategoria(req, res){

    const resultado = await validar.validarnovaCategoria(req.body);
    if(resultado.erro == true){

        const doc = await Categorias.find({}).lean().exec();
        res.render('categorias', { Docs: doc, erro: true, msg: resultado.msg, form: req.body });
    }   
    else{

        const { nome, descricao } = req.body;
        await Categorias.create({ nome, descricao }).then((doc) => {

            res.redirect("/agenda-listadetarefas");
        })
    }
}

module.exports = { listarCategorias, adicionarCategoria };