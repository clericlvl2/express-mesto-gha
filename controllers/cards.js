const Card = require('../models/card');
const { ERROR_MESSAGE, MODEL_UPDATE_OPTIONS } = require('../utils/constants');
const {
  responseHandler,
  errorHandler,
  checkDataForNull,
} = require('../utils/helpers');
const { ForbiddenError } = require('../utils/errors');

const {
  notFoundById,
  invalidDataOnToggleLike,
  invalidIdOnToggleLike,
  invalidDataOnCreateCard,
  accessToCardIsForbidden,
} = ERROR_MESSAGE.cards;

module.exports.getCards = (req, res, next) => {
  Card.find({}).then(responseHandler(res)).catch(errorHandler(next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(responseHandler(res))
    .catch(errorHandler(next, invalidDataOnCreateCard));
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then(checkDataForNull(notFoundById))
    .then(card => {
      if (card.owner !== req.user._id) {
        return Promise.reject(new ForbiddenError(accessToCardIsForbidden));
      }

      return Card.deleteById(cardId);
    })
    .then(() => res.send({}))
    .catch(errorHandler(next, notFoundById));
};

const findCardByIdAndUpdate = ({
  res, next, id, newData,
}) => {
  Card.findByIdAndUpdate(id, newData, MODEL_UPDATE_OPTIONS)
    .then(checkDataForNull(invalidIdOnToggleLike))
    .then(() => res.send({}))
    .catch(errorHandler(next, invalidDataOnToggleLike));
};

module.exports.likeCard = (req, res, next) => findCardByIdAndUpdate({
  res,
  next,
  id: req.params.cardId,
  newData: { $addToSet: { likes: req.user._id } },
});

module.exports.dislikeCard = (req, res, next) => findCardByIdAndUpdate({
  res,
  next,
  id: req.params.cardId,
  newData: { $pull: { likes: req.user._id } },
});
