
const express = require('express');
const passport = require('../config/passport-local-strategy');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const likesController = require('../controllers/likes_controller');


router.post('/reactions/toggle', likesController.handleReactions)
router.get('/', homeController.home)
// console.log('home controller');
// router.use('/reactions', require('./likes'));
module.exports = router;