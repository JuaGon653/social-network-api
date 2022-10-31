const router = require('express').Router();
const User = require('../../models/User');

// ".lean({ virtuals: true })" - returns documents as plain old javascript objects with virtuals enabled instead of an instance of the mongoose's query class

// '/api/users/'
router.route('/')
    .get(async (req, res) => {
        try {
            // returns all users
            const users = await User.find().lean({ virtuals: true });
            res.status(200).json(users);
        } catch(err) {
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            // returns the created user
            const user = await User.create(req.body).lean({ virtuals: true });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    });

// '/api/users/:userId'
router.route('/:userId')
    .get(async (req, res) => {
        try {
            // returns the user with the given id and populated 'friends' array
            const user = await User.findOne({ _id: req.params.userId }).lean({ virtuals: true }).populate('friends');
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            // returns the updated user if validators pass
            const updatedUser = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    { runValidators: true, new: true }
                ).lean({ virtuals: true });
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            // returns the deleted user
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            // if no user found, returns a message
            if (!deletedUser) {
                throw {message: 'No user found with the given id.'};
            };

            res.status(200).json({message: 'deleted user', user: deletedUser});
        } catch (err) {
            res.status(500).json(err);
        }
    });




// Routes for the friends list
// '/api/users/:userId/friends/:friendId'
router.route('/:userId/friends/:friendId')
    .post(async (req, res) => {
        try {
            // adds friend id to 'friends' array and returns the updated user
            const userWithFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                {$addToSet: { friends: req.params.friendId }},
                { new: true }
            ).lean({ virtuals: true });
            res.status(200).json(userWithFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            // pulls the friend with the given id from the given user id and returns the updated user
            const deletedUserFriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { new: true }
            ).lean({ virtuals: true });
            res.status(200).json(deletedUserFriend);
        } catch (err) {
            res.status(500).json(err);
        }
    });   

module.exports = router;