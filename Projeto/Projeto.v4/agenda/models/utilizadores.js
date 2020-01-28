const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

var utilizadorSchema = new mongoose.Schema({
    nome:{type : String,required: true},
    email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    data_Nasc: {type : Date,required: true},
    localidade: {type:String,required:true},
    genero:{type:String,required:true},
    password: { type: String, required: true },
    ultimoAcesso: String
  });
  utilizadorSchema.plugin(uniqueValidator, {message: 'is already taken.'});
module.exports = mongoose.model('utilizadores', utilizadorSchema)