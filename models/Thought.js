const { Schema, model, mongoose } = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId(), },
    reactionBody: { type: String, required: true, max: 280, },
    username: { type: Schema.Types.ObjectId, ref: 'user', required: true },
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
        username: [{
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        }],
        reactions: [reactionSchema],
    }
);





const Thought = model('thought', thoughtSchema);

module.exports = { Thought, reactionSchema };
