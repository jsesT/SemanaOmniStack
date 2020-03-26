const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

// Rota de Login apenas para identificar se ela existe ou não.
routes.post('/sessions', SessionController.create);


routes.get('/ongs', OngController.index);
routes.post("/ongs", OngController.create);

// Rota para selecionar apenas a ONG logada;
routes.get('/profile', ProfileController.index);

// Rotas ( create diz tudo filho da puta)
routes.post('/incidents', IncidentController.create);
// Rotas que listam os incidents de todas as ONGS INDEPENDENTE DE ESTIVER LOGADA OU N
routes.get('/incidents', IncidentController.index);
// Rota para deletar o incident informando o dado que ele quer deletar (id)
routes.delete('/incidents/:id', IncidentController.delete);




module.exports = routes;
