// Dependencies
const express = require('express'); // Server framework pour fonctionnement standardisé
const postRouter = express.Router(); // Appelle à la fonction Router de Express
const auth = require('../middleware/auth'); // Authentification requise pour chaque accès à une route
const multer = require('../middleware/multer-config'); //
const postController = require('../controllers/posts'); // Accès pour controller 'posts'

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