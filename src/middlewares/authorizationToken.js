const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function tokenValidated(request, response, next) {
  const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
  if (!token) {
    return response.status(401).send('Access denied. No token provided.');
  }
  try {
    const payload = jsonwebtoken.verify(token, process.env.PRIVATE_KEY);
    const userIdFromToken = typeof payload !== 'string' && payload.user;
    if (!userIdFromToken) {
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
  tokenValidated,
};
