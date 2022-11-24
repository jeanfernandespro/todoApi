const connection = require('./connection');
const bcrypt = require('bcrypt');

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
  const [encryptedPass] = await connection.execute(
    'SELECT user_password FROM users WHERE email = ?',
    [email]
  );
  const comp = await bcrypt.compare(password, encryptedPass[0].user_password);
  if (!comp) {
    const users = [];
    return users;
  }
  const [users] = await connection.execute(
    'SELECT email, id FROM users WHERE email = ? and user_password = ?',
    [email, encryptedPass[0].user_password]
  );
  return users;
};

const createUser = async (user) => {
  const password = await bcrypt.hash(user.user_password, 10);
  const query =
    'INSERT INTO users(username, real_name, phone, email, user_password, token) VALUES (?, ?, ?, ?, ?, ?)';
  const [createdUser] = await connection.execute(query, [
    'username',
    user.real_name,
    user.phone,
    user.email,
    password,
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
