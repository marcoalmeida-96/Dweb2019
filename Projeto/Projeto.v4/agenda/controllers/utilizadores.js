var Utilizador = require('../models/utilizadores')

module.exports.listar = () => {
    return Utilizador
        .find()
        .exec()
}

module.exports.consultar = email => {
    return Utilizador
        .findOne({email: email})
        .exec()
}
module.exports.editar = (id,obj) => {
    return Utilizador
        .findOneAndUpdate({_id: id},obj)
        .exec()

        
}

module.exports.inserir = u => {
    console.log(u.email)
    console.log('nao posso entrar aqui')
    var novo = new Utilizador(u)
     novo.save(function(err,novo){
                
                if (err) {
                    console.log(err.message);
                    console.log(err)
                    return err
                    
                }
                
            });
            return novo.save()
    

            
            
    
}