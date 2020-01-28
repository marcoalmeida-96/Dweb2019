var express = require('express');
var router = express.Router();
var axios = require('axios')
var passport = require('passport')
var bcrypt = require('bcryptjs')
const fs = require('fs')
var jwt = require('jsonwebtoken')
const dateFormat = require('dateformat');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


router.get('/', verificaAutenticacao, function(req, res) {
  var token = jwt.sign({}, "daw2019", 
  {
      expiresIn: 3000, 
      issuer: "Servidor myAgenda"
  })
  console.log('Este é o email '+req.user.email )
  
     
    axios.get('http://localhost:5003/api/ficheiros')
    .then(dados => {
      axios.get('http://localhost:5003/utilizadores/'+ req.user.email + '?token=' + token)
      .then(dados2 => {
        
        res.render('index', {lista: dados.data,lista2: dados2.data});
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
      .catch(erro=>res.status(500).jsonp(erro))
      }) 
    

});



router.get('/perfil', verificaAutenticacao, function(req, res) {
  var token = jwt.sign({}, "daw2019", 
  {
      expiresIn: 3000, 
      issuer: "Servidor myAgenda"
  })
  console.log('Este é o email '+req.user.email )
  
     
    axios.get('http://localhost:5003/api/ficheiros')
    .then(dados => {
      axios.get('http://localhost:5003/utilizadores/'+ req.user.email + '?token=' + token)
      .then(dados2 => {
        axios.get('http://localhost:5003/api/grupos')
        .then(dados3 => {
        
          res.render('perfil', {lista: dados.data,lista2: dados2.data,lista3:dados3.data});
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
      .catch(erro=>res.status(500).jsonp(erro))
      }) 
      .catch(erro=>res.status(500).jsonp(erro))
      }) 
    

});




router.get('/disciplina/:disciplina', verificaAutenticacao, function(req, res) {


  console.log('ola')
  console.log(req.params.disciplina )
      axios.get('http://localhost:5003/api/disciplina/'+req.params.disciplina)
      .then(dados => {
        res.render('disciplina', {lista:dados.data},console.log(dados.data));
      })
      .catch(erro => {
        res.render('error', {error: erro})
      })
      
})
router.get('/ficheiros/:id', verificaAutenticacao, function(req, res) {
  var token = jwt.sign({}, "daw2019", 
  {
      expiresIn: 3000, 
      issuer: "Servidor myAgenda"
  })

  console.log('ola')
  console.log(req.params.id )
      axios.get('http://localhost:5003/api/ficheiros/'+req.params.id)
      .then(dados => {
        axios.get('http://localhost:5003/utilizadores/'+ req.user.email + '?token=' + token)
        .then(dados2 => {
          res.render('detalhes', {lista:dados.data,lista2:dados2.data},console.log(dados.data));
      })
        .catch(erro => {
          res.render('error', {error: erro})
        })
        .catch(erro=>res.status(500).jsonp(erro))
      }) 

})

router.get('/grupos/:id', verificaAutenticacao, function(req, res) {
  var token = jwt.sign({}, "daw2019", 
  {
      expiresIn: 3000, 
      issuer: "Servidor myAgenda"
  })

  console.log('ola')
  console.log(req.params.id )
      axios.get('http://localhost:5003/api/grupos/'+req.params.id)
      .then(dados => {
        axios.get('http://localhost:5003/utilizadores/'+ req.user.email + '?token=' + token)
        .then(dados2 => {
          axios.get('http://localhost:5003/utilizadores/')
          .then(dados3 => {
            axios.get('http://localhost:5003/api/ficheiros')
            .then(dados4 => {
          res.render('DetalheGrupo', {lista:dados.data,lista2:dados2.data,lista3:dados3.data,lista4:dados4.data},console.log(dados.data));
      })
        .catch(erro => {
          res.render('error', {error: erro})
        })
        .catch(erro=>res.status(500).jsonp(erro))
      }) 
      .catch(erro=>res.status(500).jsonp(erro))
      }) 
      .catch(erro=>res.status(500).jsonp(erro))
      }) 

})



/*
router.get('/api/ficheiros', verificaAutenticacao, function(req, res) {
  axios.get('http://localhost:5003')
    .then(dados => res.render('index', {lista: dados.data}))
    .catch(e => res.render('error', {error: e}))
});*/


router.get('/logout', verificaAutenticacao, function(req,res){
  req.logout()
  res.redirect('/login')
})

router.get('/login', function(req,res){
  res.render('login')
})

router.get('/contact', function(req,res){
  res.render('contact')
})


router.get('/register', function(req,res){
  res.render('registo')
})

router.post('/login', passport.authenticate('local', 
  { successRedirect: '/',
    successFlash: 'Utilizador autenticado com sucesso!',
    failureRedirect: '/login',
    failureFlash: 'Utilizador ou password inválido(s)...'
  })
)
router.post('/api/ficheiros/inserir', upload.single('ficheiro'),function(req,res){
  let data = new Date()
  if (req.file==undefined &&req.body.idGrupo!=undefined)
  {
    
  console.log('id do GRUPO'+ req.body.idGrupo)
  axios.post('http://localhost:5003/api/ficheiros/inserir', {
      idGrupo:req.body.idGrupo,
      email: req.user.email,
      //data: data.toString("yyyyMMdd"),
      data: data.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      titulo:req.body.titulo,
      desc: req.body.desc
     })
    .then(dados => res.redirect('/grupos/'+req.body.idGrupo))
    .catch(e => res.render('error', {error: e}))

  }
  else if (req.file!=undefined && req.body.disciplina==undefined)
  {
    let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/ficheiros/' + req.file.originalname

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
  })
  console.log('id do GRUPO'+ req.body.idGrupo)
  axios.post('http://localhost:5003/api/ficheiros/inserir', {
      idGrupo:req.body.idGrupo,
      email: req.user.email,
      //data: data.toString("yyyyMMdd"),
      data: data.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      titulo:req.body.titulo,
      disciplina:req.body.disciplina,
      desc: req.body.desc,
      //ficheiro:req.file
      name: req.file.originalname,
      mimetype: req.file.mimetype, 
      size: req.file.size
     })
    .then(dados => res.redirect('/grupos/'+req.body.idGrupo))
    .catch(e => res.render('error', {error: e}))
  }
  
  else
  {
    let oldPath = __dirname + '/../' + req.file.path
  let newPath = __dirname + '/../public/ficheiros/' + req.file.originalname

  fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
  })
  console.log('id do GRUPO'+ req.body.idGrupo)
  axios.post('http://localhost:5003/api/ficheiros/inserir', {
      idGrupo:req.body.idGrupo,
      email: req.user.email,
      //data: data.toString("yyyyMMdd"),
      data: data.toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      titulo:req.body.titulo,
      disciplina:req.body.disciplina,
      desc: req.body.desc,
      //ficheiro:req.file
      name: req.file.originalname,
      mimetype: req.file.mimetype, 
      size: req.file.size
     })
    .then(dados => res.redirect('/'))
    .catch(e => res.render('error', {error: e}))
  }
  
})

