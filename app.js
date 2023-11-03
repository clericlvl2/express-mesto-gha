require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { mongoose } = require('mongoose');
const { errors } = require('celebrate');

const routes = require('./routes');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  errorConsoleLogger,
  globalErrorHandler,
} = require('./utils/helpers');

const app = express();

const { PORT = 3000 } = process.env;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
app.use('/', routes);
app.use(errorLogger);
app.use(errorConsoleLogger);

app.use(errors());
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
