const Users = require('../model/User');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWTSECRET = 'shhhhh';

exports.createUser = async (req, res) => {
  const { userName, name, password } = req.body;
  if (
    !userName ||
    !name ||
    !password ||
    userName.length < 3 ||
    password.length < 3
  ) {
    res.status(400).send();
  }
  try {
    const isUserExist = await Users.find({ userName: userName });
    if (isUserExist.length !== 0) {
      res.status(400).send('user Exists');
      return;
    }
    const ePassword = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    await Users.insertMany({ userName, name, password: ePassword });
    res.status(200).send();
    return;
  } catch (error) {
    res.status(400).send();
    return;
  }
};

exports.logIn = async (req, res) => {
  const { userName, password } = req.body;

  try {
    if (!userName || userName.length < 3 || !password || password.length < 3) {
      throw userName;
    }
    const findUserName = await User.find({ userName: userName });
    if (findUserName.length === 0) {
      throw userName;
    }
    const hashPass = crypto.createHash('sha256').update(password).digest('hex');
    // if (hashPass !== findUserName[0].password) {
    //   throw userName;
    // }
    const userJwt = jwt.sign({ userName }, JWTSECRET, { expiresIn: '1h' });
    res.cookie('JWT', userJwt, { maxAge: 1021031 });
    res.send();
  } catch (err) {
    res.status(400).send('inValid');
  }
};
