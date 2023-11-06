/*
    En este archivo JavaScript fueron definidas las rutas que nos mostrarán el contenido principal de
    la página web, como, por ejemplo: el landing page, las categorías de cómics, la biblioteca dispon-
    ible para el usuario, etcétera...
*/

const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

// Rutas...

/*
    En esta sección es donde definimos cuáles rutas tendrá nuestro sitio web. La manera en la que fue-
    ron definidas es la siguiente:

    router.get('<Aquí debe ir el nombre de la ruta>')...
    res.render('<Aquí debe ir el nombre del archivo .ejs'>)...

    La instrucción 'render', como dice el nombre: renderiza el código hallado en el .ejs 
*/

router.get('', (req, res) => {
    const locals = {
        title: "Home Page"
    }

    res.render('index', { locals });
});

router.get('/post', (req, res) => {
    const locals = {
        title: "Post"
    }

    res.render('post', { locals });
});

router.get('/get', async(req, res) => {
    const locals = {
        title: "Get"
    }

    try {
        const data = await Post.find();
        res.render('get', { data, locals });
    } catch(error) {
        console.log(error);
    }
});

router.get('/description/:id', async(req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        res.render("description", { data });
    } catch(error) {
        console.log(error);
    }
});

router.post('/result', async(req, res) => {
    try {
        let searchTerm = req.body.searchBar
        const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Post.find({
            $or: [
                { comictitle: { $regex: new RegExp(searchNoSpecialCharacter, 'i') }}
            ]
        });
        res.render("result", { data });
    } catch(error) {
        console.log(error);
    }
});

router.get('/update', (req, res) => {
    const locals = {
        title: "Update"
    }

    res.render('update', { locals });
});

router.get('/delete', (req, res) => {
    const locals = {
        title: "Delete"
    }

    res.render('delete', { locals });
});

// Métodos...

/* function insertComic() {
    Post.insertMany([
        {
            comictitle: "Berserk",
            comicdescription: "A gruesome manga about a traumatized swordsman."
        },
        {
            comictitle: "Oyasumi PunPun",
            comicdescription: "A sad manga that revolves around the character development of a chicken-boy."
        },
        {
            comictitle: "Pluto",
            comicdescription: "Literally an AstroBoy rip-off."
        },
        {
            comictitle: "The Shining",
            comicdescription: "Abussive dad finds out there are evil spirits living in the hotel where he works."
        },
        {
            comictitle: "Morality",
            comicdescription: "Woman cheats on his boyfriend because he forced her to do the evil deeds of some old and dying church pastor."
        },
        {
            comictitle: "Bag of Bones",
            comicdescription: "Popular writer embarks on the worst adventure of his life when his wife dies of a heat stroke while pregnant."
        }
    ])
}

insertComic(); */

module.exports = router;