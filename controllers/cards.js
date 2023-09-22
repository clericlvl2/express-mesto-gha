const Card = require('../models/card');
const { ERROR_MESSAGE, MODEL_UPDATE_OPTIONS } = require('../utils/constants');
const {
  handleResponse,
  handleError,
  handleValidationError,
  checkDataForNull,
} = require('../utils/helpers');

module.exports.getCards = (req, res) => {
  Card.find({}).then(handleResponse(res)).catch(handleError(res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(handleResponse(res))
    .catch(
      handleValidationError(res, ERROR_MESSAGE.cards.invalidDataOnCreateCard),
    );
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(checkDataForNull(ERROR_MESSAGE.cards.notFoundById))
    .then(() => res.send())
    .catch(handleError(res));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    MODEL_UPDATE_OPTIONS,
  )
    .then(checkDataForNull(ERROR_MESSAGE.cards.invalidIdOnToggleLike))
    .then(() => res.send())
    .catch(
      handleValidationError(res, ERROR_MESSAGE.cards.invalidDataOnToggleLike),
    );
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    MODEL_UPDATE_OPTIONS,
  )
    .then(checkDataForNull(ERROR_MESSAGE.cards.invalidIdOnToggleLike))
    .then(() => res.send())
    .catch(
      handleValidationError(res, ERROR_MESSAGE.cards.invalidDataOnToggleLike),
    );
};
