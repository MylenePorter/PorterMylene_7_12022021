const http = require('http'); // Librairie pour créer server et écouter sur le port défini
const app = require('./app'); // Pour pouvoir transmettre la requête ensuite

// Vérification que le port communiqué est bien un nombre et qu'il est supérieur à 0
const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

//
const port = normalizePort(process.env.PORT ||  '3000'); // Si information dans .env pas différente, le port sera 3000
app.set('port', port); // Set du port 3000

const errorHandler = error => {
    if (error.syscall !== 'listen') { //Si impossible de 'listen' 
        throw error; // envoyer une erreur
    }
    const address = server.address(); // Obtention adresse physique
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app); // Création du server et assignation de 'app' pour traiter les requêtes
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port); // Lance le server sur le port défini