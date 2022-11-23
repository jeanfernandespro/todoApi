const connection = require('./connection');
//const getDate = require('../functions/getDate');

const getAllUsers = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const getUserByIdUser = async (id) => {
  const [users] = await connection.execute('SELECT * FROM users WHERE id = ?', [
    id,
  ]);
  return users;
};

const getByLogin = async (email, password) => {
  const [users] = await connection.execute(
    'SELECT email, id FROM users WHERE email = ? and user_password = ?',
    [email, password]
  );  
  return users;
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

module.exports = {
  getAllUsers,
  getUserByIdUser,
  createUser,
  getByLogin,
};
