const HttpError = require('./errors/HttpError');
const ValidationError = require('./errors/ValidationError');
const DocumentNotFoundError = require('./errors/DocumentNotFoundError');
const { ERROR_STATUS, ERROR_MESSAGE } = require('./constants');

const isExist = val => val !== undefined && val !== null;

const filterProperties = (obj = {}, propsToFilter = []) => {
  const filteredObj = {};
  propsToFilter.forEach(prop => {
    if (isExist(obj[prop])) {
      filteredObj[prop] = obj[prop];
    }
  });
  return filteredObj;
};

const handleResponse = res => data => res.send({ data });

const handleError = res => err => {
  let code = ERROR_STATUS.CODE_500;
  let message = ERROR_MESSAGE.default;

  if (err instanceof HttpError) {
    message = err.message;
    code = err.statusCode;
  }

  res.status(code).send({ message });
};

const handleValidationError = (res, fallbackErrorMessage) => err => {
  let processedError = err;

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    processedError = new ValidationError(fallbackErrorMessage);
  }

  handleError(res)(processedError);
};

const checkDataForNull = fallbackErrorMessage => data => {
  if (isExist(data)) {
    return data;
  }

  throw new DocumentNotFoundError(fallbackErrorMessage);
};

module.exports = {
  isExist,
  filterProperties,
  handleResponse,
  handleError,
  handleValidationError,
  checkDataForNull,
};
