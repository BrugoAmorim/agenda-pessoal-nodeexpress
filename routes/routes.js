
const servidor = require('../server.js').app;

servidor.get('/', (req, res) => {

    res.render('home');
})