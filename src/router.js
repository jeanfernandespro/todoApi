const express = require('express');

const tasksController = require('./controllers/tasksController');
const usersController = require('./controllers/usersController');
const validateTasks = require('./middlewares/validateTasks');
const authorizationToken = require('./middlewares/authorizationToken');
const router = express.Router();
require('dotenv').config();

router.get('/', (_req, res) => res.send('TodoList API!'));

router.post('/login', usersController.getByLogin);

router.post('/users', validateTasks.validateUser, usersController.createUser);

router.post('/users/', usersController.getByLogin);

router.use('*', authorizationToken.tokenValidated);

router.get('/tasks', tasksController.getAll);

router.get('/users/:id', validateTasks.validateId, usersController.getByIdUser);

router.get('/tasks/:id', validateTasks.validateId, tasksController.getById);

router.get('/users/:id', validateTasks.validateId, usersController.getByIdUser);

router.post('/tasks', validateTasks.validateBody, tasksController.createTask);

router.delete(
  '/tasks/:id',
  validateTasks.validateId,
  tasksController.deleteTask
);

router.put(
  '/tasks/:id',
  validateTasks.validateId,
  validateTasks.validateBody,
  validateTasks.validateStatus,
  tasksController.updateTask
);

module.exports = router;
