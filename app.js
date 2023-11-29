require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors=require('cors');
const MongoStore = require('connect-mongo')


const connectDB = require('./server/config/database')
const auth = require('./server/routes/auth');  // Include the 'auth' module

const app = express();
//const port = 8000 || process.env.port;
const port = process.env.PORT || 8000;
    //  'port = 8000' es la instrucción que asigna dónde se mostrará el contenido del proyecto...

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

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

app.use('/', require('./server/routes/main'));   



app.listen(port, () => {
    console.log(`App listening on port ${ port }`)
});