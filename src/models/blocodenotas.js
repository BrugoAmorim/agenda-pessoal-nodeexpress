
const mongoose = require('./bd.js').mongoose;
const Schema = mongoose.Schema;

const blocodenotas = new Schema({
    
    nome: { type: String, max: 80, match: /[a-z]/ },
    conteudo: { type: String, max: 300},
    criado: { type: Date, default: Date.now },
    atualizado: { type: Date, default: Date.now }
}, { collection: 'blocodenotas'});

module.exports = { SchemaBloconotas :blocodenotas }