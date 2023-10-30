const HttpError = require('./HttpError');
const { HTTP_ERROR } = require('../constants');

class ConflictError extends HttpError {
  constructor(message) {
    super(message);
    this.setErrorProperties(HTTP_ERROR.CONFLICT);
  }
}

module.exports = ConflictError;
