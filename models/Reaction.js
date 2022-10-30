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
            get() {
                // date formatter copied from https://stackoverflow.com/a/11591900
                return (((this.createdAt.getMonth() > 8) ? (this.createdAt.getMonth() + 1) : ('0' + (this.createdAt.getMonth() + 1))) + '/' + ((this.createdAt.getDate() > 9) ? this.createdAt.getDate() : ('0' + this.createdAt.getDate())) + '/' + this.createdAt.getFullYear())
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