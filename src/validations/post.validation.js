const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      text: Joi.string(),
    })
    .min(1),
};

const deletePost = {
  params: Joi.object().keys({
    postId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
};
