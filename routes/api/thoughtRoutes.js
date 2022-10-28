const router = require('express').Router();
const { Thought } = require('../../models/');

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
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedThought);
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