const router = require('express').Router();

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const rootRoutes = require('./auth');

const { auth } = require('../middlewares/auth');
const { unmatchedRouteHandler } = require('../utils/helpers');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', rootRoutes);
router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);
router.use('*', auth, unmatchedRouteHandler);

module.exports = router;
