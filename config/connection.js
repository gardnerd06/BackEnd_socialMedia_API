const { connect, connection } = require('mongoose');

const dbConnection = process.env.MONGODB_URI || 'mongodb://localhost/social_db';

connect(dbConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;
