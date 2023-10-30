const router = require('express').Router();

const cardsRoutes = require('./cards');
const usersRoutes = require('./users');
const rootRoutes = require('./auth');

const { auth } = require('../middlewares/auth');

router.use('/', rootRoutes);
router.use('/users', auth, usersRoutes);
router.use('/cards', auth, cardsRoutes);

module.exports = router;
