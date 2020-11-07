var http = require('http');

var fs = require('fs');


var servidor = http.createServer(function(req,res) {
if((req.url.match(/arqs\/\W/)) || (req.url.match(/arqs\/[0-9]+/)|| (req.url.match(/arqs\/arq[0-9]+/) || (req.url.match(/arqs\/index.html/))))){
    
      
       var  num = req.url.split("/")[2]
       
        if ((num.match(/\*/)) || (num.match(/index.html/))){
            num = "index"
        }
       
        else if(num.match(/\arq[0-9]+\.html/)){
            num = num.split(".")[0];
            
            var length = num.length;
               
          num = "arq" + num.slice((length-(length-3)))   
          
          }
          
        else num = "arq" + num

       

        fs.readFile('arqweb/' + num+ '.html',function(err,data){
            if(err){
                console.log('ERRO NA LEITURA DO FICHEIRO: '+ err)
            
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write("<p> Ficheiro inexistente. </p>")
            res.end()
        }
     
        else{
         res.writeHead(200,{'Content-Type':'text/html'})
         res.write(data)
         res.end()
        }
        
        })
    }

    else{
        console.log('ERRO: Foi pedido um ficheiro não esperado')
        res.writeHead(200,{'Content-Type':'text/html'})
            res.write("<p> Ficheiro inexistente. </p>")
            res.end()

    }
    
  
})
servidor.listen(7777)
console.log('Servidor *a escuta na porta 7777')