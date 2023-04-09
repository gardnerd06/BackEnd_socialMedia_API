const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, postReaction, deleteReaction } = require('../../controllers/thoughtController');
// /api/thoughts
router.route('/').get(getThoughts).post(createThought);
// /api/thoughts:userId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
// route for adding and deleting reactions
router.route('/:thoughtId/reactions').post(postReaction).delete(deleteReaction);
module.exports = router;