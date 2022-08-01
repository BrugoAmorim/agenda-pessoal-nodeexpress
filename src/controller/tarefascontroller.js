
// models
const db = require('../models/bd.js').mongoose;

const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

const ModelsCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelsCategorias);

// utils
const conversorCat = require('../utils/categoriasutils.js');

async function buscarminhasTarefas(req, res){

    const doc = await Categorias.findOne({ _id: req.params.idCat }).lean().exec();
    const infoCategoria = conversorCat.criarmodeloresponse(doc);

    await Tarefas.find({ idcategoria: req.params.idCat }).lean().exec().then((docs) => {

        const formatarData = require('../utils/bloconotasutils.js').formatarData;

        let colecao = [];
        docs.map((item) => {

            let obj = {
                id : item._id.toString(),
                tarefa : item.tarefa,
                concluida : item.concluida,
                prioridade : item.prioridade,
                adicionada : formatarData(item.adicionada),
                idcategoria : item.idcategoria
            }
            colecao.push(obj);
        })

        colecao = colecao.sort((a, b) => {
            if(a.prioridade > b.prioridade)
                return -1;
        })

        res.render('tarefas', { Docs: colecao, Categoria: infoCategoria });
    })
}

module.exports = { buscarminhasTarefas }