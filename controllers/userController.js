const { Thought, User } = require('../models');

module.exports = {
    // Find all users in Database
    async getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
        // res.send("you've hit the right route!")
    },
    // find a single user
    async getSingleUser(req, res) {
        try {
            await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .then((user) =>
                    !user
                        ? res.status(404).json({ message: 'No user with that ID' })
                        : res.json(user)
                )
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // updating a user
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a user 
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            return res.json({ message: 'User deleted!' })
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};






