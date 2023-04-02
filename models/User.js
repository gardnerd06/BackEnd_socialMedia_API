const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            validate: function (v) {
                return v.trim();
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) { return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); }
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')

    .get(function () {
        return `${this.friends.length}`;
    });




const User = model('user', userSchema);

module.exports = User;