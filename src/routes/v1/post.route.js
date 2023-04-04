const express = require('express');
const validate = require('../../middlewares/validate');
const postController = require('../../controllers/post.controller');
const postValidation = require('../../validations/post.validation');
const auth = require('../../middlewares/auth');
const { route } = require('./auth.route');

const router = express.Router();

router
  .route('/')
  .post(auth('createPost'), validate(postValidation.createPost), postController.createPost)
  .get(auth('getPosts'), postController.getPosts);

router
  .route('/:postId')
  .patch(auth('updatePost'), validate(postValidation.updatePost), postController.updatePost)
  .delete(auth('deletePost'), postController.deletePost);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management and retrieval
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a post
 *     description: Only admins can create other posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Created
 *
 *   get:
 *     summary: Get all posts
 *     description: Get all posts.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /posts/{postId}:
 *   patch:
 *     summary: Update a post
 *     description: User can update their own post.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 *
 *   delete:
 *     summary: Delete a post
 *     description: User can delete their own post.
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *           required: true
 *     responses:
 *       "200":
 *         description: OK
 */
