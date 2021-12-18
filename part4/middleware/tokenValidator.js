const JWTSECRET = 'shhhhh';
const jwt = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
  try {
    if (!req.token) {
      res.status(401).send('token required');
      return;
    }
    jwt.verify(req.token, JWTSECRET);
    next();
  } catch (error) {
    console.log('THIS IS THE TOKEN', req.token);
    console.log('this is the error', error);
    res.status(401).send('token not acceptable');
    return;
  }
};

module.exports = tokenValidator;
