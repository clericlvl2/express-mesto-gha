const jwt = require('jsonwebtoken');

const { isExist, getJwtSecret } = require('../utils/helpers');
const { UnauthorizedError } = require('../utils/errors');
const { ERROR_MESSAGE } = require('../utils/constants');

const AUTH_HEADER = 'Bearer ';

// eslint-disable-next-line consistent-return
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  const isLogged = isExist(authorization) && authorization.startsWith(AUTH_HEADER);

  const getAuthError = () => {
    const message = ERROR_MESSAGE.rejectUnauthorized;
    return new UnauthorizedError(message);
  };

  if (!isLogged) {
    throw getAuthError();
  }

  const token = authorization.replace(AUTH_HEADER, '');
  let payload;

  try {
    payload = jwt.verify(token, getJwtSecret());
  } catch (err) {
    throw getAuthError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
