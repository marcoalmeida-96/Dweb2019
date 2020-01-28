var Ficheiro = require('../models/ficheiros')
module.exports.listar = () => {
    return Ficheiro
        .find().sort( { data: -1 } )
        .exec()
}
module.exports.consultar_Disc = disciplina => {
    return Ficheiro
        .find({disciplina:disciplina})
        .sort( { data: -1 } )
        .exec()
}
module.exports.consultar_Ficheiro = id => {
    return Ficheiro
        .findOne({_id:id})
        .exec()
}
module.exports.inserir = u =>{
    var novo = new Ficheiro(u)
    
   
  
    return novo.save(function (err, Ficheiro) {
        if (err) return console.error(err);
        else
          console.log(Ficheiro.desc + Ficheiro.name+' foi gravado com sucesso.'+Ficheiro.disciplina)
      });
}
module.exports.editar = (id,obj) => {
    return Ficheiro
        .findOneAndUpdate({_id: id},obj)
        .exec()

        
}
module.exports.editar2 = (id,obj) => {
    return Ficheiro
        .findOneAndUpdate({_id: id},{$addToSet:{comentarios:obj}})
        .exec()

        
}


module.exports.apagar = u => {
    console.log(u+ ' foi apagado com sucesso.')
    return Ficheiro
    .remove({_id:u})
    .exec()
}
module.exports.apagar2 = u => {
    console.log(u+ ' comentario foi apagado com sucesso.')
    return Ficheiro
    .update({'comentarios.$._id':u},{$unset:{comentarios:1}})
    .exec()
}