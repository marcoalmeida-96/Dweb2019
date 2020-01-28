var express = require('express');
var router = express.Router();
var Utilizadores = require('../controllers/utilizadores')
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res) {
  Utilizadores.listar()
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.get('/:email', passport.authenticate('jwt', {session: false}), function(req, res) {
  Utilizadores.consultar(req.params.email)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.post('/edit',function(req, res, next) {
  console.log('Editar o utilizador '+req.body.id +req.body.email+req.body.nome)
  Utilizadores.editar(req.body.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  
});



router.post('/inserir', function(req,res){
  console.log(req.body.email+req.body.nome+req.body.data_Nasc+req.body.localidade+req.body.genero)
  
 
      console.log('A introduzir utilizador')
      Utilizadores.inserir(req.body)
      .then(dados1 => res.jsonp(dados1))
      .catch(e => res.jsonp(e))
   
   
  
})
router.post('/consultar', function(req,res){
  Utilizadores.consultar(req.params.email)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
})
module.exports = router;
