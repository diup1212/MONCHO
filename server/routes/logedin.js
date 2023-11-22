// DESCRIPCION

/*
    En este archivo JavaScript fueron definidas las rutas que nos mostrarán el contenido principal de
    la página web, siendo un usuario. Si el usuario no es miembro, únicamente podrá acceder a leer al-
    gunos cómics. Ambos usuarios (free, members) pueden agregar a "favorite comics".
*/

const express = require('express');
const router = express.Router();

const logedInLayout = '../views/layouts/logedin';
const jwtSecret  = process.env.JWT_SECRET;

// MODELOS

const Titles = require('../models/Titles')
const Authors = require('../models/Authors')

const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');   

// METODOS

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({ message: 'Not Authorized!' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch(error) {
        res.status(401).json({ message: 'Not Authorized!' })
    }
}

// RUTAS

/*
    * GET * HOMEPAGE * MUESTRA INICIO *
*/

router.get('/logedin/homepage', authMiddleware, (req, res) => {
    try {
        const locals = {
            title: "HomePage"
        }
    
        res.render('index', { locals, layout: logedInLayout });
    } catch(error) {
        console.log(error)
    }
});

/*
    * GET * COLLECTIONS * MUESTRA CONTENIDO DISPONIBLE *
*/

router.get('/logedin/collections', authMiddleware, async(req, res) => {
    try {
        const locals = {
            title: "Collections"
        }

        const data = await Titles.find()
        res.render('../views/logedin/collections', { locals, data, layout: logedInLayout });
    } catch(error) {
        console.log(error)
    }
});

/*
    * GET * DESCRIPTION * MUESTRA LA DESCRIPCION DE COMIC *
*/

router.get('/logedin/description/:id', authMiddleware, async(req, res) => {
    try {
        let slug = req.params.id;

        const data = await Titles.findById({ _id: slug });

        res.render("../views/logedin/description", { data, layout: logedInLayout });
    } catch(error) {
        console.log(error);
    }
});

/*
    * POST * RESULTS * MUESTRA RESULTADO DE BUSQUEDA *
*/

router.post('/logedin/result', authMiddleware, async(req, res) => {
    try {
        let searchTerm = req.body.searchBarLogedIn
        const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Titles.find({
            $or: [
                { Name: { $regex: new RegExp(searchNoSpecialCharacter, 'i') }}
            ]
        });
        res.render("../views/logedin/result", { data, layout: logedInLayout });
    } catch(error) {
        console.log(error);
    }
});

/*
    * GET * AUTHORS * MUESTRA LOS AUTORES *
*/

router.get('/logedin/authors', authMiddleware, async(req, res) => {
    try {
        const locals = {
            title: "Authors"
        }

        const data = await Authors.find()
        res.render('../views/logedin/authors', { locals, data, layout: logedInLayout });
    } catch(error) {
        console.log(error)
    }
});

/*
    * GET * AUTHORS * MUESTRA LA BIOGRAFIA DEL AUTOR *
*/

router.get('/logedin/bio/:id', async(req, res) => {
    try {
        let slug = req.params.id;

        const data = await Authors.findById({ _id: slug });

        res.render("../views/logedin/bio", { data, layout: logedInLayout });
    } catch(error) {
        console.log(error);
    }
});


module.exports = router;