require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { mongoose } = require('mongoose');
const { errors } = require('celebrate');

// TODO validate incoming requests
// TODO применить все эти замечательные библиотеки
// const helmet = require('helmet');
// const escape = require('escape-html');
// requestsRateLimiter

const routes = require('./routes');

const {
  unmatchedRouteHandler,
  errorLogger,
  globalErrorHandler,
} = require('./utils/helpers');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

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
