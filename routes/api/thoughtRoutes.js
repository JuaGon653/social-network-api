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



module.exports = router;