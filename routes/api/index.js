const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// use path '/api/users' to get to user routes
router.use('/users', userRoutes);
// use path '/api/thoughts' to get to thought routes
// router.use('/thoughts', thoughtRoutes);

module.exports = router;