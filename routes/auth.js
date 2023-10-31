const router = require('express').Router();

const { validateUser } = require('../utils/validators/users');
const { validateLogin } = require('../utils/validators/auth');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/users');

router.post('/signup', validateUser, createUser);
router.post('/signin', validateLogin, login);

module.exports = router;
