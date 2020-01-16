const mongoose = require('mongoose')

var partituraSchema = new mongoose.Schema({
    _voz: String,
    _type: String,
    _path: String
})

var instrumentoSchema = new mongoose.Schema({
    designacao: String,
    partitura: [partituraSchema]
})

var obraSchema = new mongoose.Schema({
    titulo: String,
    tipo: String,
    compositor: String,
    instrumentos: [instrumentoSchema],
    _id: String
  });

module.exports = mongoose.model('arquivo', obraSchema)
