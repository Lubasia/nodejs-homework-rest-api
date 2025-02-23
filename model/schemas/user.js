const { Schema } = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const schemaUser = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  },
  avatarUrl: {
    type: String,
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
});

schemaUser.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

schemaUser.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const validateUser = newUser => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(newUser);
  return error;
};
module.exports = { schemaUser, validateUser };
