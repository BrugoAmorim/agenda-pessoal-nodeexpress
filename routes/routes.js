
const servidor = require('../server.js').app;
const contatos = require('../src/controller/contatoscontroller.js');

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