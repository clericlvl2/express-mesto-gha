const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { getJwtSecret } = require('../utils/helpers');
const { COOKIE_OPTIONS, JWT_SIGN_OPTIONS } = require('./constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(user => {
      const token = jwt.sign({ _id: user._id }, getJwtSecret(), JWT_SIGN_OPTIONS);
      res.cookie('jwt', token, COOKIE_OPTIONS).send({});
    })
    .catch(next);
};
