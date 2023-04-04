const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, postService } = require('../services');

const createPost = catchAsync(async (req, res) => {
  const post = await postService.createPost(req.user, req.body);
  res.status(httpStatus.OK).send(post);
});

const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getAllPosts();
  res.send(posts);
});

const getPost = catchAsync(async (req, res) => {
  const post = await postService.getPostById(req.params.postId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Post not found');
  }
  res.send(post);
});

const updatePost = catchAsync(async (req, res) => {
  const post = await postService.updatePostById(req.params.postId, req.body);
  res.send(post);
});

const deletePost = catchAsync(async (req, res) => {
  const post = await postService.deletePostById(req.params.postId);
  res.send(post);
});

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
