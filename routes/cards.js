const router = require('express').Router();

const { validateCard, validateCardId } = require('../utils/validators/cards');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.route('/')
  .get(getCards)
  .post(validateCard, createCard);
router.route('/:cardId/likes')
  .all(validateCardId)
  .put(likeCard)
  .delete(dislikeCard);
router.delete('/:cardId', validateCardId, deleteCard);

module.exports = router;
