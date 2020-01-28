const mongoose = require('mongoose')

var grupoSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    admin:String,
    id_utilizadores: Array,
    oculto:  { type: Boolean, required: true },
    data_Criacao: Date
})



module.exports = mongoose.model('grupo', grupoSchema)