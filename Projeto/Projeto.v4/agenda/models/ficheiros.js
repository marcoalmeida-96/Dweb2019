const mongoose = require('mongoose')
var comentariosSchema = new mongoose.Schema({
    autor:String,
    comentario:String,
    dataComentario:String
})
var ficheiroSchema = new mongoose.Schema({
    idGrupo: String,
    email:String,
    data: String,
    titulo: { type: String, required: true },
    disciplina: String,
    desc: { type: String, required: true },
    name: String,
    mimetype: String,
    size: Number,
    comentarios:[comentariosSchema]
})

module.exports = mongoose.model('ficheiro', ficheiroSchema)