const jsonwebtoken = require('jsonwebtoken');
const authorizationToken = require('../middlewares/authorizationToken');
const usersModel = require('../models/usersModel');

const getAllUsers = async (_request, response) => {
  const users = await usersModel.getAllUsers();
  return response.status(200).json(users);
};

const getUserByIdUser = async (request, response) => {
  const users = await usersModel.getByIdUser(request.params.id);
  return response.status(200).json(users);
};

const getByLogin = async (request, response) => {
  try {
    const user = await usersModel.getByLogin(
      request.body.email,
      request.body.password
    );  
    const correctPassword = user && user.length > 0;
    if (!correctPassword)
      return response.status(401).send('Password or E-mail incorrect');
    const token = jsonwebtoken.sign(
      { user: user[0] },
      authorizationToken.PRIVATE_KEY,
      {
        expiresIn: '1d',
      }
    );
    return response.status(200).json({ data: { user: user[0], token } });
  } catch (error) {
    console.log(error);
    return response.send(error);
  }
};

const createUser = async (request, response) => {
  const createdUser = await usersModel.createUser(request.body);
  return response.status(201).json(createdUser);
};

module.exports = {
  getAllUsers,
  getUserByIdUser,
  getByLogin,
  createUser,
};
