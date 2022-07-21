
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

async function novaCategoria(req){

    let doc = await Categorias.find({ nome: req.nome });

    if(doc.length != 0)
        return { erro: true, msg: 'Uma categoria já esta utilizando este título'};

    if(req.nome.length == 0)
        return { erro: true, msg: 'É necessário voce dar um nome a categoria' }

    if(req.descricao.length == 0)
        return { erro: true, msg: 'Você precisa adicionar uma descrição a categoria' }

    return req;
}

async function atualizacaoCategoria(req, idCategoria){

    if(req.nome.length == 0)
        return { erro: true, msg: 'É necessário voce dar um nome a categoria' }

    if(req.descricao.length == 0)
        return { erro: true, msg: 'Você precisa adicionar uma descrição a categoria' }
    
    let regCategoria = await Categorias.findOne({ _id: idCategoria });

    if(regCategoria == null)
        return { erro: true, msg: 'Este registro não foi encontrado'}

    let item = await Categorias.findOne({ nome: req.nome });

    if(item != null && item.nome == req.nome && item._id != idCategoria)
        return { erro: true, msg: 'uma categoria já esta usando este nome'};

    return req;
}

module.exports = { novaCategoria, atualizacaoCategoria };