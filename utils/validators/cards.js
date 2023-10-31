const { celebrate, Joi } = require('celebrate');

const {
  validateURL,
  validateText,
  paramsIdValidator,
} = require('./helpers');

const validateCard = celebrate({
  body: Joi.object().keys({
    name: validateText.required(),
    link: validateURL.required(),
  }),
});

module.exports = {
  validateCard,
  validateCardId: paramsIdValidator('cardId'),
};
