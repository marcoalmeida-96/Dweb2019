var express = require('express');
var router = express.Router();
var Obras= require('../controllers/obras')


/* GET home page. */
router.get('/obras', function(req, res) {

  if(req.query.compositor != undefined && req.query.instrumento == undefined)
  {
    Obras.CompositorObras(req.query.compositor)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }

  if(req.query.compositor == undefined && req.query.instrumento != undefined)
  {
    Obras.ObraInstrumento(req.query.instrumento)
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
  }


  Obras.listarObras()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/tipos', function(req, res) {
  Obras.listarTipos()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/obrasQuant', function(req, res) {
  Obras.ObrasQuant()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

router.get('/obras/:id', function(req, res) {
  Filmes.consultarObra(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})

module.exports = router;
