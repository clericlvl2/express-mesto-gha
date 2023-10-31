const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { ConflictError } = require('../utils/errors');
const { ERROR_MESSAGE } = require('../utils/constants');
const { MODEL_UPDATE_OPTIONS, SALT_ROUNDS } = require('./constants');
const {
  responseHandler,
  errorHandler,
  checkDataForNull,
  filterProperties,
  processError,
} = require('../utils/helpers');

const {
  notFoundById,
  invalidDataOnUpdateAvatar,
  invalidDataOnUpdateInfo,
  invalidDataOnCreateUser,
  invalidEmailOnSignUp,
} = ERROR_MESSAGE.users;

const nullDataHandler = checkDataForNull(notFoundById);

const findUserById = ({
  res, next, id, errorMessage = notFoundById,
}) => {
  User.findById(id)
    .then(nullDataHandler)
    .then(responseHandler(res))
    .catch(errorHandler(next, errorMessage));
};

const findUserByIdAndUpdate = ({
  id, newData, errorMessage, res, next,
}) => {
  User.findByIdAndUpdate(id, newData, MODEL_UPDATE_OPTIONS)
    .then(nullDataHandler)
    .then(responseHandler(res))
    .catch(errorHandler(next, errorMessage));
};

module.exports.getUserById = (req, res, next) =>
  findUserById({ res, next, id: req.params.id });

module.exports.getOwnUser = (req, res, next) =>
  findUserById({ res, next, id: req.user._id });

module.exports.updateUserInfo = (req, res) => findUserByIdAndUpdate({
  id: req.user._id,
  newData: filterProperties(req.body, ['name', 'about']),
  errorMessage: invalidDataOnUpdateInfo,
  res,
});

module.exports.updateUserAvatar = (req, res) => findUserByIdAndUpdate({
  id: req.user._id,
  newData: { avatar: req.body.avatar },
  errorMessage: invalidDataOnUpdateAvatar,
  res,
});

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, password, email,
  } = req.body;

  bcrypt.hash(password, SALT_ROUNDS)
    .then(hashedPassword => User.create({
      name, about, avatar, email, password: hashedPassword,
    }))
    .then(user => {
      responseHandler(res)(user.getPublicFields());
    })
    .catch(err => {
      const error = err.code === 11000
        ? new ConflictError(invalidEmailOnSignUp)
        : processError(err, invalidDataOnCreateUser);

      next(error);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({}).then(responseHandler(res)).catch(errorHandler(next));
};
