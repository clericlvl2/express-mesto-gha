const mongoose = require('mongoose');

const {
  validateSchemaURL: validateURL,
} = require('../utils/validators/helpers');

const { Schema } = mongoose;

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: validateURL,
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

cardSchema.methods.getPublicProps = function getPublicProps() {
  const {
    name, link, owner, likes, createdAt, _id,
  } = this.toObject();
  return {
    name, link, owner, likes, createdAt, _id,
  };
};

cardSchema.statics.deleteById = function deleteById(_id) {
  return this.deleteOne({ _id });
};

module.exports = mongoose.model('card', cardSchema);
