const router = require('express').Router();
const { getUser } = require('../../controllers/userController');

router.route('/').get(getUser);
















module.exports = router;