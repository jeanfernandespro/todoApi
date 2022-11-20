const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const user = {
  name: '',
  email: '',
};

function tokenValidated(request, response, next) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
  console.log('token do middleware', token);
  if (!token)
    return response.status(401).send('Access denied. No token provided.');
  try {
    const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
    console.log(payload);
    const userIdFromToken = typeof payload !== 'string' && payload.user;
    if (!user && !userIdFromToken) {
      return response.send(401).json({ message: 'Invalid token' });
    }
    request.headers['user'] = payload.user;
    return next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({ message: 'Invalid token' });
  }
}

module.exports = {
  user,
  tokenValidated,
  PRIVATE_KEY,
};
