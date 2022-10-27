// returns the mongoose export object
const mongoose = require('mongoose');

// connects mongoose to the database in MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// exports the mongoose connection
module.exports = mongoose.connection;