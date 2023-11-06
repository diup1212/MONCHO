require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/database')

const app = express();
const port = 8000 || process.env.port;    //  'port = 8000' es la instrucción que asigna dónde se mostrará el contenido del proyecto...

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));    // en esta línea especificamos que el contenido de las páginas sea obtenido de 'server/routes/main'...

app.listen(port, () => {
    console.log(`App listening on port ${ port }`)
});