const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.route('/')
  .get(getCards)
  .post(createCard);
router.route('/:cardId/likes')
  .put(likeCard)
  .delete(dislikeCard);
router.delete('/:cardId', deleteCard);

module.exports = router;
