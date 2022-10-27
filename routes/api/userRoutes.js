const router = require('express').Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
    try {
        const users = User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;