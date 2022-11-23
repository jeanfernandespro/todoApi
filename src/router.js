const express = require('express');

const tasksController = require('./controllers/tasksController');
const usersController = require('./controllers/usersController');
const validate = require('./middlewares/validate');
const authorizationToken = require('./middlewares/authorizationToken');
const router = express.Router();
require('dotenv').config();

router.get('/', (_req, res) => res.send('TodoList API!'));

router.post('/login', usersController.getByLogin);

router.post('/users', validate.validateUser, usersController.createUser);

router.post('/users/', usersController.getByLogin);

router.use('*', authorizationToken.tokenValidated);

//router.get('/tasks', tasksController.getAll); 

router.get('/tasks', tasksController.getByIdUser);

router.get('/users/:id', validate.validateId, usersController.getByIdUser);

router.get('/tasks/:id', validate.validateId, tasksController.getById);

router.post('/tasks', validate.validateBody, tasksController.createTask);

router.delete(
  '/tasks/:id',
  validate.validateId,
  tasksController.deleteTask
);

router.put(
  '/tasks/:id',
  validate.validateId,
  validate.validateBody,
  validate.validateStatus,
  tasksController.updateTask
);

module.exports = router;
