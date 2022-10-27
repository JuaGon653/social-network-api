const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});

    const users = [];

    users.push({
        username: "JuaGon653",
        email: "Juaninb2003icloud.com"
    });
    users.push({
        username: "DQPWC",
        email: "test@gmail.com"
    });

    for (let user of users) {
        await User.collection.insertOne(user);
    }
    process.exit(0);
})