
const db = require('../models/bd.js').mongoose;
const ModelCategorias = require('../models/categorias.js').Categorias;
const Categorias = db.model('categorias', ModelCategorias);

// business
const validar = require('../services/categoriasservices.js');

async function listarCategorias(req, res){

    /* await Categorias.find({}).lean().exec().then((docs) => {

        return res.status(200).json(docs);
    }); */

    res.render('categorias');
}

async function adicionarCategoria(req, res){

    const resultado = await validar.validarnovaCategoria(req.body);
    if(resultado.erro == true){

        return res.status(400).json({ erro: resultado.msg, codigo: 400 });
    }
    else{

        const { nome, descricao } = req.body;
        await Categorias.create({ nome, descricao }).then((doc) => {

            return res.status(200).json(doc);
        })
    }
}

module.exports = { listarCategorias, adicionarCategoria };