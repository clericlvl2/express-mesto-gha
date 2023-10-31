const jwt = require('jsonwebtoken');

const { isExist, getJwtSecret } = require('../utils/helpers');
const { UnauthorizedError } = require('../utils/errors');
const { ERROR_MESSAGE } = require('../utils/constants');

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  const isLogged = isExist(jwtToken);

  const getAuthError = () => {
    const message = ERROR_MESSAGE.rejectUnauthorized;
    return new UnauthorizedError(message);
  };

  if (!isLogged) {
    throw getAuthError();
  }

  let payload;

  try {
    payload = jwt.verify(jwtToken, getJwtSecret());
  } catch (err) {
    throw getAuthError();
  }

  req.user = payload;

  next();
};
