const { celebrate, Joi } = require('celebrate');
const objectId = require('joi-objectid');

Joi.objectId = objectId(Joi);

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/;

const validateText = Joi.string().min(2).max(30);
const validatePassword = Joi.string().required().min(8);
const validateEmail = Joi.string().required().email();
const validateAvatar = Joi.string().regex(urlRegex);

const validateUser = celebrate({
  body: Joi.object().keys({
    name: validateText,
    about: validateText,
    avatar: validateAvatar,
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
    avatar: validateAvatar.required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
});

module.exports = {
  urlRegex,
  validateUser,
  validateUserInfo,
  validateUserAvatar,
  validateUserId,
};
