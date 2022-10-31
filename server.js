// returning express module/package
const express = require('express');
// returning connection and route modules
const db = require('./config/connection');
const routes = require('./routes');

// environment variable PORT or local port 3001
const PORT = process.env.PORT || 3001;
// creates a new express application
const app = express();

// express method used as middleware to recognize the incoming request object as string or arrays
app.use(express.urlencoded({ extended: true }));
// express method used as middleware to recognize the incoming request object as a JSON Object
app.use(express.json());

// uses the created routes in the routes folder
app.use(routes);

// when connection is open; express app begins to listen on *PORT* for connections, and a console log indicating the server is running is printed
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port: ${PORT}.`);
    });
});