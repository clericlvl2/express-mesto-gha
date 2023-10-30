const HttpError = require('./HttpError');
const { HTTP_ERROR } = require('../constants');

class UnauthorizedError extends HttpError {
  constructor(message) {
    super(message);
    this.setErrorProperties(HTTP_ERROR.UNAUTHORIZED);
  }
}

module.exports = UnauthorizedError;
