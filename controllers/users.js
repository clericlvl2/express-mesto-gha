const User = require('../models/user');
const { ERROR_MESSAGE, MODEL_UPDATE_OPTIONS } = require('../utils/constants');
const {
  responseHandler,
  errorHandler,
  checkDataForNull,
  filterProperties,
} = require('../utils/helpers');

module.exports.getUsers = (req, res) => {
  User.find({}).then(responseHandler(res)).catch(errorHandler(res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(checkDataForNull(ERROR_MESSAGE.users.notFoundById))
    .then(responseHandler(res))
    .catch(errorHandler(res, ERROR_MESSAGE.users.notFoundById));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(responseHandler(res))
    .catch(errorHandler(res, ERROR_MESSAGE.users.invalidDataOnCreateUser));
};

const findUserByIdAndUpdate = ({
  id, newData, errorMessage, res,
}) => {
  User.findByIdAndUpdate(id, newData, MODEL_UPDATE_OPTIONS)
    .then(checkDataForNull(ERROR_MESSAGE.users.notFoundById))
    .then(responseHandler(res))
    .catch(errorHandler(res, errorMessage));
};

module.exports.updateUserInfo = (req, res) => findUserByIdAndUpdate({
  id: req.user._id,
  newData: filterProperties(req.body, ['name', 'about']),
  errorMessage: ERROR_MESSAGE.users.invalidDataOnUpdateInfo,
  res,
});

module.exports.updateUserAvatar = (req, res) => findUserByIdAndUpdate({
  id: req.user._id,
  newData: { avatar: req.body.avatar },
  errorMessage: ERROR_MESSAGE.users.invalidDataOnUpdateAvatar,
  res,
});
