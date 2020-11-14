var http = require('http')
var axios = require('axios')

http.createServer(function (req, res) {
    console.log(req.method + ' ' + req.url)
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Escola de Música</h2>')
            res.write('<ul>')
            res.write('<li><a href="/alunos">Lista de Alunos</a></li>')
            res.write('<li><a href="/cursos">Lista de Cursos</a></li>')
            res.write('<li><a href="/instrumentos">Lista de Instrumentos</a></li>')
            res.write('</ul>')
            res.end()
        }
        else if(req.url == '/alunos'){
            axios.get('http://localhost:3000/alunos')
            .then(function (resp) {
                alunos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Alunos</h2>')
                res.write('<ul>')
            
                alunos.forEach(a => {
                   
                    res.write(`<li> <a href="/alunos/${a.id}"> ${a.id} </a>  </li>`)
                });
                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de alunos: ' + error);
            }); 
        }
       
    

        else if(req.url== '/cursos'){
            axios.get('http://localhost:3000/cursos')
            .then(function (resp) {
                cursos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de Cursos</h2>')
                res.write('<ul>')
            
                cursos.forEach(c => {
                   
                    res.write(`<li> <a href="/cursos/${c.id}"> ${c.id} </a>  </li>`)
                   
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de cursos: ' + error);
            }); 
        }

        else if(req.url== '/instrumentos'){
            axios.get('http://localhost:3000/instrumentos')
            .then(function (resp) {
                instrumentos = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Escola de Música: Lista de instrumentos</h2>')
                res.write('<ul>')
            
                instrumentos.forEach(i => {
                    res.write(`<li>  ${i.id} - ${i.text} : <a href="/instrumentos/${i.id}" ${i.id} > </li>`)
                   
                });

                res.write('</ul>')
                res.write('<address>[<a href="/">Voltar</a>]</address>')
                res.end()
            })
            .catch(function (error)  {
                console.log('Erro na obtenção da lista de instrumentos: ' + error);
            }); 
        }
        else if (req.url.match (/alunos\/\A[0-9]+/)){
            var aluno = req.url.split("/")[2]
            axios.get(`http://localhost:3000/alunos/`+aluno)
            .then(function (resp) {
                a = resp.data;
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<h2>Informação do aluno</h2>')
                res.write('<ul>')
                    res.write(`<li> Id :${a.id} </li>`)
                    res.write(`<li> Nome : ${a.nome} </li>`)
                    res.write(`<li> Data de Nascimento : ${a.dataNasc} </li>`)
                    res.write(`<li> Curso : <a href="/cursos/${a.curso}"> ${a.curso}</a>  </li>`)
                    res.write(`<li> Ano de curso : ${a.anoCurso} </li>`)
                    res.write(`<li> Instrumento: ${a.instrumento}</a> </li>`)
                    
                    
                res.write('</ul')
                res.write('<address>[<a href="/alunos">Voltar aos alunos</a>]</address>')
            res.end()
            
        })
        .catch(function (error)  {
            console.log('Erro na obtenção da lista de alunos: ' + error);
        }); 
    }
    else if (req.url.match (/cursos\/\C[A-Z][0-9]+/)){
        var curso = req.url.split("/")[2]
        axios.get(`http://localhost:3000/cursos/`+curso)
        .then(function (resp) {
            a = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write('<h2>Informação do Curso</h2>')
            res.write('<ul>')
                res.write(`<li> Id :${a.id} </li>`)
                res.write(`<li> Designação: ${a.designacao} </li>`)
                res.write(`<li> Duração : ${a.duracao} </li>`)
                res.write(`<li> Instrumento: <a href="/instrumentos/${a.instrumento.id}">${a.instrumento.text}</a> </li>`)
               
                
            res.write('</ul')
            res.write('<address>[<a href="/cursos">Voltar aos cursos</a>]</address>')
            res.end()
    })
    .catch(function (error)  {
        console.log('Erro na obtenção da lista de alunos: ' + error);
    }); 
}
else if ((req.url.match (/instrumentos\/I[0-9]+/) )|| (req.url.match(/instrumentos\/X[0-9]+/))){
    var instrumento = req.url.split("/")[2]
    axios.get(`http://localhost:3000/instrumentos/`+instrumento)
    .then(function (resp) {
        a = resp.data;
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        res.write('<h2>Informação do Instrumento</h2>')
        res.write('<ul>')
            res.write(`<li> Id :${a.id} </li>`)
            res.write(`<li> Nome: ${a.text} </li>`)
            
        res.write('</ul')
        res.write('<address>[<a href="/instrumentos">Voltar aos instrumentos</a>]</address>')
        res.end()
})
.catch(function (error)  {
    console.log('Erro na obtenção da lista de alunos: ' + error);
}); 
}
}
    else{
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write("<p>Pedido não suportado: " + req.method + " " + req.url + "</p>")
        res.end()
    }
    
}).listen(4000)

console.log('Servidor à escuta na porta 4000...')
