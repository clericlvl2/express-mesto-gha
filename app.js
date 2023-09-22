const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const {
  unmatchedRouteHandler,
  errorLogger,
  globalErrorHandler,
} = require('./utils/helpers');

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = { _id: '650a0002caed4fe99702b984' };
  next();
});

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use(unmatchedRouteHandler);

app.use(errorLogger);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
