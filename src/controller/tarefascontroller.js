
// models
const db = require('../models/bd.js').mongoose;

const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

const ModelsCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelsCategorias);

// utils
const conversor = require('../utils/categoriasEtarefasutils.js');
const formatarData = require('../utils/bloconotasutils.js').formatarData;

// services
const validar = require('../services/tarefasservices.js')

async function buscarminhasTarefas(req, res){

    const doc = await Categorias.findOne({ _id: req.params.idCat }).lean().exec();
    const infoCategoria = conversor.ModelResponseCategoria(doc);

    await Tarefas.find({ idcategoria: req.params.idCat }).lean().exec().then((docs) => {

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
    const result = await validar.NovaTarefa(req.body, idCategoria);

    if(result.erro == true){

        const doc = await Categorias.findOne({ _id: idCategoria }).lean().exec();
        const infoCategoria = conversor.ModelResponseCategoria(doc);
    
        await Tarefas.find({ idcategoria: idCategoria }).lean().exec().then((docs) => {
    
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
    
            res.render('tarefas', { Docs: colecao, Categoria: infoCategoria, erro: true, msg: result.msg });
        })
    }
    else{

        const reqTarefas = conversor.ModelRequestTarefa(result.doc, idCategoria);
    
        await Tarefas.insertMany(reqTarefas).then(() => {
    
            res.redirect('/minhas-tarefas/' + idCategoria);
        })
    }
}

async function excluirTarefa(req, res){

    const idTarefa = req.params.idTar;
    const idCategoria = req.params.idCat;

    await Tarefas.findOneAndDelete({ _id: idTarefa, idcategoria: idCategoria }).then(() => {

        res.redirect('/minhas-tarefas/' + idCategoria);
    })
}

async function atualizarTarefa(req, res){

    const idTarefa = req.params.idTar;
    const idCategoria = req.params.idCat;

    const { tarefa, prioridade } = req.body;

    let { concluida } = req.body;
    if(concluida === undefined)
        concluida = false;

    await Tarefas.findOneAndUpdate({ _id: idTarefa, idcategoria: idCategoria }, { $set:{ tarefa, prioridade, concluida }}).then(() => {

        res.redirect('/minhas-tarefas/' + idCategoria);
    }) 
}

module.exports = { buscarminhasTarefas, adicionarnovaTarefa, excluirTarefa, atualizarTarefa };