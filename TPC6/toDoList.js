var http = require('http')
var axios = require('axios')
var fs = require('fs')
var {parse} = require('querystring')



function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}



function geraPagina(type){
    let pagHtml = 
    `
   <html>
   <head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
       <title>To Do List</title>
       <meta charset="utf-8">
       <!-- mudar o href deste link-->
       <link rel="stylesheet" href="Registo%20de%20um%20aluno_ficheiros/w3.htm">
   </head>
   <body>
       <h1> Lista de tarefas</h1>
       <div class="w3-container w3-teal">
           <h2>Nova Tarefa</h2>
       </div>
         
         <form class="w3-container" action="/tarefasPendentes" method="POST">
         <p>
         <label class="w3-text-teal"><b>Id</b></label>
         <input class="w3-input w3-border w3-light-grey" type="text" name="id">
         </p>
           <p>
           <label class="w3-text-teal"><b>Descrição</b></label>
           <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
           </p>
           <p>
           <label class="w3-text-teal"><b>Responsável</b></label>
           <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">
           </p>
       <p>
           <label class="w3-text-teal"><b>Data Limite</b></label>
           <input class="w3-input w3-border w3-light-grey" type="text" name="dataLimite">
       </p>  
           <input class="w3-btn w3-blue-grey" type="submit" value="Registar">
           <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"> 
         </form>

         <div class="w3-container w3-teal">
           <h3>Tarefas pendentes</h3>
       </div>
         
       <!-- Necessário mudar este action e o method pode ou não ser--> ` 

    
    switch(type){
        case "tarefasPendentes" : 
        tarefasPendentes.forEach( tp => {
            pagHtml += `
            
            <p> id Tarefa : ${tp.idTarefa} </p> 
            <p> Descrição : ${tp.descricao} </p>
            <p> Responsável : ${tp.responsavel} </p>
            <p> Data limite : ${tp.dataLimite} </p> 
        
            </body>
                </html>
                `
                });

         case "tarefasResolvidas" : 
            tarefas.forEach( tp => {
                pagHtml += `   
                    <p> id Tarefa : ${tp.idTarefa} </p> 
                    <p> Descrição : ${tp.descricao} </p>
                    <p> Responsável : ${tp.responsavel} </p>
                    <p> Data limite : ${tp.dataLimite} </p> 
                
                    </body>
                        </html>
                        `
                        });
    
             case "tarefasPendentes" : 
                tarefasCanceladas.forEach( tp => {
                    pagHtml += `   
                            <p> id Tarefa : ${tp.idTarefa} </p> 
                            <p> Descrição : ${tp.descricao} </p>
                            <p> Responsável : ${tp.responsavel} </p>
                            <p> Data limite : ${tp.dataLimite} </p> 
                        
                            </body>
                                </html>
                                `
                                });
                            }

    return pagHtml
   
}

var toDoListServer = http.createServer(function (req, res) {
    
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    
    switch(req.method){
        case "GET": 
            // GET /tarefas --------------------------------------------------------------------
            if((req.url == "/") || (req.url == "/tarefas")){
                
                axios.get("http://localhost:3000/tarefasPendentes")
                    .then(response => {
                         tarefasPendentes = response.data
            
                         res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                         res.write(geraPagina(tarefasPendentes))
                         res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter as tarefasPendentes...")
                        res.end()
                    })
                
                
                    axios.get("http://localhost:3000/tarefasResolvidas")
                    .then(response => {
                        tarefasResolvidas = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                         res.write(geraPagina(tarefasResolvidas))
                         res.end()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter as tarefasResolvidas...")
                        res.end()
                    });
                
                    axios.get("http://localhost:3000/tarefasCanceladas")
                    .then(response => {
                        tarefasCanceladas = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagina(tarefasCanceladas))
                        res.end()
                        
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter as tarefas Canceladas...")
                        res.end()
                    });
                
            }
            // GET /tarefaspendentes --------------------------------------------------------------------
            else if((req.url == "/tarefasPendentes")){
                
                axios.get("http://localhost:3000/tarefasPendentes")

                    .then( response => {
                        
                       
                        tarP = response.data
                        let tarefasP = ` `
                        tarP.forEach(t => {
                            
                            tarefasP += ` <p>  id : ${t.id} </p> `
                       

                        });
                        geraPagina += tarefasP
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagina());
                        res.end()
                        
                       
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Não foi possível obter o registo de aluno...")
                        res.end()
                    })
            }
            // GET /alunos/registo --------------------------------------------------------------------
            else if(req.url == "/alunos/registo"){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write(geraFormAluno(d))
                res.end()
            }
            // GET /w3.css ------------------------------------------------------------------------
            else if(/w3.css$/.test(req.url)){
                fs.readFile("w3.css", function(erro, dados){
                    if(!erro){
                        res.writeHead(200, {'Content-Type': 'text/css;charset=utf-8'})
                        res.write(dados)
                        res.end()
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
                if(req.url == '/tarefas'){
                    //adicionar função para fazer um post no tarefas
                   recuperaInfo(req,function(info) /*pode ser info => */{
                   console.log('POST de tarefa'+JSON.stringify(info))

                axios.post("http://localhost:3000/tarefas/",info)
                    .then( response => {
                        let a = response.data
                    
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Erro no POST")
                        res.write('<p><a href="/">Voltar</a></p>')
                        res.end()
                    })
                   })
                   
                   
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                   
                    res.write('<p>Recebi um POST dum aluno</p>')
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()
                }
                else {
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p> POST"+req.url +" não suportado neste serviço.</p>")
                    res.end()

                    
                }
            
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end()
    }
})

toDoListServer.listen(7779)
console.log('Servidor à escuta na porta 7779...')