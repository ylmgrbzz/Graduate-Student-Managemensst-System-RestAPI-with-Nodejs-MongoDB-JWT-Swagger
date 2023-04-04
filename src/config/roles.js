const allRoles = {
  user: [
    'getUsers',
    'getUser',
    'updateMe',
    'getMe',
    'addFriend',
    'getPosts',
    'createPost',
    'updatePost',
    'deletePost',
    'addSkill',
    'deleteSkill',
    'addExperience',
    'deleteExperience',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
