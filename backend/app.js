// Dependencies
const express = require('express'); // Server framework pour fonctionnement standardisé
const helmet = require('helmet'); // Protège de certaines vulnérabilités
const cors = require('cors'); // Because.. why not another dependency ??
const expressSanitizer = require('express-sanitizer'); // Sure!! That too...
const bodyParser = require('body-parser'); // Extrait la partie body d'une requête entrante
require('dotenv').config(); // Centralise variables environnements 

const app = express(); // Exécution framework
const path = require('path'); // Accéder aux différents répertoires

const userRoutes = require('./routes/user'); // Accès pour route 'user'
const postRoutes = require('./routes/posts'); // Accès pour route 'sauce'

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080 http://192.168.31.92:8080 http://192.168.31.82:8080'); // Restriction avec autorisation par url
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Restriction des types d'en-tête
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Restriction des types de méthodes utilisées
    next();
});

app.use(helmet()); // Couche supplémentaire de sécurité
app.use(bodyParser.json()); // Défini l'utilisation de JSON
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(expressSanitizer()); // Protège contre les failles XSS
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images'))); // Défini le lieu de stockage des images
app.use('/api/user', userRoutes); // Défini la base pour les routes pour login et signup
app.use('/api/post', postRoutes); // Défini la base pour les routes posts

module.exports = app; // Export pour utilisation sur server.js