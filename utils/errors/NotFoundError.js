const HttpError = require('./HttpError');
const { HTTP_ERROR } = require('../constants');

class NotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.setErrorProperties(HTTP_ERROR.NOT_FOUND);
  }
}

module.exports = NotFoundError;
