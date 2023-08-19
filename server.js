const http = require('http');
const app = require('./app');

const normalizePort = val => {
  // Conversion de la valeur du port en entier
  const port = parseInt(val, 10);


  // Vérification si le port est un nombre
  if (isNaN(port)) {
    return val;
  }

  // Vérification si le port est valide et positif
  if (port >= 0) {
    return port;
  }
  return false;
};

//
const port = normalizePort(process.env.PORT || '3000');

//On utilise la méthode set de l'objet app pour définir la propriété port avec la valeur du port.
app.set('port', port);


//Gestion des erreurs liées à l'écoute du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
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

//Création du serveur HTTP 
const server = http.createServer(app);

//Gestion des événements du serveur 
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Démarrage du serveur
server.listen(port);
