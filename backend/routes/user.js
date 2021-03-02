const express = require('express'); // Server framework pour fonctionnement standardisé
const userRouter = express.Router(); // Appelle à la fonction Router de Express
const userController = require('../controllers/user'); // Accès pour controller 'user'
const auth = require('../middleware/auth'); 
const cors = require('cors');

userRouter.options('/signup', cors()); // Because this is a thing apparently
userRouter.post('/signup', userController.userSignUp); // Route POST pour signup
userRouter.post('/login', userController.userLogin); // Route POST pour login
userRouter.delete("/delete", auth, userController.delete);
userRouter.get("/", auth, userController.profile);
userRouter.put("/modify", auth, userController.modify);

module.exports = userRouter; // export pour utilisation dans Controllers


// Def ROUTE : détermine méthode, chemin et fonction pour répondre demande client
// Construction d'une route : app.METHOD(PATH, HANDLER)

// app est une instance d’express.
// METHOD est une méthode de demande HTTP.
// PATH est un chemin sur le serveur.
// HANDLER est la fonction exécutée lorsque la route est mise en correspondance (controller, fonction)