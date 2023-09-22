const User = require('../models/user');
const { ERROR_MESSAGE, MODEL_UPDATE_OPTIONS } = require('../utils/constants');
const {
  filterProperties,
  handleResponse,
  handleError,
  handleValidationError,
  checkDataForNull,
} = require('../utils/helpers');

module.exports.getUsers = (req, res) => {
  User.find({}).then(handleResponse(res)).catch(handleError(res));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.id)
    .then(checkDataForNull(ERROR_MESSAGE.users.notFoundById))
    .then(handleResponse(res))
    .catch(handleError(res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(handleResponse(res))
    .catch(
      handleValidationError(res, ERROR_MESSAGE.users.invalidDataOnCreateUser),
    );
};

module.exports.updateUserInfo = (req, res) => {
  const dataToUpdate = filterProperties(req.body, ['name', 'about']);

  User.findByIdAndUpdate(req.user._id, dataToUpdate, MODEL_UPDATE_OPTIONS)
    .then(checkDataForNull(ERROR_MESSAGE.users.notFoundById))
    .then(handleResponse(res))
    .catch(
      handleValidationError(res, ERROR_MESSAGE.users.invalidDataOnUpdateInfo),
    );
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, MODEL_UPDATE_OPTIONS)
    .then(checkDataForNull(ERROR_MESSAGE.users.notFoundById))
    .then(handleResponse(res))
    .catch(
      handleValidationError(res, ERROR_MESSAGE.users.invalidDataOnUpdateAvatar),
    );
};
