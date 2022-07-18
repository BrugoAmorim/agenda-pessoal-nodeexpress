
const mongoose = require('../models/bd.js').mongoose;
const Schema = mongoose.Schema;

const Tarefas = new Schema({

    tarefa: { type: String, max: 200, macth: /[a-z]/ },
    concluida: { type: Boolena, deafult: false },
    prioridade: { type: Number, min: 1, max: 5 },
    adicionada: { type: Date, default: Date.now() },
    idcategoria: { type: String, macth: /[a-Za-z]/ }
}, { collection: 'tarefas' });

module.exports = { Tarefas };