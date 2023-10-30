const { HTTP_ERROR } = require('../constants');

class HttpError extends Error {
  constructor(message) {
    super(message);
    this.setErrorProperties(HTTP_ERROR.SERVER);
  }

  setErrorProperties({ name, status }) {
    this.name = name;
    this.statusCode = status;
  }
}

module.exports = HttpError;
