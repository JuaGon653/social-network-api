const router = require('express').Router();
const { Thought, User } = require('../../models/');

// root path '/api/thoughts/'
router.route('/')
    // returns all created thoughts
    .get(async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    // creates a thought
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

// '/api/thoughts/:thoughtId'
router.route('/:thoughtId')
    // returns thought that holds the id in the request params
    .get(async (req, res) => {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    // updates a thought
    .put(async (req, res) => {
        try {
            // replaces updated field values
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
    // deletes thought that holds the id in the request params
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