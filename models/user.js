const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { DEFAULT_USER, ERROR_MESSAGE } = require('../utils/constants');
const { ConflictError } = require('../utils/errors');

const { Schema } = mongoose;

// TODO add custom validator (email + avatar)
const userSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER.name,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER.about,
  },
  avatar: {
    type: String,
    default: DEFAULT_USER.avatar,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  const rejectWithConflictError = () => {
    const message = ERROR_MESSAGE.invalidPasswordOrLogin;
    return Promise.reject(new ConflictError(message));
  };

  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return rejectWithConflictError();
      }

      // TODO как он сравнивает без соли
      return bcrypt.compare(password, user.password)
        .then(hasMatch => {
          if (!hasMatch) {
            return rejectWithConflictError();
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
