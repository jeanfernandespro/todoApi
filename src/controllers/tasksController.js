const jsonwebtoken = require('jsonwebtoken');
const authorizationToken = require('../middlewares/authorizationToken');
const tasksModel = require('../models/tasksModel');

const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const getAllUsers = async (_request, response) => {
  const users = await tasksModel.getAllUsers();
  return response.status(200).json(users);
};

const getById = async (request, response) => {
  const tasks = await tasksModel.getById(request.params.id);
  return response.status(200).json(tasks);
};

const getByIdUser = async (request, response) => {
  const users = await tasksModel.getByIdUser(request.params.id);
  return response.status(200).json(users);
};

const getByLogin = async (request, response) => {
  try {
    const user = await tasksModel.getByLogin(
      request.body.email,
      request.body.password
    );
    const correctPassword = user && user.length > 0;
    if (!correctPassword)
      return response.status(401).send('Password or E-mail incorrect');
    const token = jsonwebtoken.sign(
      { user: JSON.stringify(user[0]) },
      authorizationToken.PRIVATE_KEY,
      {
        expiresIn: '1d',
      }
    );
    return response.status(200).json({ data: { user: user, token } });
  } catch (error) {
    console.log(error);
    return response.send(error);
  }
};

const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(request.body);
  return response.status(201).json(createdTask);
};

const createUser = async (request, response) => {
  const createdUser = await tasksModel.createUser(request.body);
  return response.status(201).json(createdUser);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;
  await tasksModel.deleteTask(id);
  return response.status(204).json();
};

const updateTask = async (request, response) => {
  const { id } = request.params;
  const updatedTask = await tasksModel.updateTask(id, request.body);
  return response.status(204).json(updatedTask);
};

module.exports = {
  getAll,
  getAllUsers,
  getById,
  getByIdUser,
  getByLogin,
  createTask,
  createUser,
  deleteTask,
  updateTask,
};
