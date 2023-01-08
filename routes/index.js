const express = require('express');
const passport = require('../config/passport-local-strategy');

const router = express.Router();
const homeController = require('../controllers/home_controller');
const organizationController = require('../controllers/organization_controller');


router.get('/',passport.checkAuthentication,function(req,res){
    console.log(req.user.userType);
        return res.redirect('/home');
    
});
router.use('/home',passport.checkAuthentication,require('./home'))
router.use('/organization',passport.checkAuthentication,organizationController.home);




router.use('/users', require('./users'));
router.use('/posts',passport.checkAuthentication,require('./posts'))
router.use('/comments', require('./comments'));

// for any further routes, access from here
// router.use('/routerName', require('./routerfile));


module.exports = router;