const connection = require('./connection');
const dateTask = require('../functions/dateTask.js');

const getAll = async () => {
  const [tasks] = await connection.execute('SELECT * FROM tasks');
  return tasks;
};

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getById = async (id) => {
  const [tasks] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [
    id,
  ]);
  return tasks;
};

const getByIdUser = async (id) => {
  const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [
    id,
  ]);
  return users;
};

const getByLogin = async (email, password) => {
  const [users] = await connection.execute(
    'SELECT email,user_password FROM users WHERE email = ? and user_password = ?',
    [email, password]
  );
  return users;
};

const createTask = async (task) => {
  const { title } = task;
  const dateCreate = dateTask.dateTask();
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

const createUser = async (user) => {
  const realName = user.real_name;
  const cellPhone = user.phone;
  const userEmail = user.email;
  const userPassword = user.user_password;
  const query =
    'INSERT INTO users(username, real_name, phone, email, user_password, token) VALUES (?, ?, ?, ?, ?, ?)';
  const [createdUser] = await connection.execute(query, [
    'username',
    realName,
    cellPhone,
    userEmail,
    userPassword,
    'token',
  ]);
  return { insertId: createdUser.insertId };
};

const deleteTask = async (id) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  const [removedTask] = await connection.execute(query, [id]);
  return removedTask;
};

const updateTask = async (id, task) => {
  const { title, status } = task;
  const dateUpdate = dateTask.dateTask();
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
  getAllUsers,
  getById,
  getByIdUser,
  createTask,
  createUser,
  deleteTask,
  updateTask,
  getByLogin,
};
