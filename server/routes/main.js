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



// RUTAS

/*
    En esta sección es donde definimos cuáles rutas tendrá nuestro sitio web. La manera en la que fue-
    ron definidas es la siguiente:

    router.get('<Aquí debe ir el nombre de la ruta>')...
    res.render('<Aquí debe ir el nombre del archivo .ejs'>)...

    La instrucción 'render', como dice el nombre: renderiza el código hallado en el .ejs 
*/



/*
    * GET * HOME PAGE * MUESTRA INICIO *
*/

router.get('', (req, res) => {
    const locals = {
        title: "Home Page"
    }

    res.render('index', { locals });
});

/*
    * GET * COLLECTIONS * MUESTRA CONTENIDO DISPONIBLE *
*/

router.get('/collections', async (req, res) => {
    try {
        const data = await Titles.find();
        res.json(data); // Enviar datos como respuesta JSON
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' }); // Manejar errores y enviar respuesta JSON con un código de estado 500
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


/*
    * POST * RESULTS * MUESTRA RESULTADO DE BUSQUEDA *
*/

router.post('/result', async(req, res) => {
    try {
        let searchTerm = req.body.searchBar
        const searchNoSpecialCharacter = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Titles.find({
            $or: [
                { Name: { $regex: new RegExp(searchNoSpecialCharacter, 'i') }}
            ]
        });
        res.render("result", { data });
    } catch(error) {
        console.log(error);
    }
});

/*
    * GET * USERS * MUESTRA CREAR / USAR CUENTA *
*/

router.get('/users', async(req, res) => {
    try {
        const locals = {
            title: "Users"
        }
    
        const data = await Users.find();
        res.render('users', { data, locals });
    } catch(error) {
        console.log(error);
    }
});

/*
    * POST * USERS * PERMITE USAR CUENTA *
*/


router.post('/login', async(req, res) => {
    try {
        const { Username, Password } = req.body;

        const user = await Users.findOne({ Username });

        if(!user) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Credentials!' });
        }

        const token = jwt.sign({ userId: Users._id}, jwtSecret)
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/logedin/homepage')
    } catch(error) {
        console.log(error);
    }
}); 

/*
router.post("/auth/login", (req, res) => {
    const { Email, Password } = req.body;
    const query = { Email };
  
    db.getDb
      .collection("users")
      .findOne(query, async (err, result) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Error: Could not get user details" });
        }
  
        // No record found for the given emailId
        if (!result) {
          return res.status(401).json({ message: "Incorrect Credentials" });
        }
  
        //User found
        const hashedPassword = result.password;
        let isPasswordCorrect;
  
        try {
          isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
          console.log(isPasswordCorrect);
        } catch (errBcrypt) {
          console.log(errBcrypt);
          return res.status(400).json({ message: "Error: Could not get user password" });
        }
  
        // Wrong password given
        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Incorrect Credentials" });
        }
  
        //User authenticated
        const user = result;
        delete user.password;
  
        const token = auth.issueToken(user);
        return res.status(200).json({ ...user, token });
      });
  });
  */
/*
    * GET * USERS * DIRIGE A PAGINA DE REGISTRO *
*/

router.get('/createaccount', async(req, res) => {
    try {
        const locals = {
            title: "Create Account"
        }

        res.render('createaccount', { locals })
    } catch(error) {
        console.log(error);
    }
});

/*
    * POST * USERS * PERMITE CREAR CUENTA *
*/

/* Add A New User */
/* 
router.post("/register", (req, res) => {
    const { Email, Password, role, Username } = req.body;
  
    bcrypt.hash(Password, 10).then(function (hashedPassword) {
       const insertData = { Username, Email, Password: hashedPassword, role, isActive: false };
      db.getDb()
        .collection("users")
        .insertOne(insertData, (err, result) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ message: "Error: Could not add user" });
          }
  
          const newUser = { _id: result.insertedId, Email, Username, role };
          const token = auth.issueToken(newUser);
          res.status(200).json({ ...newUser, token });
          res.redirect('/users');
        });
    });
  });
  */
  router.post('/register', async(req, res) => {
    try {
        const { Email, Username, Password, Date_of_Birth, accountType} = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        try {
            const user = await Users.create({ Email, Username, Password: hashedPassword, Date_of_Birth, role: accountType });
            res.redirect('/users');
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


/*
    * GET * AUTHORS * MUESTRA LOS AUTORES *
*/

router.get('/authors', async(req, res) => {
    try {
        const locals = {
            title: "Home Page"
        }

        const data = await Authors.find();
        res.render('authors', { data, locals })
    } catch(error) {
        console.log(error);
    }
});

/*
    * GET * AUTHORS * MUESTRA LA BIOGRAFIA DEL AUTOR *
*/

router.get('/bio/:id', async(req, res) => {
    try {
        let slug = req.params.id;

        const data = await Authors.findById({ _id: slug });

        res.render("bio", { data });
    } catch(error) {
        console.log(error);
    }
});



//  METODOS

/*
    * COOKIE * MANTENER USUARIO AL INGESRESAR
*/
/*
    * Log out the user
*/
// routes/logout.js
router.get('/logout', function(req, res){
    // Invalidate the token
    // This depends on how you handle tokens
    // For example, if you're using JWT and storing it in a cookie:
    res.clearCookie('token');
    res.json({ success: true });
 });

module.exports = router;