var express = require('express');
var router = express.Router();
var obras = require('../controllers/obras')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.query.compositor != undefined && req.query.duracao != undefined){
    obras.consultarCompDur(req.query.compositor, req.query.duracao)
      .then(dados => res.json(dados))
      .catch(erro => res.status(500).json(erro))
  }
  if(req.query.per!=undefined){
    obras.consultarPeriodo(req.query.per)
      .then(dados => res.json(dados))
      .catch(erro => res.status(500).json(erro))
  }

  if (req.query.ano==undefined){
    obras.listar()
    .then(dados => res.json(dados))
    .catch(erro => res.status(500).json(erro))
  }
  if(req.query.ano!=undefined){
    obras.consultarAno(req.query.ano)
      .then(dados => res.json(dados))
      .catch(erro => res.status(500).json(erro))
  }
  
});



router.get('/compositores', function(req,res){
  obras.compositores()
    .then(dados => res.json(dados))
    .catch(erro => res.status(500).json(erro))
})



router.get('/periodos', function(req, res){
  obras.listarperiodos()
  .then(dados => res.json(dados))
  .catch(erro => res.status(500).json(erro))
})


router.get('/:id', function(req, res){
  obras.consultar(req.params.id)
  .then(dados => res.json(dados))
  .catch(erro => res.status(500).json(erro))
})

router.get('')

module.exports = router;
