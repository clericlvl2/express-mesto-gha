module.exports.SALT_ROUNDS = 10;

module.exports.MODEL_UPDATE_OPTIONS = {
  new: true,
  runValidators: true,
};

module.exports.JWT_SIGN_OPTIONS = {
  expiresIn: '7d',
};

module.exports.COOKIE_OPTIONS = {
  maxAge: 1000 * 3600 * 24 * 7,
  httpOnly: true,
};
