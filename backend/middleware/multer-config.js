// Dependencies
const multer = require('multer'); // permet de gérer les fichiers entrants dans les requêtes HTTP

// Défini les extensions acceptées pour les images
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
};

// Défini le lieu de stockage de l'image et le renomme dans un format défini
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images'); // stockage des images dans le dossier 'images'
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); // prend le nom d'origine et remplace tous les espaces par des '_'
        const nameWithoutExtension = name.split('.')[0]; // prend le nom du fichier sans l'extension
        const extension = MIME_TYPES[file.mimetype]; // défini l'extension en fonction du MIME_TYPES
        callback(null, nameWithoutExtension + Date.now() + '.' + extension); // renomme le fichier avec le nom + timestamp + . + extension
    }
});

module.exports = multer({ storage: storage }).single('image'); // export de 'multer' avec la constante 'storage' et que le dl des fichiers 'image'