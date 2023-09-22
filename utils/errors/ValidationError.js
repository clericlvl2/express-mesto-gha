const HttpError = require('./HttpError');
const { ERROR_STATUS } = require('../constants');

class ValidationError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = ERROR_STATUS.CODE_400;
  }
}

module.exports = ValidationError;
