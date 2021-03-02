// Dependencies
const express = require('express'); // Server framework pour fonctionnement standardisé
const postRouter = express.Router(); // Appelle à la fonction Router de Express
const auth = require('../middleware/auth'); // Authentification requise pour chaque utilisation à sauce
const multer = require('../middleware/multer-config'); //
const postController = require('../controllers/posts'); // Accès pour controller 'sauce'

// Différentes Routes
postRouter.post('/', auth, multer, postController.addPost); // Route pour ajouter un post
postRouter.get('/', auth, postController.getAllPosts); // Route pour afficher tous les posts
postRouter.get('/:id', auth, postController.getOnePost); // Route pour afficher le post sélectionné
postRouter.delete('/:id', auth, postController.deletePost); // Route pour effacer un post

postRouter.post('/:id/like', auth, postController.likePostStatus); // Route pour aimer avec un like des posts

postRouter.get('/:id/comment', auth, postController.getAllComments);
postRouter.post('/:id/comment', auth, postController.addComment);
postRouter.delete('/:id/comment/:cid', auth, postController.deleteComment);

module.exports = postRouter; // export pour utilisation dans Controllers

// Def ROUTE : détermine méthode, chemin et fonction pour répondre demande client
// Construction d'une route : app.METHOD(PATH, HANDLER)

// app est une instance d’express.
// METHOD est une méthode de demande HTTP.
// PATH est un chemin sur le serveur.
// HANDLER est la fonction exécutée lorsque la route est mise en correspondance (controller, fonction)