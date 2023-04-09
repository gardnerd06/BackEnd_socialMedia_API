const { Schema, model, Types } = require('mongoose');
// creating a schema for reactions
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), },
    reactionBody: { type: String, required: true, max: 280, },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), }
});

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1, max: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
        },
    }

);

// storing a thought model in a variable
const Thought = model('thought', thoughtSchema);

module.exports = { Thought };
