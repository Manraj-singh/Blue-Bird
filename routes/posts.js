const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create',  postsController.create);
router.post('/uploadPost',  postsController.uploadPost);



router.get('/destroy/:id',  postsController.destroy);

module.exports = router;