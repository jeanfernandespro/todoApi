const connection = require('./connection');
const bcrypt = require('bcrypt');

// Retorna para usersControllers

const getAllUsers = async (id) => {
  const [admin] = await connection.execute(
    'SELECT admin FROM users WHERE id = ?',
    [id]
  );
  const comp = admin[0].admin === 'true';
  if (!comp) {
    const users = [];
    return users;
  }
  const [users] = await connection.execute(
    'SELECT id, username, real_name, phone, email, admin FROM users'
  );
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
    'SELECT email, id, admin FROM users WHERE email = ? and user_password = ?',
    [email, encryptedPass[0].user_password]
  );
  return users;
};

const createUser = async (user) => {
  const password = await bcrypt.hash(user.user_password, 10);
  const query =
    'INSERT INTO users(username, real_name, phone, email, user_password, token, admin) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const [createdUser] = await connection.execute(query, [
    user.username,
    user.real_name,
    user.phone,
    user.email,
    password,
    'token',
    'false',
  ]);
  return { insertId: createdUser.insertId };
};

const deleteUser = async (id, idAdmin) => {
  const [admin] = await connection.execute(
    'SELECT admin FROM users WHERE id = ?',
    [idAdmin]
  );
  const comp = admin[0].admin === 'true';
  if (!comp) {
    const removedUser = [];
    return removedUser;
  }

  if (id == idAdmin) {
    const removedUser = null;
    return removedUser;
  }

  await connection.execute('DELETE FROM tasks WHERE id_user = ?', [id]);

  const [removedUser] = await connection.execute(
    'DELETE FROM users WHERE id = ?',
    [id]
  );
  return removedUser;
};

module.exports = {
  getAllUsers,
  createUser,
  getByLogin,
  deleteUser,
};
