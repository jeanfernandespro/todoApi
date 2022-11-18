const express = require('express');

const tasksController = require('./controllers/tasksController');
const validateTasks = require('./middlewares/validateTasks');
const authorizationToken = require('./middlewares/authorizationToken');
const router = express.Router();
require('dotenv').config();

router.get('/', (_req, res) => res.send('TodoList API!'));

router.post('/login', tasksController.getByLogin);

router.post('/users', validateTasks.validateUser, tasksController.createUser);

router.post('/users/', tasksController.getByLogin);

router.use('*', authorizationToken.tokenValidated);

router.get('/tasks', tasksController.getAll);

router.get('/users/:id', validateTasks.validateId, tasksController.getByIdUser);

router.get('/tasks/:id', validateTasks.validateId, tasksController.getById);

router.get('/users/:id', validateTasks.validateId, tasksController.getByIdUser);

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
