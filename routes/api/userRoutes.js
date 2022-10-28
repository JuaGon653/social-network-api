const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

router.route('/:userId')
    .get(async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            if ((req?.body?.email) && !/^([a-z0-9\_\.\-]+)\@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i.test(req.body.email)) {
                throw {message: "Please enter a valid email!"};
            };
            const updatedUser = await User
                .findOneAndUpdate(
                    { _id: req.params.userId },
                    { $set: req.body },
                    { new: true }
                );
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });

            if (!deletedUser) {
                throw {message: 'No user found with the given id.'};
            };

            res.status(200).json({message: 'deleted user', user: deletedUser});
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Routes for the friends list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const userWithFriend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$addToSet: { friends: req.params.friendId }},
            { new: true }
        );
        res.status(200).json(userWithFriend);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;