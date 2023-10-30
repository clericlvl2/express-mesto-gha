const HttpError = require('./HttpError');
const NotFoundError = require('./NotFoundError');
const ConflictError = require('./ConflictError');
const ValidationError = require('./ValidationError');
const UnauthorizedError = require('./UnauthorizedError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  HttpError,
  NotFoundError,
  ConflictError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
};
