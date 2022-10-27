const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Thought document skeleton/schema
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get() {
                // date formatter copied from https://stackoverflow.com/a/11591900
                return (((this.createdAt.getMonth() > 8) ? (this.createdAt.getMonth() + 1) : ('0' + (this.createdAt.getMonth() + 1))) + '/' + ((this.createdAt.getDate() > 9) ? this.createdAt.getDate() : ('0' + this.createdAt.getDate())) + '/' + this.createdAt.getFullYear())
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// field 'reactionCount' NOT stored in MongoDB
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

// mongoose model created
const Thought = model('thought', thoughtSchema);

// export Thought model
module.exports = Thought;