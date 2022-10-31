const { Schema, model } = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');
const mongooseLeanGetters = require('mongoose-lean-getters');
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
            get: function(createdAt) {
                // date formatter copied from https://stackoverflow.com/a/11591900
                return (((createdAt.getMonth() > 8) ? (createdAt.getMonth() + 1) : ('0' + (createdAt.getMonth() + 1))) + '/' + ((createdAt.getDate() > 9) ? createdAt.getDate() : ('0' + createdAt.getDate())) + '/' + createdAt.getFullYear())
            }
        },
        username: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
        versionKey: false
    }
);

// field 'reactionCount' NOT stored in MongoDB
thoughtSchema
    .virtual('reactionCount')
    .get(function() {
        return this.reactions.length;
    });

thoughtSchema.plugin(mongooseLeanVirtuals);
thoughtSchema.plugin(mongooseLeanGetters);

// mongoose model created
const Thought = model('thought', thoughtSchema);

// export Thought model
module.exports = Thought;