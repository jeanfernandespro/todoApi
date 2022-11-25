// IMPORTS -------------------------------------------------------------

const express = require('express');
const tasksController = require('./controllers/tasksController');
const admTasksController = require('./controllers/admTasksController');
const usersController = require('./controllers/usersController');
const validate = require('./middlewares/validate');
const authorizationToken = require('./middlewares/authorizationToken');
const router = express.Router();
require('dotenv').config();

// ROTAS ---------------------------------------------------------------

// Rota root para teste
router.get('/', (_req, res) => res.send('TodoList API!'));

// Rota que executa o login | controllers/usersController.js >> getByLogin
router.post('/login', usersController.getByLogin);

// Rota de criação de usuário | middlewares/validate.js >> validateUser | controllers/usersController.js >> createUser
router.post('/users', validate.validateUser, usersController.createUser);

// Daqui para baixo, todas as rotas precisam de um token valido | middlewares/authorization.js >> tokenValidated
router.use('*', authorizationToken.tokenValidated);

// Rota que pega todas as tarefas pelo ID do usuario logado | controllers/usersController.js >> getByIdUser
router.get('/tasks', tasksController.getByIdUser);

// Rota de criação de tarefa | middlewares/validate.js >> validateTitle | controllers/tasksController.js >> createTask
router.post('/tasks', validate.validateTitle, tasksController.createTask);

// Rota que pega a tarefa pelo params.id, para usar em delete e update no front-end | middlewares/validate.js >> validateId | controllers/tasksController.js >> getById
router.get('/tasks/:id', validate.validateId, tasksController.getById);

// Rota de atualização de tarefa | middlewares/validate.js >> validateId, validateTitle, validateStatus | controllers/tasksController.js >> updateTask
router.put(
  '/tasks/:id',
  validate.validateId,
  validate.validateTitle,
  validate.validateStatus,
  tasksController.updateTask
);

// Rota de deletar tarefa | middlewares/validate.js >> validateId | controllers/tasksController.js >> deleteTask
router.delete('/tasks/:id', validate.validateId, tasksController.deleteTask);

// Rota que pega o usuario pelo params.id, para usar em delete e update | middlewares/validate.js >> validateId | controllers/usersController.js >> getUserByIdUser
// Funções de controles não foram implementadas ainda.
router.get('/users/:id', validate.validateId, usersController.getUserByIdUser);

router.get('/users', usersController.getAllUsers);

router.get('/admtasks', admTasksController.getAll);

// EXPORTS -------------------------------------------------------------

module.exports = router;
