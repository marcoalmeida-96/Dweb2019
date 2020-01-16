var Obra = require('../models/obras')


module.exports.listarObras = () => {
    return Obra
        .find({},{_id: 1, titulo: 1, tipo: 1, compositor: 1})
        .exec()
}


module.exports.listarTipos = () => {
    return Obra
        .find({},{tipo:1})
        .distinct('tipo')
        .exec()
}

module.exports.CompositorObras = (compositor) => {
    return Obra
        .find({compositor:compositor})
        .exec()
}


module.exports.ObraInstrumento = (instrumento) => {
    return Obra
        .find({instrumento:instrumento})
        .exec()
}


module.exports.consultar = id => {
    return Obra
        .findOne({_id: id})
        .exec()
}


module.exports.ObrasQuant = () => {
    return Obra
        .find({},{_id: 1, titulo: 1, partitura: 1})
        .exec()
}

