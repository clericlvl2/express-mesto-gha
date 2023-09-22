const Card = require('../models/card');
const { ERROR_MESSAGE, MODEL_UPDATE_OPTIONS } = require('../utils/constants');
const {
  responseHandler,
  errorHandler,
  checkDataForNull,
} = require('../utils/helpers');

module.exports.getCards = (req, res) => {
  Card.find({}).then(responseHandler(res)).catch(errorHandler(res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(responseHandler(res))
    .catch(errorHandler(res, ERROR_MESSAGE.cards.invalidDataOnCreateCard));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(checkDataForNull(ERROR_MESSAGE.cards.notFoundById))
    .then(() => res.send({}))
    .catch(errorHandler(res, ERROR_MESSAGE.cards.notFoundById));
};

const findCardByIdAndUpdate = ({ id, newData, res }) => {
  Card.findByIdAndUpdate(id, newData, MODEL_UPDATE_OPTIONS)
    .then(checkDataForNull(ERROR_MESSAGE.cards.invalidIdOnToggleLike))
    .then(() => res.send({}))
    .catch(errorHandler(res, ERROR_MESSAGE.cards.invalidDataOnToggleLike));
};

module.exports.likeCard = (req, res) => findCardByIdAndUpdate({
  id: req.params.cardId,
  newData: { $addToSet: { likes: req.user._id } },
  res,
});

module.exports.dislikeCard = (req, res) => findCardByIdAndUpdate({
  id: req.params.cardId,
  newData: { $pull: { likes: req.user._id } },
  res,
});
