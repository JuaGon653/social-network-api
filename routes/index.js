// used to create modular, mountable route handlers
const router = require('express').Router();
// imports routes from api folder
const apiRoutes = require('./api');

// path always begins with '/api' to access routes
router.use('/api', apiRoutes);

// any unknown route returns 'Wrong route!'
router.use((req, res) => {
    return res.send('Wrong route!');
});

module.exports = router;