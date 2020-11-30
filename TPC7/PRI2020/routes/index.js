var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
});

router.get('/alunos', (req, res) => {
    Aluno.listar()
      .then(dados => res.render('alunos', {lista: dados}))
      .catch(e => res.render('error', {error: e}))
})


router.get('/alunos/:id', (req, res) => { 
  
  Aluno.consultar(req.params['id'])
    .then(dados => res.render('aluno', {a: dados}))
    .catch(e => res.render('error', {error: e}))
    
})

router.get('/alunos/delete/:id', (req, res) => { 
  
  Aluno.eliminar(req.params['id'])
    .then(dados => res.render('eliminado'))
    .catch(e => res.render('error', {error: e}))
    
})


module.exports = router;