router.post('/api/grupos/inserir',function(req,res){
  var dataCriacao = new Date
  console.log(req.user.email,req.body.titulo + dataCriacao)
 
  axios.post('http://localhost:5003/api/grupos/inserir', {
      admin:req.user.email,
      titulo:req.body.titulo,
      id_utilizadores:req.body.id_utilizadores,
      oculto: req.body.oculto,
      data_Criacao: dataCriacao.toISOString().replace(/T/, ' ').replace(/\..+/, '')
      
     })
    .then(dados => res.redirect('/grupos'))
    .catch(e => res.render('error', {error: e}))
})
router.post('/editGrupo/:id',function(req,res){
  console.log('Estes sao os IDS para adicionar'+req.body.id_utilizadores)

  console.log(req.params.id+req.body.id_utilizadores)
   axios.post('http://localhost:5003/api/grupo/edit', {
         id:req.params.id,
         id_utilizadores:req.body.id_utilizadores
         
       })
       .then(dados => res.redirect('/grupos/'+req.params.id))
       .catch(e => res.render('error', {error: e}))
 });
 router.post('/editGrupos2/:id',function(req,res){
  console.log('estou aqui')
  console.log('Estes sao os IDS'+req.body.id_utilizadores)
  console.log(req.params.id+req.body.id_utilizadores)
   axios.post('http://localhost:5003/api/grupo/edit2', {
         id:req.params.id,
         id_utilizadores:req.body.id_utilizadores
         
       })
       .then(dados => res.redirect('/grupos/'+req.params.id))
       .catch(e => res.render('error', {error: e}))
 });




router.get('/grupos', function(req,res){
 
 /* axios.get('http://localhost:5003/api/grupos')
  .then(dados => {
      
        res.render('grupos', {lista: dados.data});
      })
  .catch(erro => {
    res.render('error', {error: erro})
  })*/
      
  var token = jwt.sign({}, "daw2019", 
  {
      expiresIn: 3000, 
      issuer: "Servidor myAgenda"
  })

  console.log('ola')
  console.log(req.user.id )
      axios.get('http://localhost:5003/api/grupos/')
      .then(dados => {
        axios.get('http://localhost:5003/utilizadores/'+ req.user.email + '?token=' + token)
        .then(dados2 => {
          axios.get('http://localhost:5003/utilizadores/')
          .then(dados3 => {
            axios.get('http://localhost:5003/api/ficheiros')
            .then(dados4 => {
          res.render('grupos', {lista:dados.data,lista2:dados2.data,lista3:dados3.data,lista4:dados4.data});
      })
        .catch(erro => {
          res.render('error', {error: erro})
        })
        .catch(erro=>res.status(500).jsonp(erro))
      }) 
      .catch(erro=>res.status(500).jsonp(erro))
      }) 
      .catch(erro=>res.status(500).jsonp(erro))
      }) 

})


