
const servidor = require('../server.js').app;

// controllers
const contatos = require('../src/controller/contatoscontroller.js');
const blocodenotas = require('../src/controller/blocodenotascontroller.js');
const categorias = require('../src/controller/categoriascontroller.js');

// Home
servidor.get('/', (req, res) => {
    res.render('home');
})

// Rotas para gerenciar os contatos
servidor.get('/agenda-contatos', contatos.verContatos);

servidor.post("/novo-contato", contatos.salvarContatos);

servidor.get('/informacoes-contato/:id', async (req, res) => {

    const db = require('../src/models/bd').mongoose; 
    const modelContatos = require('../src/models/contatos').SchemaContatos;
    const contatos = db.model('contatos', modelContatos);

    const _id = req.params.id;
    let docs = await contatos.findOne({ _id }).lean().exec();
   
    res.render('infocontato', { Docs: docs, id: _id });
})

servidor.put('/editar-informacoes/:id', contatos.editarInfoContato)

servidor.delete('/apagar-contato/:id', contatos.apagarContato)

// Rotas para gerenciar as funcionalidades do bloco de notas
servidor.get('/agenda-blocodenotas', blocodenotas.buscarAnotacoes)

servidor.get('/criar-anotacao', async (req, res) => {

    res.render('criaranotacao');
});

servidor.get('/detalhes-anotacao/:id', async (req, res) => {

    const db = require('../src/models/bd').mongoose;
    const SchemaBloconotas = require('../src/models/blocodenotas').SchemaBloconotas;
    const Bloconotas = db.model('blocodenotas', SchemaBloconotas);

    const utils = require('../src/utils/bloconotasutils');

    const doc = utils.criarModel(await Bloconotas.findOne({ _id: req.params.id }));
    res.render('informacoesanotacao', { Campos: doc });
})

servidor.post('/adicionar', blocodenotas.novaAnotacao);

servidor.put('/editar-texto/:id', blocodenotas.editarAnotacao);

servidor.delete('/apagar-texto/:id', blocodenotas.apagarAnotacao);

// Rotas para gerenciar os metodos categorias
servidor.get('/agenda-listadetarefas', categorias.listarCategorias);

servidor.post('/adicionar-categoria', categorias.adicionarCategoria);