const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');

const createPost = async (user, postBody) => {
  return Post.create({ ...postBody, user: user });
};

const updatePost = async (postId, updateBody) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  Object.assign(post, updateBody);
  await post.save();
  return post;
};

const deletePost = async (postId) => {
  const post = await getPostById(postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  await post.remove();
  return post;
};

const getUserPosts = async (userId) => {
  const posts = await Post.find({ user: userId });
  return posts;
};

const getAllPosts = async () => {
  const posts = await Post.find().populate('user');
  return posts;
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
  getAllPosts,
};
