const router = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
  getOwnUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.route('me')
  .get(getOwnUser)
  .patch(updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
