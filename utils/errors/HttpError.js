const { ERROR_STATUS } = require('../constants');

class HttpError extends Error {
  constructor(message) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = ERROR_STATUS.CODE_500;
  }
}

module.exports = HttpError;
