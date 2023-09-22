const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { DEFAULT_PORT, DB_URL, TEST_USER_ID } = require('./utils/constants');

const app = express();

const { PORT = DEFAULT_PORT } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(DB_URL, { useNewUrlParser: true });

app.use((req, res, next) => {
  req.user = { _id: TEST_USER_ID };
  next();
});
app.use('/cards', cardsRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
