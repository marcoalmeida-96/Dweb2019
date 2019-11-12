var express = require('express');
var router = express.Router();
var axios = require('axios')
const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzM0ODgwMDgsImV4cCI6MTU3NjA4MDAwOH0.UD0UdMrzKcWDop8HlwqdeOuK_ZzZxHvOMOP2DMkIjUQ'
/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get('http://clav-api.dglab.gov.pt/api/entidades?apikey='+ apikey)
  .then(dados=>res.render('index',{lista:dados.data}))
  .catch(erro=>res.status(500).jsonp(erro))
})

router.get('/:id',function(req,res,next){
  console.log(req.params.id)
  axios.get('http://clav-api.dglab.gov.pt/api/entidades/'+ req.params.id + '?apikey='+ apikey)
  .then(dados=>{
    axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/tipologias?apikey='+ apikey)
    .then(dadostipo=>{
      axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/dono?apikey='+ apikey)
      .then(dadosinte=>{
        axios.get('http://clav-api.dglab.gov.pt/api/entidades/' + req.params.id + '/intervencao/participante?apikey='+ apikey)
        .then(dadospart=>{
          res.render('indi',{lista:dados.data,lista1:dadostipo.data,lista2:dadosinte.data,lista3:dadospart.data})
        })
        .catch(erro=>{
          res.jsonp(erro)
        })
      })
      .catch(erro=>{
        res.jsonp(erro)
      })
    })
    .catch(erro=>{
      res.jsonp(erro)
    })
  })
  .catch(erro=>{
    res.jsonp(erro)
  })
})


module.exports = router;