router.post('/editFicheiro/:id', upload.single('ficheiro'),function(req,res){

 console.log(req.params.id)
  axios.post('http://localhost:5003/api/ficheiros/edit', {
        id:req.params.id,
        titulo:req.body.titulo,
        disciplina:req.body.disciplina,
        desc: req.body.desc,
        //ficheiro:req.file
        //name: req.body.name
        
      })
      .then(dados => res.redirect('/ficheiros/'+req.params.id))
      .catch(e => res.render('error', {error: e}))
});
router.post('/adicionaComentario/:id', upload.single('ficheiro'),function(req,res){
  let current_datetime = new Date()
  let data = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() 
  
   axios.post('http://localhost:5003/api/ficheiros/adicionaComentario', {
         id:req.params.id,
         comentario:req.body.comentario,
         dataComentario:data,
         autor: req.user.nome,
         //ficheiro:req.file
         //name: req.body.name
         
       })
       .then(dados => res.redirect('/'))
       .catch(e => res.render('error', {error: e}))
 });
 router.post('/adicionaComentarioDetalhes/:id', upload.single('ficheiro'),function(req,res){
  let current_datetime = new Date()
  let dat3 = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + ":" + current_datetime.getHours() + "-" + current_datetime.getMinutes()
  console.log('DATA: '+dat3)
  console.log(req.params.id)
   axios.post('http://localhost:5003/api/ficheiros/adicionaComentario', {
         id:req.params.id,
         comentario:req.body.comentario,
         dataComentario:dat3,
         autor:req.user.nome,
         //ficheiro:req.file
         //name: req.body.name
         
       })

       .then(dados => res.redirect('/ficheiros/'+req.params.id))
       .catch(e => res.render('error', {error: e}))
 });
 
 router.post('/api/ficheiros/comentario/apagar/:id',function(req,res){
  console.log(req.params.id)
   axios.post('http://localhost:5003/api/ficheiros/comentario/apagar/'+req.params.id,{
     id:req.params.id
   })
     .then(dados => res.redirect('/'))
     .catch(e => res.render('error', {error: e}))
 })

router.post('/api/ficheiros/apagar/:id',function(req,res){
 console.log(req.params.id)
  axios.post('http://localhost:5003/api/ficheiros/apagar/'+req.params.id,{
    id:req.params.id
  })
    .then(dados => res.redirect('/'))
    .catch(e => res.render('error', {error: e}))
})
router.post('/api/ficheiros/apagarPublicacao/:id',function(req,res){
  console.log(req.params.id)
   axios.post('http://localhost:5003/api/ficheiros/apagarPublicacao/'+req.params.id,{
     id:req.params.id
   })
     .then(dados => res.redirect('/grupos'))
     .catch(e => res.render('error', {error: e}))
 })
router.post('/api/grupos/apagar/:id',function(req,res){
  console.log(req.params.id)
   axios.post('http://localhost:5003/api/grupos/apagar/'+req.params.id,{
     id:req.params.id
   })
     .then(dados => res.redirect('/grupos'))
     .catch(e => res.render('error', {error: e}))
 })


router.post('/edit',function(req, res, next) {

  console.log(req.user._id)
  console.log(req.body.email)
  
  
  
    axios.post('http://localhost:5003/utilizadores/edit',{
      id:req.user._id,
      email:req.body.email,
      nome:req.body.nome,
      localidade:req.body.localidade

  })
    .then(dados => res.redirect('perfil'))
    .catch(e => res.render('error', {error: e}))
    
     
 
})




router.get('/download/:fnome', function(req, res){
  res.download( __dirname + '/../public/ficheiros/' + req.params.fnome )
})


router.post('/reg', function(req,res){
  var hash = bcrypt.hashSync(req.body.password, 10);
  axios.post('http://localhost:5003/utilizadores/inserir', {
    email: req.body.email,
    nome: req.body.nome,
    data_Nasc:req.body.data_Nasc,
    localidade:req.body.localidade,
    genero:req.body.genero,
    password: hash
  })
  
  .then(dados => res.redirect('/login'))
  .catch(e => res.render('errorMail', {error: e},console.log(error)))

})



function verificaAutenticacao(req,res,next){
  if(req.isAuthenticated()){
  //req.isAuthenticated() will return true if user is logged in
    next();
  } else{
    res.redirect("/login");}
}

module.exports = router;
