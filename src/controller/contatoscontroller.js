
//Models do banco de dados
const db = require('../models/bd.js').mongoose
const ModelContatos = require('../models/contatos.js').SchemaContatos;

// collection Contatos
const contatos = db.model('contatos', ModelContatos);

async function salvarContatos(req, res){

    const contatos = db.model('contatos', ModelContatos);
    const { contato, celular, telefone, email, cidade, estado, notas } = req.body;

    await contatos.create({ contato, celular, telefone, email, cidade, estado, notas });
    res.redirect('/');
}

async function verContatos(req, res){

    const docs = await contatos.find({}).lean().exec();
    res.render('contatos', { dados: docs });
}

async function apagarContatos(req, res){

    const idContato = req.params.id;
    await contatos.findOneAndDelete({ _id: idContato });

    res.redirect('/');
}

async function editarInfoContato(req, res){

    const _id = req.params.id;
    const { contato, celular, telefone, email, cidade, estado, notas } = req.body;

    await contatos.findOneAndUpdate({ _id }, {$set: { contato, celular, telefone, email, cidade, estado, notas }}, { new: true });

    res.redirect('/');
}

module.exports = { salvarContatos, verContatos, apagarContatos, editarInfoContato };