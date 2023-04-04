const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

const getUserById = async (id) => {
  return User.findById(id);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

const addFriend = async (userId, friendId) => {
  const user = await getUserById(userId);
  const friend = await getUserById(friendId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!friend) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Friend not found');
  }
  user.friends.push(friend);
  await user.save();
  return user;
};

const getAllUsers = async () => {
  return User.find();
};

const getUserFriends = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  // populate user friends without returning password
  const userFriends = await User.populate(user, { path: 'friends', select: '-password' });
  return userFriends.friends;
};

const addSkill = async (userId, skill) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  user.skills.push(skill);
  await user.save();
  return user;
};

const addExperience = async (userId, experience) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  console.log(experience);
  user.experiences.push(experience);
  await user.save();
  return user;
};

const deleteExperience = async (userId, experienceId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  console.log(experienceId);
  user.experiences.pull(experienceId);
  await user.save();
  return user;
};

const deleteSkill = async (userId, skillId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  console.log(skillId);
  user.skills.pull(skillId);
  await user.save();
  return user;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  addFriend,
  getAllUsers,
  getUserFriends,
  addSkill,
  addExperience,
  deleteExperience,
  deleteSkill,
};
