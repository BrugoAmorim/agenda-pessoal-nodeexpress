
const mongoose = require('mongoose');
await mongoose.connection('mongodb://127.0.0.1:27017/agendapessoal');

module.exports = { mongoose };