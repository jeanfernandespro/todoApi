// IMPORTS -------------------------------------------------------------

// Importa o tasksModel
const tasksModel = require('../models/admTasksModel');

// CONTROLLERS ---------------------------------------------------------

// Retorna para a const tasks, todas as tarefas que recebe da tasksModel.getAll | models/tasksModel.js >> getAll
const getAll = async (request, response) => {
  const tasks = await tasksModel.getAll(request.headers.user.id);
  return response.status(200).json(tasks);
};

// Retorna para a const tasks, todas as tarefas do usuario, que recebe da tasksModel.getByIdUser com o parametro do headers | models/tasksModel.js >> getByIdUser
const getByIdUser = async (request, response) => {
  const tasks = await tasksModel.getByIdUser(request.headers.user.id);
  return response.status(200).json(tasks);
};

// Retorna para a const tasks, todos os dados da tarefa que possui o id, que recebe da tasksModel.getById com o parametro da url (params.id) | models/tasksModels.js >> getById
const getById = async (request, response) => {
  const tasks = await tasksModel.getById(request.params.id);
  return response.status(200).json(tasks);
};

// Retorna para a const createdTask, a tarefa criada com o id do headers e o body, que são enviados para tasksModel.createTask | models/tasksModel.js >> createTask
const createTask = async (request, response) => {
  const createdTask = await tasksModel.createTask(
    request.headers.user.id,
    request.body
  );
  return response.status(201).json(createdTask);
};

// Envia o params.id para o tasksModel.deleteTasks, que deleta a tarefa no db, depois retorna um 204(ok) |  models/tasksModel.js >> deleteTask
const deleteTask = async (request, response) => {
  await tasksModel.deleteTask(request.params.id);
  return response.status(204).json();
};

// Envia o params.id e o body para o tasksMddel.updateTasks, que edita a tarefa no db, depois retorna o resultado na const updatedTask | models.tasksModel.js >> updateTask

const updateTask = async (request, response) => {
  const updatedTask = await tasksModel.updateTask(
    request.params.id,
    request.body
  );
  return response.status(204).json(updatedTask);
};

// EXPORTS -------------------------------------------------------------

module.exports = {
  getAll,
  getById,
  getByIdUser,
  createTask,
  deleteTask,
  updateTask,
};
