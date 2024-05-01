const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send('Token not provided');
  }
  const token = JSON.parse(authorization.split(' ')[1]);
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(401).send('Invalid token');
    }

    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp <= currentTime) {
      return res.status(401).send('Token expired');
    }
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid token');
  }
};

module.exports = verifyToken;
