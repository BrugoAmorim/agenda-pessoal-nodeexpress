
const servidor = require('../server.js').app;

//Models do banco de dados
const db = require('../src/models/bd.js').mongoose;
const ModelContatos = require('../src/models/contatos.js').SchemaContatos;

servidor.get('/', async (req, res) => {

    const contatos = db.model('contatos', ModelContatos);
    const docs = await contatos.find({}).lean().exec();

    res.render('home', { dados: docs })
})

//functions contatos
servidor.get('/adicionar', (req, res) => {

    res.render('adicionarctt');
})

servidor.post('/salvar-ctt', async (req, res) => {

    const contatos = db.model('contatos', ModelContatos);
    const { contato, celular, telefone, email, cidade, estado, notas } = req.body;

    await contatos.create({ contato, celular, telefone, email, cidade, estado, notas });
    res.redirect('/')
})