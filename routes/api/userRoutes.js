const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userControllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/').update(updateUser).post(updateUser);

router.route('/:userId').delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;