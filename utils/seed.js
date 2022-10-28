const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const thoughts = [];

    users.push({
        username: "JuaGon653",
        email: "Juaninb2003@icloud.com"
    });
    users.push({
        username: "DQPWC",
        email: "test@gmail.com"
    });

    for (let user of users) {
        await User.create(user);
    }

    let id = await User.find();
    thoughts.push({
        thoughtText: "This is a thought...",
        username: "JuaGon653",
        userId: id[0]._id
    });
    thoughts.push({
        thoughtText: "That's enough",
        username: "JuaGon653",
        userId: id[0]._id
    });

    for (let thought of thoughts)    {
        const thoughttt = await Thought.create(thought);
        await User.findOneAndUpdate(
            { _id: thought.userId },
            { $addToSet: { thoughts: thoughttt._id }},
        );
    }
    process.exit(0);
})