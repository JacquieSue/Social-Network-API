const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getAllThoughts).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateVideo)
    .delete(deleteThought);

    router.route('/:thoughtId/reactions').post(addThoughytResponse);

    router.route('/:thoughtId/reactions/:reactionsId').delete(removeThoughtResponse);

    module.exports = router;