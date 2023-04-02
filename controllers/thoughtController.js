const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        // Thought.find()
        //     .then((thought) => res.json(thought))
        //     .catch((err) => res.status(500).json(err));
        res.send("you've hit the thought route!")
    },
}