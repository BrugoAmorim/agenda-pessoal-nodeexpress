
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(express.static(__dirname + '/public'));

// Configurações handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', '../views');

// Configurações method-override
const methodOverride = require('method-override');
app.use(methodOverride('method'));

module.exports = { app };

app.listen(3000, () => {

    console.log("Link do servidor: http://localhost:3000/");
})