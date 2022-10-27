// the mongoose's Schema contructor and model method 
const { Schema, model } = require('mongoose');

// user schema/skeleton of a user document
const userSchema = new Schema(
    {
        username: {
            type: String, 
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            unique: true,
            // validates email 
            validate: [function(email) {
                var regex = /^([a-z0-9_.-]+)@([\da-z.-]+).([a-z.]{2,6})$/i;
                return regex.test(email);
            }, 'Please fill a valid email address']
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            reg: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// creates a 'friendCount' field NOT stored in the MongoDB
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

// creates mongoose model
const User = model('user', userSchema);

// exports user model
module.exports = User;