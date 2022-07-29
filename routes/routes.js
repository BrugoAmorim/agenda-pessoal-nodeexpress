
const server = require('../server.js').app;

// controllers
const blocodenotas = require('../src/controller/blocodenotascontroller.js');
const categorias = require('../src/controller/categoriascontroller.js');
const contatos = require('../src/controller/contatoscontroller.js');
const tarefas = require('../src/controller/tarefascontroller.js');

// Home
server.get('/', (req, res) => {
    res.render('home');
})

// Rotas para gerenciar os contatos
server.get('/agenda-contatos', contatos.verContatos);

server.post("/novo-contato", contatos.salvarContatos);

server.get('/informacoes-contato/:id', async (req, res) => {

    const db = require('../src/models/bd').mongoose; 
    const modelContatos = require('../src/models/contatos').SchemaContatos;
    const contatos = db.model('contatos', modelContatos);

    const _id = req.params.id;
    let docs = await contatos.findOne({ _id }).lean().exec();
   
    res.render('infocontato', { Docs: docs, id: _id });
})

server.put('/editar-informacoes/:id', contatos.editarInfoContato)

server.delete('/apagar-contato/:id', contatos.apagarContato)

// Rotas para gerenciar as funcionalidades do bloco de notas
server.get('/agenda-blocodenotas', blocodenotas.buscarAnotacoes)

server.get('/criar-anotacao', async (req, res) => {

    res.render('criaranotacao');
});

server.get('/detalhes-anotacao/:id', async (req, res) => {

    const db = require('../src/models/bd').mongoose;
    const SchemaBloconotas = require('../src/models/blocodenotas').SchemaBloconotas;
    const Bloconotas = db.model('blocodenotas', SchemaBloconotas);

    const utils = require('../src/utils/bloconotasutils');

    const doc = utils.criarModel(await Bloconotas.findOne({ _id: req.params.id }));
    res.render('informacoesanotacao', { Campos: doc });
})

server.post('/adicionar', blocodenotas.novaAnotacao);

server.put('/editar-texto/:id', blocodenotas.editarAnotacao);

server.delete('/apagar-texto/:id', blocodenotas.apagarAnotacao);

// Rotas para gerenciar os metodos categorias
server.get('/agenda-listadetarefas', categorias.listarCategorias);

server.post('/adicionar-categoria', categorias.adicionarCategoria);

server.put('/editar-categoria/:id', categorias.editarCategoria);

server.delete('/apagar-categoria/:idcategoria', categorias.apagarCategoria);

// Rotas para gerenciar os metodos tarefas
server.get('/minhas-tarefas/', tarefas.buscarminhasTarefas);