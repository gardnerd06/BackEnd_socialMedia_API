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
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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
// creating a virtual property to keep track of friends
userSchema
    .virtual('friendCount')

    .get(function () {
        return `${this.friends.length}`;
    });




const User = model('user', userSchema);

module.exports = User;
