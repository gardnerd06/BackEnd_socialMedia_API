const { Thought, User } = require('../models');

module.exports = {
    getUser(req, res) {
        // User.find()
        //     .then((users) => res.json(users))
        //     .catch((err) => res.status(500).json(err));
        res.send("you've hit the right route!")
    },
}
