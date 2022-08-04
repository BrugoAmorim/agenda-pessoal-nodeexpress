
// models
const db = require('../models/bd.js').mongoose;

const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

const ModelsCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelsCategorias);

// utils
const conversor = require('../utils/categoriasEtarefasutils.js');

async function buscarminhasTarefas(req, res){

    const doc = await Categorias.findOne({ _id: req.params.idCat }).lean().exec();
    const infoCategoria = conversor.ModelResponseCategoria(doc);

    await Tarefas.find({ idcategoria: req.params.idCat }).lean().exec().then((docs) => {

        const formatarData = require('../utils/bloconotasutils.js').formatarData;

        let colecao = [];
        docs.map((item) => {

            let obj = conversor.ModelResponseTarefa(item);
            obj.Adicionada = formatarData(obj.Adicionada);

            colecao.push(obj);
        })

        colecao = colecao.sort((a, b) => {
            if(a.Prioridade > b.Prioridade)
                return -1;
        })

        res.render('tarefas', { Docs: colecao, Categoria: infoCategoria });
    })
}

async function adicionarnovaTarefa(req, res){

    let idCategoria = req.params.idCat;
    const reqTarefas = conversor.ModelRequestTarefa(req.body, idCategoria);

    await Tarefas.insertMany(reqTarefas).then(() => {

        res.redirect('/minhas-tarefas/' + idCategoria);
    })
}

module.exports = { buscarminhasTarefas, adicionarnovaTarefa }