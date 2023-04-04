const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService, postService } = require('../services');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.OK).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const users = await userService.getAllUsers();
  res.send(users);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userFriends = await userService.getUserFriends(req.params.userId);
  const userPosts = await postService.getUserPosts(req.params.userId);
  res.send({ user, userFriends, userPosts });
});

const updateMe = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.send(user);
});

const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userFriends = await userService.getUserFriends(req.user.id);
  const userPosts = await postService.getUserPosts(req.user.id);
  res.send({ user, userPosts });
});

const addFriend = catchAsync(async (req, res) => {
  const user = await userService.addFriend(req.user.id, req.params.userId);
  res.send(user);
});

const getPostsFromUserId = catchAsync(async (req, res) => {
  const posts = await postService.getUserPosts(req.params.userId);
  res.send(posts);
});

const deleteExperience = catchAsync(async (req, res) => {
  const user = await userService.deleteExperience(req.user.id, req.params.experienceId);
  res.send(user);
});

const addExperience = catchAsync(async (req, res) => {
  const user = await userService.addExperience(req.user.id, req.body);
  res.send(user);
});

const addSkill = catchAsync(async (req, res) => {
  const user = await userService.addSkill(req.user.id, req.body);
  res.send(user);
});

const deleteSkill = catchAsync(async (req, res) => {
  const user = await userService.deleteSkill(req.user.id, req.params.skillId);
  res.send(user);
});

module.exports = {
  deleteExperience,
  addExperience,
  addSkill,
  deleteSkill,
  createUser,
  getUsers,
  getUser,
  updateMe,
  getMe,
  addFriend,
  getPostsFromUserId,
};
