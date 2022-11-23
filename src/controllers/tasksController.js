const tasksModel = require('../models/tasksModel');

const getAll = async (_request, response) => {
  const tasks = await tasksModel.getAll();
  return response.status(200).json(tasks);
};

const getById = async (request, response) => {
  const tasks = await tasksModel.getById(request.params.id);
  return response.status(200).json(tasks);
};

const getByIdUser = async (request, response) => {
  const tasks = await tasksModel.getByIdUser(request.headers.user.id);
  return response.status(200).json(tasks);
};

const createTask = async (request, response) => {
  const id = request.headers.user.id;
  console.log(id);
  const createdTask = await tasksModel.createTask(id, request.body);
  return response.status(201).json(createdTask);
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
  getById,
  getByIdUser,
  createTask,
  deleteTask,
  updateTask,
};
