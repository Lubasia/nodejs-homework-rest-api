const { User } = require('../model');
const gravatar = require('gravatar');
const getUserById = id => User.findById(id);

const getOneUser = filter => {
  return User.findOne(filter);
};

const addUser = ({ email, password }) => {
  const avatarUrl = gravatar.url(email);
  const newUser = new User({ email, avatarUrl });
  newUser.setPassword(password);
  return newUser.save();
};

const updateUserById = (id, updateInfo) => {
  return User.findByIdAndUpdate(id, updateInfo);
};

module.exports = {
  getOneUser,
  addUser,
  getUserById,
  updateUserById,
};
