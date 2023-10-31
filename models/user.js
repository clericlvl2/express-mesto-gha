const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../utils/errors');
const { DEFAULT_USER, ERROR_MESSAGE } = require('../utils/constants');
const {
  validateSchemaEmail: validateEmail,
  validateSchemaURL: validateURL,
} = require('../utils/validators/helpers');

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
      validator: validateURL,
      message: ERROR_MESSAGE.users.invalidAvatarUrl,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: ERROR_MESSAGE.users.invalidEmail,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.methods.getPublicProps = function getPublicProps() {
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
    return Promise.reject(new UnauthorizedError(message));
  };

  return this.findOne({ email }).select('+password')
    .then(user => {
      if (!user) {
        return rejectWithConflictError();
      }

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
