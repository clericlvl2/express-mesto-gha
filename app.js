require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { mongoose } = require('mongoose');
const { errors } = require('celebrate');
const rateLimiter = require('express-rate-limit');

const routes = require('./routes');
const { RATE_LIMITER_CONFIG } = require('./middlewares/constants');

const {
  unmatchedRouteHandler,
  errorLogger,
  globalErrorHandler,
} = require('./utils/helpers');

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(rateLimiter(RATE_LIMITER_CONFIG));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', routes);

app.use(errors());

app.use(unmatchedRouteHandler);
app.use(errorLogger);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
