const { NODE_ENV, JWT_SECRET } = process.env;

const { mongoose } = require('mongoose');
const { HttpError, ValidationError, NotFoundError } = require('./errors');
const { ERROR_MESSAGE, HTTP_ERROR } = require('./constants');

const MongooseError = mongoose.Error;

const getJwtSecret = () => (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

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

const checkDataForNull = errorMessage => data => {
  if (isExist(data)) {
    return data;
  }

  throw new NotFoundError(errorMessage);
};

const processError = (err, message) => {
  switch (true) {
    case err instanceof HttpError: {
      return err;
    }
    case err instanceof MongooseError.ValidationError:
    case err instanceof MongooseError.CastError: {
      return new ValidationError(message);
    }
    default: {
      return new HttpError(message);
    }
  }
};

const responseHandler = res => data => res.send({ data });

const errorHandler = (next, message = ERROR_MESSAGE.default) =>
  err => next(processError(err, message));

const unmatchedRouteHandler = (req, res, next) => {
  next(new NotFoundError(ERROR_MESSAGE.unmatchedRoute));
};

const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const sendError = (
  res,
  code = HTTP_ERROR.SERVER.status,
  message = ERROR_MESSAGE.default,
) => res
  .status(code)
  .json({ message });

// eslint-disable-next-line no-unused-vars
const globalErrorHandler = (err, req, res, next) => {
  const { statusCode, message } = err;
  sendError(res, statusCode, message);
};

module.exports = {
  processError,
  isExist,
  getJwtSecret,
  filterProperties,
  responseHandler,
  errorHandler,
  unmatchedRouteHandler,
  errorLogger,
  globalErrorHandler,
  checkDataForNull,
};
