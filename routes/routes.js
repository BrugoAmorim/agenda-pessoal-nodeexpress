
const servidor = require('../server.js').app;
const contatos = require('../src/controller/contatoscontroller.js');

// Home
servidor.get('/', contatos.verContatos);

// Rotas para gerenciar os contatos
servidor.get('/adicionar', (req, res) => {
    res.render('adicionarctt');
})

servidor.get('/atualizar-informacoes/:id', async (req, res) => {

    const db = require('../src/models/bd').mongoose; 
    const modelContatos = require('../src/models/contatos').SchemaContatos;
    const contatos = db.model('contatos', modelContatos);

    const _id = req.params.id;
    let docs = await contatos.find({ _id }).lean().exec();
    
    res.render('editarinfoctt', { Docs: docs, id: _id });
})

servidor.post('/salvar-ctt', contatos.salvarContatos);

servidor.delete('/apagar-ctt/:id', contatos.apagarContatos);

servidor.put('/editar-info/:id', contatos.editarInfoContato);