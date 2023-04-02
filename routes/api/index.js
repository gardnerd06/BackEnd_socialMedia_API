const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/thought', userRoutes);
router.use('/user', thoughtRoutes);

module.exports = router;
