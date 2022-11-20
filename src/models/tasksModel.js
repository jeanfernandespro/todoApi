const connection = require('./connection');
const getDate = require('../functions/getDate');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const getById = async (id) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [
    id,
  ]);
  return tasks;
};

const createTask = async (task) => {
  const { title } = task;
  const dateCreate = getDate.getDate();
  const query =
    'INSERT INTO tasks(title, status, created_at, update_at) VALUES (?, ?, ?, ?)';
  const [createdTask] = await connection.execute(query, [
    title,
    'Not started!',
    dateCreate,
    'Not updated!',
  ]);
  return { insertId: createdTask.insertId };
};

const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  const [removedTask] = await connection.execute(query, [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  const dateUpdate = getDate.getDate();
  const query =
    'UPDATE tasks SET title = ?, update_at = ?, status = ? WHERE id = ?';
  const [updateTask] = await connection.execute(query, [
    title,
    dateUpdate,
    status,
    id,
  ]);
  return updateTask;
};

module.exports = {
  getAll,
  getById,
  createTask,
  deleteTask,
  updateTask,
};
