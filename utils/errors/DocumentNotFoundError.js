const HttpError = require('./HttpError');
const { ERROR_STATUS } = require('../constants');

class DocumentNotFoundError extends HttpError {
  constructor(message) {
    super(message);
    this.name = 'DocumentNotFoundError';
    this.statusCode = ERROR_STATUS.CODE_404;
  }
}

module.exports = DocumentNotFoundError;
