const express = require('express');
const passport = require('../config/passport-local-strategy');

const router = express.Router();
const homeController = require('../controllers/home_controller');


router.get('/',function(req,res){
    return res.redirect('/home');
});
router.use('/home',passport.checkAuthentication,require('./home'))



router.use('/users', require('./users'));
router.use('/posts',passport.checkAuthentication,require('./posts'))
router.use('/comments', require('./comments'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;