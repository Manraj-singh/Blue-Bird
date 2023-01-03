const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');
const likesController = require('../controllers/likes_controller');


router.post('/create',  postsController.create);
router.post('/uploadPost',  postsController.uploadPost);

// router.post('/toggle',likesController.toggleLike );


router.get('/destroy/:id',  postsController.destroy);

module.exports = router;