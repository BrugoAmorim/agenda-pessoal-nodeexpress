
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

// business
const validar = require('../services/categoriasservices.js');

// utils
const conversor = require('../utils/categoriasEtarefasutils.js');

async function listarCategorias(req, res){

    await Categorias.find({}).lean().exec().then((docs) => {

        let colecao = [];
        docs.map((item) => {

            colecao.push(conversor.ModelResponseCategoria(item));
        })

        res.render('categorias', { Docs: colecao });
    });

}

async function adicionarCategoria(req, res){

    const resultado = await validar.novaCategoria(req.body);
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

async function editarCategoria(req, res){

    const idCategoria = req.params.id;

    const result = await validar.atualizacaoCategoria(req.body, idCategoria);
    if(result.erro == true){
        
        Categorias.find().lean().exec().then((docs) => {

            const colecao = [];
            docs.map((item) => {

                colecao.push(conversor.ModelResponseCategoria(item));
            })

            res.render('categorias', { erro: true, msg: result.msg, Docs: colecao });
        })
    }
    else{

        const { nome, descricao } = result;

        await Categorias.findByIdAndUpdate({_id: idCategoria}, { $set:{ nome, descricao }}, { new: true }).then(() => {
            res.redirect('/agenda-listadetarefas');
        })
    }
}

async function apagarCategoria(req, res){

    let validarCategoria = await validar.deletarCategoria(req.params.idcategoria);
    if(validarCategoria.erro == true){

        res.render('categorias', { erro: true, msg: validarCategoria.msg });
    }
    else{

        let idCategoria = req.params.idcategoria;

        let minhastarefas = await Tarefas.find({ idcategoria: idCategoria }).exec();
        minhastarefas.map(async (doc) => {

            await Tarefas.findOneAndDelete({ _id: doc._id });
        }); 

        await Categorias.findByIdAndDelete({ _id: idCategoria }).then(() => {

            res.redirect('/agenda-listadetarefas');
        })
    }
}

module.exports = { listarCategorias, adicionarCategoria, editarCategoria, apagarCategoria };