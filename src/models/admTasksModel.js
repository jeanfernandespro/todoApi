// IMPORTS -------------------------------------------------------------

// Imports básicos, connection para enviar os dados para o db com as config de acesso e as querys, getDate para setar a hora que a função é chamada
const connection = require('./connection');
const getDate = require('../functions/getDate');

// Models  -------------------------------------------------------------

// Retorna todas as tarefas da tabela tasks e o email da tabela users (onde o email vem da row que user.id é igual tasks.id_user), mas antes passa por uma validação, se quem está requisitando é realmente um adm | controllers/admTasksController.js >> getAll
const getAll = async (id) => {
  const [admin] = await connection.execute(
    'SELECT admin FROM users WHERE id = ?',
    [id]
  );
  const comp = admin[0].admin === 'true';
  if (!comp) {
    const tasks = [];
    return tasks;
  }
  const [tasks] =
    await connection.execute('SELECT tasks.*, users.username FROM tasks JOIN users ON users.id = tasks.id_user');
  return tasks;
};

// Retorna todas as tarefas da tabela tasks que possuem o id que vem no parametro do controller | controllers/tasksController.js >> getByIdUser
const getByIdUser = async (id) => {
  const [tasks] = await connection.execute(
    'SELECT * FROM tasks WHERE id_user = ?',
    [id]
  );
  return tasks;
};

// Retorna todos os dados da tarefa que possui o id que vem no parametro do controller | controllers/tasksController.js >> getById
const getById = async (id) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [
    id,
  ]);
  return tasks;
};

// Cria uma nova tarefa recebendo o id e a task dos parametros do controller | controllers/tasksController.js >> createTask
const createTask = async (id, task) => {
  const query =
    'INSERT INTO tasks(title, status, created_at, update_at, id_user) VALUES (?, ?, ?, ?, ?)';
  const [createdTask] = await connection.execute(query, [
    task.title,
    'Not started!',
    getDate.getDate(),
    'Not updated!',
    id,
  ]);
  return { insertId: createdTask.insertId };
};

// Deleta a tarefa que possui o id que vem no parametro do controller | controllers/tasksController.js >> deleteTask
const deleteTask = async (id) => {
  const [removedTask] = await connection.execute(
    'DELETE FROM tasks WHERE id = ?',
    [id]
  );
  return removedTask;
};

// Edita a tarefa que possui o id que vem no parametro do controller, passando para o db os dados que vem no parametro task do controller e na função getDate | controllers/tasksController.js >> updateTask | functions/getDate.js
const updateTask = async (id, task) => {
  const query =
    'UPDATE tasks SET title = ?, update_at = ?, status = ? WHERE id = ?';
  const [updateTask] = await connection.execute(query, [
    task.title,
    getDate.getDate(),
    task.status,
    id,
  ]);
  return updateTask;
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
