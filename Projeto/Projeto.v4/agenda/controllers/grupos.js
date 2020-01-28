var Grupo = require('../models/grupos')

module.exports.inserir = g =>{
    var novo = new Grupo(g)
    return novo.save(function (err, Grupo) {
        if (err) return console.error(err);
        else
          console.log(Grupo.titulo+' foi gravado com sucesso.')
      });
}
module.exports.listar = () => {
    return Grupo
        .find()
        .sort({data_Criacao:-1})
        .exec()
}
module.exports.editar = (id,obj) => {
    return Grupo
        .findOneAndUpdate({_id: id},{$addToSet:obj},console.log('OI'+obj))
        .exec()
       
        
}
module.exports.editar2 = (id,obj) => {
    return Grupo
    
        .findOneAndUpdate({_id: id},{$pull:obj},console.log('OI'+obj))
        .exec()
       
        
}
module.exports.consultar_Grupo = id => {
    return Grupo
        .findOne({_id:id})
        .exec()
}
module.exports.apagar = u => {
    console.log(u+ ' foi apagado com sucesso.')
    return Grupo
    .remove({_id:u})
    .exec()
}