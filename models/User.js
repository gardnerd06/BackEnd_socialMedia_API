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
                validator: () => Promise.resolve(false),
                message: 'Email validation failed'
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
const user = new User();

user.email = 'test@test.co';
user.name = 'test';

let error;
try {
    await user.validate();
} catch (err) {
    error = err;
}
assert.ok(error);
assert.equal(error.errors['name'].message, 'Oops!');
assert.equal(error.errors['email'].message, 'Email validation failed');

module.exports = User;
