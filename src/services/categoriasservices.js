
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

async function validarnovaCategoria(req){

    let doc = await Categorias.find({ nome: req.nome });

    if(doc.length != 0)
        return { erro: true, msg: 'Uma categoria já esta utilizando este título'};

    if(req.nome.length == 0)
        return { erro: true, msg: 'É necessário voce dar um nome a categoria' }

    if(req.descricao.length == 0)
        return { erro: true, msg: 'Você precisa adicionar uma descrição a categoria' }

    return req;
}

module.exports = { validarnovaCategoria };