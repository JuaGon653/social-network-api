const router = require('express').Router();
const { Thought, User } = require('../../models/');

// ".lean({ virtuals: true, getters: true })" - returns documents as plain old javascript objects with virtuals and getters enabled instead of an instance of the mongoose's query class

// '/api/thoughts/'
router.route('/')
    .get(async (req, res) => {
        try {
            // returns all created thoughts
            const thoughts = await Thought.find().lean({ virtuals: true, getters: true });
            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async (req, res) => {
        try {
            // creates and returns new thought and updates the user that created it 'thought' array
            const newThought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                { _id: newThought.userId },
                { $addToSet: { thoughts: newThought._id }},
                { new: true }
            ).lean({ virtuals: true, getters: true });
                res.status(200).json({ message: 'Successfully created thought!', newThought });
        } catch (err) {
            res.status(500).json(err);
        }
    });

// '/api/thoughts/:thoughtId'
router.route('/:thoughtId')
    .get(async (req, res) => {
        try {
            // returns thought that holds the id in the request params
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).lean({ virtuals: true, getters: true });
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
                { runValidators: true, new: false }
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
            res.status(200).json({message: 'Successfully updated thought!', updatedThought: await Thought.findOne({ _id: req.params.thoughtId }).lean({ virtuals: true, getters: true })});
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

            res.status(200).json({message: 'Successfully deleted thought!', deletedThought });
        } catch (err) {
            res.status(500).json(err);
        }
    });

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // adds the reaction to the thought with the given id and returns the updated thought
        const thoughtWithReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body }},
            { runValidators: true, new: true }
        ).lean({ virtuals: true, getters: true });

        res.status(200).json({ message: 'Successfully added reaction!', thoughtWithReaction });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // removes the reaction and returns the updated thought
        const thoughtWithoutReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { new: true }
        ).lean({ virtuals: true, getters: true });

        res.status(200).json({ message: 'Successfully removed reaction!', thoughtWithoutReaction });
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;