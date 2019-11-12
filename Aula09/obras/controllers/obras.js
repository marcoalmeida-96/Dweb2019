var Obra = require('../models/obras')

// Devolve a lista de alunos
module.exports.listar = () => {
    return Obra
        .find()
        .exec()
}

// Devolve a informação de um aluno
module.exports.consultar = id => {
    return Obra
        .findOne({'@id': id})
        .exec()
}


module.exports.consultarAno = ano => {
    return Obra
        .find({anoCriacao: ano})
        .exec()
}


module.exports.consultarCompDur = function(Comp, Dur){
    return Obra
        .find({compositor: Comp, duracao: Dur})
        .exec()
}

module.exports.consultarPeriodo = periodo => {
    return Obra
        .find({periodo: per})
        .exec()
}


module.exports.compositores = () =>{
    return Obra
        .distinct('compositor')
        .exec()
}

module.exports.listarperiodos = ()=>{
    return Obra
    .distinct('periodo')
    .exec()
}

// Devolve o número de alunos na BD
module.exports.contar = () => {
    return Obra
        .countDocuments()
        .exec()
}

module.exports.inserir = Obra => {
    var novo = new Obra(Obra)
    return novo.save()
}

module.exports.remover = function(id){
    return Obra.deleteOne({_id: id})
}

module.exports.alterar = function(obras){
    return Aluno.findByIdAndUpdate({_id: obras._id}, obras, {new :true})
}
