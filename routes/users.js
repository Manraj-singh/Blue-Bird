const express = require('express');
const router = express.Router();

const passport = require('passport');
const usersController = require('../controllers/users_controller');


// router.use('/users/friendship', require('./friendship'));
// signin -- signout related routes
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

//routes for github oauth
    router.get('/auth/github',passport.authenticate('github',{scope:['email']}));
    //github oauth callback url
    router.get('/auth/github/callback',passport.authenticate(
        'github',
        {failureRedirect:'/users/sign-in'}
        ),usersController.createSession);


        router.get('/friendship/send/:id', passport.checkAuthentication, usersController.sendFriendRequest);
        router.get('/friendship/accept/:id', passport.checkAuthentication, usersController.acceptFriendRequest);
        router.get('/friendship/cancel/:id', passport.checkAuthentication, usersController.removeFriendRequest);
        router.get('/friendship/remove/:id', passport.checkAuthentication, usersController.removeFriendRequest); 


module.exports = router;