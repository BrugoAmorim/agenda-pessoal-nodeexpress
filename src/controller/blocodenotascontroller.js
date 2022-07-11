
const db = require('../models/bd.js').mongoose;
const ModelBlocoNotas = require('../models/blocodenotas.js').SchemaBloconotas;

const BlocoNotas = db.model('blocodenotas', ModelBlocoNotas);

async function buscarAnotacoes(req, res){

    const conversor = require('../utils/bloconotasutils.js');

    const anotacoes = [];
    const docs = await BlocoNotas.find({}).lean().exec();

    docs.map((item) => {

        const obj = conversor.criarModel(item);
        anotacoes.push(obj);
    })

    res.render('bloconotas', { Docs: anotacoes });
}

module.exports = { buscarAnotacoes };