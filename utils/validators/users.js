const { celebrate, Joi } = require('celebrate');

const {
  validateURL,
  validateText,
  validatePassword,
  validateEmail,
  paramsIdValidator,
} = require('./helpers');

const validateUser = celebrate({
  body: Joi.object().keys({
    name: validateText,
    about: validateText,
    avatar: validateURL,
    email: validateEmail,
    password: validatePassword,
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: validateText,
    about: validateText,
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: validateURL.required(),
  }),
});

module.exports = {
  validateUser,
  validateUserInfo,
  validateUserAvatar,
  validateUserId: paramsIdValidator('id'),
};
