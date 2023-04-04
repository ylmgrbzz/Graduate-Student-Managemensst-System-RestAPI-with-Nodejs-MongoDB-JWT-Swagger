const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

// get all graduates
router.route('/').get(auth('getUsers'), userController.getUsers);

// get me
router.route('/me').get(auth('getMe'), userController.getMe).patch(auth('updateMe'), userController.updateMe);

router.route('/me/skills').post(auth('addSkill'), validate(userValidation.addSkill), userController.addSkill);

router
  .route('/me/skills/:skillId')
  .delete(auth('deleteSkill'), validate(userValidation.deleteSkill), userController.deleteSkill);

router.route('/me/experiences').post(auth('addExperience'), userController.addExperience);

router
  .route('/me/experiences/:experienceId')
  .delete(auth('deleteExperience'), validate(userValidation.deleteExperience), userController.deleteExperience);

// get user by id
router.route('/:userId').get(auth('getUser'), userController.getUser);

router.route('/:userId/friends').post(auth('addFriend'), validate(userValidation.addFriend), userController.addFriend);

router
  .route('/:userId/posts')
  .get(auth('getPosts'), validate(userValidation.getPostsFromUserId), userController.getPostsFromUserId);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management and retrieval
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Get all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get me
 *     description: Get me.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: OK
 *   patch:
 *     summary: Update me
 *     description: Update me.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               job:
 *                 type: string
 *               location:
 *                 type: string
 *               website:
 *                 type: string
 *               phone:
 *                  type: string
 *     responses:
 *       "200":
 *         description: OK
 *
 */

/**
 * @swagger
 * /users/me/skills:
 *   post:
 *     summary: Add skill
 *     description: Add skill.
 *     tags: [Users]
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
 *         description: OK
 */

/**
 * @swagger
 * /users/me/skills/{skillId}:
 *  delete:
 *    summary: Delete skill
 *    description: Delete skill.
 *    tags: [Users]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: skillId
 *        schema:
 *          type: string
 *          required: true
 *          description: Skill id
 *    responses:
 *      "200":
 *        description: OK
 */

/**
 * @swagger
 * /users/me/experiences:
 *   post:
 *     summary: Add experience
 *     description: Add experience.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               firm:
 *                 type: string
 *               duration:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/me/experiences/{experienceId}:
 *   delete:
 *     summary: Delete experience
 *     description: Delete experience.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: experienceId
 *         schema:
 *           type: string
 *           required: true
 *           description: Experience id
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user by id
 *     description: Get user by id.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: User id
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/{userId}/friends:
 *   post:
 *     summary: Add friend
 *     description: Add friend.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: User id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               friendId:
 *                 type: string
 *     responses:
 *       "200":
 *         description: OK
 */

/**
 * @swagger
 * /users/{userId}/posts:
 *   get:
 *     summary: Get posts from user id
 *     description: Get posts from user id.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           required: true
 *           description: User id
 *     responses:
 *       "200":
 *         description: OK
 */
