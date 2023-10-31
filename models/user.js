const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const { DEFAULT_USER, ERROR_MESSAGE } = require('../utils/constants');
const { urlRegex } = require('../utils/validators/users');
const { ConflictError } = require('../utils/errors');

const { Schema } = mongoose;

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
    validate: {
      validator(value) {
        return urlRegex.test(value);
      },
      message: ERROR_MESSAGE.users.invalidAvatarUrl,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message(props) {
        return `Ошибка: "${props.value}". ${ERROR_MESSAGE.users.invalidEmail}`;
      },
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.methods.getPublicFields = function toJSON() {
  const {
    name, about, avatar, email,
  } = this.toObject();
  return {
    name, about, avatar, email,
  };
};

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
