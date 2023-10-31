const { celebrate, Joi } = require('celebrate');

const {
  validateEmail,
  validatePassword,
} = require('./helpers');

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: validateEmail,
    password: validatePassword,
  }),
});

module.exports = {
  validateLogin,
};
