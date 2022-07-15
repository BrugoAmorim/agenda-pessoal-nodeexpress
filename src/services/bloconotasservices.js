
const db = require('../models/bd.js').mongoose;
const schema = require('../models/blocodenotas.js').SchemaBloconotas;    
const BlocoNotas = db.model('blocodenotas', schema);

async function validarNovaAnotacao(req){

    if(req.nome.length == 0)
        return { erro: true, msg: 'Você precisa dar um título ao texto' };
    if(req.conteudo.length == 0)
        return { erro: true, msg: 'Não é permitido salvar sem adicionar um texto' };

    const doc = await BlocoNotas.findOne({nome: req.nome});
    if(doc != null)
        return { erro: true, msg: 'Já existe um texto com este título'};

    return req;
}

async function validarUpdate(idanotacao, req){

    const registro = await BlocoNotas.findOne({ _id: idanotacao });

    if(registro == null)
        return { erro: true, msg: 'Esta anotação não foi encontrada'};

    if(req.nome.length == 0)
        return { erro: true, msg: 'Você precisa dar um título ao texto' };
    if(req.conteudo.length == 0)
        return { erro: true, msg: 'Não é permitido salvar sem adicionar um texto' };

    const doc = await BlocoNotas.findOne({nome: req.nome});

    if(doc != null && doc._id.toString() != registro._id.toString())
        return { erro: true, msg: 'Já existe um texto com este título'};

    return req;
}

async function validarDelete(id){
    
    const registro = await BlocoNotas.findOne({ _id: id });

    if(registro == null)
        return { erro: true, msg: 'Esta anotação não foi encontrada'};
    
    return { erro: false };
}

module.exports = { validarNovaAnotacao, validarUpdate, validarDelete }