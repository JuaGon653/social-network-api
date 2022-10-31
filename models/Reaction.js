const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (createdAt) {
                // date formatter copied from https://stackoverflow.com/a/11591900
                return (((createdAt.getMonth() > 8) ? (createdAt.getMonth() + 1) : ('0' + (createdAt.getMonth() + 1))) + '/' + ((createdAt.getDate() > 9) ? createdAt.getDate() : ('0' + createdAt.getDate())) + '/' + createdAt.getFullYear())
            }
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
        _id: false,
        versionKey: false
    }
);

module.exports = reactionSchema;