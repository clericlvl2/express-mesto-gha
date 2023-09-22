const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserAvatar,
  updateUserInfo,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/me', updateUserInfo);
router.post('/me/avatar', updateUserAvatar);

module.exports = router;
