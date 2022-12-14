const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [
        {
            username: 'NikJRuiz1345',
            email: 'nikj123@gmail.com'
        },
        {
            username: 'Juicegoosy',
            email: 'memome@hotmail.com'
        },
        {
            username: 'JuaGon653',
            email: 'gonzaj7653@g.comalisd.edu'
        }
    ];

    let createdUsers = [];

    for (let user of users) {
        createdUsers.push(await User.create(user));
        
    };

    await User.findOneAndUpdate(
        { _id: createdUsers[0]._id },
        {$addToSet: { friends: createdUsers[1]._id }}
    );
    await User.findOneAndUpdate(
        { _id: createdUsers[0]._id },
        {$addToSet: { friends: createdUsers[2]._id }}
    );
    await User.findOneAndUpdate(
        { _id: createdUsers[2]._id },
        { $addToSet: { friends: createdUsers[0]._id }}
    );

    const thoughts = [
        {
            thoughtText: 'This is a thought...',
            username: 'JuaGon653',
            userId: createdUsers[2]._id
        },
        {
            thoughtText: 'You fake sleep in order to fall asleep.',
            username: 'Juicegoosy',
            userId: createdUsers[1]._id
        },
        {
            thoughtText: 'Pleasure is the minds greatest disease.',
            username: 'Juicegoosy',
            userId: createdUsers[1]._id
        }
    ];

    for (let i = 0; i < thoughts.length; i++)    {
        const thoughttt = await Thought.create(thoughts[i]);
        await User.findOneAndUpdate(
            { _id: thoughts[i].userId },
            { $addToSet: { thoughts: thoughttt._id }},
        );
        if (i === 0) {
            await Thought.findOneAndUpdate(
                { _id: thoughttt._id },
                { $push: { reactions: { reactionBody: 'What a thought!', username: 'JuaGon653' } }},
                { runValidators: true, new: true }
            );
        }
    };

    

    process.exit(0);
})