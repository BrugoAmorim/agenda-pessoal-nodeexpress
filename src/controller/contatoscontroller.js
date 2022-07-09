
//Models do banco de dados
const db = require('../models/bd.js').mongoose
const ModelContatos = require('../models/contatos.js').SchemaContatos;

// collection Contatos
const contatos = db.model('contatos', ModelContatos);

const swal = require('sweetalert')

const validar = require('../services/contatosservices.js').validarCamposContato;

async function salvarContatos(req, res){

    const resultado = await validar(req.body);
    if(resultado.erro == true){

        const docs = await contatos.find({}).lean().exec();
        res.render('contatos', { dados: docs, msg: resultado.msg ,erro: resultado.erro });
    }
    else{
        const { contato, celular, telefone, email, cidade, estado, notas } = resultado.doc;

        await contatos.create({ contato, celular, telefone, email, cidade, estado, notas });
        res.redirect('/agenda-contatos');
    }
}   

async function verContatos(req, res){

    const docs = await contatos.find({}).lean().exec();
    res.render('contatos', { dados: docs });
}

async function apagarContatos(req, res){

    const idContato = req.params.id;
    await contatos.findOneAndDelete({ _id: idContato });

    res.redirect('/agenda-contatos');
}

async function editarInfoContato(req, res){

    const _id = req.params.id;
    const { contato, celular, telefone, email, cidade, estado, notas } = req.body;

    await contatos.findOneAndUpdate({ _id }, {$set: { contato, celular, telefone, email, cidade, estado, notas }}, { new: true });

    res.redirect('/agenda-contatos');
}

module.exports = { salvarContatos, verContatos, apagarContatos, editarInfoContato };