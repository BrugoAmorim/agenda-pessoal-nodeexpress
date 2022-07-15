
// Schema da collection blocodenotas
const db = require('../models/bd.js').mongoose;
const ModelBlocoNotas = require('../models/blocodenotas.js').SchemaBloconotas;
const BlocoNotas = db.model('blocodenotas', ModelBlocoNotas);

// services e utils
const validacoes = require('../services/bloconotasservices.js');
const conversor = require('../utils/bloconotasutils.js');

async function buscarAnotacoes(req, res){

    const anotacoes = [];
    const docs = await BlocoNotas.find({}).lean().exec();

    docs.map((item) => {

        const obj = conversor.criarModel(item);
        anotacoes.push(obj);
    })

    res.render('bloconotas', { Docs: anotacoes });
}

async function novaAnotacao(req, res){

    const caixote = await validacoes.validarNovaAnotacao(req.body);

    if(caixote.erro){

        return res.status(400).json({ erro: caixote.msg, codigo: 400 });
    }
    else{
        const { nome, conteudo } = caixote;
        const { criado, atualizado } = new Date();

        const doc = await BlocoNotas.create({nome, conteudo, criado, atualizado});
        const formatado = conversor.criarModel(doc);

        return res.status(200).json(formatado);
    }
}

async function editarAnotacao(req, res){
    
    const idAnotacao = req.params.id;
    const caixote = await validacoes.validarUpdate(idAnotacao, req.body);

    if(caixote.erro == true){

        return res.status(400).json({ erro: caixote.msg, codigo: 400 });
    }
    else{
        const { nome, conteudo } = caixote;
        const atualizado = new Date();

        const regAlterado = await BlocoNotas.findOneAndUpdate({ _id: idAnotacao }, { $set:{ nome, conteudo, atualizado}}, { returnDocument: 'after' });
    
        const formatado = conversor.criarModel(regAlterado);
        return res.status(200).json(formatado);
    }
}

async function apagarAnotacao(req, res){

    const validar = await validacoes.validarDelete(req.params.id);
    if(validar.erro == true){

        return res.status(400).json({ erro: validar.msg, codigo: 400 });
    }
    else{
        const _id = req.params.id;

        await BlocoNotas.findOneAndDelete({_id});
        return res.status(200).json({msg: 'A anotação foi apagada!', codigo: 200});
    }
}

module.exports = { buscarAnotacoes, novaAnotacao, editarAnotacao, apagarAnotacao };