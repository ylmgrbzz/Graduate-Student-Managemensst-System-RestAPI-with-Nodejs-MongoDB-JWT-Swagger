const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const addFriend = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getPostsFromUserId = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const addSkill = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const deleteSkill = {
  params: Joi.object().keys({
    skillId: Joi.string().custom(objectId),
  }),
};

const addExperience = {
  body: Joi.object().keys({
    firm: Joi.string().required(),
    duration: Joi.string().required(),
  }),
};

const deleteExperience = {
  params: Joi.object().keys({
    experienceId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  addExperience,
  deleteExperience,
  addSkill,
  deleteSkill,
  addFriend,
  getPostsFromUserId,
  createUser,
  getUser,
  updateUser,
  deleteUser,
};
