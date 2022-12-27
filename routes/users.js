const express = require('express');
const router = express.Router();

const passport = require('passport');
const usersController = require('../controllers/users_controller');

// router.get('/profile', usersController.profile);

// router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/sign-out',usersController.destroySession);

router.post('/create', usersController.create);
//use passport as middleware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
), usersController.createSession);

//routes for google oauth
//NOTE: google authenticates and returns info asked in scope:[]
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));
//google oauth callback url
router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/sign-in'}
    ),usersController.createSession);


module.exports = router;