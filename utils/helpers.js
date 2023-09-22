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

const responseHandler = res => data => res.send({ data });

const sendError = (res, code, message) => res
  .status(code)
  .json({ message });

const errorHandler = (res, errorMessage = ERROR_MESSAGE.default) =>
  err => {
    let processedError;

    if (err instanceof HttpError) {
      processedError = err;
    } else if (err.name === 'ValidationError' || err.name === 'CastError') {
      processedError = new ValidationError(errorMessage);
    } else {
      processedError = new HttpError(errorMessage);
    }

    sendError(res, processedError.statusCode, processedError.message);
  };

const unmatchedRouteHandler = (req, res, next) => {
  sendError(res, ERROR_STATUS.CODE_404, ERROR_MESSAGE.unmatchedRoute);
  next();
};

const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  sendError(res, ERROR_STATUS.CODE_500, ERROR_MESSAGE.default);
};

const checkDataForNull = errorMessage => data => {
  if (isExist(data)) {
    return data;
  }

  throw new DocumentNotFoundError(errorMessage);
};

module.exports = {
  isExist,
  filterProperties,
  responseHandler,
  errorHandler,
  unmatchedRouteHandler,
  errorLogger,
  globalErrorHandler,
  checkDataForNull,
};
