const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWTSECRET = 'shhhhh';

function tokenExtractor(req, res, next) {
  try {
    const JWT = req.cookies['JWT'];
    if (!JWT) {
      next();
    }
    req.token = JWT;
    const cookieUserObj = jwt.verify(JWT, JWTSECRET);
    req.user = cookieUserObj.userName;
    next();
  } catch (err) {
    next();
  }
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, JWTSECRET);
  if (!request.token || !decodedToken.username) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.username);
  request.user = user;
  next();
};

module.exports = { tokenExtractor, userExtractor };
