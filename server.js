
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Configurando handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', '../views');

app.use(express.static(__dirname + '/public'));

module.exports = { app };

app.listen(3000, () => {

    console.log("Link do servidor: http://localhost:3000/");
})