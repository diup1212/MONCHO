// DESCRIPCION

/*
    En este archivo JavaScript fueron definidas las rutas que nos mostrarán el contenido principal de
    la página web, como, por ejemplo: el landing page, las categorías de cómics, la biblioteca dispon-
    ible para el usuario, etcétera...
*/

const router = require("express").Router();
const bcrypt = require("bcrypt");
//const auth = require("./auth");
//const db = require("../config/database");

// MODELOS
const Authors = require('../models/Authors')
const Characters = require('../models/Characters')
const Issues = require('../models/Issues')
const Publishers = require('../models/Publishers')
const Titles = require('../models/Titles')
const Users = require('../models/Users')
const Volumes = require('../models/Volumes')


const jwt  = require('jsonwebtoken');   

const jwtSecret  = process.env.JWT_SECRET;


/*
    * GET * COLLECTIONS * MUESTRA CONTENIDO DISPONIBLE *
*/

router.get('/collections', async (req, res) => {
    try {
        const data = await Titles.find();
        res.json(data);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

router.get('/collections/:id', async (req, res) => {
    const collectionId = req.params.id;

    try {
        const collection = await Titles.findById(collectionId);
        
        if (!collection) {
            return res.status(404).json({ error: 'Collection not found' });
        }

        res.json(collection);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
/*
    * GET * VOLUMES * MUESTRA CONTENIDO DISPONIBLE *
*/

router.get('/volumes', async (req, res) => {
    try {
        const data = await Volumes.find();
        res.json(data);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/volumes/:id', async (req, res) => {
    const volumeid = req.params.id;

    try {
        const volume = await Volumes.findById(volumeid);
        
        if (!volume) {
            return res.status(404).json({ error: 'Volume not found' });
        }

        res.json(volume);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*
    * GET * ISSUES * MUESTRA CONTENIDO DISPONIBLE *
*/

router.get('/issues', async (req, res) => {
    try {
        const data = await Issues.find();
        res.json(data);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/issues/:id', async (req, res) => {
    const issueid = req.params.id;

    try {
        const issue = await Issues.findById(issueid);
        
        if (!issue) {
            return res.status(404).json({ error: 'Issue not found' });
        }

        res.json(issue);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
router.get('/authors', async (req, res) => {
    try {
        const data = await Authors.find();
        res.json(data); 
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/authors/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const author = await Authors.findById(id);
        
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        res.json(author);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// SEARCH
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
    
      // búsqueda insensible a mayúsculas y minúsculas
      const issuesResults = await Issues.find({
        $or: [
          { Issue_Name: { $regex: new RegExp(query, 'i') } },
          { Description: { $regex: new RegExp(query, 'i') } },
        ],
      });
  
      // solo los IDs de los resultados
      const combinedResults = issuesResults.map(issue => issue._id);
    
      res.json({
        results: combinedResults,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



/*
    * POST * USERS * PERMITE USAR CUENTA *
*/


router.post('/login', async(req, res) => {
    try {
        const { Username, Password } = req.body;

        const user = await Users.findOne({ Username });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const token = jwt.sign({ 
            userId: user._id,
            username: user.Username,
            email: user.Email,
            favs: user.Favorite_Comics,
            role: user.role }, jwtSecret); //datos de usuario q necesitaré
        res.cookie('token', token);

        
        res.status(200).json({ message: 'Log in successful', token: token });
    } catch (error) {
        console.error(error);

        res.status(500).json({ message: 'An error occurred on the server.' });
    }
});


/*
    * POST * USERS * PERMITE CREAR CUENTA *
*/

  router.post('/register', async(req, res) => {
    try {
        const { Email, Username, Password, Date_of_Birth, accountType} = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        try {
            const user = await Users.create({ Email, Username, Password: hashedPassword, Date_of_Birth, role: accountType });
            res.status(200).json({message:'User created succesfully'});
        } catch(error) {
            if(error.code === 11000) {
                res.status(409).json({ message: 'User Already Created!' });
            }
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;