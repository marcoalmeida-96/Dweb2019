var Compositor = require('../models/compositores')

module.exports.listar = () => {
    return Compositor
        .find()
        .exec()
}
module.exports.listar_Data_Nasc = (ano) => {
    return Compositor
        .find({dataNasc:ano})
        .exec()
}
module.exports.listar_Data_Obito = (anoObito) => {
    return Compositor
        .find({dataObito:anoObito})
        .exec()
}
module.exports.listar_Periodo = (Periodo) => {
    return Compositor
        .find({periodo:Periodo})
        .exec()
}
module.exports.listar_Periodo_ano = (Periodo,ano) => {
    return Compositor
        .find({periodo:Periodo,dataNasc:ano})
        .exec()
}
module.exports.consultar = id => {
    return Compositor
        .findOne({"@id": id})
        .exec()
}