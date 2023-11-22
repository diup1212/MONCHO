require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const connectDB = require('./server/config/database')

const app = express();
const port = 8000 || process.env.port;    //  'port = 8000' es la instrucción que asigna dónde se mostrará el contenido del proyecto...

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}));

app.use(express.static('public'));

app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./server/routes/main'));    // en esta línea especificamos que el contenido de las páginas sea obtenido de 'server/routes/main'...
app.use('/', require('./server/routes/logedin'));

app.listen(port, () => {
    console.log(`App listening on port ${ port }`)
});