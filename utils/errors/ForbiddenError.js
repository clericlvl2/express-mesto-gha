const HttpError = require('./HttpError');
const { HTTP_ERROR } = require('../constants');

class ForbiddenError extends HttpError {
  constructor(message) {
    super(message);
    this.setErrorProperties(HTTP_ERROR.FORBIDDEN);
  }
}

module.exports = ForbiddenError;
