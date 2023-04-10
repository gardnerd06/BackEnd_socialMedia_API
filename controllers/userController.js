const { Thought, User } = require('../models');

module.exports = {
    // Find all users in Database
    async getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
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
            return res.json({ message: "USER DELETED", user })
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend(req, res) {
        try {
            const addedfriend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!addedfriend) {
                return res.status(404).json({ message: "add unsuccessful" })
            }
            return res.status(200).json(addedfriend)
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // delete a friend
    async deleteFriend(req, res) {
        try {
            try {
                const user = await User.findOneAndUpdate({ _id: req.params.userId },
                    { $pull: { friends: req.params.friendId } });

                if (!user) {
                    return res.status(404).json({ message: 'No user with that ID' });
                }
                return res.json({ message: 'FRIEND DELETED', user })
            } catch (err) {
                return res.status(500).json(err);
            }




        } catch (err) {
            return res.status(500).json(err);
        }
    }
};






