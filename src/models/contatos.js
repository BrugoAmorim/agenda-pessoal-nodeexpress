
const mongoose = require('./bd').mongoose;
const Schema = mongoose.Schema;

const collectionContatos = new Schema({
    
    contato: { type: String, max: 80, match: /[a-z]/},
    celular: { type: String, max: 14 },
    telefone: { type: String, max: 9},
    email: { type: String, max: 80},
    cidade: { type: String, max: 50},
    estado: { type: String, max: 50},
    notas: { type: String, max: 80}
}, { collection: 'contatos'});

module.exports = { SchemaContatos: collectionContatos };