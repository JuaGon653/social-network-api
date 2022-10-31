// the mongoose's Schema contructor and model method 
const { Schema, model } = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

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
            validate: {
                validator: function(v) {
                    return /^([a-z0-9\_\.\-]+)\@([\da-z\.\-]+)\.([a-z\.]{2,6})$/i
                    .test(v);
                },
                message: "Please enter a valid email"
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
        versionKey: false
    }
);

// creates a 'friendCount' field NOT stored in the MongoDB
userSchema
    .virtual('friendCount')
    .get(function() {
        return this.friends.length;
    });

userSchema.plugin(mongooseLeanVirtuals);

// creates mongoose model
const User = model('user', userSchema);

// exports user model
module.exports = User;