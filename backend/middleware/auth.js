// Dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();

// 
const checkWebToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // vérifie l'existence du "Bearer: <token>", utilise la fonction 'split' pour l'isoler dans un array - index 1
        const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET); // utilise la fonction 'verify' pour décoder le token avec ramdom token secret
        const userId = decodedToken.userId; // prend le userId de decodedToken
        res.locals.userID = decodedToken.userID;
        if (req.body.userId && req.body.userId !== userId) { // si le userID est différent du token userID 
            throw 'Invalid user ID'; // renvoyer une erreur 
        } else { //sinon
            next(); // continue l'exécution et ne bloque pas la suite
        }
    } catch { // si pas de token détecté, stop l'exécution et renvoie une erreur
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};

module.exports = checkWebToken; // export pour utilisation dans la route sauce.js