const router = require('express').Router();
const { Thought, User } = require('../../models/');

router.route('/')
    .get(async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            const newThought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: newThought.userId },
                { $addToSet: { thoughts: newThought._id }},
                { new: true }
            );
            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.route('/:thoughtId')
    .get(async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .put(async (req, res) => {
        try {
            // replaces field values
            const almostUpdateThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: false }
            );

            // if request body has a userId property
            if (req?.body?.userId) {
                // removes thought id from previous user
                await User.findOneAndUpdate(
                    { _id: almostUpdateThought.userId.toString() },
                    { $pull: { thoughts: req.params.thoughtId }},
                    { new: true }
                );
                // adds thought id to current user
                const newUser = await User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: almostUpdateThought._id }},
                    { new: true }
                );
                // updates thought username to new user's username
                await Thought.findOneAndUpdate(
                    { _id: req.params.thoughtId },
                    { username: newUser.username }
                );
            }

            // returns updated thought
            res.status(200).json({message: 'Update successful!', updatedThought: await Thought.findOne({ _id: req.params.thoughtId })});
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deletedThought) {
                throw {message: 'No thought found with the given id.'};
            };

            res.status(200).json({message: 'deleted thought', thought: deletedThought });
        } catch (err) {
            res.status(500).json(err);
        }
    });

module.exports = router;