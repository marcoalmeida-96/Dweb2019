var http = require ('http')
var fs=require('fs')
var myserver= http.createServer(function(req,res){

        var pedidos = req.url.split('/')
        var pag =pedidos[pedidos.length-1]

        var file =".//XML//" + pag 
        console.log(file)
        
        fs.readFile(file,function(err, data){
            if(err)
            {
                res.writeHead(200,{'content-Type': 'text/html'})
                res.write("Ficheiro Inexistente: " + pag)
                res.end()
            }
            else{
            res.writeHead(200,{'content-Type': 'xml'})
            res.write(data)
            res.end()
            }
        })
    
    


})
myserver.listen(7777)