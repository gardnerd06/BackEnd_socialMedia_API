const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
        // res.send("you've hit the thought route!")
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.userId })
                .select('-__v');


            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            return res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // create a new thought
    async createThought(req, res) {
        try {
            const createdThought = await Thought.create(req.body);
            return res.json(createdThought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // updating a thought
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
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
            const deletedThought = await Thought.findOneAndDelete({ _id: req.params.userId });

            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            return res.json({ message: 'Thoughts deleted!' })
        } catch (err) {
            return res.status(500).json(err);
        }
    },
};
