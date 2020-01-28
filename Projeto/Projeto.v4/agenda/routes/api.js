var express = require('express');
var router = express.Router();
const fs = require('fs')
var Ficheiros = require('../controllers/ficheiros')
var Grupos = require('../controllers/grupos')
var Ficheiro = require('../models/ficheiros')

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET da lista de ficheiros */
router.get('/ficheiros',function(req, res) {
    //console.log('estou aqui')
    Ficheiros.listar()
      .then(dados => res.jsonp(dados))
      .catch(erro => res.status(500).jsonp(erro))
})
router.get('/grupos',function(req, res) {
  //console.log('estou aqui')
  Grupos.listar()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro))
})
router.get('/disciplina/:disciplina', function(req, res) {
  Ficheiros.consultar_Disc(req.params.disciplina)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});
router.get('/ficheiros/:id', function(req, res) {
  Ficheiros.consultar_Ficheiro(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});
router.get('/grupos/:id', function(req, res) {
  Grupos.consultar_Grupo(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(e => res.status(500).jsonp(e))
});

router.post('/ficheiros/inserir', function(req,res){
    
    
  console.log('estou aqui 123')
  console.log('estou aqui '+req.body.titulo)
  
  Ficheiros.inserir(req.body,req.file)
  res.redirect('/')
    //.then(res.redirect('/'))
    //.catch(e => res.status(500).jsonp(e))
    
  

})
router.post('/grupos/inserir', function(req,res){
    
    
  console.log('estou aqui '+req.body.titulo + req.body.oculto+req.body.data_Criacao,req.body.admin)
  
  Grupos.inserir(req.body)
  res.redirect('/')
    //.then(res.redirect('/'))
    //.catch(e => res.status(500).jsonp(e))
    
  

})
router.post('/ficheiros/apagar/:id', function(req,res){
    
    
  console.log('estou aqui APAGAR')
  
  Ficheiros.apagar(req.params.id)
  res.redirect('/')
    //.then(res.redirect('/'))
    //.catch(e => res.status(500).jsonp(e))
    
  

})
router.post('/ficheiros/apagarPublicacao/:id', function(req,res){
    
    
  console.log('estou aqui APAGAR')
  
  Ficheiros.apagar(req.params.id)
  res.redirect('/')
    //.then(res.redirect('/'))
    //.catch(e => res.status(500).jsonp(e))
    
  

})
router.post('/ficheiros/comentario/apagar/:id', function(req,res){
    
    
  console.log('estou aqui APAGAR')
  
  Ficheiros.apagar2(req.params.id)
  res.redirect('/')
    
    
  

})
router.post('/grupos/apagar/:id', function(req,res){
    
    
  console.log('estou aqui APAGAR')
  
  Grupos.apagar(req.params.id)
  res.redirect('/')
    //.then(res.redirect('/'))
    //.catch(e => res.status(500).jsonp(e))
    
  

})

router.post('/ficheiros/edit',function(req, res, next) {
  console.log('Editar o ficheiro '+req.body.id +req.body.disciplina+req.body.desc+req.body.name)
  Ficheiros.editar(req.body.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  
});
router.post('/ficheiros/adicionaComentario',function(req, res, next) {
  console.log('Adicionar Comentario '+req.body.id +req.body.comentario+req.body.dataComentario+req.body.autor)
  Ficheiros.editar2(req.body.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  
});
router.post('/grupo/edit',function(req, res, next) {
  console.log('Editar o ficheiro '+req.body.id +req.body.id_utilizadores)
  Grupos.editar(req.body.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  
});
router.post('/grupo/edit2',function(req, res, next) {
  console.log('IDS DOS UTILIZADORES'+req.body.id_utilizadores)
  console.log('Editar o ficheiro '+req.body.id +req.body.id_utilizadores)
  Grupos.editar2(req.body.id,req.body)
  .then(dados => res.jsonp(dados))
  .catch(e => res.status(500).jsonp(e))
  
});


module.exports = router;
