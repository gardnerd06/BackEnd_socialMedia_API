const { Thought, User } = require('../models');
// exporting routes to be used on other pages
module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    async getSingleThought(req, res) {
        try {
            await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .populate('reactions')
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'No thought with that ID' })
                        : res.json(thought)
                )
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            Thought.create(req.body)
                .then((thought) => {
                    User.findOneAndUpdate(
                        { _id: req.body.userId },
                        { $addToSet: { thoughts: thought._id } },
                        { new: true }
                    );
                })
                .then((user) =>
                    !user
                        ? res
                            .status(404)
                            .json({ message: 'Post created, but found no user with that ID' })
                        : res.json('Created the post 🎉')
                )
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // updating a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            return res.json(updatedThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a thought 
    async deleteThought(req, res) {
        try {
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            return res.json({ message: 'Thoughts deleted!' })
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // post a reaction
    async postReaction(req, res) {
        try {

            await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { new: true })

                .then((user) =>
                    !user
                        ? res
                            .status(404)
                            .json({ message: 'Reaction Posted, but found no user with that ID' })
                        : res.json('Created the Reaction 🎉')
                )
        } catch (err) {
            return res.status(500).json(err);
        }


    },

    // delete a reaction
    async deleteReaction(req, res) {
        try {
            await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } },

            )
                .then((thought) =>
                    !thought
                        ? res.status(404).json({ message: 'No reaction with that ID' })
                        : res.json(thought))
        } catch (err) {
            return res.status(500).json(err);
        }





    }
};
