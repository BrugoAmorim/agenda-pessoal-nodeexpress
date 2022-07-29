
// models
const db = require('../models/bd.js').mongoose;
const ModelsTarefas = require('../models/tarefas.js').Tarefas;
const Tarefas = db.model('tarefas', ModelsTarefas);

async function buscarminhasTarefas(req, res){

    res.render('tarefas');
}

module.exports = { buscarminhasTarefas }