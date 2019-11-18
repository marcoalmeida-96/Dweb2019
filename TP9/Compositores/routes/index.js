var express = require('express');
var router = express.Router();

var Compositores= require('../controllers/compositores')

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.query.periodo==undefined && req.query.ano==undefined&&req.query.anoObito==undefined) 
 {
   Compositores.listar()
   .then(dados => res.jsonp(dados))
   .catch(erro => res.status(500).jsonp(erro))
 }
 if (req.query.periodo==undefined && req.query.ano!=undefined&&req.query.anoObito==undefined) 
 {
  Compositores.listar_Data_Nasc(req.query.ano)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

 }
 if (req.query.periodo==undefined && req.query.ano==undefined&&req.query.anoObito!=undefined) 
 {
  Compositores.listar_Data_Obito(req.query.anoObito)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

 }
 if (req.query.periodo!=undefined && req.query.ano==undefined&&req.query.anoObito==undefined) 
 {
  Compositores.listar_Periodo(req.query.periodo)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

 }
 if (req.query.periodo!=undefined && req.query.ano!=undefined&&req.query.anoObito==undefined) 
 {
  Compositores.listar_Periodo_ano(req.query.periodo,req.query.ano)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))

 }
});
//ID tem de ficar em ultimo para não estragar os outros
router.get('/:idCompositor', function(req, res) {
  Compositores.consultar(req.params.idCompositor)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;