const mongoose = require('mongoose')


var obraSchema = new mongoose.Schema({
    id: String,
    nome: String,
    bio: String,
    dataNasc: String,
    dataObito: String,
    periodo: String
  });

module.exports = mongoose.model('compositores', obraSchema)