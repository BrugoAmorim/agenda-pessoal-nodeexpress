
const mongoose = require('../models/bd').mongoose;
const Schema = mongoose.Schema;

const Categorias = new Schema({
    nome: { type: String, max: 100, match: /[a-z]/},
    descricao: { type: String, max: 300, match: /[a-z]/ } 
}, { collection: 'categorias'});

module.exports = { Categorias };